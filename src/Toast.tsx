import { call } from 'base-up'
import { JSX } from 'solid-js'
import { Icon } from './Icon'
import { IconButton } from './IconButton'
import alertIcon from './image/alert.svg'
import checkCircleIcon from './image/check-circle.svg'
import closeIcon from './image/close.svg'
import informationIcon from './image/information.svg'
import css from './Toast.scss'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type ToastProps = {
  type: 'success' | 'error' | 'info'
  message: JSX.Element
  durationMs: number
  href?: string
  onClick?: (event: MouseEvent) => void
  /** Injected closure function to close the toast. */
  close: () => void
}

export function Toast(props: ToastProps) {
  return (
    <a
      class="mantle-ui-Toast_root"
      classList={{ 'mantle-ui-Toast_clickable': props.onClick !== undefined }}
      href={props.href}
      onClick={props.onClick}
    >
      <div class="mantle-ui-Toast_icon-area">
        {call(() => {
          switch (props.type) {
            case 'success':
              return <Icon src={checkCircleIcon} color="var(--mantle-ui-success-color)" size="1.7em" />
            case 'error':
              return <Icon src={alertIcon} color="var(--mantle-ui-error-color)" size="1.7em" />
            case 'info':
              return <Icon src={informationIcon} color="var(--mantle-ui-primary-color)" size="1.7em" />
          }
        })}
      </div>
      <div class="mantle-ui-Toast_message">{props.message}</div>
      <div class="mantle-ui-Toast_close-button-area">
        <IconButton src={closeIcon} onClick={props.close} />
      </div>
    </a>
  )
}
