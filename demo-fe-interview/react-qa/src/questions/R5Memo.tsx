import {memo, useMemo, useRef, useState} from 'react';

const ExpensiveChild = memo(function ExpensiveChild({config, label}: {config: {tag: string}; label: string}) {
  const renderCount = useRef(0);
  renderCount.current += 1;
  return (
    <div style={{border: '1px dashed #aaa', borderRadius: 8, padding: 12, flex: 1}}>
      <b>{label}</b>
      <p>Số lần con render: {renderCount.current}</p>
      <p style={{color: '#666', fontSize: 13}}>tag = {config.tag}</p>
    </div>
  );
});

export function R5Memo() {
  const [tick, setTick] = useState(0);
  const memoConfig = useMemo(() => ({tag: 'ổn định'}), []);

  return (
    <div style={{border: '1px solid #ddd', borderRadius: 8, padding: 16}}>
      <button onClick={() => setTick((t) => t + 1)}>Re-render cha — object literal mới (memo vô dụng)</button>{' '}
      <button onClick={() => setTick((t) => t + 1)}>Re-render cha — object useMemo (memo hoạt động)</button>
      <p style={{color: '#666', fontSize: 13, marginTop: 8}}>Cha đã re-render {tick} lần.</p>
      <div style={{display: 'flex', gap: 16, marginTop: 8, flexWrap: 'wrap'}}>
        <ExpensiveChild label="Object literal mới mỗi render — SAI" config={{tag: `render #${tick}`}} />
        <ExpensiveChild label="Object useMemo — ĐÚNG" config={memoConfig} />
      </div>
    </div>
  );
}
