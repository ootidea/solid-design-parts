import { call, Promisable } from 'base-up'
import { createRenderEffect, For, JSX, untrack } from 'solid-js'
import { createMemoObject, createSignalObject } from 'solid-signal-object'
import css from './RadioButtons.scss'
import { createDeferEffect, createInjectableSignalObject, joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type RadioButtonsProps<T extends readonly (string | number)[]> = Props<{
  values: T
  selected?: T[number] | undefined
  labels?: Partial<Record<T[number], JSX.Element>> | ((value: T[number]) => JSX.Element)
  name?: string
  layout?: 'horizontal' | 'vertical' | 'flex-wrap' | 'space-between' | 'space-around' | 'space-evenly'
  gap?: string
  gridColumnsCount?: number | undefined
  disabled?: boolean | ReadonlySet<T[number]>
  required?: boolean
  error?: boolean | string | ((selected: T[number] | undefined) => Promisable<boolean | string>)
  validateImmediately?: boolean
  enableDeselection?: boolean
  onChangeSelected?: (selected: T[number] | undefined) => void
  onChangeValidSelected?: (selected: T[number] | undefined) => void
}>

export function RadioButtons<T extends readonly (string | number)[]>(rawProps: RadioButtonsProps<T>) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      name: rawProps.name === undefined ? `solid-design-parts-RadioButton_name${uniqueId++}` : rawProps.name,
      layout: 'horizontal',
      gap: '0.2em 1em',
      disabled: false,
      required: false,
      error: false as Required<RadioButtonsProps<T>>['error'],
      validateImmediately: false,
      enableDeselection: false,
    },
    ['values', 'selected', 'labels', 'gridColumnsCount', 'onChangeSelected', 'onChangeValidSelected']
  )

  const selectedSignal = createInjectableSignalObject(props, 'selected')

  const isEditedSignal = createSignalObject(false)
  const shouldValidate = createMemoObject(() => isEditedSignal.value || props.validateImmediately)

  const errorSignal = createSignalObject<boolean | string>(false)
  createRenderEffect(async () => {
    errorSignal.value = await deriveError(
      shouldValidate.value,
      untrack(selectedSignal.get),
      props.error,
      props.required
    )
  })
  createDeferEffect(
    () => props.selected,
    async () => {
      errorSignal.value = await deriveError(shouldValidate.value, props.selected, props.error, props.required)
    }
  )

  function getLabel(value: T[number]): JSX.Element {
    if (props.labels instanceof Function) return props.labels(value)
    else return props.labels?.[value] ?? value
  }

  function isDisabled(value: T[number]): boolean {
    if (typeof props.disabled === 'boolean') return props.disabled

    return props.disabled.has(value)
  }

  async function onClick(value: T[number]) {
    isEditedSignal.value = true
    const nextSelected = call(() => {
      if (selectedSignal.value === value && props.enableDeselection) {
        return undefined
      } else {
        return value
      }
    })

    selectedSignal.value = nextSelected
    props.onChangeSelected?.(nextSelected)

    const nextError = await deriveError(shouldValidate.value, nextSelected, props.error, props.required)
    errorSignal.value = nextError
    if (nextError === undefined) {
      props.onChangeValidSelected?.(nextSelected)
    }
  }

  async function deriveError(
    shouldValidate: boolean,
    selected: T[number] | undefined,
    error: Required<RadioButtonsProps<T>>['error'],
    required: boolean
  ): Promise<boolean | string> {
    if (error === true) return true

    if (required) {
      if (!shouldValidate) {
        return false
      } else if (error === false) {
        return selected === undefined
      } else if (typeof error === 'string') {
        if (selected !== undefined) {
          return false
        } else {
          return error
        }
      } else {
        const result = await error(selected)
        if (selected === undefined && result === false) return true

        return result
      }
    } else {
      if (error === false || typeof error === 'string') {
        return error
      } else if (!shouldValidate) {
        return false
      } else {
        return await error(selected)
      }
    }
  }

  return (
    <div
      class="solid-design-parts-RadioButtons_root"
      classList={{ 'solid-design-parts-RadioButtons_has-columns-count': props.gridColumnsCount !== undefined }}
      style={{
        '--solid-design-parts-RadioButtons_gap': props.gap,
        '--solid-design-parts-RadioButtons_grid-columns-count': props.gridColumnsCount,
      }}
      aria-invalid={errorSignal.value !== false}
      data-layout={props.layout}
      data-grid-columns-count={props.gridColumnsCount}
    >
      <div class="solid-design-parts-RadioButtons_radio-buttons" role="radiogroup" aria-required={props.required}>
        <For each={props.values}>
          {(value) => (
            <label
              class={joinClasses(rawProps, 'solid-design-parts-RadioButtons_label')}
              aria-disabled={isDisabled(value)}
              {...restProps}
            >
              <input
                type="radio"
                class="solid-design-parts-RadioButtons_radio"
                value={value}
                name={props.name}
                checked={value === selectedSignal.value}
                disabled={isDisabled(value)}
                onClick={() => onClick(value)}
              />
              {getLabel(value)}
            </label>
          )}
        </For>
      </div>
      <p class="solid-design-parts-RadioButtons_error-message">{errorSignal.value}</p>
    </div>
  )
}

// Used to generate a unique name attribute when the attribute is omitted.
let uniqueId = 0
