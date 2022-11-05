import { createEffect, createSignal, on, Show } from 'solid-js'
import { prepareProps, SkelProps, SkelSlot } from './utility/props'
import { Slot } from './utility/Slot'

export type ScaleYAnimationProps<T> = SkelProps<{
  shown?: T | undefined | null
  options?: number | KeyframeAnimationOptions
  onFinishEnterAnimation?: () => void
  onFinishExitAnimation?: () => void
  children?: SkelSlot<T>
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

  // Signal variable to use the defer option for props.shown.
  const [bindingShown, setBindingShown] = createSignal(props.shown)
  // A variable required to render props.children.
  let lastNonFalsyShown = props.shown
  createEffect(() => {
    if (props.shown) {
      lastNonFalsyShown = props.shown
    }

    setBindingShown(() => props.shown)
  })

  // Animate when props.shown is changed.
  createEffect(on(bindingShown, (newShown) => changeShown(Boolean(newShown)), { defer: true }))

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
    <div class="skel-ScaleYAnimation_root" ref={element}>
      <Show when={shown()}>
        <Slot content={props.children} params={lastNonFalsyShown!} />
      </Show>
    </div>
  )
}
