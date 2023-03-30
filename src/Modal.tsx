import { Show } from 'solid-js'
import { Portal } from 'solid-js/web'
import './common.scss'
import { FadeAnimation } from './FadeAnimation'
import { IconButton } from './IconButton'
import closeIcon from './image/close.svg'
import './Modal.scss'
import { Scrollable } from './Scrollable'
import { TitleBarLayout } from './TitleBarLayout'
import { CssColor } from './utility/color'
import { setupFocusTrap } from './utility/others'
import { createInjectableSignal, joinClasses, joinStyle, prepareProps, Props, SlotProp } from './utility/props'
import { Slot } from './utility/Slot'

export type ModalProps = Props<{
  opened?: boolean
  persistent?: boolean
  showCloseButton?: boolean
  ignoreEscKey?: boolean
  onChangeOpened?: (opened: boolean) => void
  launcher?: SlotProp<{ open: () => void; close: () => void; toggle: () => void }>
  title?: SlotProp<{ open: () => void; close: () => void; toggle: () => void }>
  children?: SlotProp<{ open: () => void; close: () => void; toggle: () => void }>
  footer?: SlotProp<{ open: () => void; close: () => void; toggle: () => void }>
  overlayBackgroundColor?: CssColor
}>

export function Modal(rawProps: ModalProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      persistent: false,
      opened: false,
      showCloseButton: false,
      ignoreEscKey: false,
      overlayBackgroundColor: 'var(--solid-design-parts-Modal_overlay-background-default-color)',
    },
    ['onChangeOpened', 'launcher', 'title', 'footer']
  )

  const [opened, setOpened] = createInjectableSignal(props, 'opened')
  function changeOpened(opened: boolean) {
    setOpened(opened)
    props.onChangeOpened?.(opened)
  }

  const open = () => changeOpened(true)
  const close = () => changeOpened(false)
  const toggle = () => changeOpened(!opened())

  function onClickOverlay(event: Event) {
    if (event.target !== event.currentTarget) return

    event.preventDefault()
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
            class={joinClasses(rawProps, 'solid-design-parts-Modal_root')}
            style={joinStyle(rawProps.style, {
              '--solid-design-parts-Modal_overlay-background-color': props.overlayBackgroundColor,
            })}
            tabindex={-1}
            ref={(element) => setupFocusTrap(element)}
            onClick={onClickOverlay}
            onKeyDown={onKeyDown}
          >
            <div class="solid-design-parts-Modal_frame" role="dialog">
              <Show when={props.showCloseButton || rawProps.title} fallback={<div />}>
                <TitleBarLayout
                  class="solid-design-parts-Modal_header"
                  right={
                    <Show when={props.showCloseButton}>
                      <IconButton src={closeIcon} onClick={close} />
                    </Show>
                  }
                >
                  <div class="solid-design-parts-Modal_title">
                    <Slot content={rawProps.title} params={{ open, close, toggle }} />
                  </div>
                </TitleBarLayout>
              </Show>
              <Scrollable {...restProps} class="solid-design-parts-Modal_body">
                <Slot content={rawProps.children} params={{ open, close, toggle }} />
              </Scrollable>
              <div class="solid-design-parts-Modal_footer">
                <Slot content={props.footer} params={{ open, close, toggle }} />
              </div>
            </div>
          </div>
        </FadeAnimation>
      </Portal>
    </>
  )
}
