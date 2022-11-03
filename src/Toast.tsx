import { JSX } from 'solid-js'
import { Icon } from './Icon'
import alertIcon from './image/alert.svg'
import checkCircleIcon from './image/check-circle.svg'
import informationIcon from './image/information.svg'
import css from './Toast.scss'
import { call } from './utility/others'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type ToastProps = { type: 'success' | 'error' | 'info'; message: JSX.Element; durationMs: number }

export function Toast(props: ToastProps) {
  return (
    <div class="skel-Toast_root">
      <div class="skel-Toast_icon-area">
        {call(() => {
          switch (props.type) {
            case 'success':
              return <Icon src={checkCircleIcon} color="var(--skel-success-color)" size="1.7em" />
            case 'error':
              return <Icon src={alertIcon} color="var(--skel-error-color)" size="1.7em" />
            case 'info':
              return <Icon src={informationIcon} color="var(--skel-primary-color)" size="1.7em" />
          }
        })}
      </div>
      <div class="skel-Toast_message">{props.message}</div>
    </div>
  )
}
