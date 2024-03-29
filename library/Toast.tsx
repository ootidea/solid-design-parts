import { call } from 'base-up'
import { JSX } from 'solid-js'
import './common.scss'
import { Icon } from './Icon'
import { IconButton } from './IconButton'
import alertIcon from './image/alert.svg'
import checkCircleIcon from './image/check-circle.svg'
import closeIcon from './image/close.svg'
import informationIcon from './image/information.svg'
import './Toast.scss'

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
      class="solid-design-parts-Toast_root"
      classList={{ 'solid-design-parts-Toast_clickable': props.onClick !== undefined }}
      href={props.href}
      role={props.type === 'error' ? 'alert' : 'status'}
      onClick={props.onClick}
    >
      <div class="solid-design-parts-Toast_icon-area">
        {call(() => {
          switch (props.type) {
            case 'success':
              return <Icon src={checkCircleIcon} color="var(--solid-design-parts-success-color)" size="1.7em" />
            case 'error':
              return <Icon src={alertIcon} color="var(--solid-design-parts-error-color)" size="1.7em" />
            case 'info':
              return <Icon src={informationIcon} color="var(--solid-design-parts-primary-color)" size="1.7em" />
          }
        })}
      </div>
      <div class="solid-design-parts-Toast_message">{props.message}</div>
      <div class="solid-design-parts-Toast_close-button-area">
        <IconButton src={closeIcon} onClick={props.close} />
      </div>
    </a>
  )
}
