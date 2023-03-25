import { Promisable } from 'base-up/dist/types/Promise'
import { createMemo, createRenderEffect, For, JSX, on, untrack } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
import { Checkbox } from './Checkbox'
import css from './Checkboxes.scss'
import { joinClasses, joinStyle, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type CheckboxesProps<T extends string> = Props<{
  values: readonly T[]
  labels?: Partial<Record<T, JSX.Element>>
  selected?: ReadonlySet<T>
  placeholder?: string
  layout?: 'horizontal' | 'vertical' | 'flex-wrap' | 'space-between' | 'space-around' | 'space-evenly'
  gap?: string
  gridColumnsCount?: number | undefined
  disabled?: boolean | ReadonlySet<string>
  required?: boolean
  error?: string | ((selected: ReadonlySet<T>) => Promisable<string | void>)
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
      labels: {} as Required<CheckboxesProps<T>>['labels'],
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
    ['values', 'gridColumnsCount', 'error', 'onChangeSelected']
  )

  function getLabel(value: T): JSX.Element {
    return props.labels?.[value] ?? value
  }

  const selectedSignal = createSignalObject(new Set(props.selected), { equals: false })
  createRenderEffect(() => (selectedSignal.value = new Set(props.selected)))
  async function changeSelected(newSelected: Set<T>) {
    selectedSignal.value = newSelected
    props.onChangeSelected?.(newSelected)

    const newError = await deriveError(shouldValidate(), newSelected, props.error, props.required)
    errorSignal.value = newError
    if (newError === undefined) {
      props.onChangeValidSelected?.(newSelected)
    }
  }

  const isEditedSignal = createSignalObject(false)
  const shouldValidate = createMemo(() => isEditedSignal.value || props.validateImmediately)

  const errorSignal = createSignalObject<string | undefined>()
  createRenderEffect(async () => {
    errorSignal.value = await deriveError(shouldValidate(), untrack(selectedSignal.get), props.error, props.required)
  })
  createRenderEffect(
    on(
      () => props.selected,
      async () => {
        errorSignal.value = await deriveError(shouldValidate(), props.selected, props.error, props.required)
      },
      { defer: true }
    )
  )

  async function deriveError(
    shouldValidate: boolean,
    selected: ReadonlySet<T>,
    error: CheckboxesProps<T>['error'],
    required: boolean
  ): Promise<string | undefined> {
    if (required) {
      if (!shouldValidate) {
        return undefined
      } else if (typeof error === 'string') {
        if (selected.size > 0) {
          return undefined
        } else {
          return error
        }
      } else {
        const result = await error?.(selected)
        if (selected.size > 0) {
          return result ?? undefined
        } else {
          return result ?? ''
        }
      }
    } else {
      if (typeof error === 'string') {
        return error
      } else if (!shouldValidate) {
        return undefined
      } else {
        const result = await error?.(selected)
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
      class={joinClasses(rawProps, 'solid-design-parts-Checkboxes_root', {
        'solid-design-parts-Checkboxes_has-columns-count': props.gridColumnsCount !== undefined,
      })}
      style={joinStyle(rawProps.style, {
        '--solid-design-parts-Checkboxes_gap': props.gap,
        '--solid-design-parts-Checkboxes_grid-columns-count': props.gridColumnsCount,
      })}
      aria-invalid={errorSignal.value !== undefined}
      data-layout={props.layout}
      data-grid-columns-count={props.gridColumnsCount}
    >
      <div class="solid-design-parts-Checkboxes_checkboxes" role="group" aria-required={props.required}>
        <For each={props.values}>
          {(value) => (
            <Checkbox
              checked={selectedSignal.value.has(value)}
              disabled={isDisabled(value)}
              error={errorSignal.value !== undefined ? '' : undefined}
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
              {getLabel(value)}
            </Checkbox>
          )}
        </For>
      </div>
      <p class="solid-design-parts-Checkboxes_error-message">{errorSignal.value}</p>
    </div>
  )
}
