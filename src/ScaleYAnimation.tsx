import { createRenderEffect, createSignal, on, Show } from 'solid-js'
import { prepareProps, Props, SlotProp } from './utility/props'
import { Slot } from './utility/Slot'

export type ScaleYAnimationProps<T> = Props<{
  shown?: T | undefined | null
  options?: number | KeyframeAnimationOptions
  onFinishEnterAnimation?: () => void
  onFinishExitAnimation?: () => void
  children?: SlotProp<T>
}>

export function ScaleYAnimation<T>(rawProps: ScaleYAnimationProps<T>) {
  const [props, restProps] = prepareProps(rawProps, { options: 250 }, [
    'shown',
    'onFinishEnterAnimation',
    'onFinishExitAnimation',
    'children',
  ])

  let element: HTMLDivElement | undefined

  // Signal variable indicating whether props.children should be present on the DOM.
  const [shown, setShown] = createSignal(Boolean(props.shown))

  // A variable required to render props.children until animation is complete.
  let lastNonFalsyShown = props.shown
  createRenderEffect(
    on(
      () => props.shown,
      () => {
        if (props.shown) {
          lastNonFalsyShown = props.shown
        }

        changeShown(Boolean(props.shown))
      },
      { defer: true }
    )
  )

  function changeShown(newShown: boolean) {
    if (newShown === Boolean(shown())) return

    if (!newShown) {
      if (element !== undefined) {
        const animation = element.animate([{ transform: 'scaleY(1)' }, { transform: 'scaleY(0)' }], props.options)
        animation.addEventListener('finish', () => {
          setShown(newShown)
          props.onFinishExitAnimation?.()
        })
      }
    } else {
      setShown(newShown)
      const animation = element?.animate([{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], props.options)
      animation?.addEventListener('finish', () => {
        props.onFinishEnterAnimation?.()
      })
    }
  }

  return (
    <div class="mantle-ui-ScaleYAnimation_root" ref={element}>
      <Show when={shown()}>
        <Slot content={props.children} params={lastNonFalsyShown!} />
      </Show>
    </div>
  )
}
