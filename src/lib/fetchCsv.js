// Simple CSV fetcher + parser with basic quoted-field support
export async function fetchCsv(url) {
  if (!url) throw new Error('fetchCsv: missing url');
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Network response not ok: ' + res.status);
  const text = await res.text();
  const rows = parseCsv(text);
  if (rows.length === 0) return [];
  const headers = rows.shift().map(h => String(h).trim());
  return rows
    .filter(r => r.length > 0 && r.some(c => c !== ''))
    .map(r => Object.fromEntries(r.map((c, i) => [headers[i] ?? i, c])));
}

function parseCsv(text) {
  const rows = [];
  let cur = '';
  let row = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i+1];
    if (ch === '"') {
      if (inQuotes && next === '"') { // escaped quote
        cur += '"';
        i++; // skip next
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (ch === ',' && !inQuotes) {
      row.push(cur);
      cur = '';
      continue;
    }
    if ((ch === '\n' || ch === '\r') && !inQuotes) {
      // handle CRLF
      if (ch === '\r' && next === '\n') { i++; }
      row.push(cur);
      rows.push(row);
      row = [];
      cur = '';
      continue;
    }
    cur += ch;
  }
  // push last
  if (cur !== '' || inQuotes || row.length > 0) {
    row.push(cur);
    rows.push(row);
  }
  // Trim fields
  return rows.map(r => r.map(c => (c||'').trim()));
}

export default fetchCsv;
