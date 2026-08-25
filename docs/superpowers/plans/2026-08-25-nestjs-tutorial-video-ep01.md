# NestJS Tutorial Video Ep01 + Pipeline — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pipeline Remotion + VieNeu-TTS dùng chung cho cả series, và render hoàn chỉnh Tập 1 "NestJS cơ bản" (~6 phút, 1080p, thuyết minh tiếng Việt).

**Architecture:** Kịch bản JSON (`tts/scripts/ep01.json`) → `tts/generate.py` gọi VieNeu-TTS sinh wav từng câu + đo độ dài thật → xuất `video/src/data/ep01.timing.json` → Remotion đọc timing, mỗi scene là một `<Sequence>` khớp đúng audio của nó → render MP4. Spec: `docs/superpowers/specs/2026-08-25-nestjs-tutorial-video-ep01-design.md`.

**Tech Stack:** Remotion 4 (React 18 + TypeScript), prism-react-renderer, @remotion/google-fonts; Python 3 + vieneu (ONNX/CPU) + soundfile + pytest; NestJS CLI cho demo-app.

## Global Constraints

- Video: 1920×1080, 30fps. Tập 1 mục tiêu ~6–8 phút.
- Theme: nền `#0f172a`, panel `#1e293b`, chữ `#f1f5f9`, accent NestJS `#ea2845`; font Inter (chữ, subset vietnamese) + JetBrains Mono (code).
- Mỗi câu narration ≤ 200 ký tự (generate.py validate, fail nếu vi phạm).
- Timing: gap giữa câu 0.25s, đệm cuối scene 0.6s, frame = `ceil(seconds * 30)`.
- Giọng TTS: hằng `VOICE` trong `tts/generate.py`, mặc định `"Adam"`, chốt lại ở Task 2 sau khi người dùng nghe preview.
- Python chạy qua venv: `tts/.venv/bin/python` (không dùng python hệ thống).
- File wav sinh ra và `node_modules` KHÔNG commit (gitignore); `*.timing.json` CÓ commit.
- Commit message kết thúc bằng `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

---

### Task 1: Môi trường TTS + smoke test

**Files:**
- Create: `tts/requirements.txt`, `.gitignore`
- Create (generated, not committed): `tts/.venv/`

**Interfaces:**
- Produces: venv tại `tts/.venv` có package `vieneu`, `soundfile`, `numpy`, `pytest`; model VieNeu v3 Turbo đã tải về máy.

- [ ] **Step 1: Viết `.gitignore` (repo root) và `tts/requirements.txt`**

`.gitignore`:
```
node_modules/
tts/.venv/
tts/voice_previews/
tts/smoke.wav
video/public/audio/
video/out/
out/
dist/
__pycache__/
.DS_Store
```

`tts/requirements.txt`:
```
vieneu
soundfile
numpy
pytest
```

- [ ] **Step 2: Tạo venv và cài đặt**

Run:
```bash
cd tts && python3 -m venv .venv && .venv/bin/pip install -U pip -q && .venv/bin/pip install -r requirements.txt
```
Expected: cài thành công, không lỗi. (vieneu bản CPU/ONNX, không cần torch.)

- [ ] **Step 3: Smoke test — sinh 1 câu tiếng Việt**

Run (lần đầu sẽ tải model, có thể mất vài phút):
```bash
cd tts && .venv/bin/python -c "
from vieneu import Vieneu
t = Vieneu()
print('Voices:', t.list_preset_voices())
a = t.infer('Xin chào Việt Nam, đây là bài kiểm tra.', voice='Adam')
t.save(a, 'smoke.wav')
import soundfile as sf
print(sf.info('smoke.wav'))
"
```
Expected: in danh sách giọng preset và info wav với `duration > 0`. **Ghi lại danh sách giọng in ra** (Task 2 cần). Nếu tên giọng khác spec (ví dụ không có "Adam"), dùng đúng tên trong danh sách in ra và cập nhật `VOICE` mặc định ở Task 3 cho khớp.

- [ ] **Step 4: Nghe kiểm tra smoke.wav**

Run: `afplay tts/smoke.wav` (hoặc kiểm duration hợp lệ nếu chạy headless). Expected: giọng Việt rõ, đọc đúng câu.

- [ ] **Step 5: Commit**

```bash
git add .gitignore tts/requirements.txt
git commit -m "chore: TTS environment setup (vieneu + soundfile)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: Preview giọng và chốt giọng đọc

**Files:**
- Create: `tts/preview_voices.py`
- Create (not committed): `tts/voice_previews/*.wav`

**Interfaces:**
- Consumes: venv Task 1.
- Produces: quyết định giá trị `VOICE` (tên giọng) dùng cho cả series.

- [ ] **Step 1: Viết `tts/preview_voices.py`**

```python
"""Sinh 1 đoạn mẫu bằng vài giọng preset để chọn giọng cho series."""
from pathlib import Path

from vieneu import Vieneu

SAMPLE = (
    "Xin chào các bạn, chào mừng đến với series NestJS cho người mới bắt đầu. "
    "Hôm nay chúng ta sẽ cùng tìm hiểu về Controller, Service và Module."
)
# Ứng viên (sửa theo danh sách list_preset_voices in ra ở Task 1 nếu tên khác)
CANDIDATES = ["Adam", "Minh Đức", "Phạm Tuyên", "Trúc Ly", "Mai Anh", "Thùy Dung"]

def main() -> None:
    out = Path(__file__).parent / "voice_previews"
    out.mkdir(exist_ok=True)
    tts = Vieneu()
    available = tts.list_preset_voices()
    print("Giọng có sẵn:", available)
    for voice in CANDIDATES:
        if voice not in available:
            print(f"Bỏ qua (không có): {voice}")
            continue
        audio = tts.infer(SAMPLE, voice=voice)
        path = out / f"{voice.replace(' ', '_')}.wav"
        tts.save(audio, str(path))
        print("->", path)

if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Chạy preview**

Run: `cd tts && .venv/bin/python preview_voices.py`
Expected: ≥4 file wav trong `tts/voice_previews/`.

- [ ] **Step 3: CHECKPOINT — gửi file cho người dùng chọn giọng**

Gửi các wav cho người dùng (SendUserFile), hỏi chọn 1 giọng. **Dừng chờ trả lời.** Ghi tên giọng được chọn — Task 3 dùng làm `VOICE`. (Nếu người dùng không có ý kiến, giữ "Adam".)

- [ ] **Step 4: Commit**

```bash
git add tts/preview_voices.py
git commit -m "feat: voice preview script for choosing series narrator

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: `tts/generate.py` — logic thuần + tests (TDD)

**Files:**
- Create: `tts/generate.py`, `tts/test_generate.py`

**Interfaces:**
- Produces (Task 4, 12 dùng):
  - `sentence_filename(scene_id: str, index: int, text: str, voice: str) -> str` — tên wav có hash 8 ký tự sha1 của `f"{voice}|{text}"`.
  - `normalize_narration(narration) -> list[str]` — str → [str], list giữ nguyên.
  - `seconds_to_frames(seconds: float) -> int` — `ceil(s * FPS)`.
  - `validate_script(script: list[dict]) -> list[str]` — trả danh sách lỗi (rỗng = hợp lệ).
  - `build_timing(scenes: list[dict]) -> dict` — input mỗi scene `{id, type, visual, sentences: [{file, seconds}]}`; output `{fps, scenes: [{id, type, visual, sentences: [{file, startFrame, durationInFrames}], durationInFrames}]}`.
  - `generate(episode: str) -> None` — pipeline đầy đủ.
  - Hằng: `FPS=30`, `PAD_SECONDS=0.6`, `GAP_SECONDS=0.25`, `VOICE=<giọng đã chọn Task 2>`.
- Timing JSON format (Remotion Task 5 dùng): xem `build_timing` ở trên.

- [ ] **Step 1: Viết test `tts/test_generate.py`**

```python
import json
import sys

import numpy as np
import soundfile as sf

import generate as g


def test_seconds_to_frames_rounds_up():
    assert g.seconds_to_frames(1.0) == 30
    assert g.seconds_to_frames(1.01) == 31


def test_normalize_narration():
    assert g.normalize_narration("một câu") == ["một câu"]
    assert g.normalize_narration(["a", "b"]) == ["a", "b"]


def test_sentence_filename_stable_and_text_sensitive():
    a = g.sentence_filename("scene-01", 0, "xin chào", "Adam")
    assert a == g.sentence_filename("scene-01", 0, "xin chào", "Adam")
    assert a != g.sentence_filename("scene-01", 0, "xin chào!", "Adam")
    assert a != g.sentence_filename("scene-01", 0, "xin chào", "Mai Anh")
    assert a.startswith("scene-01-0-") and a.endswith(".wav")


def test_validate_script_catches_errors():
    ok = [{"id": "s1", "type": "concept", "narration": ["ngắn", "gọn"],
           "visual": {"bullets": [{"text": "x", "sentence": 1}]}}]
    assert g.validate_script(ok) == []
    bad = [
        {"id": "s1", "type": "title", "narration": [], "visual": {}},
        {"id": "s2", "type": "concept", "narration": "x" * 201, "visual": {}},
        {"id": "s3", "type": "concept", "narration": ["một câu"],
         "visual": {"bullets": [{"text": "x", "sentence": 5}]}},
    ]
    errors = g.validate_script(bad)
    assert len(errors) == 3
    assert "s1" in errors[0] and "s2" in errors[1] and "s3" in errors[2]


def test_build_timing_offsets_and_padding():
    timing = g.build_timing([{
        "id": "s1", "type": "concept", "visual": {"title": "t"},
        "sentences": [{"file": "a.wav", "seconds": 2.0},
                      {"file": "b.wav", "seconds": 1.0}],
    }])
    scene = timing["scenes"][0]
    assert timing["fps"] == 30
    # câu 1: 60 frames; gap 0.25s -> 8 frames; câu 2 bắt đầu frame 68, dài 30
    assert scene["sentences"][0] == {"file": "a.wav", "startFrame": 0, "durationInFrames": 60}
    assert scene["sentences"][1] == {"file": "b.wav", "startFrame": 68, "durationInFrames": 30}
    # tổng: 68 + 30 + 18 (pad 0.6s) = 116
    assert scene["durationInFrames"] == 116
    assert scene["visual"] == {"title": "t"}


def test_generate_uses_cache_and_writes_timing(tmp_path, monkeypatch):
    scripts = tmp_path / "scripts"
    scripts.mkdir()
    monkeypatch.setattr(g, "SCRIPTS", scripts)
    monkeypatch.setattr(g, "AUDIO_ROOT", tmp_path / "audio")
    monkeypatch.setattr(g, "DATA_DIR", tmp_path / "data")
    text = "xin chào"
    (scripts / "test.json").write_text(json.dumps(
        [{"id": "s1", "type": "title", "narration": text, "visual": {"title": "t"}}]
    ), encoding="utf-8")
    # tạo sẵn wav đúng tên cache: 0.5s im lặng @48kHz
    wav_dir = tmp_path / "audio" / "test"
    wav_dir.mkdir(parents=True)
    fname = g.sentence_filename("s1", 0, text, g.VOICE)
    sf.write(wav_dir / fname, np.zeros(24000, dtype="float32"), 48000)
    # nếu generate cố gọi TTS thì import vieneu sẽ nổ -> test fail
    monkeypatch.setitem(sys.modules, "vieneu", None)
    g.generate("test")
    timing = json.loads((tmp_path / "data" / "test.timing.json").read_text(encoding="utf-8"))
    scene = timing["scenes"][0]
    assert scene["sentences"][0]["file"] == f"audio/test/{fname}"
    assert scene["sentences"][0]["durationInFrames"] == 15  # 0.5s
    assert scene["durationInFrames"] == 15 + 18
```

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `cd tts && .venv/bin/python -m pytest test_generate.py -v`
Expected: FAIL/ERROR — `ModuleNotFoundError: No module named 'generate'`.

- [ ] **Step 3: Viết `tts/generate.py`**

```python
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
    for scene in script:
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
```

Lưu ý: đặt `VOICE` đúng giọng đã chốt ở Task 2 (test không phụ thuộc giá trị cụ thể).

- [ ] **Step 4: Chạy test, xác nhận PASS**

Run: `cd tts && .venv/bin/python -m pytest test_generate.py -v`
Expected: 6 passed.

- [ ] **Step 5: Commit**

```bash
git add tts/generate.py tts/test_generate.py
git commit -m "feat: TTS generate pipeline (script -> wav + timing.json) with tests

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: Chạy generate thật với script mini

**Files:**
- Create: `tts/scripts/test-mini.json`
- Create (not committed): `video/public/audio/test-mini/*.wav`, `video/src/data/test-mini.timing.json`

**Interfaces:**
- Consumes: `generate()` Task 3.
- Produces: xác nhận pipeline TTS end-to-end chạy được; `test-mini.timing.json` (Task 5 có thể tham khảo, không dùng trực tiếp).

- [ ] **Step 1: Viết `tts/scripts/test-mini.json`**

```json
[
  {
    "id": "scene-01",
    "type": "title",
    "narration": [
      "Xin chào, đây là bài kiểm tra pipeline.",
      "Nếu bạn nghe được hai câu này với hình khớp tiếng, pipeline đã hoạt động."
    ],
    "visual": {
      "title": "Kiểm tra pipeline",
      "subtitle": "TTS + Remotion",
      "badge": "Test"
    }
  }
]
```

- [ ] **Step 2: Chạy generate**

Run: `cd tts && .venv/bin/python generate.py test-mini`
Expected: in `[1/2]`, `[2/2]`, rồi `OK: 1 scene, ... frames`. File `video/src/data/test-mini.timing.json` tồn tại, 2 wav trong `video/public/audio/test-mini/`.

- [ ] **Step 3: Chạy lại để kiểm tra cache**

Run: `cd tts && .venv/bin/python generate.py test-mini`
Expected: `Cache đầy đủ, không cần sinh audio mới.` (không gọi TTS lần 2).

- [ ] **Step 4: Nghe kiểm tra 1 wav**

Run: `afplay video/public/audio/test-mini/$(ls video/public/audio/test-mini | head -1)`
Expected: giọng đúng, đọc rõ.

- [ ] **Step 5: Commit**

```bash
git add tts/scripts/test-mini.json video/src/data/test-mini.timing.json
git commit -m "feat: mini test script proving end-to-end TTS generation

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: Remotion scaffold + theme + TitleScene

**Files:**
- Create: `video/package.json`, `video/tsconfig.json`, `video/remotion.config.ts`, `video/src/index.ts`, `video/src/Root.tsx`, `video/src/Episode.tsx`, `video/src/data/types.ts`, `video/src/data/ep01.timing.json` (placeholder), `video/src/data/ep00.timing.json` (fixture preview), `video/src/components/theme.ts`, `video/src/components/Appear.tsx`, `video/src/components/useSentenceIndex.ts`, `video/src/scenes/registry.ts`, `video/src/scenes/TitleScene.tsx`, `video/public/.gitkeep`

**Interfaces:**
- Consumes: format timing JSON của Task 3.
- Produces (các task sau dùng):
  - `data/types.ts`: `SentenceTiming {file, startFrame, durationInFrames}`, `SceneTiming {id, type, visual, sentences, durationInFrames}`, `EpisodeTiming {fps, scenes}`, `SceneProps {visual: any; sentences: SentenceTiming[]}`.
  - `components/theme.ts`: object `theme` với `bg, panel, panelBorder, text, textDim, accent, green, yellow, blue, fontSans, fontMono`.
  - `components/Appear.tsx`: `<Appear at={frame} dy?>{children}</Appear>` — spring fade+slide từ frame `at`.
  - `components/useSentenceIndex.ts`: `useSentenceIndex(sentences) -> number` — index câu đang đọc theo frame hiện tại.
  - `scenes/registry.ts`: `sceneRegistry: Record<string, React.FC<SceneProps>>` — mỗi task scene sau THÊM entry vào đây.
  - Composition `Episode01` và `Preview` (fixture ep00).

- [ ] **Step 1: Viết `video/package.json`**

```json
{
  "name": "tutorial-video",
  "private": true,
  "scripts": {
    "studio": "remotion studio",
    "render": "remotion render Episode01 out/ep01.mp4",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@remotion/cli": "^4.0.240",
    "@remotion/google-fonts": "^4.0.240",
    "prism-react-renderer": "^2.3.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "remotion": "^4.0.240"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "typescript": "^5.5.4"
  }
}
```

- [ ] **Step 2: Viết `video/tsconfig.json` và `video/remotion.config.ts`**

`video/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "strict": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

`video/remotion.config.ts`:
```ts
import {Config} from '@remotion/cli/config';

Config.setEntryPoint('src/index.ts');
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
```

- [ ] **Step 3: Viết `video/src/data/types.ts`**

```ts
export type SentenceTiming = {
  file: string; // đường dẫn tương đối trong public/, '' = không có audio (fixture)
  startFrame: number;
  durationInFrames: number;
};

export type SceneTiming = {
  id: string;
  type: string;
  visual: Record<string, unknown>;
  sentences: SentenceTiming[];
  durationInFrames: number;
};

export type EpisodeTiming = {fps: number; scenes: SceneTiming[]};

// Props chung mọi scene component; mỗi scene tự cast visual về type riêng của nó.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SceneProps = {visual: any; sentences: SentenceTiming[]};
```

- [ ] **Step 4: Viết `video/src/components/theme.ts`**

```ts
import {loadFont as loadInter} from '@remotion/google-fonts/Inter';
import {loadFont as loadJetBrainsMono} from '@remotion/google-fonts/JetBrainsMono';

const inter = loadInter('normal', {
  weights: ['400', '700', '900'],
  subsets: ['latin', 'vietnamese'],
});
const mono = loadJetBrainsMono('normal', {
  weights: ['400', '700'],
  subsets: ['latin'],
});

export const theme = {
  bg: '#0f172a',
  panel: '#1e293b',
  panelBorder: '#334155',
  text: '#f1f5f9',
  textDim: '#94a3b8',
  accent: '#ea2845',
  green: '#4ade80',
  yellow: '#facc15',
  blue: '#38bdf8',
  fontSans: inter.fontFamily,
  fontMono: mono.fontFamily,
};
```

- [ ] **Step 5: Viết `Appear.tsx` và `useSentenceIndex.ts`**

`video/src/components/Appear.tsx`:
```tsx
import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const Appear: React.FC<{
  at: number;
  dy?: number;
  children: React.ReactNode;
}> = ({at, dy = 40, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - at, fps, config: {damping: 200}});
  return (
    <div style={{opacity: p, transform: `translateY(${(1 - p) * dy}px)`}}>
      {children}
    </div>
  );
};
```

`video/src/components/useSentenceIndex.ts`:
```ts
import {useCurrentFrame} from 'remotion';
import type {SentenceTiming} from '../data/types';

// Index của câu đang (hoặc vừa) đọc tại frame hiện tại của scene.
export const useSentenceIndex = (sentences: SentenceTiming[]): number => {
  const frame = useCurrentFrame();
  let idx = 0;
  sentences.forEach((s, i) => {
    if (frame >= s.startFrame) idx = i;
  });
  return idx;
};

export const sentenceStart = (sentences: SentenceTiming[], i: number): number =>
  sentences[Math.min(i, Math.max(sentences.length - 1, 0))]?.startFrame ?? 0;
```

- [ ] **Step 6: Viết `video/src/scenes/TitleScene.tsx` và `video/src/scenes/registry.ts`**

`TitleScene.tsx`:
```tsx
import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Appear} from '../components/Appear';
import {theme} from '../components/theme';
import type {SceneProps} from '../data/types';

export type TitleVisual = {title: string; subtitle: string; badge?: string};

export const TitleScene: React.FC<SceneProps> = ({visual}) => {
  const v = visual as TitleVisual;
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame, fps, config: {damping: 200}});
  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: theme.fontSans,
        gap: 36,
      }}
    >
      {v.badge ? (
        <div
          style={{
            opacity: p,
            color: theme.accent,
            border: `3px solid ${theme.accent}`,
            borderRadius: 999,
            padding: '10px 32px',
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          {v.badge}
        </div>
      ) : null}
      <h1
        style={{
          margin: 0,
          fontSize: 110,
          fontWeight: 900,
          color: theme.text,
          textAlign: 'center',
          maxWidth: 1500,
          lineHeight: 1.15,
          opacity: p,
          transform: `scale(${0.9 + p * 0.1})`,
        }}
      >
        {v.title}
      </h1>
      <Appear at={Math.round(fps * 0.5)}>
        <p style={{margin: 0, fontSize: 44, color: theme.textDim}}>{v.subtitle}</p>
      </Appear>
    </AbsoluteFill>
  );
};
```

`registry.ts`:
```ts
import type React from 'react';
import type {SceneProps} from '../data/types';
import {TitleScene} from './TitleScene';

// Các task sau thêm scene mới vào đây (concept, diagram, code, terminal, outro).
export const sceneRegistry: Record<string, React.FC<SceneProps>> = {
  title: TitleScene,
};
```

- [ ] **Step 7: Viết `video/src/Episode.tsx`**

```tsx
import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {theme} from './components/theme';
import type {EpisodeTiming, SceneTiming} from './data/types';
import {sceneRegistry} from './scenes/registry';

export const totalDuration = (timing: EpisodeTiming): number =>
  timing.scenes.reduce((sum, s) => sum + s.durationInFrames, 0);

const Scene: React.FC<{scene: SceneTiming}> = ({scene}) => {
  const Comp = sceneRegistry[scene.type];
  if (!Comp) {
    return (
      <AbsoluteFill
        style={{
          backgroundColor: theme.bg,
          color: theme.yellow,
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 60,
          fontFamily: theme.fontSans,
        }}
      >
        Chưa có scene type: {scene.type}
      </AbsoluteFill>
    );
  }
  return <Comp visual={scene.visual} sentences={scene.sentences} />;
};

export const Episode: React.FC<{timing: EpisodeTiming}> = ({timing}) => {
  let from = 0;
  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      {timing.scenes.map((scene) => {
        const el = (
          <Sequence
            key={scene.id}
            from={from}
            durationInFrames={scene.durationInFrames}
            name={scene.id}
          >
            <Scene scene={scene} />
            {scene.sentences.map((s) =>
              s.file ? (
                <Sequence key={s.file} from={s.startFrame} name={`audio:${s.file}`}>
                  <Audio src={staticFile(s.file)} />
                </Sequence>
              ) : null
            )}
          </Sequence>
        );
        from += scene.durationInFrames;
        return el;
      })}
    </AbsoluteFill>
  );
};
```

- [ ] **Step 8: Viết placeholder `ep01.timing.json`, fixture `ep00.timing.json`, `Root.tsx`, `index.ts`, `public/.gitkeep`**

`video/src/data/ep01.timing.json` (bị `generate.py` ghi đè ở Task 12):
```json
{
  "fps": 30,
  "scenes": [
    {
      "id": "placeholder",
      "type": "title",
      "visual": {
        "title": "NestJS cho người mới bắt đầu",
        "subtitle": "Placeholder — sẽ được generate.py ghi đè",
        "badge": "Tập 1"
      },
      "sentences": [],
      "durationInFrames": 90
    }
  ]
}
```

`video/src/data/ep00.timing.json` (fixture xem thử scene, không có audio — Task 6–9 sẽ thêm scene vào đây):
```json
{
  "fps": 30,
  "scenes": [
    {
      "id": "fx-title",
      "type": "title",
      "visual": {
        "title": "NestJS cho người mới bắt đầu",
        "subtitle": "Tập 1 · NestJS là gì?",
        "badge": "Series Backend"
      },
      "sentences": [
        {"file": "", "startFrame": 0, "durationInFrames": 90},
        {"file": "", "startFrame": 98, "durationInFrames": 90}
      ],
      "durationInFrames": 206
    }
  ]
}
```

`video/src/Root.tsx`:
```tsx
import React from 'react';
import {Composition} from 'remotion';
import {Episode, totalDuration} from './Episode';
import ep00 from './data/ep00.timing.json';
import ep01 from './data/ep01.timing.json';
import type {EpisodeTiming} from './data/types';

const t01 = ep01 as unknown as EpisodeTiming;
const t00 = ep00 as unknown as EpisodeTiming;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Episode01"
      component={Episode}
      defaultProps={{timing: t01}}
      durationInFrames={totalDuration(t01)}
      fps={t01.fps}
      width={1920}
      height={1080}
    />
    <Composition
      id="Preview"
      component={Episode}
      defaultProps={{timing: t00}}
      durationInFrames={totalDuration(t00)}
      fps={t00.fps}
      width={1920}
      height={1080}
    />
  </>
);
```

`video/src/index.ts`:
```ts
import {registerRoot} from 'remotion';
import {RemotionRoot} from './Root';

registerRoot(RemotionRoot);
```

`video/public/.gitkeep`: file rỗng (giữ thư mục cho staticFile).

- [ ] **Step 9: Cài đặt và typecheck**

Run: `cd video && npm install && npx tsc --noEmit`
Expected: cài xong, typecheck 0 lỗi.

- [ ] **Step 10: Render still kiểm tra hình**

Run: `cd video && npx remotion still Preview out/fx-title.png --frame=120`
Expected: PNG được tạo. Mở xem (Read tool): nền tối, badge đỏ, tiêu đề to, subtitle hiện.

- [ ] **Step 11: Commit**

```bash
git add video
git commit -m "feat: Remotion scaffold with theme, Episode assembler, TitleScene

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: ConceptScene + OutroScene

**Files:**
- Create: `video/src/scenes/ConceptScene.tsx`, `video/src/scenes/OutroScene.tsx`
- Modify: `video/src/scenes/registry.ts`, `video/src/data/ep00.timing.json`

**Interfaces:**
- Consumes: `theme`, `Appear`, `sentenceStart`, `SceneProps` (Task 5).
- Produces: registry có `concept`, `outro`. Visual formats (script Task 11 dùng):
  - concept: `{title: string, bullets: [{text: string, sentence: number, icon?: string}]}`
  - outro: `{title: string, summary: [{text: string, sentence: number}], next: string}`

- [ ] **Step 1: Viết `ConceptScene.tsx`**

```tsx
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Appear} from '../components/Appear';
import {theme} from '../components/theme';
import {sentenceStart} from '../components/useSentenceIndex';
import type {SceneProps} from '../data/types';

export type ConceptVisual = {
  title: string;
  bullets: {text: string; sentence: number; icon?: string}[];
};

export const ConceptScene: React.FC<SceneProps> = ({visual, sentences}) => {
  const v = visual as ConceptVisual;
  return (
    <AbsoluteFill
      style={{backgroundColor: theme.bg, fontFamily: theme.fontSans, padding: '100px 140px'}}
    >
      <h2 style={{margin: 0, fontSize: 72, fontWeight: 900, color: theme.text}}>
        <span style={{color: theme.accent}}>■ </span>
        {v.title}
      </h2>
      <div style={{marginTop: 70, display: 'flex', flexDirection: 'column', gap: 44}}>
        {v.bullets.map((b, i) => (
          <Appear key={i} at={sentenceStart(sentences, b.sentence)}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 28,
                backgroundColor: theme.panel,
                border: `2px solid ${theme.panelBorder}`,
                borderRadius: 20,
                padding: '30px 40px',
              }}
            >
              <span style={{fontSize: 52}}>{b.icon ?? '👉'}</span>
              <span style={{fontSize: 42, color: theme.text, lineHeight: 1.4}}>{b.text}</span>
            </div>
          </Appear>
        ))}
      </div>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 2: Viết `OutroScene.tsx`**

```tsx
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Appear} from '../components/Appear';
import {theme} from '../components/theme';
import {sentenceStart} from '../components/useSentenceIndex';
import type {SceneProps} from '../data/types';

export type OutroVisual = {
  title: string;
  summary: {text: string; sentence: number}[];
  next: string;
};

export const OutroScene: React.FC<SceneProps> = ({visual, sentences}) => {
  const v = visual as OutroVisual;
  const lastStart = sentenceStart(sentences, Math.max(sentences.length - 1, 0));
  return (
    <AbsoluteFill
      style={{backgroundColor: theme.bg, fontFamily: theme.fontSans, padding: '90px 140px'}}
    >
      <h2 style={{margin: 0, fontSize: 72, fontWeight: 900, color: theme.text}}>
        <span style={{color: theme.accent}}>■ </span>
        {v.title}
      </h2>
      <div style={{marginTop: 60, display: 'flex', flexDirection: 'column', gap: 38}}>
        {v.summary.map((item, i) => (
          <Appear key={i} at={sentenceStart(sentences, item.sentence)}>
            <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
              <span style={{fontSize: 44, color: theme.green}}>✔</span>
              <span style={{fontSize: 42, color: theme.text, lineHeight: 1.4}}>{item.text}</span>
            </div>
          </Appear>
        ))}
      </div>
      <Appear at={lastStart}>
        <div
          style={{
            marginTop: 70,
            backgroundColor: theme.panel,
            border: `3px solid ${theme.accent}`,
            borderRadius: 24,
            padding: '36px 48px',
            display: 'inline-block',
          }}
        >
          <div style={{fontSize: 30, color: theme.accent, fontWeight: 700, marginBottom: 10}}>
            TẬP SAU
          </div>
          <div style={{fontSize: 44, color: theme.text, fontWeight: 700}}>{v.next}</div>
        </div>
      </Appear>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 3: Đăng ký vào `registry.ts`**

Thêm import và entries — file thành:
```ts
import type React from 'react';
import type {SceneProps} from '../data/types';
import {ConceptScene} from './ConceptScene';
import {OutroScene} from './OutroScene';
import {TitleScene} from './TitleScene';

export const sceneRegistry: Record<string, React.FC<SceneProps>> = {
  title: TitleScene,
  concept: ConceptScene,
  outro: OutroScene,
};
```

- [ ] **Step 4: Thêm fixture vào `ep00.timing.json`**

Thêm 2 scene vào mảng `scenes` (sau `fx-title`):
```json
{
  "id": "fx-concept",
  "type": "concept",
  "visual": {
    "title": "NestJS giống một nhà hàng",
    "bullets": [
      {"icon": "🛎️", "text": "Controller = người phục vụ: nhận yêu cầu, trả món", "sentence": 1},
      {"icon": "👨‍🍳", "text": "Service = đầu bếp: xử lý công việc thật sự", "sentence": 2},
      {"icon": "🏠", "text": "Module = khu bếp: gom nhóm lại một chỗ", "sentence": 3}
    ]
  },
  "sentences": [
    {"file": "", "startFrame": 0, "durationInFrames": 80},
    {"file": "", "startFrame": 88, "durationInFrames": 80},
    {"file": "", "startFrame": 176, "durationInFrames": 80},
    {"file": "", "startFrame": 264, "durationInFrames": 80}
  ],
  "durationInFrames": 362
},
{
  "id": "fx-outro",
  "type": "outro",
  "visual": {
    "title": "Hẹn gặp lại!",
    "summary": [
      {"text": "NestJS = framework backend có cấu trúc", "sentence": 0},
      {"text": "Controller nhận, Service xử lý, Module gom nhóm", "sentence": 1}
    ],
    "next": "Tập 2: Microservices"
  },
  "sentences": [
    {"file": "", "startFrame": 0, "durationInFrames": 80},
    {"file": "", "startFrame": 88, "durationInFrames": 80},
    {"file": "", "startFrame": 176, "durationInFrames": 80}
  ],
  "durationInFrames": 274
}
```

- [ ] **Step 5: Typecheck + still cả 2 scene**

Run:
```bash
cd video && npx tsc --noEmit \
  && npx remotion still Preview out/fx-concept.png --frame=500 \
  && npx remotion still Preview out/fx-outro.png --frame=750
```
(frame tính từ đầu Preview: fx-concept bắt đầu 206, fx-outro 568 — frame 500 giữa concept, 750 giữa outro.)
Expected: 2 PNG; concept hiện đủ 3 bullet, outro hiện summary + card "TẬP SAU". Xem bằng Read tool.

- [ ] **Step 6: Commit**

```bash
git add video/src
git commit -m "feat: ConceptScene and OutroScene

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 7: CodeBlock + CodeScene

**Files:**
- Create: `video/src/components/CodeBlock.tsx`, `video/src/scenes/CodeScene.tsx`
- Modify: `video/src/scenes/registry.ts`, `video/src/data/ep00.timing.json`

**Interfaces:**
- Consumes: `theme`, `useSentenceIndex`, `SceneProps` (Task 5).
- Produces: registry có `code`. Visual format:
  - code: `{filename: string, language: string, code: string, steps: [{from: number, to: number, sentence: number}]}` — `from`/`to` là số dòng 1-index; step có `sentence <= câu hiện tại` thì các dòng tới `to` hiện ra; step mới nhất là vùng highlight.

- [ ] **Step 1: Viết `CodeBlock.tsx`**

```tsx
import {Highlight, themes} from 'prism-react-renderer';
import React from 'react';
import {theme} from './theme';

type Props = {
  code: string;
  language: string;
  filename?: string;
  visibleUpTo: number;          // dòng 1-index cuối cùng đang hiển thị
  highlight?: [number, number]; // vùng dòng đang nhấn mạnh
};

export const CodeBlock: React.FC<Props> = ({code, language, filename, visibleUpTo, highlight}) => (
  <div
    style={{
      backgroundColor: theme.panel,
      borderRadius: 16,
      border: `2px solid ${theme.panelBorder}`,
      overflow: 'hidden',
      fontFamily: theme.fontMono,
    }}
  >
    {filename ? (
      <div
        style={{
          padding: '14px 28px',
          borderBottom: `2px solid ${theme.panelBorder}`,
          color: theme.textDim,
          fontSize: 26,
        }}
      >
        {filename}
      </div>
    ) : null}
    <Highlight code={code.trimEnd()} language={language} theme={themes.nightOwl}>
      {({tokens, getLineProps, getTokenProps}) => (
        <pre
          style={{
            margin: 0,
            padding: '24px 28px',
            fontSize: 30,
            lineHeight: 1.65,
            backgroundColor: 'transparent',
          }}
        >
          {tokens.map((line, i) => {
            const lineNo = i + 1;
            const inHighlight =
              highlight != null && lineNo >= highlight[0] && lineNo <= highlight[1];
            const visible = lineNo <= visibleUpTo;
            return (
              <div
                key={i}
                {...getLineProps({line})}
                style={{
                  opacity: !visible ? 0 : inHighlight || highlight == null ? 1 : 0.4,
                  backgroundColor: inHighlight ? 'rgba(234, 40, 69, 0.15)' : 'transparent',
                  borderLeft: inHighlight
                    ? `6px solid ${theme.accent}`
                    : '6px solid transparent',
                  paddingLeft: 18,
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: 48,
                    color: theme.textDim,
                    opacity: 0.5,
                  }}
                >
                  {lineNo}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({token})} />
                ))}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  </div>
);
```

- [ ] **Step 2: Viết `CodeScene.tsx`**

```tsx
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {CodeBlock} from '../components/CodeBlock';
import {theme} from '../components/theme';
import {useSentenceIndex} from '../components/useSentenceIndex';
import type {SceneProps} from '../data/types';

export type CodeVisual = {
  filename: string;
  language: string;
  code: string;
  steps: {from: number; to: number; sentence: number}[];
};

export const CodeScene: React.FC<SceneProps> = ({visual, sentences}) => {
  const v = visual as CodeVisual;
  const idx = useSentenceIndex(sentences);
  const active = v.steps.filter((s) => s.sentence <= idx);
  const current = active[active.length - 1];
  const visibleUpTo = active.length > 0 ? Math.max(...active.map((s) => s.to)) : 0;
  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        fontFamily: theme.fontSans,
        padding: '80px 220px',
        justifyContent: 'center',
      }}
    >
      <CodeBlock
        code={v.code}
        language={v.language}
        filename={v.filename}
        visibleUpTo={visibleUpTo}
        highlight={current ? [current.from, current.to] : undefined}
      />
    </AbsoluteFill>
  );
};
```

- [ ] **Step 3: Đăng ký `code: CodeScene` vào `registry.ts`** (thêm import + entry như Task 6 Step 3).

- [ ] **Step 4: Thêm fixture scene vào `ep00.timing.json`**

Thêm vào mảng `scenes`:
```json
{
  "id": "fx-code",
  "type": "code",
  "visual": {
    "filename": "src/users/users.controller.ts",
    "language": "tsx",
    "code": "import { Controller, Get } from '@nestjs/common';\nimport { UsersService } from './users.service';\n\n@Controller('users')\nexport class UsersController {\n  constructor(private usersService: UsersService) {}\n\n  @Get()\n  findAll() {\n    return this.usersService.findAll();\n  }\n}",
    "steps": [
      {"from": 1, "to": 12, "sentence": 0},
      {"from": 4, "to": 4, "sentence": 1},
      {"from": 8, "to": 11, "sentence": 2}
    ]
  },
  "sentences": [
    {"file": "", "startFrame": 0, "durationInFrames": 80},
    {"file": "", "startFrame": 88, "durationInFrames": 80},
    {"file": "", "startFrame": 176, "durationInFrames": 80}
  ],
  "durationInFrames": 274
}
```

- [ ] **Step 5: Typecheck + still**

Run (fx-code bắt đầu tại frame 842 = 206+362+274; frame 940 rơi vào câu 1 — highlight dòng 4):
```bash
cd video && npx tsc --noEmit && npx remotion still Preview out/fx-code.png --frame=940
```
Expected: PNG hiện code có syntax highlight, dòng 4 (`@Controller('users')`) được viền đỏ nhấn mạnh, các dòng khác mờ. Xem bằng Read tool.

- [ ] **Step 6: Commit**

```bash
git add video/src
git commit -m "feat: CodeBlock and CodeScene with per-sentence highlight

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 8: Terminal + TerminalScene

**Files:**
- Create: `video/src/components/Terminal.tsx`, `video/src/scenes/TerminalScene.tsx`
- Modify: `video/src/scenes/registry.ts`, `video/src/data/ep00.timing.json`

**Interfaces:**
- Consumes: `theme`, `sentenceStart`, `SceneProps`.
- Produces: registry có `terminal`. Visual format:
  - terminal: `{title: string, commands: [{cmd: string, output: string, sentence: number}]}` — lệnh gõ typewriter từ đầu câu tương ứng, output hiện sau khi gõ xong.

- [ ] **Step 1: Viết `Terminal.tsx`**

```tsx
import React from 'react';
import {theme} from './theme';

export const Terminal: React.FC<{title?: string; children: React.ReactNode}> = ({
  title = 'zsh — demo-app',
  children,
}) => (
  <div
    style={{
      backgroundColor: '#0b1120',
      borderRadius: 16,
      border: `2px solid ${theme.panelBorder}`,
      overflow: 'hidden',
      fontFamily: theme.fontMono,
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '14px 24px',
        backgroundColor: theme.panel,
      }}
    >
      {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
        <div key={c} style={{width: 18, height: 18, borderRadius: 9, backgroundColor: c}} />
      ))}
      <span style={{marginLeft: 12, color: theme.textDim, fontSize: 24}}>{title}</span>
    </div>
    <div style={{padding: '28px 32px', fontSize: 30, lineHeight: 1.7}}>{children}</div>
  </div>
);
```

- [ ] **Step 2: Viết `TerminalScene.tsx`**

```tsx
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Terminal} from '../components/Terminal';
import {theme} from '../components/theme';
import {sentenceStart} from '../components/useSentenceIndex';
import type {SceneProps} from '../data/types';

export type TerminalVisual = {
  title: string;
  commands: {cmd: string; output: string; sentence: number}[];
};

const CHARS_PER_FRAME = 0.9;

export const TerminalScene: React.FC<SceneProps> = ({visual, sentences}) => {
  const v = visual as TerminalVisual;
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{backgroundColor: theme.bg, fontFamily: theme.fontSans, padding: '80px 180px'}}
    >
      <h2 style={{margin: '0 0 50px', fontSize: 64, fontWeight: 900, color: theme.text}}>
        <span style={{color: theme.accent}}>■ </span>
        {v.title}
      </h2>
      <Terminal>
        {v.commands.map((c, i) => {
          const start = sentenceStart(sentences, c.sentence);
          if (frame < start) return null;
          const typed = Math.floor((frame - start) * CHARS_PER_FRAME);
          const done = typed >= c.cmd.length;
          return (
            <div key={i} style={{marginBottom: 26}}>
              <div style={{color: theme.text}}>
                <span style={{color: theme.green, fontWeight: 700}}>➜ ~ </span>
                {c.cmd.slice(0, typed)}
                {!done ? <span>▌</span> : null}
              </div>
              {done ? (
                <div style={{color: theme.textDim, whiteSpace: 'pre-wrap', marginTop: 8}}>
                  {c.output}
                </div>
              ) : null}
            </div>
          );
        })}
      </Terminal>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 3: Đăng ký `terminal: TerminalScene` vào `registry.ts`.**

- [ ] **Step 4: Thêm fixture vào `ep00.timing.json`**

```json
{
  "id": "fx-terminal",
  "type": "terminal",
  "visual": {
    "title": "Cài đặt và tạo project",
    "commands": [
      {"cmd": "npm i -g @nestjs/cli", "output": "added 249 packages in 12s", "sentence": 0},
      {"cmd": "nest new demo-app", "output": "🚀  Successfully created project demo-app", "sentence": 1},
      {"cmd": "npm run start:dev", "output": "[Nest] LOG Nest application successfully started", "sentence": 2}
    ]
  },
  "sentences": [
    {"file": "", "startFrame": 0, "durationInFrames": 80},
    {"file": "", "startFrame": 88, "durationInFrames": 80},
    {"file": "", "startFrame": 176, "durationInFrames": 80}
  ],
  "durationInFrames": 274
}
```

- [ ] **Step 5: Typecheck + still**

Run (fx-terminal bắt đầu 1116 = 206+362+274+274; frame 1360 — cả 3 lệnh đã gõ xong):
```bash
cd video && npx tsc --noEmit && npx remotion still Preview out/fx-terminal.png --frame=1360
```
Expected: PNG khung terminal có 3 nút màu, 3 lệnh + output. Xem bằng Read tool.

- [ ] **Step 6: Commit**

```bash
git add video/src
git commit -m "feat: Terminal component and TerminalScene with typewriter effect

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 9: DiagramScene (request flow animation)

**Files:**
- Create: `video/src/scenes/DiagramScene.tsx`
- Modify: `video/src/scenes/registry.ts`, `video/src/data/ep00.timing.json`

**Interfaces:**
- Consumes: `theme`, `Appear`, `sentenceStart`, `useSentenceIndex`, `SceneProps`.
- Produces: registry có `diagram`. Visual format:
  - diagram: `{title: string, boxes: [{id: string, label: string, emoji: string}], flows: [{from: number, to: number, label: string, sentence: number}]}` — `from`/`to` là index box; `to > from` vẽ mũi tên xuôi giữa 2 box, ngược lại vẽ đường vòng phía dưới (response); mũi tên hiện từ đầu câu `sentence`, flow mới nhất có chấm chạy dọc đường.

- [ ] **Step 1: Viết `DiagramScene.tsx`**

```tsx
import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Appear} from '../components/Appear';
import {theme} from '../components/theme';
import {sentenceStart, useSentenceIndex} from '../components/useSentenceIndex';
import type {SceneProps} from '../data/types';

export type DiagramVisual = {
  title: string;
  boxes: {id: string; label: string; emoji: string}[];
  flows: {from: number; to: number; label: string; sentence: number}[];
};

const BOX_W = 380;
const BOX_H = 240;
const TOP = 430;
const MARGIN = 150;

export const DiagramScene: React.FC<SceneProps> = ({visual, sentences}) => {
  const v = visual as DiagramVisual;
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const idx = useSentenceIndex(sentences);
  const n = v.boxes.length;
  const gap = (1920 - 2 * MARGIN - n * BOX_W) / Math.max(n - 1, 1);
  const xOf = (i: number) => MARGIN + i * (BOX_W + gap);
  const midY = TOP + BOX_H / 2;
  const active = v.flows.filter((f) => f.sentence <= idx);
  const currentFlow = active[active.length - 1];

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg, fontFamily: theme.fontSans}}>
      <h2
        style={{
          position: 'absolute',
          top: 110,
          width: '100%',
          textAlign: 'center',
          fontSize: 60,
          fontWeight: 900,
          color: theme.text,
          margin: 0,
        }}
      >
        {v.title}
      </h2>
      {v.boxes.map((b, i) => (
        <div key={b.id} style={{position: 'absolute', left: xOf(i), top: TOP}}>
          <Appear at={0} dy={24}>
            <div
              style={{
                width: BOX_W,
                height: BOX_H,
                backgroundColor: theme.panel,
                border: `3px solid ${theme.panelBorder}`,
                borderRadius: 24,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <span style={{fontSize: 70}}>{b.emoji}</span>
              <span style={{fontSize: 38, fontWeight: 700, color: theme.text}}>{b.label}</span>
            </div>
          </Appear>
        </div>
      ))}
      <svg
        width={1920}
        height={1080}
        style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}
      >
        {v.flows.map((f, i) => {
          const start = sentenceStart(sentences, f.sentence);
          const p = spring({frame: frame - start, fps, config: {damping: 200}});
          if (p <= 0.01) return null;
          const forward = f.to > f.from;
          const isCurrent = currentFlow === f;
          // vị trí chấm chạy trên đường (0..1, lặp mỗi 1.4s)
          const t = ((frame - start) / (fps * 1.4)) % 1;
          if (forward) {
            const x1 = xOf(f.from) + BOX_W;
            const x2 = xOf(f.to);
            const xTip = x1 + (x2 - x1) * p;
            return (
              <g key={i} opacity={p}>
                <line x1={x1} y1={midY} x2={xTip} y2={midY} stroke={theme.blue} strokeWidth={6} />
                <polygon
                  points={`${xTip},${midY - 14} ${xTip},${midY + 14} ${xTip + 22},${midY}`}
                  fill={theme.blue}
                />
                <text
                  x={(x1 + x2) / 2}
                  y={midY - 30}
                  textAnchor="middle"
                  fill={theme.blue}
                  fontSize={30}
                  fontWeight={700}
                  fontFamily={theme.fontMono}
                >
                  {f.label}
                </text>
                {isCurrent ? (
                  <circle cx={x1 + (x2 - x1) * t} cy={midY} r={11} fill={theme.yellow} />
                ) : null}
              </g>
            );
          }
          // đường trả về: vòng phía dưới các box
          const x1 = xOf(f.from) + BOX_W / 2;
          const x2 = xOf(f.to) + BOX_W / 2;
          const yBottom = TOP + BOX_H;
          const yLow = yBottom + 170;
          const path = `M ${x1} ${yBottom} L ${x1} ${yLow} L ${x2} ${yLow} L ${x2} ${yBottom + 26}`;
          return (
            <g key={i} opacity={p}>
              <path
                d={path}
                fill="none"
                stroke={theme.green}
                strokeWidth={6}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - p}
              />
              <polygon
                points={`${x2 - 14},${yBottom + 30} ${x2 + 14},${yBottom + 30} ${x2},${yBottom + 6}`}
                fill={theme.green}
                opacity={p > 0.95 ? 1 : 0}
              />
              <text
                x={(x1 + x2) / 2}
                y={yLow + 44}
                textAnchor="middle"
                fill={theme.green}
                fontSize={30}
                fontWeight={700}
                fontFamily={theme.fontMono}
              >
                {f.label}
              </text>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 2: Đăng ký `diagram: DiagramScene` vào `registry.ts`.**

- [ ] **Step 3: Thêm fixture vào `ep00.timing.json`**

```json
{
  "id": "fx-diagram",
  "type": "diagram",
  "visual": {
    "title": "Một request đi qua NestJS như thế nào?",
    "boxes": [
      {"id": "client", "label": "Client", "emoji": "📱"},
      {"id": "controller", "label": "Controller", "emoji": "🛎️"},
      {"id": "service", "label": "Service", "emoji": "👨‍🍳"}
    ],
    "flows": [
      {"from": 0, "to": 1, "label": "GET /users", "sentence": 1},
      {"from": 1, "to": 2, "label": "gọi hàm", "sentence": 2},
      {"from": 2, "to": 0, "label": "JSON", "sentence": 3}
    ]
  },
  "sentences": [
    {"file": "", "startFrame": 0, "durationInFrames": 80},
    {"file": "", "startFrame": 88, "durationInFrames": 80},
    {"file": "", "startFrame": 176, "durationInFrames": 80},
    {"file": "", "startFrame": 264, "durationInFrames": 80}
  ],
  "durationInFrames": 362
}
```

- [ ] **Step 4: Typecheck + still 2 thời điểm**

Run (fx-diagram bắt đầu 1390 = 206+362+274+274+274; frame 1520 giữa câu 1, frame 1700 sau câu 3):
```bash
cd video && npx tsc --noEmit \
  && npx remotion still Preview out/fx-diagram-mid.png --frame=1520 \
  && npx remotion still Preview out/fx-diagram-full.png --frame=1700
```
Expected: mid — 3 box + mũi tên xanh "GET /users" có chấm vàng; full — đủ 2 mũi tên xuôi + đường JSON vòng dưới về Client. Xem bằng Read tool.

- [ ] **Step 5: Commit**

```bash
git add video/src
git commit -m "feat: DiagramScene with animated request flow

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 10: demo-app NestJS thật

**Files:**
- Create: `demo-app/` (NestJS CLI sinh) + `demo-app/src/users/users.controller.ts`, `demo-app/src/users/users.service.ts`, `demo-app/src/users/users.module.ts`

**Interfaces:**
- Produces: API `GET /users` chạy được tại cổng 3000 — nguồn code trích cho kịch bản Task 11 (code trong video phải khớp code chạy thật này).

- [ ] **Step 1: Tạo project**

Run: `cd /Users/lee/Project/Apps/tutorial && npx -y @nestjs/cli@latest new demo-app --package-manager npm --skip-git --language TS`
Expected: thư mục `demo-app/` với `src/app.module.ts`, cài đặt xong.

- [ ] **Step 2: Generate users module/controller/service**

Run: `cd demo-app && npx nest g module users && npx nest g controller users --no-spec && npx nest g service users --no-spec`
Expected: `src/users/` có 3 file, `users.module.ts` tự thêm vào `AppModule`, controller/service tự khai báo trong `UsersModule`.

- [ ] **Step 3: Viết nội dung controller và service**

`demo-app/src/users/users.controller.ts`:
```ts
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
```

`demo-app/src/users/users.service.ts`:
```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Minh' },
    { id: 2, name: 'Lan' },
  ];

  findAll() {
    return this.users;
  }
}
```

- [ ] **Step 4: Chạy và gọi thử API**

Run:
```bash
cd demo-app && npm run build && (npm run start &) && sleep 5 && curl -s http://localhost:3000/users; kill %1 2>/dev/null || pkill -f "node dist/main"
```
Expected: curl in `[{"id":1,"name":"Minh"},{"id":2,"name":"Lan"}]`.

- [ ] **Step 5: Commit**

```bash
git add demo-app
git commit -m "feat: real NestJS demo-app with GET /users (source of truth for ep01 code)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 11: Kịch bản Tập 1 — `tts/scripts/ep01.json`

**Files:**
- Create: `tts/scripts/ep01.json`

**Interfaces:**
- Consumes: visual formats của các scene (Task 5–9), code thật từ demo-app (Task 10), validate rules (Task 3).
- Produces: kịch bản 11 scene hoàn chỉnh cho Task 12.

- [ ] **Step 1: Viết `tts/scripts/ep01.json`** (nội dung đầy đủ — narration là MẢNG CÂU, mỗi câu ≤200 ký tự)

```json
[
  {
    "id": "scene-01",
    "type": "title",
    "narration": [
      "Xin chào các bạn, chào mừng đến với series NestJS cho người mới bắt đầu.",
      "Trong tập đầu tiên, chúng ta sẽ tìm hiểu NestJS là gì, và cùng nhau tạo API đầu tiên chỉ trong vài phút."
    ],
    "visual": {
      "title": "NestJS cho người mới bắt đầu",
      "subtitle": "Tập 1 · NestJS là gì? Tạo project đầu tiên",
      "badge": "Series Backend Realtime"
    }
  },
  {
    "id": "scene-02",
    "type": "concept",
    "narration": [
      "NestJS là một framework giúp bạn xây dựng phần backend, tức là phần máy chủ, cho ứng dụng Node.js.",
      "Nó dùng TypeScript, một phiên bản JavaScript có kiểm tra kiểu dữ liệu, giúp code rõ ràng và ít lỗi hơn.",
      "Điểm đặc biệt nhất: NestJS cho bạn một cấu trúc sẵn, giống như một bản thiết kế nhà, bạn chỉ việc xây theo."
    ],
    "visual": {
      "title": "NestJS là gì?",
      "bullets": [
        {"icon": "🧱", "text": "Framework xây dựng backend cho Node.js", "sentence": 0},
        {"icon": "🔷", "text": "Viết bằng TypeScript — code rõ ràng, ít lỗi hơn", "sentence": 1},
        {"icon": "📐", "text": "Có cấu trúc sẵn — như một bản thiết kế nhà", "sentence": 2}
      ]
    }
  },
  {
    "id": "scene-03",
    "type": "concept",
    "narration": [
      "Bạn có thể đã nghe tới Express, một thư viện rất phổ biến. Express tự do, nhưng khi dự án lớn dần, code rất dễ lộn xộn.",
      "NestJS thì ngược lại: mọi thứ đều có chỗ của nó, ai vào dự án cũng biết code nằm ở đâu.",
      "NestJS còn tích hợp sẵn rất nhiều thứ: microservices, WebSocket, kiểm tra dữ liệu... mà chúng ta sẽ dùng trong các tập sau.",
      "Vì vậy rất nhiều công ty lớn chọn NestJS cho sản phẩm của họ."
    ],
    "visual": {
      "title": "Vì sao chọn NestJS?",
      "bullets": [
        {"icon": "🌀", "text": "Express: tự do nhưng dễ lộn xộn khi dự án lớn", "sentence": 0},
        {"icon": "🗂️", "text": "NestJS: mọi thứ có chỗ của nó", "sentence": 1},
        {"icon": "🔌", "text": "Tích hợp sẵn: microservices, WebSocket, validation...", "sentence": 2},
        {"icon": "🏢", "text": "Được nhiều công ty lớn tin dùng", "sentence": 3}
      ]
    }
  },
  {
    "id": "scene-04",
    "type": "concept",
    "narration": [
      "Hãy tưởng tượng ứng dụng của bạn là một nhà hàng.",
      "Controller giống người phục vụ: nhận yêu cầu từ khách, và mang món ăn ra.",
      "Service giống đầu bếp: nơi thực sự chế biến, xử lý công việc.",
      "Còn Module là một khu bếp: gom người phục vụ và đầu bếp cùng nhóm lại một chỗ."
    ],
    "visual": {
      "title": "NestJS giống một nhà hàng 🍜",
      "bullets": [
        {"icon": "🛎️", "text": "Controller = người phục vụ: nhận yêu cầu, trả món", "sentence": 1},
        {"icon": "👨‍🍳", "text": "Service = đầu bếp: xử lý công việc thật sự", "sentence": 2},
        {"icon": "🏠", "text": "Module = khu bếp: gom nhóm lại một chỗ", "sentence": 3}
      ]
    }
  },
  {
    "id": "scene-05",
    "type": "diagram",
    "narration": [
      "Giờ hãy xem một yêu cầu đi qua NestJS như thế nào nhé.",
      "Đầu tiên, client, ví dụ trình duyệt hay app điện thoại, gửi yêu cầu GET /users đến Controller.",
      "Controller không tự xử lý, nó chuyển việc cho Service, giống người phục vụ đưa order vào bếp.",
      "Service xử lý xong, dữ liệu được trả ngược về client dưới dạng JSON. Đơn giản vậy thôi!"
    ],
    "visual": {
      "title": "Một request đi qua NestJS như thế nào?",
      "boxes": [
        {"id": "client", "label": "Client", "emoji": "📱"},
        {"id": "controller", "label": "Controller", "emoji": "🛎️"},
        {"id": "service", "label": "Service", "emoji": "👨‍🍳"}
      ],
      "flows": [
        {"from": 0, "to": 1, "label": "GET /users", "sentence": 1},
        {"from": 1, "to": 2, "label": "gọi hàm", "sentence": 2},
        {"from": 2, "to": 0, "label": "JSON", "sentence": 3}
      ]
    }
  },
  {
    "id": "scene-06",
    "type": "terminal",
    "narration": [
      "Lý thuyết đủ rồi, giờ mình bắt tay vào làm nhé. Bạn chỉ cần cài sẵn Node.js trên máy.",
      "Đầu tiên, cài công cụ dòng lệnh của NestJS bằng lệnh npm i -g @nestjs/cli.",
      "Sau đó chạy nest new demo-app để tạo project mới. NestJS sẽ tự tạo toàn bộ khung sẵn cho bạn.",
      "Vào thư mục demo-app và chạy npm run start:dev. Vậy là server đã chạy ở cổng ba nghìn!"
    ],
    "visual": {
      "title": "Cài đặt và tạo project",
      "commands": [
        {"cmd": "npm i -g @nestjs/cli", "output": "added 249 packages in 12s", "sentence": 1},
        {"cmd": "nest new demo-app", "output": "⚡ Installation in progress...\n🚀 Successfully created project demo-app", "sentence": 2},
        {"cmd": "cd demo-app && npm run start:dev", "output": "[Nest] LOG [NestApplication] Nest application successfully started\n[Nest] LOG Listening on http://localhost:3000", "sentence": 3}
      ]
    }
  },
  {
    "id": "scene-07",
    "type": "code",
    "narration": [
      "Mở project ra, file quan trọng nhất là app.module.ts, chính là khu bếp trung tâm của nhà hàng.",
      "Trên cùng là các dòng import, đưa những thứ cần dùng vào file.",
      "Decorator @Module khai báo khu bếp này có gì: controllers là danh sách người phục vụ, providers là danh sách đầu bếp.",
      "Mỗi ứng dụng NestJS đều bắt đầu từ một module gốc như thế này."
    ],
    "visual": {
      "filename": "src/app.module.ts",
      "language": "tsx",
      "code": "import { Module } from '@nestjs/common';\nimport { AppController } from './app.controller';\nimport { AppService } from './app.service';\n\n@Module({\n  imports: [],\n  controllers: [AppController],\n  providers: [AppService],\n})\nexport class AppModule {}",
      "steps": [
        {"from": 1, "to": 10, "sentence": 0},
        {"from": 1, "to": 3, "sentence": 1},
        {"from": 5, "to": 9, "sentence": 2},
        {"from": 10, "to": 10, "sentence": 3}
      ]
    }
  },
  {
    "id": "scene-08",
    "type": "code",
    "narration": [
      "Giờ mình tạo người phục vụ đầu tiên: UsersController, phụ trách đường dẫn /users.",
      "Decorator @Controller users nghĩa là: mọi yêu cầu bắt đầu bằng /users sẽ do class này tiếp nhận.",
      "Trong constructor, mình xin một đầu bếp UsersService. NestJS tự động đưa vào, gọi là dependency injection.",
      "@Get đánh dấu hàm findAll: khi có yêu cầu GET /users, hàm này chạy và nhờ Service trả về danh sách."
    ],
    "visual": {
      "filename": "src/users/users.controller.ts",
      "language": "tsx",
      "code": "import { Controller, Get } from '@nestjs/common';\nimport { UsersService } from './users.service';\n\n@Controller('users')\nexport class UsersController {\n  constructor(private usersService: UsersService) {}\n\n  @Get()\n  findAll() {\n    return this.usersService.findAll();\n  }\n}",
      "steps": [
        {"from": 1, "to": 12, "sentence": 0},
        {"from": 4, "to": 4, "sentence": 1},
        {"from": 6, "to": 6, "sentence": 2},
        {"from": 8, "to": 11, "sentence": 3}
      ]
    }
  },
  {
    "id": "scene-09",
    "type": "code",
    "narration": [
      "Tiếp theo là đầu bếp: UsersService.",
      "Decorator @Injectable đánh dấu class này có thể được tiêm vào nơi khác, như vào Controller lúc nãy.",
      "Ở đây mình để sẵn một danh sách người dùng đơn giản, chưa cần tới database.",
      "Hàm findAll chỉ việc trả về danh sách đó. Người phục vụ hỏi, đầu bếp đưa món."
    ],
    "visual": {
      "filename": "src/users/users.service.ts",
      "language": "tsx",
      "code": "import { Injectable } from '@nestjs/common';\n\n@Injectable()\nexport class UsersService {\n  private users = [\n    { id: 1, name: 'Minh' },\n    { id: 2, name: 'Lan' },\n  ];\n\n  findAll() {\n    return this.users;\n  }\n}",
      "steps": [
        {"from": 1, "to": 13, "sentence": 0},
        {"from": 3, "to": 3, "sentence": 1},
        {"from": 5, "to": 8, "sentence": 2},
        {"from": 10, "to": 12, "sentence": 3}
      ]
    }
  },
  {
    "id": "scene-10",
    "type": "terminal",
    "narration": [
      "Khoảnh khắc sự thật: gọi thử API xem sao.",
      "Mình dùng curl gọi GET /users... và đây rồi: danh sách người dùng trả về dưới dạng JSON.",
      "Nhìn lại nhà hàng của mình: khách gọi món, người phục vụ Controller nhận, đầu bếp Service chuẩn bị, và món ăn JSON được mang ra.",
      "Bạn vừa xây xong API NestJS đầu tiên rồi đấy!"
    ],
    "visual": {
      "title": "Chạy thử! 🎉",
      "commands": [
        {"cmd": "curl http://localhost:3000/users", "output": "[{\"id\":1,\"name\":\"Minh\"},{\"id\":2,\"name\":\"Lan\"}]", "sentence": 1}
      ]
    }
  },
  {
    "id": "scene-11",
    "type": "outro",
    "narration": [
      "Tóm lại, hôm nay bạn đã biết NestJS là framework backend có cấu trúc, viết bằng TypeScript.",
      "Kiến trúc của nó xoay quanh ba nhân vật: Controller nhận yêu cầu, Service xử lý, Module gom chúng thành nhóm.",
      "Và bạn đã tự tay tạo project cùng API đầu tiên của mình.",
      "Ở tập sau, chúng ta sẽ chia nhà hàng này thành cả một chuỗi cửa hàng: đó chính là microservices. Hẹn gặp lại các bạn!"
    ],
    "visual": {
      "title": "Hẹn gặp lại! 👋",
      "summary": [
        {"text": "NestJS = framework backend có cấu trúc, dùng TypeScript", "sentence": 0},
        {"text": "Controller nhận request, Service xử lý, Module gom nhóm", "sentence": 1},
        {"text": "Tạo project với nest new, API đầu tiên với @Controller và @Get", "sentence": 2}
      ],
      "next": "Tập 2: Microservices — chia nhà hàng thành chuỗi cửa hàng"
    }
  }
]
```

- [ ] **Step 2: Validate kịch bản (không sinh audio)**

Run:
```bash
cd tts && .venv/bin/python -c "
import json, generate
script = json.loads(open('scripts/ep01.json', encoding='utf-8').read())
errors = generate.validate_script(script)
print(errors if errors else 'OK: kịch bản hợp lệ,', len(script), 'scenes')
assert not errors
"
```
Expected: `OK: kịch bản hợp lệ, 11 scenes`.

- [ ] **Step 3: Commit**

```bash
git add tts/scripts/ep01.json
git commit -m "feat: full Vietnamese script for episode 1 (11 scenes)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 12: Sinh toàn bộ audio Tập 1 + kiểm tra

**Files:**
- Modify (generated): `video/src/data/ep01.timing.json` (ghi đè placeholder — commit)
- Create (not committed): `video/public/audio/ep01/*.wav` (41 file)

**Interfaces:**
- Consumes: `generate.py` (Task 3), `ep01.json` (Task 11).
- Produces: timing + audio thật cho render Task 13.

- [ ] **Step 1: Chạy generate cho ep01**

Run: `cd tts && .venv/bin/python generate.py ep01`
Expected: sinh 41 wav, kết thúc `OK: 11 scene, N frames (~Xs)`. Ghi lại tổng thời lượng X.

- [ ] **Step 2: Kiểm tra thời lượng tổng**

Nếu tổng < 300s (~5 phút): chấp nhận được nhưng báo lại người dùng ở checkpoint Task 13 (có thể bổ sung câu cho tập sau). Nếu có wav nào duration < 0.5s hoặc > 30s → nghe lại câu đó, khả năng TTS lỗi → sửa câu trong `ep01.json` (viết lại từ tiếng Anh khó đọc thành phiên âm, ví dụ "curl" → "cơ-rồ" nếu cần) và chạy lại generate (cache giữ các câu không đổi).

Run kiểm tra nhanh:
```bash
cd tts && .venv/bin/python -c "
import json
t = json.load(open('../video/src/data/ep01.timing.json', encoding='utf-8'))
total = sum(s['durationInFrames'] for s in t['scenes'])
print(f'Tổng: {total/30:.1f}s')
for s in t['scenes']:
    for sen in s['sentences']:
        d = sen['durationInFrames']/30
        assert 0.5 < d < 30, f\"{s['id']} {sen['file']}: {d}s bất thường\"
print('Tất cả câu có duration hợp lý')
"
```
Expected: in tổng thời lượng, `Tất cả câu có duration hợp lý`.

- [ ] **Step 3: Nghe xác suất 3 scene (đầu, giữa, cuối)**

Run: `afplay` lần lượt 1 wav của scene-01, scene-07, scene-11. Expected: đọc rõ, thuật ngữ tiếng Anh (NestJS, Controller, TypeScript) nghe chấp nhận được. Nếu từ nào đọc sai nghiêm trọng → sửa phiên âm trong `ep01.json`, chạy lại generate, nghe lại.

- [ ] **Step 4: Commit**

```bash
git add video/src/data/ep01.timing.json
git commit -m "feat: generated TTS audio timing for episode 1

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 13: Render nháp → duyệt → render final

**Files:**
- Create (not committed): `video/out/ep01-draft.mp4`, `video/out/ep01.mp4`

**Interfaces:**
- Consumes: mọi thứ từ Task 5–12.
- Produces: `video/out/ep01.mp4` — sản phẩm cuối.

- [ ] **Step 1: Render bản nháp (nửa độ phân giải, nhanh)**

Run: `cd video && npx remotion render Episode01 out/ep01-draft.mp4 --scale=0.5 --crf=30`
Expected: render hoàn tất không lỗi (mọi wav được tìm thấy).

- [ ] **Step 2: Tự kiểm tra bản nháp**

- Kiểm tra file có audio track: `afinfo out/ep01-draft.mp4 | head -20` — thấy định dạng audio.
- Trích 4 frame kiểm tra hình ở các mốc scene (dùng timing.json tính frame giữa scene 2, 5, 8, 10): `npx remotion still Episode01 out/check-N.png --frame=<frame>` và xem bằng Read tool: chữ không tràn khung, bullet/highlight đúng nhịp.

- [ ] **Step 3: CHECKPOINT — gửi bản nháp cho người dùng duyệt**

SendUserFile `out/ep01-draft.mp4` + báo tổng thời lượng. **Chờ phản hồi.** Nếu người dùng muốn sửa (lời thoại, màu, tốc độ): sửa `ep01.json`/component → chạy lại generate (cache) → render nháp lại.

- [ ] **Step 4: Render final 1080p**

Run: `cd video && npx remotion render Episode01 out/ep01.mp4`
Expected: MP4 1920×1080 hoàn chỉnh.

- [ ] **Step 5: Xác minh final và gửi người dùng**

Run: `ls -lh out/ep01.mp4 && afinfo out/ep01.mp4 | head -20`
Expected: file tồn tại, có audio track, kích thước hợp lý (>10MB). SendUserFile bản final.

- [ ] **Step 6: Commit cuối**

```bash
git add -A
git commit -m "feat: episode 1 final render pipeline complete

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

## Self-Review Notes

- **Spec coverage:** pipeline (T1–T5), scene components + theme (T5–T9), demo-app (T10), kịch bản 11 scene đúng dàn ý spec (T11), generate + render + nghiệm thu (T12–T13). Nhạc nền là "tùy chọn, không chặn tiến độ" trong spec — bỏ qua ở plan này, có thể thêm sau khi có file nhạc sạch bản quyền.
- **Type consistency:** timing JSON format thống nhất giữa `build_timing` (T3), `types.ts` (T5) và fixtures; `sentenceStart`/`useSentenceIndex` dùng chung; visual formats ở T11 khớp từng scene component T5–T9.
- **Adaptive points (không phải placeholder):** tên giọng preset lấy từ output thật của `list_preset_voices()` (T1/T2); frame còn tùy duration audio thật (T12) — các lệnh still ở T13 tính từ timing.json thật.
