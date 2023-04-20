import { JSX } from 'solid-js'
import './common.scss'

export function Const<const T>(props: { value: T; children?: (value: T) => JSX.Element }) {
  return props.children?.(props.value)
}
