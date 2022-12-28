import { assert, isNotEmpty } from 'base-up'
import { For } from 'solid-js'
import css from './RadioButtons.scss'
import { createInjectableSignal, joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type RadioButtonsProps<Values extends readonly string[]> = Props<{
  values: Values
  selected?: Values[number] | undefined
  name?: string
  layout?: 'horizontal' | 'vertical' | 'flex-wrap' | 'space-between' | 'space-around' | 'space-evenly'
  gap?: string
  gridColumnsCount?: number | undefined
  disabled?: boolean | ReadonlySet<string>
  enableDeselection?: boolean
  onChangeSelected?: (selected: Values[number] | undefined) => void
}>

export function RadioButtons<Values extends readonly string[]>(rawProps: RadioButtonsProps<Values>) {
  assert(rawProps.values, isNotEmpty)

  const [props, restProps] = prepareProps(
    rawProps,
    {
      name: rawProps.name === undefined ? `mantle-ui-RadioButton_name${uniqueId++}` : rawProps.name,
      layout: 'horizontal',
      gap: '0.2em 1em',
      disabled: false,
      enableDeselection: false,
    },
    ['selected', 'values', 'gridColumnsCount', 'onChangeSelected']
  )

  const [selected, setSelected] = createInjectableSignal(props, 'selected')

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
    <div
      class="mantle-ui-RadioButtons_root"
      classList={{ 'mantle-ui-RadioButtons_has-columns-count': props.gridColumnsCount !== undefined }}
      style={{
        '--mantle-ui-RadioButtons_gap': props.gap,
        '--mantle-ui-RadioButtons_grid-columns-count': props.gridColumnsCount,
      }}
      data-layout={props.layout}
    >
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
  )
}

// Used to generate a unique name attribute when the attribute is omitted.
let uniqueId = 0
