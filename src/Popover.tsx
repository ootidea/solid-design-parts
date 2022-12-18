import { createSignal, Show } from 'solid-js'
import { Portal } from 'solid-js/web'
import css from './Popover.scss'
import { setupFocusTrap } from './utility/others'
import {
  EnneaPosition,
  toHorizontalPosition,
  toOpposite,
  toVerticalPosition,
  toXPercent,
  toYPercent,
} from './utility/position'
import { prepareProps, Props, SlotProp } from './utility/props'
import { registerCss } from './utility/registerCss'
import { Slot } from './utility/Slot'

registerCss(css)

export type PopoverProps = Props<{
  on?: EnneaPosition
  joint?: EnneaPosition | undefined
  persistent?: boolean
  ignoreEscKey?: boolean
  onClose?: () => void
  launcher?: SlotProp<{ open: () => void; close: () => void; toggle: () => void }>
  frame?: SlotProp<{ open: () => void; close: () => void; toggle: () => void }>
  children?: SlotProp<{ open: () => void; close: () => void; toggle: () => void }>
}>

export function Popover(rawProps: PopoverProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      on: 'bottom',
      joint: undefined,
      persistent: false,
      ignoreEscKey: false,
    },
    ['style']
  )

  const [opened, setOpened] = createSignal(false)

  function open() {
    if (launcher === undefined) return

    const range = document.createRange()
    range.selectNodeContents(launcher)
    launcherRect = range.getBoundingClientRect()
    setOpened(true)
  }

  function close() {
    setOpened(false)
    props.onClose?.()
  }

  function toggle() {
    if (opened()) {
      close()
    } else {
      open()
    }
  }

  let launcher: HTMLDivElement | undefined
  let launcherRect: DOMRect | undefined

  function onOperateOverlay(event: Event) {
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
      <div class="skel-Popover_launcher" ref={launcher}>
        <Slot content={rawProps.launcher} params={{ open, close, toggle }} />
      </div>
      <Show when={opened()}>
        <Portal>
          <div
            class="skel-Popover_overlay"
            style={{
              '--skel-Popover_left': launcherRect ? `${launcherRect.left}px` : '0',
              '--skel-Popover_right': launcherRect ? `${launcherRect.right}px` : '0',
              '--skel-Popover_top': launcherRect ? `${launcherRect.top}px` : '0',
              '--skel-Popover_bottom': launcherRect ? `${launcherRect.bottom}px` : '0',
              '--skel-Popover_transform': `translate(-${toXPercent(props.joint ?? toOpposite(props.on))}, -${toYPercent(
                props.joint ?? toOpposite(props.on)
              )})`,
            }}
            data-horizontal-position={toHorizontalPosition(props.on)}
            data-vertical-position={toVerticalPosition(props.on)}
            tabindex={-1}
            ref={(element) => setupFocusTrap(element)}
            onClick={onOperateOverlay}
            onTouchMove={onOperateOverlay}
            onMouseWheel={onOperateOverlay}
            onKeyDown={onKeyDown}
            {...restProps}
          >
            <Slot content={rawProps.frame} params={{ open, close, toggle }}>
              <div class="skel-Popover_frame">
                <Slot content={rawProps.children} params={{ open, close, toggle }} />
              </div>
            </Slot>
          </div>
        </Portal>
      </Show>
    </>
  )
}
