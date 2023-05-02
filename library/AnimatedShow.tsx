import { Show } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
import './common.scss'
import { createFadeAnimation, SolidDesignPartsAnimation } from './SolidDesignPartsAnimation'
import { createDeferEffect, prepareProps, Props, SlotProp } from './utility/props'
import { Slot } from './utility/Slot'

export type AnimatedShowProps<T> = Props<{
  when: T | undefined | null
  animation?: SolidDesignPartsAnimation
  animateOnMount?: boolean
  onFinishEnterAnimation?: () => void
  onFinishExitAnimation?: () => void
  children?: SlotProp<T>
}>

export function AnimatedShow<const T>(rawProps: AnimatedShowProps<T>) {
  const [props, restProps] = prepareProps(rawProps, { animation: createFadeAnimation(), animateOnMount: false }, [
    'when',
    'onFinishEnterAnimation',
    'onFinishExitAnimation',
    'children',
  ])

  let rootElement: HTMLDivElement | undefined
  let isFirstRendering = true

  // Signal variable indicating whether props.children should be present on the DOM.
  const shouldBeInDomSignal = createSignalObject(Boolean(props.when))

  let lastAnimation: Animation | undefined
  // A variable to keep displaying the content between when props.when becomes falsy and the completion of the animation.
  const lastTruthyValueSignal = createSignalObject(props.when)
  createDeferEffect(
    () => props.when,
    () => {
      if (props.when) {
        lastTruthyValueSignal.value = props.when
        shouldBeInDomSignal.value = true
      } else {
        lastAnimation?.cancel()
        lastAnimation = rootElement?.animate(props.animation.keyframes, {
          ...props.animation.options,
          direction: 'reverse',
        })
        lastAnimation?.addEventListener('finish', () => {
          lastAnimation = undefined
          shouldBeInDomSignal.value = false
          rootElement = undefined
          props.onFinishExitAnimation?.()
        })
      }
    }
  )

  return (
    <Show when={shouldBeInDomSignal.value}>
      <div
        class="solid-design-parts-AnimatedShow_root"
        ref={(element) => {
          rootElement = element

          if (!isFirstRendering || props.animateOnMount) {
            lastAnimation = rootElement?.animate(props.animation.keyframes, props.animation.options)
            lastAnimation?.addEventListener('finish', () => {
              lastAnimation = undefined
              props.onFinishEnterAnimation?.()
            })
          }

          isFirstRendering = false
        }}
      >
        <Slot content={props.children} params={lastTruthyValueSignal.value!} />
      </div>
    </Show>
  )
}
