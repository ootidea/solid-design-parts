import { createFocusTrap } from 'focus-trap'
import { JSX, onCleanup } from 'solid-js'

/**
 * A utility for autocompletion.
 * https://github.com/sindresorhus/type-fest/blob/main/source/literal-union.d.ts
 */
export type LiteralAutoComplete<Literals extends Base, Base = string> = Literals | (Base & Record<never, never>)

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
 * Assert that a value is not undefined.
 * Throws an exception if it is undefined.
 */
export function assertNonUndefined<T>(value: T | undefined, message?: string): asserts value is T {
  if (value === undefined) {
    throw new Error(message ?? 'Assertion error: the given value is undefined.')
  }
}

export function assertNonEmptyArray<T>(array: readonly T[]): asserts array is [T] & T[] {
  if (array.length === 0) {
    throw new Error('Assertion error: the given array is empty.')
  }
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
