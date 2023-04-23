import './common.scss'
import { createFadeAnimation, SolidDesignPartsAnimation } from './SolidDesignPartsAnimation'
import { prepareProps, Props } from './utility/props'

export type AnimateOnViewProps<T> = Props<{
  animation?: SolidDesignPartsAnimation
  onFinishAnimation?: () => void
}>

export function AnimateOnView<const T>(rawProps: AnimateOnViewProps<T>) {
  const [props, restProps] = prepareProps(rawProps, { animation: createFadeAnimation() }, [
    'onFinishAnimation',
    'children',
  ])

  return (
    <div
      class="solid-design-parts-AnimateOnView_root"
      ref={(element) => {
        const observer = new IntersectionObserver((entries) => {
          const entry = entries.find((entry) => entry.target === element)
          if (entry?.isIntersecting) {
            const animation = element.animate(props.animation.keyframes, props.animation.options)
            animation.addEventListener('finish', () => {
              props.onFinishAnimation?.()
            })
          }
        })
        observer.observe(element)
      }}
    >
      {props.children}
    </div>
  )
}
