// Lightweight helper to fetch JSON from a Google Apps Script web app.
// Tries a normal fetch() first, falls back to JSONP if CORS blocks the request.
export async function fetchSheetJson(url) {
  if (!url) throw new Error('fetchSheetJson: missing url');

  // Try normal fetch first
  try {
    const res = await fetch(url, { cache: 'no-store' });
    const txt = await res.text();
    // Try parse JSON (some Apps Script endpoints return JSON directly)
    try {
      return JSON.parse(txt);
    } catch (e) {
      // If response is JS (JSONP) like callback({...}); attempt to extract JSON
      const m = txt.match(/^[^\(]*\((.*)\)\s*;?\s*$/s);
      if (m && m[1]) return JSON.parse(m[1]);
      throw e;
    }
  } catch (err) {
    // Fallback to JSONP injection if CORS prevented normal fetch
    return fetchJsonp(url);
  }
}

function fetchJsonp(url) {
  return new Promise((resolve, reject) => {
    const callbackName = `__gs_cb_${Math.random().toString(36).slice(2)}`;
    (window)[callbackName] = data => {
      try {
        resolve(data);
      } finally {
        cleanup();
      }
    };

    function cleanup() {
      try { delete window[callbackName]; } catch(e) { window[callbackName] = undefined; }
      const s = document.getElementById(callbackName);
      if (s && s.parentNode) s.parentNode.removeChild(s);
    }

    const sep = url.includes('?') ? '&' : '?';
    const script = document.createElement('script');
    script.id = callbackName;
    script.src = `${url}${sep}callback=${callbackName}`;
    script.onerror = function(e){ cleanup(); reject(new Error('JSONP load error')); };
    document.head.appendChild(script);
    // Timeout
    setTimeout(()=>{ reject(new Error('JSONP timeout')); cleanup(); }, 15000);
  });
}

export default fetchSheetJson;
