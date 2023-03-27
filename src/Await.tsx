import { call } from 'base-up'
import { JSX } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'

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
  const state = createSignalObject<State>({ status: 'loading' })
  props.promise.then(
    (value) => (state.value = { status: 'then', value }),
    (value) => (state.value = { status: 'catch', value })
  )
  createDeferEffect(
    () => props.promise,
    () => {
      state.value = { status: 'loading' }
      props.promise.then(
        (value) => (state.value = { status: 'then', value }),
        (value) => (state.value = { status: 'catch', value })
      )
    }
  )

  return (
    <>
      {call(() => {
        switch (state.value.status) {
          case 'loading':
            return props.loading
          case 'then':
            return <Slot content={props.children} params={state.value.value} />
          case 'catch':
            return <Slot content={props.catch} params={state.value.value} />
        }
      })}
    </>
  )
}
