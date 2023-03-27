import { call } from 'base-up'
import { createSignal, JSX } from 'solid-js'

import { createDeferEffect, prepareProps, SlotProp } from './utility/props'
import { Slot } from './utility/Slot'

export type AwaitProps<T> = {
  promise: PromiseLike<T>
  children?: SlotProp<T>
  loading?: JSX.Element
  catch?: SlotProp<any>
}

export function Await<T>(rawProps: AwaitProps<T>) {
  const [props, restProps] = prepareProps(rawProps, {}, ['promise', 'children', 'loading', 'catch'])

  type State = { status: 'loading' } | { status: 'then'; value: T } | { status: 'catch'; value: any }
  const [state, setState] = createSignal<State>({ status: 'loading' })
  props.promise.then(
    (value) => setState({ status: 'then', value }),
    (value) => setState({ status: 'catch', value })
  )
  createDeferEffect(
    () => props.promise,
    () => {
      setState({ status: 'loading' })
      props.promise.then(
        (value) => setState({ status: 'then', value }),
        (value) => setState({ status: 'catch', value })
      )
    }
  )

  return (
    <>
      {call(() => {
        const currentState = state()
        switch (currentState.status) {
          case 'loading':
            return props.loading
          case 'then':
            return <Slot content={props.children} params={currentState.value} />
          case 'catch':
            return <Slot content={props.catch} params={currentState.value} />
        }
      })}
    </>
  )
}
