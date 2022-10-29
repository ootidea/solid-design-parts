import { ParentProps } from 'solid-js/types/render/component'
import { SkelSlot } from './props'

export type SlotProps<T> = ParentProps<{ content: SkelSlot<T> | undefined; params: T }>

export function Slot<T>(props: SlotProps<T>) {
  if (props.content instanceof Function) {
    // Reactivity lost when using Dynamic components.
    return <>{props.content(props.params)}</>
  } else {
    return <>{props.content ?? props.children}</>
  }
}
