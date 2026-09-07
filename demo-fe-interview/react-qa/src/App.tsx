import {questions} from './questions';

export default function App() {
  const q = new URLSearchParams(window.location.search).get('q') ?? '';
  const item = questions.find((x) => x.id === q);
  if (!item) {
    return (
      <main style={{fontFamily: 'system-ui', padding: 32}}>
        <h1>Phỏng vấn React — ví dụ chạy thật</h1>
        <ul>
          {questions.map((x) => (
            <li key={x.id}>
              <a href={`/?q=${x.id}`}>{x.id.toUpperCase()} — {x.title}</a>
            </li>
          ))}
        </ul>
      </main>
    );
  }
  const C = item.component;
  return (
    <main style={{fontFamily: 'system-ui', padding: 32, maxWidth: 720, margin: '0 auto'}}>
      <h1 style={{fontSize: 22}}>{item.id.toUpperCase()} — {item.title}</h1>
      <p style={{color: '#666'}}>{item.hint}</p>
      <C />
    </main>
  );
}
