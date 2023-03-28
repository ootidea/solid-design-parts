import { call } from 'base-up'
import { createRenderEffect, createSignal, For } from 'solid-js'
import css from './ToggleButtons.scss'
import { createInjectableSignal, joinClasses, prepareProps, Props, SlotProp } from './utility/props'
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
    labels?: Partial<Record<string, string>>
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
    ['values', 'labels', 'selected', 'onSelect', 'children']
  )

  const union = call(() => {
    if (rawProps.exclusive) {
      const [selected, setSelected] = createInjectableSignal(rawProps, 'selected')
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
      createRenderEffect(() => setSelected(rawProps.selected ?? new Set<T>()))
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
      {...restProps}
      class={joinClasses(rawProps, 'solid-design-parts-ToggleButtons_root', {
        'solid-design-parts-ToggleButtons_full-width': props.fullWidth,
        'solid-design-parts-ToggleButtons_exclusive': props.exclusive,
      })}
    >
      <For each={props.values}>
        {(value: T) => (
          <button
            class="solid-design-parts-ToggleButtons_button"
            type="button"
            aria-selected={isSelected(value)}
            onClick={() => clickEventHandler(value)}
          >
            <Slot content={props.children} params={{ value }}>
              {props.labels?.[String(value)] ?? value}
            </Slot>
          </button>
        )}
      </For>
    </div>
  )
}
