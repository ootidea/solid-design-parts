import { createEffect, createSignal, For } from 'solid-js'
import css from './ToggleButtons.scss'
import { call } from './utility/others'
import { joinClasses, prepareProps, Props, SlotProp } from './utility/props'
import { registerCss } from './utility/registerCss'
import { Slot } from './utility/Slot'

registerCss(css)

export type ToggleButtonsProps<T extends string | number> = Props<
  (
    | {
        exclusive: true
        selected?: T | undefined
        onChangeSelected?: (state: T | undefined) => void
        disableDeselection?: boolean
      }
    | { exclusive?: false; selected?: Set<T>; onChangeSelected?: (state: Set<T>) => void }
  ) & {
    values: readonly T[]
    titles?: Partial<Record<string, string>>
    fullWidth?: boolean
    children?: SlotProp<{ value: T }>
    onSelect?: (selected: T) => void
    onDeselect?: (selected: T) => void
  }
>

export function ToggleButtons<T extends string | number>(rawProps: ToggleButtonsProps<T>) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      fullWidth: false,
      disableDeselection: false,
      exclusive: false,
    },
    ['values', 'titles', 'selected', 'onSelect', 'children']
  )

  const union = call(() => {
    if (rawProps.exclusive) {
      const [selected, setSelected] = createSignal(rawProps.selected)
      createEffect(() => setSelected(() => rawProps.selected))
      return {
        exclusive: true,
        selected,
        setSelected,
        onChangeSelected: rawProps.onChangeSelected,
        disableDeselection: rawProps.disableDeselection,
      } as const
    } else {
      const [selected, setSelected] = createSignal(rawProps.selected ?? new Set<T>(), {
        equals: false,
      })
      createEffect(() => setSelected(rawProps.selected ?? new Set<T>()))
      return {
        exclusive: false,
        selected,
        setSelected,
        onChangeSelected: rawProps.onChangeSelected,
      } as const
    }
  })

  function isSelected(value: T) {
    if (union.exclusive) {
      return union.selected() === value
    } else {
      return union.selected().has(value)
    }
  }

  function clickEventHandler(value: T) {
    if (union.exclusive) {
      if (union.selected() !== value) {
        union.setSelected(() => value)
        union.onChangeSelected?.(value)
        props.onSelect?.(value)
      } else if (!union.disableDeselection) {
        union.setSelected(undefined)
        union.onChangeSelected?.(undefined)
        props.onDeselect?.(value)
      }
    } else {
      if (union.selected().has(value)) {
        union.selected().delete(value)
        union.setSelected(union.selected())
        union.onChangeSelected?.(union.selected())
        props.onDeselect?.(value)
      } else {
        union.selected().add(value)
        union.setSelected(union.selected())
        union.onChangeSelected?.(union.selected())
        props.onSelect?.(value)
      }
    }
  }

  return (
    <div
      class={joinClasses(rawProps, 'skel-ToggleButtons_root', {
        'skel-ToggleButtons_full-width': props.fullWidth,
        'skel-ToggleButtons_exclusive': props.exclusive,
      })}
      {...restProps}
    >
      <For each={props.values}>
        {(value: T) => (
          <button
            class="skel-ToggleButtons_button"
            type="button"
            aria-selected={isSelected(value)}
            onClick={(event) => {
              event.preventDefault()
              clickEventHandler(value)
            }}
          >
            <Slot content={props.children} params={{ value }}>
              {props.titles?.[String(value)] ?? value}
            </Slot>
          </button>
        )}
      </For>
    </div>
  )
}
