import { Promisable } from 'base-up/dist/types/Promise'
import { createMemo, createRenderEffect, For, on, untrack } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
import { Checkbox } from './Checkbox'
import css from './Checkboxes.scss'
import { prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type CheckboxesProps<T extends string> = Props<{
  values: readonly T[]
  titles?: Partial<Record<T, string>>
  selected?: ReadonlySet<T>
  placeholder?: string
  layout?: 'horizontal' | 'vertical' | 'flex-wrap' | 'space-between' | 'space-around' | 'space-evenly'
  gap?: string
  gridColumnsCount?: number | undefined
  disabled?: boolean | ReadonlySet<string>
  required?: boolean
  errorMessage?: string | ((selected: ReadonlySet<T>) => Promisable<string | void>)
  validateImmediately?: boolean
  fullWidth?: boolean
  showSearchBox?: boolean
  onChangeSelected?: (selected: Set<T>) => void
  onChangeValidSelected?: (selected: Set<T>) => void
}>

export function Checkboxes<T extends string>(rawProps: CheckboxesProps<T>) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      titles: {} as Required<CheckboxesProps<T>>['titles'],
      selected: new Set(),
      placeholder: '',
      layout: 'horizontal',
      gap: '0.2em 1em',
      disabled: false,
      required: false,
      validateImmediately: false,
      fullWidth: false,
      showSearchBox: false,
    },
    ['values', 'gridColumnsCount', 'errorMessage', 'onChangeSelected']
  )

  function getText(value: T): string {
    return props.titles?.[value] ?? value
  }

  const selectedSignal = createSignalObject(new Set(props.selected), { equals: false })
  createRenderEffect(() => (selectedSignal.value = new Set(props.selected)))
  async function changeSelected(newSelected: Set<T>) {
    selectedSignal.value = newSelected
    props.onChangeSelected?.(newSelected)

    const newErrorMessage = await deriveErrorMessage(shouldValidate(), newSelected, props.errorMessage, props.required)
    errorMessageSignal.value = newErrorMessage
    if (newErrorMessage === undefined) {
      props.onChangeValidSelected?.(newSelected)
    }
  }

  const isEditedSignal = createSignalObject(false)
  const shouldValidate = createMemo(() => isEditedSignal.value || props.validateImmediately)

  const errorMessageSignal = createSignalObject<string | undefined>()
  createRenderEffect(async () => {
    errorMessageSignal.value = await deriveErrorMessage(
      shouldValidate(),
      untrack(selectedSignal.get),
      props.errorMessage,
      props.required
    )
  })
  createRenderEffect(
    on(
      () => props.selected,
      async () => {
        errorMessageSignal.value = await deriveErrorMessage(
          shouldValidate(),
          props.selected,
          props.errorMessage,
          props.required
        )
      },
      { defer: true }
    )
  )

  async function deriveErrorMessage(
    shouldValidate: boolean,
    selected: ReadonlySet<T>,
    errorMessage: CheckboxesProps<T>['errorMessage'],
    required: boolean
  ): Promise<string | undefined> {
    if (required) {
      if (!shouldValidate) {
        return undefined
      } else if (typeof errorMessage === 'string') {
        if (selected.size > 0) {
          return undefined
        } else {
          return errorMessage
        }
      } else {
        const result = await errorMessage?.(selected)
        if (selected.size > 0) {
          return result ?? undefined
        } else {
          return result ?? ''
        }
      }
    } else {
      if (typeof errorMessage === 'string') {
        return errorMessage
      } else if (!shouldValidate) {
        return undefined
      } else {
        const result = await errorMessage?.(selected)
        return result ?? undefined
      }
    }
  }

  function isDisabled(value: string): boolean {
    if (typeof props.disabled === 'boolean') return props.disabled

    return props.disabled.has(value)
  }

  return (
    <div
      class="mantle-ui-Checkboxes_root"
      classList={{ 'mantle-ui-Checkboxes_has-columns-count': props.gridColumnsCount !== undefined }}
      style={{
        '--mantle-ui-Checkboxes_gap': props.gap,
        '--mantle-ui-Checkboxes_grid-columns-count': props.gridColumnsCount,
      }}
      aria-invalid={errorMessageSignal.value !== undefined}
      data-layout={props.layout}
      data-grid-columns-count={props.gridColumnsCount}
    >
      <div class="mantle-ui-Checkboxes_checkboxes" role="group" aria-required={props.required}>
        <For each={props.values}>
          {(value) => (
            <Checkbox
              checked={selectedSignal.value.has(value)}
              disabled={isDisabled(value)}
              errorMessage={errorMessageSignal.value !== undefined ? '' : undefined}
              onChangeChecked={(checked) => {
                isEditedSignal.value = true
                if (checked) {
                  selectedSignal.value.add(value)
                } else {
                  selectedSignal.value.delete(value)
                }
                changeSelected(selectedSignal.value)
              }}
            >
              {getText(value)}
            </Checkbox>
          )}
        </For>
      </div>
      <p class="mantle-ui-Checkboxes_error-message">{errorMessageSignal.value}</p>
    </div>
  )
}
