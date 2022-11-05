import { createEffect, createSignal, Show } from 'solid-js'
import { Portal } from 'solid-js/web'
import { FadeAnimation } from './FadeAnimation'
import { IconButton } from './IconButton'
import closeIcon from './image/close.svg'
import css from './Modal.scss'
import { Scrollable } from './Scrollable'
import { TitleBarLayout } from './TitleBarLayout'
import { setupFocusTrap } from './utility/others'
import { joinClasses, prepareProps, SkelProps, SkelSlot } from './utility/props'
import { registerCss } from './utility/registerCss'
import { Slot } from './utility/Slot'

registerCss(css)

export type ModalProps = SkelProps<{
  opened?: boolean
  persistent?: boolean
  showCloseButton?: boolean
  ignoreEscKey?: boolean
  onChangeOpened?: (opened: boolean) => void
  launcher?: SkelSlot<{ open: () => void; close: () => void; toggle: () => void }>
  title?: SkelSlot<{ open: () => void; close: () => void; toggle: () => void }>
  children?: SkelSlot<{ open: () => void; close: () => void; toggle: () => void }>
  footer?: SkelSlot<{ open: () => void; close: () => void; toggle: () => void }>
}>

export function Modal(rawProps: ModalProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      persistent: false,
      opened: false,
      showCloseButton: false,
      ignoreEscKey: false,
    },
    ['onChangeOpened', 'launcher', 'title', 'footer']
  )

  const [opened, setOpened] = createSignal(props.opened)
  createEffect(() => setOpened(props.opened))

  function changeOpened(opened: boolean) {
    setOpened(opened)
    props.onChangeOpened?.(opened)
  }

  const open = () => changeOpened(true)
  const close = () => changeOpened(false)
  const toggle = () => changeOpened(!opened())

  function onClickOverlay(event: Event) {
    if (event.target !== event.currentTarget) return

    if (!props.persistent) {
      close()
    }
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.isComposing || event.defaultPrevented) return

    if (event.code === 'Escape' && opened() && !props.persistent && !props.ignoreEscKey) {
      event.preventDefault()
      close()
    }
  }

  return (
    <>
      <Slot content={rawProps.launcher} params={{ open, close, toggle }} />
      <Portal>
        <FadeAnimation shown={opened()}>
          <div
            class={joinClasses(rawProps, 'skel-Modal_root')}
            tabindex={-1}
            ref={(element) => setupFocusTrap(element)}
            onClick={onClickOverlay}
            onKeyDown={onKeyDown}
          >
            <div class="skel-Modal_frame" role="dialog">
              <Show when={props.showCloseButton || rawProps.title} fallback={<div />}>
                <TitleBarLayout
                  class="skel-Modal_header"
                  right={
                    <Show when={props.showCloseButton}>
                      <IconButton src={closeIcon} onClick={close} />
                    </Show>
                  }
                >
                  <div class="skel-Modal_title">
                    <Slot content={rawProps.title} params={{ open, close, toggle }} />
                  </div>
                </TitleBarLayout>
              </Show>
              <Scrollable class="skel-Modal_body" {...restProps}>
                <Slot content={rawProps.children} params={{ open, close, toggle }} />
              </Scrollable>
              <div class="skel-Modal_footer">
                <Slot content={props.footer} params={{ open, close, toggle }} />
              </div>
            </div>
          </div>
        </FadeAnimation>
      </Portal>
    </>
  )
}
