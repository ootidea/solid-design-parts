import { createFocusTrap } from 'focus-trap'
import { JSX, onCleanup } from 'solid-js'

/**
 * A utility for autocompletion.
 * https://github.com/sindresorhus/type-fest/blob/main/source/literal-union.d.ts
 */
export type LiteralUnion<Literals extends Base, Base = string> = Literals | (Base & Record<never, never>)

/**
 * Utility for defining tagged union types.
 * Note that can't define recursive types.
 * @example
 * DiscriminatedUnion<{ Rect: { width: number; height: number }; Circle: { radius: number } }>
 *  ↑↓ equals
 * { type: 'Rect'; width: number; height: number } | { type: 'Circle'; radius: number }
 */
export type DiscriminatedUnion<T, K extends keyof T = keyof T> = K extends K ? { type: K } & T[K] : never

/**
 * call(() => {
 *   ...
 * })
 * is readable than
 * (() => {
 *   ...
 * })()
 */
export function call<T>(f: () => T): T {
  return f()
}

/**
 * Assert that a value is not undefined.
 * Throws an exception if it is undefined.
 */
export function assertNonUndefined<T>(value: T | undefined, message?: string): asserts value is T {
  if (value === undefined) {
    throw new Error(message ?? 'Assertion error: the given value is undefined.')
  }
}

/**
 * Assert that a value is not null.
 * Throws an exception if it is null.
 */
export function assertNonNull<T>(value: T | null, message?: string): asserts value is T {
  if (value === null) {
    throw new Error(message ?? 'Assertion error: the given value is null.')
  }
}

export function assertNonEmptyArray<T>(array: readonly T[]): asserts array is [T] & T[] {
  if (array.length === 0) {
    throw new Error('Assertion error: the given array is empty.')
  }
}

/**
 * Clone given array, and remove all undefined.
 * @example
 * filterNonUndefined([123, undefined, 456, undefined])
 * is equivalent to
 * [123, 456]
 */
export function filterNonUndefined<T>(array: (T | undefined)[]): T[] {
  return array.filter((value) => value !== undefined) as T[]
}

export function maxBy<T>(array: readonly T[], by: (element: T) => number): T | undefined {
  if (array.length === 0) return undefined

  const [firstElement, ...rest] = array
  let candidateElement = firstElement
  let maxValue = by(firstElement)
  for (const element of rest) {
    const value = by(element)
    if (maxValue < value) {
      candidateElement = element
      maxValue = value
    }
  }
  return candidateElement
}

export function minBy<T>(array: readonly T[], by: (element: T) => number): T | undefined {
  if (array.length === 0) return undefined

  const [firstElement, ...rest] = array
  let candidateElement = firstElement
  let minValue = by(firstElement)
  for (const element of rest) {
    const value = by(element)
    if (minValue > value) {
      candidateElement = element
      minValue = value
    }
  }
  return candidateElement
}

type FixedSizeArray<N extends number, T, Result extends any[] = []> = Result['length'] extends N
  ? Result
  : FixedSizeArray<N, T, [...Result, T]>

export function chunk<T, N extends number>(array: readonly T[], size: N): FixedSizeArray<N, T>[] {
  const result = []
  for (let i = 0; i + size <= array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result as any
}

/**
 * Create sequence starting with 0.
 * @example
 * until(5) is equivalent to [0, 1, 2, 3, 4]
 */
export function until(length: number): readonly number[] {
  return Array.from({ length }, (_, i) => i)
}

/**
 * Object.keys with improved type.
 * @example
 * objectKeys({ alice: 'female', 123: null, [Symbol()]: true })
 * is equivalent to
 * Object.keys({ alice: 'female', 123: null, [Symbol()]: true }) as ('alice' | '123')[]
 */
export function objectKeys<T extends {}>(object: T): ObjectKeys<T> {
  return Object.keys(object) as any
}

export type ObjectKeys<T, K extends keyof any = keyof T> = (K extends symbol ? never : K extends number ? `${K}` : K)[]

/** Object.fromEntries with improved type. */
export function objectFromEntries<K extends string, T>(entries: Iterable<readonly [K, T]>): Record<K, T> {
  return Object.fromEntries(entries) as Record<K, T>
}

export function isInsideOf(x: number, y: number, rect: DOMRect): boolean {
  if (x < rect.left) return false
  if (rect.right < x) return false
  if (y < rect.top) return false
  if (rect.bottom < y) return false

  return true
}

export function toArray(children: JSX.Element): JSX.Element[] {
  if (children instanceof Array) return children

  return [children]
}

/**
 * Observe element width in px using ResizeObserver.
 * Callback immediately when this function is called.
 */
export function observeWidthPx(element: HTMLElement, callback: (widthPx: number) => void) {
  callback(element.getBoundingClientRect().width)
  const resizeObserver = new ResizeObserver(() => {
    callback(element.getBoundingClientRect().width)
  })
  resizeObserver.observe(element)

  onCleanup(() => {
    resizeObserver.unobserve(element)
  })
}

/**
 * Confine focus under the given element.
 * Calling this function will focus the element, so the element must be focusable.
 * It is recommended that tabindex="-1" and outline:none be specified for the element.
 */
export function setupFocusTrap(element: HTMLElement) {
  const focusTrap = createFocusTrap(element, {
    escapeDeactivates: false,
    fallbackFocus: element,
  })
  focusTrap.activate()

  onCleanup(() => {
    focusTrap.deactivate()
  })
}
