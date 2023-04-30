import { children, createMemo } from 'solid-js'
import { AnimatedShow } from './AnimatedShow'
import './common.scss'
import './ErrorMessage.scss'
import { SpeechBubble } from './SpeechBubble'
import { joinClasses, prepareProps, Props } from './utility/props'

export type ErrorMessageProps = Props<{}, 'p'>

export function ErrorMessage(rawProps: ErrorMessageProps) {
  const [props, restProps] = prepareProps(rawProps, {})

  const childrenMemo = children(() => rawProps.children)
  const convertTruthy = createMemo(() => {
    if (childrenMemo() === true) return false

    return childrenMemo()
  })

  return (
    <AnimatedShow when={convertTruthy()}>
      {(content) => (
        <SpeechBubble
          {...restProps}
          class={joinClasses(rawProps, 'solid-design-parts-ErrorMessage_root')}
          style={{
            filter: 'drop-shadow(0 0 1px var(--solid-design-parts-error-color));',
          }}
          direction="up"
          tailOffsetPercent={25}
          tailHeight="0.3em"
          tailWidth="0.8em"
          padding="0.2em 0.4em"
          role="alert"
        >
          {content}
        </SpeechBubble>
      )}
    </AnimatedShow>
  )
}
