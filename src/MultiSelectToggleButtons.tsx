import { intersectionOf, isSubset, toggle } from 'base-up'
import { For, JSX } from 'solid-js'
import './common.scss'
import './MultiSelectToggleButtons.scss'
import { createDeferEffect, createNormalizedSignalObject, joinClasses, prepareProps, Props } from './utility/props'
import { Slot } from './utility/Slot'

export type MultiSelectToggleButtonsProps<T extends readonly (string | number)[]> = Props<{
  values: T
  labels?: Partial<Record<T[number], JSX.Element>> | ((value: T[number]) => JSX.Element)
  selected?: ReadonlySet<T[number]>
  fullWidth?: boolean
  onChangeSelected?: (selected: ReadonlySet<T[number]>) => void
}>

export function MultiSelectToggleButtons<const T extends readonly (string | number)[]>(
  rawProps: MultiSelectToggleButtonsProps<T>
) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      selected: new Set(),
      fullWidth: false,
    },
    ['values', 'labels', 'onChangeSelected']
  )

  function getLabel(value: T[number]): JSX.Element {
    if (props.labels instanceof Function) return props.labels(value)
    else return props.labels?.[value] ?? value
  }

  const selectedSignal = createNormalizedSignalObject(
    props.selected,
    () => {
      const valueSet = new Set(props.values)
      // Avoid cloning for equivalence testing in createNormalizedSignalObject.
      return isSubset(props.selected, valueSet) ? props.selected : intersectionOf(props.selected, valueSet)
    },
    props.onChangeSelected
  )

  createDeferEffect(selectedSignal.get, async () => {
    const selected = selectedSignal.value
    props.onChangeSelected?.(selected)
  })

  return (
    <div
      {...restProps}
      class={joinClasses(rawProps, 'solid-design-parts-MultiSelectToggleButtons_root', {
        'solid-design-parts-MultiSelectToggleButtons_full-width': props.fullWidth,
      })}
    >
      <For each={props.values}>
        {(value: T[number]) => (
          <button
            class="solid-design-parts-MultiSelectToggleButtons_button"
            type="button"
            aria-selected={selectedSignal.value.has(value)}
            onClick={() => (selectedSignal.value = toggle(selectedSignal.value, value))}
          >
            <Slot content={props.children} params={{ value }}>
              {getLabel(value)}
            </Slot>
          </button>
        )}
      </For>
    </div>
  )
}
