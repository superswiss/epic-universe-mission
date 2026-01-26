import React from 'react';

const modules = import.meta.glob('/assets/*', { eager: true, as: 'url' });

function findImagesFor(baseNames) {
  const urls = [];
  const keys = Object.keys(modules);
  for (const b of baseNames) {
    const matched = keys.find(k => k.includes(b));
    if (matched) urls.push(modules[matched]);
  }
  return urls;
}

const IMAGE_BASES = {
  karkian: ['drkarkian_1', 'drkarkian_2'],
  moose: ['moose_1', 'moose_2'],
  tbone: ['tbone_1', 'tbone_2'],
  manishbee: ['manish_1', 'manish_2'],
  superswiss: ['superswiss']
};

export default function AgentGallery({ agentId, thumbWidth }) {
  const bases = IMAGE_BASES[agentId] || [];
  const images = findImagesFor(bases);

  if (!agentId || images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-3xl font-black text-amber-900">
        📋
      </div>
    );
  }

  if (thumbWidth) {
    return (
      <img
        src={images[0]}
        alt={agentId}
        width={thumbWidth}
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
    );
  }

  return (
    <div className="flex gap-2 items-center">
      {images.map((url, i) => (
        <img key={i} src={url} alt={`${agentId}-${i}`} style={{ width: 120, height: 120, objectFit: 'cover' }} />
      ))}
    </div>
  );
}
