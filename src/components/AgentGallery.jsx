import React from 'react';

const IMAGE_MAP = {
  karkian: ['drkarkian_1-83b9af25.png', 'drkarkian_2-357e6861.png'],
  moose: ['moose_1-782e3ed6.png', 'moose_2-3a77b479.png'],
  tbone: ['tbone_1-c0b2789d.png', 'tbone_2-cfb24b8d.png'],
  manishbee: ['manish_1-de7f8fb0.png', 'manish_2-79b80f5c.png'],
  superswiss: ['superswiss-139de856.png']
};

export default function AgentGallery({ agentId, thumbWidth }) {
  const base = (import.meta.env.BASE_URL || '/') ;
  const prefix = `${base}assets/`;
  const images = (agentId && IMAGE_MAP[agentId]) ? IMAGE_MAP[agentId] : [];

  if (!agentId || images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-3xl font-black text-amber-900">
        📋
      </div>
    );
  }

  const src = `${prefix}${images[0]}`;

  if (thumbWidth) {
    return (
      <img
        src={src}
        alt={agentId}
        width={thumbWidth}
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
    );
  }

  return (
    <div className="flex gap-2 items-center">
      {images.map((f, i) => (
        <img key={i} src={`${prefix}${f}`} alt={`${agentId}-${i}`} style={{ width: 120, height: 120, objectFit: 'cover' }} />
      ))}
    </div>
  );
}
