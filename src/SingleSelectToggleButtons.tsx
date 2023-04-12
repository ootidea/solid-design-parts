import { For, JSX } from 'solid-js'
import './common.scss'
import './SingleSelectToggleButtons.scss'
import { createDeferEffect, createNormalizedSignalObject, joinClasses, prepareProps, Props } from './utility/props'
import { Slot } from './utility/Slot'

export type SingleSelectToggleButtonsProps<T extends readonly (string | number)[]> = Props<{
  values: T
  selected?: T[number] | undefined
  labels?: Partial<Record<T[number], JSX.Element>> | ((value: T[number]) => JSX.Element)
  // TODO: implement
  // enableDeselection?: boolean
  onChangeSelected?: (selected: T[number] | undefined) => void
  fullWidth?: boolean
}>

export function SingleSelectToggleButtons<const T extends readonly (string | number)[]>(
  rawProps: SingleSelectToggleButtonsProps<T>
) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      fullWidth: false,
    },
    ['values', 'selected', 'labels', 'onChangeSelected']
  )

  const selectedSignal = createNormalizedSignalObject(
    props.selected,
    () => (props.selected !== undefined && !props.values.includes(props.selected) ? undefined : props.selected),
    props.onChangeSelected
  )

  createDeferEffect(selectedSignal.get, async () => {
    // TODO: validation
    const selected = selectedSignal.value
    props.onChangeSelected?.(selected)
  })

  function getLabel(value: T[number]): JSX.Element {
    if (props.labels instanceof Function) return props.labels(value)
    else return props.labels?.[value] ?? value
  }

  return (
    <div
      {...restProps}
      class={joinClasses(rawProps, 'solid-design-parts-SingleSelectToggleButtons_root', {
        'solid-design-parts-SingleSelectToggleButtons_full-width': props.fullWidth,
      })}
    >
      <For each={props.values}>
        {(value) => (
          <button
            class="solid-design-parts-SingleSelectToggleButtons_button"
            type="button"
            aria-selected={selectedSignal.value === value}
            onClick={() => (selectedSignal.value = value)}
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
