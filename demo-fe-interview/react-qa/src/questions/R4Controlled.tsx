import {useRef, useState} from 'react';

export function R4Controlled() {
  const [controlledValue, setControlledValue] = useState('');
  const uncontrolledRef = useRef<HTMLInputElement>(null);
  const [uncontrolledRead, setUncontrolledRead] = useState('(chưa đọc)');

  return (
    <div style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
      <div style={{border: '1px solid #ddd', borderRadius: 8, padding: 16, flex: 1}}>
        <b>Controlled — value + onChange</b>
        <p>
          <input
            value={controlledValue}
            onChange={(e) => setControlledValue(e.target.value)}
            placeholder="gõ vào đây..."
          />
        </p>
        <p>State hiện tại (live): "{controlledValue}"</p>
        <button onClick={() => setControlledValue((v) => v.toUpperCase())}>UPPERCASE</button>
      </div>
      <div style={{border: '1px solid #ddd', borderRadius: 8, padding: 16, flex: 1}}>
        <b>Uncontrolled — defaultValue + ref</b>
        <p>
          <input ref={uncontrolledRef} defaultValue="" placeholder="gõ vào đây..." />
        </p>
        <p>Giá trị đã đọc: "{uncontrolledRead}"</p>
        <button onClick={() => setUncontrolledRead(uncontrolledRef.current?.value ?? '')}>
          Lấy giá trị
        </button>
      </div>
    </div>
  );
}
