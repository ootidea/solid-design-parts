import { Show } from 'solid-js'
import { Portal } from 'solid-js/web'
import { createSignalObject } from 'solid-signal-object'
import './common.scss'
import './Popover.scss'
import { setupFocusTrap } from './utility/dom'
import {
  EnneaPosition,
  toHorizontalPosition,
  toOpposite,
  toVerticalPosition,
  toXPercent,
  toYPercent,
} from './utility/position'
import { prepareProps, Props, SlotProp } from './utility/props'
import { Slot } from './utility/Slot'

export type PopoverProps = Props<{
  placement?: EnneaPosition
  joint?: EnneaPosition | undefined
  disableAutoClose?: boolean
  ignoreEscKey?: boolean
  onClose?: () => void
  launcher?: SlotProp<{ openPopover: () => void; closePopover: () => void; togglePopover: () => void }>
  frame?: SlotProp<{ openPopover: () => void; closePopover: () => void; togglePopover: () => void }>
  children?: SlotProp<{ openPopover: () => void; closePopover: () => void; togglePopover: () => void }>
}>

export function Popover(rawProps: PopoverProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      placement: 'bottom',
      joint: undefined,
      disableAutoClose: false,
      ignoreEscKey: false,
    },
    ['style']
  )

  const opened = createSignalObject(false)

  function openPopover() {
    if (launcher === undefined) return

    const range = document.createRange()
    range.selectNodeContents(launcher)
    launcherRect = range.getBoundingClientRect()
    opened.value = true
  }

  function closePopover() {
    opened.value = false
    props.onClose?.()
  }

  function togglePopover() {
    if (opened.value) {
      closePopover()
    } else {
      openPopover()
    }
  }

  let launcher: HTMLDivElement | undefined
  let launcherRect: DOMRect | undefined

  function onOperateOverlay(event: Event) {
    if (event.target !== event.currentTarget) return

    if (!props.disableAutoClose) {
      closePopover()
    }
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.isComposing || event.defaultPrevented) return

    if (event.code === 'Escape' && opened.value && !props.disableAutoClose && !props.ignoreEscKey) {
      event.preventDefault()
      closePopover()
    }
  }

  return (
    <>
      <div class="solid-design-parts-Popover_launcher" ref={launcher}>
        <Slot content={rawProps.launcher} params={{ openPopover, closePopover, togglePopover }} />
      </div>
      <Show when={opened.value}>
        <Portal>
          <div
            {...restProps}
            class="solid-design-parts-Popover_overlay"
            style={{
              '--solid-design-parts-Popover_left': launcherRect ? `${launcherRect.left}px` : '0',
              '--solid-design-parts-Popover_right': launcherRect ? `${launcherRect.right}px` : '0',
              '--solid-design-parts-Popover_top': launcherRect ? `${launcherRect.top}px` : '0',
              '--solid-design-parts-Popover_bottom': launcherRect ? `${launcherRect.bottom}px` : '0',
              '--solid-design-parts-Popover_transform': `translate(-${toXPercent(
                props.joint ?? toOpposite(props.placement)
              )}, -${toYPercent(props.joint ?? toOpposite(props.placement))})`,
            }}
            data-horizontal-position={toHorizontalPosition(props.placement)}
            data-vertical-position={toVerticalPosition(props.placement)}
            tabindex={-1}
            ref={(element) => setupFocusTrap(element)}
            onClick={onOperateOverlay}
            onTouchMove={onOperateOverlay}
            onWheel={onOperateOverlay}
            onKeyDown={onKeyDown}
          >
            <Slot content={rawProps.frame} params={{ openPopover, closePopover, togglePopover }}>
              <div class="solid-design-parts-Popover_frame">
                <Slot content={rawProps.children} params={{ openPopover, closePopover, togglePopover }} />
              </div>
            </Slot>
          </div>
        </Portal>
      </Show>
    </>
  )
}

Popover.top = (props: PopoverProps) => <Popover placement="top" {...props} />
Popover.bottom = (props: PopoverProps) => <Popover placement="bottom" {...props} />
Popover.left = (props: PopoverProps) => <Popover placement="left" {...props} />
Popover.right = (props: PopoverProps) => <Popover placement="right" {...props} />
Popover.center = (props: PopoverProps) => <Popover placement="center" {...props} />
Popover.topLeft = (props: PopoverProps) => <Popover placement="top left" {...props} />
Popover.topRight = (props: PopoverProps) => <Popover placement="top right" {...props} />
Popover.bottomLeft = (props: PopoverProps) => <Popover placement="bottom left" {...props} />
Popover.bottomRight = (props: PopoverProps) => <Popover placement="bottom right" {...props} />
