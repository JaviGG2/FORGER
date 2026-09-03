import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Este archivo solo "empieza" la aplicación:
// busca el elemento <div id="root"> que está en index.html
// y dibuja dentro a <App />
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)