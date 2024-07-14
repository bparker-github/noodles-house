export function parseAsInt(num: number | string) {
  return typeof num === 'number' ? num : parseInt(num, 10);
}

export function percentAsRatio(height: number, width: number) {
  const val = (Math.round(height) / Math.round(width)) * 100;
  return val.toFixed(2) + '%';
}
