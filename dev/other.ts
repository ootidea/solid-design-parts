export function toLiteral(value: string | boolean | number | undefined): string {
  if (typeof value === 'string') return JSON.stringify(value)

  return String(value)
}
