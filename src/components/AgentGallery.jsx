import React from 'react'
import { useAgentImages } from '../hooks/useAgentImages'

export default function AgentGallery({ agentId, thumbWidth = 160 }) {
  const imgs = useAgentImages(agentId)
  if (!imgs || imgs.length === 0) return <div>No images for {agentId}</div>
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {imgs.map((src) => (
        <img key={src} src={src} alt={agentId} width={thumbWidth} style={{ borderRadius: 6 }} />
      ))}
    </div>
  )
}
