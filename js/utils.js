export function escape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
export function csvCell(value) {
  const raw = String(value);
  const safe = /^[\s]*[=+@-]/.test(raw) ? "'" + raw : raw;
  return '"' + safe.replaceAll('"','""') + '"';
}
