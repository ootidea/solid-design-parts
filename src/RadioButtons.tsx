import { call } from 'base-up'
import { Promisable } from 'base-up/dist/types/Promise'
import { createMemo, createRenderEffect, For, on, untrack } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
import css from './RadioButtons.scss'
import { createInjectableSignalObject, joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type RadioButtonsProps<T extends string> = Props<{
  values: readonly T[]
  selected?: T | undefined
  name?: string
  layout?: 'horizontal' | 'vertical' | 'flex-wrap' | 'space-between' | 'space-around' | 'space-evenly'
  gap?: string
  gridColumnsCount?: number | undefined
  disabled?: boolean | ReadonlySet<string>
  required?: boolean
  errorMessage?: string | ((selected: T | undefined) => Promisable<string | void>)
  validateInitialValue?: boolean
  enableDeselection?: boolean
  onChangeSelected?: (selected: T | undefined) => void
  onChangeValidSelected?: (selected: T | undefined) => void
}>

export function RadioButtons<T extends string>(rawProps: RadioButtonsProps<T>) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      name: rawProps.name === undefined ? `mantle-ui-RadioButton_name${uniqueId++}` : rawProps.name,
      layout: 'horizontal',
      gap: '0.2em 1em',
      disabled: false,
      required: false,
      validateInitialValue: false,
      enableDeselection: false,
    },
    ['selected', 'values', 'gridColumnsCount', 'errorMessage', 'onChangeSelected', 'onChangeValidSelected']
  )

  const selectedSignal = createInjectableSignalObject(props, 'selected')

  const isEditedSignal = createSignalObject(false)
  const shouldValidate = createMemo(() => isEditedSignal.value || props.validateInitialValue)

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

  function isDisabled(value: string): boolean {
    if (typeof props.disabled === 'boolean') return props.disabled

    return props.disabled.has(value)
  }

  async function onClick(value: T) {
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

    const nextErrorMessage = await deriveErrorMessage(
      shouldValidate(),
      nextSelected,
      props.errorMessage,
      props.required
    )
    errorMessageSignal.value = nextErrorMessage
    if (nextErrorMessage === undefined) {
      props.onChangeValidSelected?.(nextSelected)
    }
  }

  async function deriveErrorMessage(
    shouldValidate: boolean,
    selected: T | undefined,
    errorMessage: RadioButtonsProps<T>['errorMessage'],
    required: boolean
  ): Promise<string | undefined> {
    if (required) {
      if (!shouldValidate) {
        return undefined
      } else if (typeof errorMessage === 'string') {
        if (selected !== undefined) {
          return undefined
        } else {
          return errorMessage
        }
      } else {
        const result = await errorMessage?.(selected)
        if (selected) {
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

  return (
    <div
      class="mantle-ui-RadioButtons_root"
      classList={{ 'mantle-ui-RadioButtons_has-columns-count': props.gridColumnsCount !== undefined }}
      style={{
        '--mantle-ui-RadioButtons_gap': props.gap,
        '--mantle-ui-RadioButtons_grid-columns-count': props.gridColumnsCount,
      }}
      aria-invalid={errorMessageSignal.value !== undefined}
      data-layout={props.layout}
      data-grid-columns-count={props.gridColumnsCount}
    >
      <div class="mantle-ui-RadioButtons_radio-buttons" role="radiogroup" aria-required={props.required}>
        <For each={props.values}>
          {(value) => (
            <label
              class={joinClasses(rawProps, 'mantle-ui-RadioButtons_label')}
              aria-disabled={isDisabled(value)}
              {...restProps}
            >
              <input
                type="radio"
                class="mantle-ui-RadioButtons_radio"
                value={value}
                name={props.name}
                checked={value === selectedSignal.value}
                disabled={isDisabled(value)}
                onClick={() => onClick(value)}
              />
              {value}
            </label>
          )}
        </For>
      </div>
      <p class="mantle-ui-RadioButtons_error-message">{errorMessageSignal.value}</p>
    </div>
  )
}

// Used to generate a unique name attribute when the attribute is omitted.
let uniqueId = 0
