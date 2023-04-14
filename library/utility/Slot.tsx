import { ParentProps } from 'solid-js/types/render/component'
import { SlotProp } from './props'

export type SlotProps<T> = ParentProps<{ content: SlotProp<T> | undefined; params: T }>

export function Slot<const T>(props: SlotProps<T>) {
  if (props.content instanceof Function) {
    // Reactivity lost when using Dynamic components.
    return <>{props.content(props.params)}</>
  } else {
    return <>{props.content ?? props.children}</>
  }
}
