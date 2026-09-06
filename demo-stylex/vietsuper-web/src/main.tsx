import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './stylex.css'
import App from './App.tsx'

// Dev-only: nạp virtual module runtime của @stylexjs/unplugin để CSS được
// hot-reload đúng cách khi entrypoint là component React (không phải HTML
// tĩnh). Runtime này tự fetch `/virtual:stylex.css` và inject vào 1 thẻ
// <style> — không cần thêm <link rel="stylesheet"> tĩnh trong index.html
// (README @stylexjs/unplugin: virtual:stylex:runtime). Bọc trong
// import.meta.env.DEV để không bundle vào production.
if (import.meta.env.DEV) {
  import('virtual:stylex:runtime')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
