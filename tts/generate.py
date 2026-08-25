#!/usr/bin/env python3
"""Sinh audio thuyết minh + timing cho một tập video.

Usage: .venv/bin/python generate.py ep01
Đọc scripts/<ep>.json, sinh wav vào video/public/audio/<ep>/,
xuất video/src/data/<ep>.timing.json cho Remotion.
Cache theo hash nội dung câu: sửa 1 câu chỉ sinh lại 1 wav.
"""
import hashlib
import json
import math
import sys
from pathlib import Path

import soundfile as sf

FPS = 30
PAD_SECONDS = 0.6   # đệm cuối scene
GAP_SECONDS = 0.25  # nghỉ giữa các câu
MAX_SENTENCE_CHARS = 200
VOICE = "Adam"      # chốt ở Task 2

ROOT = Path(__file__).resolve().parent.parent
SCRIPTS = Path(__file__).resolve().parent / "scripts"
AUDIO_ROOT = ROOT / "video" / "public" / "audio"
DATA_DIR = ROOT / "video" / "src" / "data"


def normalize_narration(narration) -> list[str]:
    return [narration] if isinstance(narration, str) else list(narration)


def sentence_filename(scene_id: str, index: int, text: str, voice: str) -> str:
    h = hashlib.sha1(f"{voice}|{text}".encode()).hexdigest()[:8]
    return f"{scene_id}-{index}-{h}.wav"


def seconds_to_frames(seconds: float) -> int:
    return math.ceil(seconds * FPS)


def validate_script(script: list[dict]) -> list[str]:
    errors = []
    seen_ids = set()
    for scene in script:
        if scene["id"] in seen_ids:
            errors.append(f"{scene['id']}: id trùng lặp")
        seen_ids.add(scene["id"])
        sentences = normalize_narration(scene["narration"])
        if not sentences:
            errors.append(f"{scene['id']}: narration rỗng")
        for i, s in enumerate(sentences):
            if len(s) > MAX_SENTENCE_CHARS:
                errors.append(f"{scene['id']} câu {i}: {len(s)} > {MAX_SENTENCE_CHARS} ký tự")
        visual = scene.get("visual", {})
        refs = []
        for key in ("bullets", "steps", "commands", "flows", "summary"):
            refs += [item.get("sentence") for item in visual.get(key, [])]
        for r in refs:
            if r is not None and r >= len(sentences):
                errors.append(f"{scene['id']}: sentence index {r} >= số câu {len(sentences)}")
        if "code" in visual and "steps" in visual:
            code_lines = len(visual["code"].split("\n"))
            for step in visual["steps"]:
                lo, hi = step.get("from"), step.get("to")
                if lo is None or hi is None:
                    continue
                if not (1 <= lo <= code_lines) or not (1 <= hi <= code_lines) or lo > hi:
                    errors.append(
                        f"{scene['id']}: step from={lo} to={hi} không hợp lệ "
                        f"(code có {code_lines} dòng)"
                    )
    return errors


def build_timing(scenes: list[dict]) -> dict:
    out_scenes = []
    for scene in scenes:
        cursor = 0
        sentences = []
        for s in scene["sentences"]:
            dur = seconds_to_frames(s["seconds"])
            sentences.append({"file": s["file"], "startFrame": cursor, "durationInFrames": dur})
            cursor += dur + seconds_to_frames(GAP_SECONDS)
        if not sentences:
            raise ValueError(f"scene {scene['id']}: không có câu nào")
        last = sentences[-1]
        total = last["startFrame"] + last["durationInFrames"] + seconds_to_frames(PAD_SECONDS)
        out_scenes.append({
            "id": scene["id"], "type": scene["type"], "visual": scene.get("visual", {}),
            "sentences": sentences, "durationInFrames": total,
        })
    return {"fps": FPS, "scenes": out_scenes}


def generate(episode: str) -> None:
    script = json.loads((SCRIPTS / f"{episode}.json").read_text(encoding="utf-8"))
    errors = validate_script(script)
    if errors:
        for e in errors:
            print("LỖI:", e)
        raise SystemExit(1)

    audio_dir = AUDIO_ROOT / episode
    audio_dir.mkdir(parents=True, exist_ok=True)

    jobs = []    # (path, text) cần sinh mới
    prepared = []
    for scene in script:
        sentence_files = []
        for i, text in enumerate(normalize_narration(scene["narration"])):
            fname = sentence_filename(scene["id"], i, text, VOICE)
            path = audio_dir / fname
            if not path.exists():
                jobs.append((path, text))
            sentence_files.append({"path": path, "rel": f"audio/{episode}/{fname}"})
        prepared.append({"scene": scene, "files": sentence_files})

    if jobs:
        from vieneu import Vieneu  # import muộn: model load chậm, chỉ khi cần
        tts = Vieneu()
        for n, (path, text) in enumerate(jobs, 1):
            print(f"[{n}/{len(jobs)}] {path.name}: {text[:60]}")
            audio = tts.infer(text, voice=VOICE)
            tts.save(audio, str(path))
    else:
        print("Cache đầy đủ, không cần sinh audio mới.")

    timing = build_timing([
        {
            "id": item["scene"]["id"], "type": item["scene"]["type"],
            "visual": item["scene"].get("visual", {}),
            "sentences": [{"file": f["rel"], "seconds": sf.info(f["path"]).duration}
                          for f in item["files"]],
        }
        for item in prepared
    ])
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    out = DATA_DIR / f"{episode}.timing.json"
    out.write_text(json.dumps(timing, ensure_ascii=False, indent=2), encoding="utf-8")
    total = sum(s["durationInFrames"] for s in timing["scenes"])
    print(f"OK: {len(timing['scenes'])} scene, {total} frames (~{total / FPS:.1f}s) -> {out}")


if __name__ == "__main__":
    generate(sys.argv[1] if len(sys.argv) > 1 else "ep01")
