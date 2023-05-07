import { keysOf, LiteralAutoComplete } from 'base-up'
import { createRoot } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'

export type I18nPack<T = unknown> = { default: T } & Record<LiteralAutoComplete<'ja'>, T>

export function internationalizeForCurrentLanguages<T>(i18nPack: I18nPack<T>): T {
  const resultLanguage = getCurrentLanguages().find((language) => language in i18nPack) ?? 'default'
  return i18nPack[resultLanguage]
}

export function createI18nGetters<const T extends Record<string, I18nPack>>(
  source: T
): {
  [K in keyof T]: T[K][keyof T[K]]
} {
  const result = {}
  for (const key of keysOf(source)) {
    Object.defineProperty(result, key, {
      get: () => internationalizeForCurrentLanguages(source[key]),
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
