import './common.scss'
import { createFadeAnimation, SolidDesignPartsAnimation } from './SolidDesignPartsAnimation'
import { prepareProps, Props } from './utility/props'

export type AnimateOnViewProps<T> = Props<{
  animation?: SolidDesignPartsAnimation
  onFinishEnterAnimation?: () => void
}>

export function AnimateOnView<const T>(rawProps: AnimateOnViewProps<T>) {
  const [props, restProps] = prepareProps(rawProps, { animation: createFadeAnimation() }, [
    'onFinishEnterAnimation',
    'children',
  ])

  return (
    <div
      class="solid-design-parts-AnimateOnView_root"
      ref={(element) => {
        const observer = new IntersectionObserver((entries) => {
          const entry = entries.find((entry) => entry.target === element)
          if (entry?.isIntersecting) {
            element.animate(props.animation.keyframes, props.animation.options)
          }
        })
        observer.observe(element)
      }}
    >
      {props.children}
    </div>
  )
}
