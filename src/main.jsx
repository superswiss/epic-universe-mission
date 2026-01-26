import React from 'react'
import { createRoot } from 'react-dom/client'
import EpicUniverseMissionBrief from './EpicUniverseMissionBrief'

function App() {
  return <EpicUniverseMissionBrief />
}

const rootEl = document.getElementById('root')
if (rootEl) {
  const root = createRoot(rootEl)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  console.error('Mount element #root not found')
}
