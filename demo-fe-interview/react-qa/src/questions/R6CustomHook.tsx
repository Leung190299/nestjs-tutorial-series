import {useEffect, useState} from 'react';

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);
  return debounced;
}

export function R6CustomHook() {
  const [value, setValue] = useState('');
  const debounced = useDebouncedValue(value, 500);

  return (
    <div style={{border: '1px solid #ddd', borderRadius: 8, padding: 16}}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="gõ liên tục để thấy độ trễ..."
        style={{width: '100%'}}
      />
      <p>
        Giá trị tức thời: <b>"{value}"</b>
      </p>
      <p>
        Giá trị debounce (500ms sau khi ngừng gõ): <b>"{debounced}"</b>
      </p>
      <p style={{color: '#666', fontSize: 13}}>
        Mỗi ký tự gõ hủy (cleanup) timer cũ và đặt timer mới; chỉ khi ngừng gõ 500ms, timer mới
        chạy xong và debounced mới cập nhật theo.
      </p>
    </div>
  );
}
