import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import ReactDOM from 'react-dom/client';
import { createRoot } from "react-dom/client"
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from "recoil"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <RecoilRoot>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecoilRoot>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
