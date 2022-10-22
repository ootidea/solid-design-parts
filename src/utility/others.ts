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

export type EnneaPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'center'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'

export type HorizontalPosition = 'left' | 'center' | 'right'
export type VerticalPosition = 'top' | 'center' | 'bottom'

export function toOpposite(position: EnneaPosition) {
  switch (position) {
    case 'top':
      return 'bottom'
    case 'bottom':
      return 'top'
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    case 'center':
      return 'center'
    case 'top left':
      return 'bottom right'
    case 'top right':
      return 'bottom left'
    case 'bottom left':
      return 'top right'
    case 'bottom right':
      return 'top left'
  }
}

export function toHorizontalPosition(position: EnneaPosition): HorizontalPosition {
  const mapping = {
    'top left': 'left',
    left: 'left',
    'bottom left': 'left',
    top: 'center',
    center: 'center',
    bottom: 'center',
    'top right': 'right',
    right: 'right',
    'bottom right': 'right',
  } as const
  return mapping[position]
}

export function toVerticalPosition(position: EnneaPosition): VerticalPosition {
  const mapping = {
    'top left': 'top',
    top: 'top',
    'top right': 'top',
    left: 'center',
    center: 'center',
    right: 'center',
    'bottom left': 'bottom',
    bottom: 'bottom',
    'bottom right': 'bottom',
  } as const
  return mapping[position]
}

export function toXPercent(position: EnneaPosition): `${number}%` {
  const mapping = { left: '0%', center: '50%', right: '100%' } as const
  return mapping[toHorizontalPosition(position)]
}

export function toYPercent(position: EnneaPosition): `${number}%` {
  const mapping = { top: '0%', center: '50%', bottom: '100%' } as const
  return mapping[toVerticalPosition(position)]
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
 * Use ResizeObserver to detect width changes.
 * Call back the current width immediately after calling this function.
 */
export function observeWidth(element: HTMLElement, callback: (width: number) => void) {
  callback(element.getBoundingClientRect().width)
  const resizeObserver = new ResizeObserver(() => {
    callback(element.getBoundingClientRect().width)
  })
  resizeObserver.observe(element)

  onCleanup(() => {
    resizeObserver.unobserve(element)
  })
}

export function setupFocusTrap(element: HTMLElement) {
  const focusTrap = createFocusTrap(element, {
    escapeDeactivates: false,
    // If no focusable element is contained, createFocusTrap throws an error.
    // To prevent this, set the following two options.
    initialFocus: false,
    fallbackFocus: element,
  })
  focusTrap.activate()

  onCleanup(() => {
    focusTrap.deactivate()
  })
}