import { createEffect, createSignal, on, Show } from 'solid-js'
import { prepareProps, SkelProps, SkelSlot } from './utility/props'
import { Slot } from './utility/Slot'

export type ScaleYAnimationProps = SkelProps<{
  shown?: boolean
  options?: number | KeyframeAnimationOptions
  onFinishEnterAnimation?: () => void
  onFinishExitAnimation?: () => void
  launcher?: SkelSlot<{ show: () => void; hide: () => void; toggle: () => void }>
  children?: SkelSlot<{ show: () => void; hide: () => void; toggle: () => void }>
}>

export function ScaleYAnimation(rawProps: ScaleYAnimationProps) {
  const [props, restProps] = prepareProps(rawProps, { shown: true, options: 250 }, [
    'onFinishEnterAnimation',
    'onFinishExitAnimation',
    'launcher',
    'children',
  ])

  let element: HTMLDivElement | undefined

  // Signal variable indicating whether props.children should be present on the DOM.
  const [shown, setShown] = createSignal(props.shown)

  // Signal variable to use the defer option for props.shown.
  const [bindingShown, setBindingShown] = createSignal(props.shown)
  createEffect(() => setBindingShown(props.shown))

  // Animate when props.shown is changed.
  createEffect(on(bindingShown, (newShown) => changeShown(newShown), { defer: true }))

  function changeShown(newShown: boolean) {
    if (newShown === shown()) return

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
  const show = () => changeShown(true)
  const hide = () => changeShown(false)
  const toggle = () => changeShown(!shown())

  return (
    <>
      <Slot content={props.launcher} params={{ show, hide, toggle }} />
      <div class="skel-ScaleYAnimation_root" ref={element}>
        <Show when={shown()}>
          <Slot content={props.children} params={{ show, hide, toggle }} />
        </Show>
      </div>
    </>
  )
}
