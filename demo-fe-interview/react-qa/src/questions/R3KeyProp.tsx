import {useState} from 'react';

const initial = ['Phở bò', 'Bánh mì', 'Cơm tấm'];

function List({useIndex}: {useIndex: boolean}) {
  const [items, setItems] = useState(initial);
  return (
    <div style={{border: '1px solid #ddd', borderRadius: 8, padding: 16, flex: 1}}>
      <b>{useIndex ? 'key={index} — SAI' : 'key={item} — ĐÚNG'}</b>
      {items.map((item, i) => (
        <div key={useIndex ? i : item} style={{display: 'flex', gap: 8, marginTop: 8}}>
          <span style={{width: 90}}>{item}</span>
          <input placeholder="ghi chú..." />
          <button onClick={() => setItems(items.filter((x) => x !== item))}>Xóa</button>
        </div>
      ))}
    </div>
  );
}

export function R3KeyProp() {
  return (
    <div style={{display: 'flex', gap: 16}}>
      <List useIndex />
      <List useIndex={false} />
    </div>
  );
}
