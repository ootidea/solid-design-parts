import { assert, call, isNotEmpty } from 'base-up'
import { Promisable } from 'base-up/dist/types/Promise'
import { createEffect, createSignal, For, untrack } from 'solid-js'
import css from './RadioButtons.scss'
import { createInjectableSignal, joinClasses, prepareProps, Props } from './utility/props'
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
  errorMessage?: string | ((selected: T | undefined) => Promisable<string | void>)
  validateInitialValue?: boolean
  enableDeselection?: boolean
  onChangeSelected?: (selected: T | undefined) => void
  onChangeValidSelected?: (selected: T | undefined) => void
}>

export function RadioButtons<T extends string>(rawProps: RadioButtonsProps<T>) {
  assert(rawProps.values, isNotEmpty)

  const [props, restProps] = prepareProps(
    rawProps,
    {
      name: rawProps.name === undefined ? `mantle-ui-RadioButton_name${uniqueId++}` : rawProps.name,
      layout: 'horizontal',
      gap: '0.2em 1em',
      disabled: false,
      validateInitialValue: false,
      enableDeselection: false,
    },
    ['selected', 'values', 'gridColumnsCount', 'errorMessage', 'onChangeSelected', 'onChangeValidSelected']
  )

  const [selected, setSelected] = createInjectableSignal(props, 'selected')

  const [shouldValidate, setShouldValidate] = createInjectableSignal(props, 'validateInitialValue')

  const [errorMessage, setErrorMessage] = createSignal<string | undefined>()
  createEffect(async () => {
    props.selected

    if (typeof props.errorMessage === 'string') {
      setErrorMessage(props.errorMessage)
    } else if (!untrack(shouldValidate)) {
      setErrorMessage(undefined)
    } else {
      const result = await props.errorMessage?.(props.selected)
      setErrorMessage(result ?? undefined)
    }
  })

  function isDisabled(value: string): boolean {
    if (typeof props.disabled === 'boolean') return props.disabled

    return props.disabled.has(value)
  }

  async function onClick(value: T) {
    setShouldValidate(true)
    const nextSelected = call(() => {
      if (selected() === value && props.enableDeselection) {
        return undefined
      } else {
        return value
      }
    })

    setSelected(nextSelected)
    props.onChangeSelected?.(nextSelected)

    if (typeof props.errorMessage === 'string') {
      setErrorMessage(props.errorMessage)
    } else {
      const result = await props.errorMessage?.(nextSelected)
      setErrorMessage(result ?? undefined)

      if (result === undefined) {
        props.onChangeValidSelected?.(nextSelected)
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
      aria-invalid={errorMessage() !== undefined}
      data-layout={props.layout}
      data-grid-columns-count={props.gridColumnsCount}
    >
      <div class="mantle-ui-RadioButtons_radio-buttons">
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
                checked={value === selected()}
                disabled={isDisabled(value)}
                onClick={() => onClick(value)}
              />
              {value}
            </label>
          )}
        </For>
      </div>
      <p class="mantle-ui-RadioButtons_error-message">{errorMessage()}</p>
    </div>
  )
}

// Used to generate a unique name attribute when the attribute is omitted.
let uniqueId = 0
