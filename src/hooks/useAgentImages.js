export function useAgentImages(agentId) {
  // Glob all files under src/assets/agents/** and return URLs for the given agentId
  // Eager import as url so Vite returns final hashed URLs
  const modules = import.meta.glob('/src/assets/agents/**', { eager: true, as: 'url' });
  const prefix = `/src/assets/agents/${agentId}/`;
  const imgs = Object.entries(modules)
    .filter(([path]) => path.startsWith(prefix))
    .map(([, url]) => url);
  return imgs.sort();
}
