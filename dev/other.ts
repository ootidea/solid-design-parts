export function toLiteral(value: string | boolean | undefined): string {
  if (typeof value === 'string') return JSON.stringify(value)

  return String(value)
}
