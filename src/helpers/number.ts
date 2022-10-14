export function isValid(a?: number | string) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === '') return false;
  return true;
}
