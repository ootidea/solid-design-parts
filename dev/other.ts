export function toLiteral(value: string | boolean | undefined): string {
  if (typeof value === 'string') return `'${value}'`

  return String(value)
}
