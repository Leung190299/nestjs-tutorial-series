import {useCallback, useEffect, useState} from 'react';

function Child({count, log}: {count: number; log: (line: string) => void}) {
  useEffect(() => {
    log(`effect chạy — count = ${count}`);
    return () => log(`cleanup chạy (trước lần sau / khi unmount) — count = ${count}`);
  }, [count, log]);
  return <p>Con đang mount, count = {count}</p>;
}

export function R2Effects() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(true);
  const [lines, setLines] = useState<string[]>([]);
  const log = useCallback((line: string) => setLines((prev) => [...prev, line]), []);

  return (
    <div style={{border: '1px solid #ddd', borderRadius: 8, padding: 16}}>
      <button onClick={() => setCount((c) => c + 1)}>Tăng count (= {count})</button>{' '}
      <button onClick={() => setMounted((m) => !m)}>{mounted ? 'Tắt component con' : 'Bật component con'}</button>{' '}
      <button onClick={() => setLines([])}>Xóa log</button>
      <div style={{marginTop: 12}}>{mounted && <Child count={count} log={log} />}</div>
      <p style={{color: '#666', fontSize: 13}}>
        effect luôn chạy SAU render; cleanup của lần trước chạy TRƯỚC effect của lần sau, và chạy khi unmount.
      </p>
      <pre style={{background: '#f5f5f5', padding: 12, borderRadius: 8, minHeight: 120, whiteSpace: 'pre-wrap'}}>
        {lines.length === 0 ? '(chưa có log)' : lines.join('\n')}
      </pre>
    </div>
  );
}
