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
import { setupFocusTrap } from './utility/dom'
import {
  createDeferEffect,
  createInjectableSignalObject,
  joinClasses,
  joinStyle,
  prepareProps,
  Props,
  SlotProp,
} from './utility/props'
import { Slot } from './utility/Slot'

export type ModalProps = Props<{
  opened?: boolean
  persistent?: boolean
  showCloseButton?: boolean
  ignoreEscKey?: boolean
  onChangeOpened?: (opened: boolean) => void
  launcher?: SlotProp<{ openModal: () => void; closeModal: () => void; toggleModal: () => void }>
  title?: SlotProp<{ openModal: () => void; closeModal: () => void; toggleModal: () => void }>
  children?: SlotProp<{ openModal: () => void; closeModal: () => void; toggleModal: () => void }>
  footer?: SlotProp<{ openModal: () => void; closeModal: () => void; toggleModal: () => void }>
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

  const openedSignal = createInjectableSignalObject(props, 'opened')
  createDeferEffect(openedSignal.get, () => props.onChangeOpened?.(openedSignal.value))

  const openModal = () => (openedSignal.value = true)
  const closeModal = () => (openedSignal.value = false)
  const toggleModal = () => (openedSignal.value ? closeModal() : openModal())

  function onClickOverlay(event: Event) {
    if (event.target !== event.currentTarget) return

    event.preventDefault()
    if (!props.persistent) {
      closeModal()
    }
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.isComposing || event.defaultPrevented) return

    if (event.code === 'Escape' && openedSignal.value && !props.persistent && !props.ignoreEscKey) {
      event.preventDefault()
      closeModal()
    }
  }

  return (
    <>
      <Slot content={rawProps.launcher} params={{ openModal, closeModal, toggleModal }} />
      <Portal>
        <FadeAnimation shown={openedSignal.value}>
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
                      <IconButton src={closeIcon} onClick={closeModal} />
                    </Show>
                  }
                >
                  <div class="solid-design-parts-Modal_title">
                    <Slot content={rawProps.title} params={{ openModal, closeModal, toggleModal }} />
                  </div>
                </TitleBarLayout>
              </Show>
              <Scrollable {...restProps} class="solid-design-parts-Modal_body">
                <Slot content={rawProps.children} params={{ openModal, closeModal, toggleModal }} />
              </Scrollable>
              <div class="solid-design-parts-Modal_footer">
                <Slot content={props.footer} params={{ openModal, closeModal, toggleModal }} />
              </div>
            </div>
          </div>
        </FadeAnimation>
      </Portal>
    </>
  )
}
