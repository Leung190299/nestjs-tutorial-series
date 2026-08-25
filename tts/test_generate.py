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
