import { ComponentProps, createEffect, createSignal, JSX, mergeProps, on, Signal, splitProps } from 'solid-js'
import { Component } from 'solid-js/types/render/component'
import { objectKeys } from './others'

export type Props<T, Base extends keyof JSX.IntrinsicElements | Component<any> = 'div'> = Omit<
  ComponentProps<Base>,
  keyof T
> &
  T

export type SlotProp<T> = JSX.Element | ((props: T) => JSX.Element)

export function createInjectableSignal<T, K extends keyof T>(props: T, key: K, equals?: false): Signal<T[K]> {
  const [value, setValue] = createSignal(props[key], { equals })
  createEffect(
    on(
      () => props[key],
      () => {
        setValue(() => props[key])
      },
      { defer: true }
    )
  )
  return [value, setValue]
}

/**
 * Convert all nullary function properties to getters immutably.
 * TODO: Define return type.
 */
export function toGetters<T extends Record<string, () => unknown>>(functions: T) {
  const result = {}
  for (const objectKey of objectKeys(functions)) {
    Object.defineProperty(result, objectKey, {
      get: functions[objectKey],
      enumerable: true,
      configurable: true,
    })
  }
  return result
}

/**
 * Return string literal union type that is keys of optional properties.
 * @example
 * OptionalKeys<{ a?: string; b?: number; c: string | undefined; d: string | null }>
 * is equivalent to
 * 'a' | 'b'
 */
export type OptionalKeys<T> = { [K in keyof T]-?: T extends Record<K, any> ? never : K }[keyof T]

/**
 * Pick all optional properties and make it required.
 * @example
 * DefaultValues<{ a?: string; b: string; c: string | undefined; d: string | null }>
 * is equivalent to
 * { a: string }
 */
type DefaultValues<T> = Required<Pick<T, OptionalKeys<T>>>

/**
 * Splits given object type into single property and returns its union type.
 * @example
 * AtLeastOne<{ a: number, b: boolean, c: string }>
 * is equivalent to
 * { a: number } | { b: boolean } | { c: string }
 */
export type AtLeastOneProperty<T, K extends keyof T = keyof T> = K extends K ? Record<K, T[K]> : never

/**
 * Set default value to props, and split props into two parts.
 * The first part is for direct use within the component.
 * The second part is for transport to DOM element as attributes.
 *
 * @example
 * prepareProps({ tint: 'red', tabindex: '0' }, { size: '1em' }, ['tint'])
 * is the same value as
 * [{ tint: 'red', size: '1em' }, { tabindex: '0' }]
 */
export function prepareProps<T, U extends Pick<T, OptionalKeys<T>>>(
  rawProps: T,
  defaultValues: U,
  otherKnownKeys: (keyof T)[] = []
): [T & Required<Pick<T, keyof T & keyof U>>, {}] {
  // Difficult to type accurately because keyof T equals string | number | Symbol but Object.keys returns string[]
  const keys = objectKeys(defaultValues) as any
  // Handle the classList attribute manually because of the bug that it is not updated reactively when transferred using spread syntax.
  return splitProps(mergeProps(defaultValues, rawProps), ['class', 'classList', ...otherKnownKeys, ...keys]) as any
}

export function joinClasses(
  props: { class?: string; classList?: Record<string, boolean | undefined> },
  baseClass: string,
  baseClassList?: Record<string, boolean | undefined>
) {
  const joinedClassList = Object.entries(props.classList ?? {})
    .filter(([, value]) => Boolean(value))
    .map(([key]) => key)
    .join(' ')
  const joinedBaseClassList = Object.entries(baseClassList ?? {})
    .filter(([, value]) => Boolean(value))
    .map(([key]) => key)
    .join(' ')
  return [baseClass, props.class ?? '', joinedBaseClassList, joinedClassList].join(' ').trim()
}

export function joinStyle(injectedStyle: JSX.CSSProperties | string | undefined, baseStyle: JSX.CSSProperties): string {
  const stylesAsString = Object.entries(baseStyle)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ')

  if (injectedStyle === undefined) return stylesAsString

  if (typeof injectedStyle === 'string') {
    if (injectedStyle.trim().endsWith(';')) {
      return `${injectedStyle} ${stylesAsString}`
    }
    return `${injectedStyle}; ${stylesAsString}`
  }

  const styleAsString = Object.entries(injectedStyle)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ')
  return `${styleAsString}; ${stylesAsString}`
}
