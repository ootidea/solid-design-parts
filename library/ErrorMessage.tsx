import './common.scss'
import './ErrorMessage.scss'
import { joinClasses, prepareProps, Props } from './utility/props'

export type ErrorMessageProps = Props<{}, 'p'>

export function ErrorMessage(rawProps: ErrorMessageProps) {
  const [props, restProps] = prepareProps(rawProps, {})
  return (
    <p {...restProps} class={joinClasses(rawProps, 'solid-design-parts-ErrorMessage_root')} role="alert">
      {rawProps.children}
    </p>
  )
}
