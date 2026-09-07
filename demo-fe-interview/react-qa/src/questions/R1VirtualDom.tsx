import {useRef, useState} from 'react';

export function R1VirtualDom() {
  const [count, setCount] = useState(0);
  const staticRef = useRef<HTMLSpanElement>(null);
  const mountedAt = useRef<number | null>(null);

  if (mountedAt.current === null) {
    mountedAt.current = performance.now();
  }

  return (
    <div style={{border: '1px solid #ddd', borderRadius: 8, padding: 16}}>
      <button onClick={() => setCount((c) => c + 1)}>Re-render (count = {count})</button>
      <div style={{display: 'flex', gap: 16, marginTop: 16, flexWrap: 'wrap'}}>
        <div style={{border: '1px dashed #aaa', borderRadius: 8, padding: 12, flex: 1}}>
          <b>Ô tĩnh — DOM node KHÔNG đổi</b>
          <p>
            Mounted lúc: <span ref={staticRef}>{mountedAt.current.toFixed(2)}</span> ms
          </p>
          <p style={{color: '#666', fontSize: 13}}>
            Con số này không đổi qua mỗi lần re-render — chứng tỏ React không hủy/tạo lại node,
            chỉ diff cây Virtual DOM rồi patch đúng chỗ thay đổi.
          </p>
        </div>
        <div style={{border: '1px dashed #aaa', borderRadius: 8, padding: 12, flex: 1}}>
          <b>Ô động — theo counter</b>
          <p style={{fontSize: 24}}>{count}</p>
          <p style={{color: '#666', fontSize: 13}}>Chỉ text node này được vá lại mỗi lần click.</p>
        </div>
      </div>
    </div>
  );
}
