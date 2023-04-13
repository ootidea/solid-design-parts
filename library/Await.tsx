import { Promisable } from 'base-up'
import { createRenderEffect, JSX, untrack } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
import { SlotProp } from './utility/props'
import { Slot } from './utility/Slot'

export type AwaitProps<T> = {
  value: Promisable<T>
  children?: SlotProp<T>
  loading?: JSX.Element
  catch?: SlotProp<any>
  showPreviousValueDuringAwait?: boolean
}

export function Await<T>(props: AwaitProps<T>) {
  const result = createSignalObject<JSX.Element>(undefined)

  createRenderEffect(async () => {
    if (untrack(result.get) === undefined || !untrack(() => props.showPreviousValueDuringAwait)) {
      result.value = props.loading
    }

    try {
      const params = await props.value
      result.value = <Slot content={props.children} params={params} />
    } catch (error) {
      result.value = <Slot content={props.catch} params={error} />
    }
  })

  return <>{result.value}</>
}
