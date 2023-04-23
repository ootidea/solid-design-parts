import { Show } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
import './common.scss'
import { createFadeAnimation, SolidDesignPartsAnimation } from './SolidDesignPartsAnimation'
import { createDeferEffect, prepareProps, Props, SlotProp } from './utility/props'
import { Slot } from './utility/Slot'

export type AnimatedShowProps<T> = Props<{
  when: T | undefined | null
  animation?: SolidDesignPartsAnimation
  onFinishEnterAnimation?: () => void
  onFinishExitAnimation?: () => void
  children?: SlotProp<T>
}>

export function AnimatedShow<const T>(rawProps: AnimatedShowProps<T>) {
  const [props, restProps] = prepareProps(rawProps, { animation: createFadeAnimation() }, [
    'when',
    'onFinishEnterAnimation',
    'onFinishExitAnimation',
    'children',
  ])

  let element: HTMLDivElement | undefined

  // Signal variable indicating whether props.children should be present on the DOM.
  const shouldBeInDomSignal = createSignalObject(Boolean(props.when))

  let lastAnimation: Animation | undefined
  // A variable to keep displaying the content between when props.when becomes falsy and the completion of the animation.
  const lastTruthyValueSignal = createSignalObject(props.when)
  createDeferEffect(
    () => props.when,
    () => {
      lastAnimation?.cancel()
      if (props.when) {
        lastTruthyValueSignal.value = props.when

        if (!shouldBeInDomSignal.value) {
          shouldBeInDomSignal.value = true
          lastAnimation = element?.animate(props.animation.keyframes, props.animation.options)
          lastAnimation?.addEventListener('finish', () => {
            props.onFinishEnterAnimation?.()
          })
        }
      } else {
        lastAnimation = element?.animate(props.animation.keyframes, {
          ...props.animation.options,
          direction: 'reverse',
        })
        lastAnimation?.addEventListener('finish', () => {
          shouldBeInDomSignal.value = false
          props.onFinishExitAnimation?.()
        })
      }
    }
  )

  return (
    <div class="solid-design-parts-AnimatedShow_root" ref={element}>
      <Show when={shouldBeInDomSignal.value}>
        <Slot content={props.children} params={lastTruthyValueSignal.value!} />
      </Show>
    </div>
  )
}