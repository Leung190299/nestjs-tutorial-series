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
    # list_preset_voices() trả về list các tuple (label, short_name);
    # so khớp CANDIDATES theo short_name.
    available_names = [name for _, name in available]
    for voice in CANDIDATES:
        if voice not in available_names:
            print(f"Bỏ qua (không có): {voice}")
            continue
        audio = tts.infer(SAMPLE, voice=voice)
        path = out / f"{voice.replace(' ', '_')}.wav"
        tts.save(audio, str(path))
        print("->", path)

if __name__ == "__main__":
    main()
