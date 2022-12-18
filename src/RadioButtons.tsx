import { createEffect, createSignal, For } from 'solid-js'
import css from './RadioButtons.scss'
import { assertNonEmptyArray } from './utility/others'
import { joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type RadioButtonsProps<Values extends readonly string[]> = Props<{
  values: Values
  name?: string
  selected?: Values[number] | undefined
  disabled?: boolean | ReadonlySet<string>
  enableDeselection?: boolean
  onChangeSelected?: (selected: Values[number] | undefined) => void
}>

export function RadioButtons<Values extends readonly string[]>(rawProps: RadioButtonsProps<Values>) {
  assertNonEmptyArray(rawProps.values)

  const [props, restProps] = prepareProps(
    rawProps,
    {
      name: rawProps.name === undefined ? `mantle-ui-RadioButton_name${uniqueId++}` : rawProps.name,
      disabled: false,
      enableDeselection: false,
    },
    ['selected', 'values', 'onChangeSelected']
  )

  const [selected, setSelected] = createSignal(props.selected)
  createEffect(() => setSelected(() => props.selected))

  function isDisabled(value: string): boolean {
    if (typeof props.disabled === 'boolean') return props.disabled

    return props.disabled.has(value)
  }

  function onClick(value: Values[number]) {
    if (selected() === value) {
      if (props.enableDeselection) {
        setSelected(undefined)
        props.onChangeSelected?.(undefined)
      }
    } else {
      setSelected(() => value)
      props.onChangeSelected?.(value)
    }
  }

  return (
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
  )
}

// Used to generate a unique name attribute when the attribute is omitted.
let uniqueId = 0
