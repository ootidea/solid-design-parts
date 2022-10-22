import { objectKeys } from './others'

export namespace i18n {
  export const literals = defineGetters({
    dataTableEmptyMessage: { default: 'No data', ja: 'データがありません' },
    calendarSunday: { default: 'Su', ja: '日' },
    calendarMonday: { default: 'Mo', ja: '月' },
    calendarTuesday: { default: 'Tu', ja: '火' },
    calendarWednesday: { default: 'We', ja: '水' },
    calendarThursday: { default: 'Th', ja: '木' },
    calendarFriday: { default: 'Fr', ja: '金' },
    calendarSaturday: { default: 'Sa', ja: '土' },
    calendarYearMonthOrder: { default: `"month year"`, ja: `"year month"` },
    calendarMonthTemplate: { default: 'MMMM', ja: 'M月' },
    calendarYearTemplate: { default: 'YYYY', ja: 'YYYY年' },
  })

  export function forceLanguage(language: string) {
    forcedLanguage = language
  }

  let forcedLanguage: string | undefined

  function getLanguages(): readonly string[] {
    if (forcedLanguage !== undefined) return [forcedLanguage]

    return navigator.languages
  }

  function defineGetters<T extends Record<string, { default: string } & Record<string, string>>>(
    source: T
  ): Record<keyof T, string> {
    const result = {}
    for (const key of objectKeys(source)) {
      Object.defineProperty(result, key, {
        get: () => {
          const pack = source[key]
          for (const language of getLanguages()) {
            if (language in pack) {
              return pack[language]
            }
          }
          return pack.default
        },
        enumerable: true,
        configurable: true,
      })
    }
    return result as Record<keyof T, string>
  }
}
