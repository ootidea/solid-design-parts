import { Promisable } from 'base-up'
import { createRenderEffect, For, JSX, untrack } from 'solid-js'
import { createMemoObject, createSignalObject } from 'solid-signal-object'
import './common.scss'
import { ErrorMessage } from './ErrorMessage'
import './RadioButtons.scss'
import { createDeferEffect, createNormalizedSignalObject, joinClasses, prepareProps, Props } from './utility/props'

export type RadioButtonsProps<T extends readonly (string | number)[]> = Props<{
  values: T
  selected?: T[number] | undefined
  labels?: Partial<Record<T[number], JSX.Element>> | ((value: T[number]) => JSX.Element)
  name?: string
  layout?: 'horizontal' | 'vertical' | 'flex-wrap' | 'space-between' | 'space-around' | 'space-evenly'
  gap?: string
  gridColumnsCount?: number | undefined
  disabled?: boolean
  disabledValues?: ReadonlySet<T[number]>
  required?: boolean
  error?: boolean | string | ((selected: T[number] | undefined) => Promisable<boolean | string>)
  validateImmediately?: boolean
  enableDeselection?: boolean
  onChangeSelected?: (selected: T[number] | undefined) => void
  onValid?: (selected: T[number] | undefined) => void
}>

export function RadioButtons<const T extends readonly (string | number)[]>(rawProps: RadioButtonsProps<T>) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      name: rawProps.name === undefined ? `solid-design-parts-RadioButton_name${uniqueId++}` : rawProps.name,
      layout: 'horizontal',
      gap: '0.2em 1em',
      disabled: false,
      disabledValues: new Set(),
      required: false,
      error: false as Required<RadioButtonsProps<T>>['error'],
      validateImmediately: false,
      enableDeselection: false,
    },
    ['values', 'selected', 'labels', 'gridColumnsCount', 'onChangeSelected', 'onValid']
  )

  const selectedSignal = createNormalizedSignalObject(
    props.selected,
    () => (props.selected !== undefined && !props.values.includes(props.selected) ? undefined : props.selected),
    props.onChangeSelected
  )

  const isEditedSignal = createSignalObject(false)
  const shouldValidate = createMemoObject(() => isEditedSignal.value || props.validateImmediately)

  const errorSignal = createSignalObject<boolean | string>(false)
  createRenderEffect(async () => {
    const selected = untrack(selectedSignal.get)
    const error = await deriveError(shouldValidate.value, selected, props.error, props.required)
    errorSignal.value = error
    if (error === false) {
      props.onValid?.(selected)
    }
  })
  createDeferEffect(selectedSignal.get, async () => {
    const selected = selectedSignal.value
    props.onChangeSelected?.(selected)
    const error = await deriveError(shouldValidate.value, selected, props.error, props.required)
    errorSignal.value = error
    if (error === false) {
      props.onValid?.(selected)
    }
  })

  function getLabel(value: T[number]): JSX.Element {
    if (props.labels instanceof Function) return props.labels(value)
    else return props.labels?.[value] ?? value
  }

  function isDisabled(value: T[number]): boolean {
    return props.disabled || props.disabledValues.has(value)
  }

  async function onClick(value: T[number]) {
    if (selectedSignal.value === value && props.enableDeselection) {
      selectedSignal.value = undefined
    } else {
      selectedSignal.value = value
    }

    isEditedSignal.value = true
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
              {...restProps}
              class={joinClasses(rawProps, 'solid-design-parts-RadioButtons_label')}
              aria-disabled={isDisabled(value)}
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
      <ErrorMessage>{errorSignal.value}</ErrorMessage>
    </div>
  )
}

// Used to generate a unique name attribute when the attribute is omitted.
let uniqueId = 0
