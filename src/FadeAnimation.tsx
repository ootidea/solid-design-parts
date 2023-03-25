import { createRenderEffect, createSignal, on, Show } from 'solid-js'
import { prepareProps, Props, SlotProp } from './utility/props'
import { Slot } from './utility/Slot'

export type FadeAnimationProps<T> = Props<{
  shown?: T | undefined | null
  durationMs?: number
  onFinishEnterAnimation?: () => void
  onFinishExitAnimation?: () => void
  children?: SlotProp<T>
}>

export function FadeAnimation<T>(rawProps: FadeAnimationProps<T>) {
  const [props, restProps] = prepareProps(rawProps, { durationMs: 250 }, [
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

    const options: KeyframeAnimationOptions = { duration: props.durationMs }

    if (!newShown) {
      const animation = element?.animate([{ opacity: 1 }, { opacity: 0 }], options)
      animation?.addEventListener('finish', () => {
        setShown(newShown)
        props.onFinishExitAnimation?.()
      })
    } else {
      setShown(newShown)
      const animation = element?.animate([{ opacity: 0 }, { opacity: 1 }], options)
      animation?.addEventListener('finish', () => {
        props.onFinishEnterAnimation?.()
      })
    }
  }

  return (
    <div class="solid-design-parts-FadeAnimation_root" ref={element}>
      <Show when={shown()}>
        <Slot content={props.children} params={lastNonFalsyShown!} />
      </Show>
    </div>
  )
}
