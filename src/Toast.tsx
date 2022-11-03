import { JSX } from 'solid-js'
import css from './Toast.scss'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type ToastProps = { message: JSX.Element; durationMs: number }

export function Toast(props: ToastProps) {
  return <div class="skel-Toast_root">{props.message}</div>
}
