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
  // A variable required to render props.children until animation is complete.
  let lastTruthyValue = props.when
  createDeferEffect(
    () => props.when,
    () => {
      if (props.when) {
        lastTruthyValue = props.when
      }

      lastAnimation?.cancel()
      if (props.when) {
        shouldBeInDomSignal.value = true
        lastAnimation = element?.animate(props.animation.keyframes, props.animation.options)
        lastAnimation?.addEventListener('finish', () => {
          props.onFinishEnterAnimation?.()
        })
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
        <Slot content={props.children} params={lastTruthyValue!} />
      </Show>
    </div>
  )
}
