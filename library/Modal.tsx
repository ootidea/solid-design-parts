import { Show } from 'solid-js'
import { Portal } from 'solid-js/web'
import { AnimatedShow } from './AnimatedShow'
import './common.scss'
import { IconButton } from './IconButton'
import closeIcon from './image/close.svg'
import './Modal.scss'
import { Scrollable } from './Scrollable'
import { createFadeAnimation } from './SolidDesignPartsAnimation'
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
  /** Flag to determine whether to display the modal or not */
  opened?: boolean
  disableAutoClose?: boolean
  /** Flag to display the close button */
  showCloseButton?: boolean
  ignoreEscKey?: boolean
  /** Callback function that is called when {@link opened} changes */
  onChangeOpened?: (opened: boolean) => void
  launcher?: SlotProp<{ openModal: () => void; closeModal: () => void; toggleModal: () => void }>
  /** Title of the modal content */
  title?: SlotProp<{ openModal: () => void; closeModal: () => void; toggleModal: () => void }>
  /**
   * Content of the modal.
   * If the content does not fit on the screen, the content area becomes scrollable.
   */
  children?: SlotProp<{ openModal: () => void; closeModal: () => void; toggleModal: () => void }>
  /**
   * Footer content of the modal.
   * Even if the content area is scrollable, the footer is always displayed at the bottom.
   */
  footer?: SlotProp<{ openModal: () => void; closeModal: () => void; toggleModal: () => void }>
  /** CSS background-color of the overlay */
  overlayBackgroundColor?: CssColor
}>

export function Modal(rawProps: ModalProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      disableAutoClose: false,
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
    if (!props.disableAutoClose) {
      closeModal()
    }
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.isComposing || event.defaultPrevented) return

    if (event.code === 'Escape' && openedSignal.value && !props.disableAutoClose && !props.ignoreEscKey) {
      event.preventDefault()
      closeModal()
    }
  }

  return (
    <>
      <Slot content={rawProps.launcher} params={{ openModal, closeModal, toggleModal }} />
      <Portal>
        <AnimatedShow when={openedSignal.value} animation={createFadeAnimation()}>
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
        </AnimatedShow>
      </Portal>
    </>
  )
}
