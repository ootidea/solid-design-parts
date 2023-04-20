import { keysOf } from 'base-up'
import { createRoot } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'

function createI18nGetters<const T extends Record<string, { default: unknown } & Record<string, unknown>>>(
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

export const i18nGetters = createI18nGetters({
  dataTableEmptyMessage: { default: 'No data', ja: 'データがありません' },
  calendarDayNames: {
    default: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    ja: ['日', '月', '火', '水', '木', '金', '土'],
  },
  calendarYearMonthOrder: { default: `"month year"`, ja: `"year month"` },
  calendarMonthTemplate: { default: 'MMMM', ja: 'M月' },
  calendarYearTemplate: { default: 'yyyy', ja: 'yyyy年' },
})

export function forceCurrentLanguage(language: string | undefined) {
  forcedLanguage.value = language
}
