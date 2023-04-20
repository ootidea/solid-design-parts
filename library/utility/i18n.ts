import { keysOf } from 'base-up'
import { createRoot } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'

export function createI18nGetters<const T extends Record<string, { default: unknown } & Record<string, unknown>>>(
  source: T
): {
  [K in keyof T]: T[K][keyof T[K]]
} {
  const result = {}
  for (const key of keysOf(source)) {
    Object.defineProperty(result, key, {
      get: () => {
        const pack = source[key]
        const resultLanguage = getCurrentLanguages().find((language) => language in pack) ?? 'default'
        return pack[resultLanguage]
      },
      enumerable: true,
      configurable: true,
    })
  }
  return result as any
}

const forcedLanguage = createRoot(() => createSignalObject<string | undefined>())

function getCurrentLanguages(): readonly string[] {
  if (forcedLanguage.value !== undefined) return [forcedLanguage.value]

  return navigator.languages
}

export function forceCurrentLanguage(language: string | undefined) {
  forcedLanguage.value = language
}
