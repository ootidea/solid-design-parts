import css from './SpeechBubble.scss'
import { Triangle } from './Triangle'
import { CssColor } from './utility/color'
import { joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type SpeechBubbleProps = Props<{
  backgroundColor?: CssColor
  radius?: string
  triangleWidth?: string
  triangleHeight?: string
  triangleSkew?: string
}>

export function SpeechBubble(rawProps: SpeechBubbleProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      backgroundColor: 'var(--solid-design-parts-SpeechBubble_background-default-color)',
      radius: 'var(--solid-design-parts-SpeechBubble_default-radius)',
      triangleWidth: '10px',
      triangleHeight: '10px',
      triangleSkew: '0rad',
    },
    ['children']
  )

  return (
    <div
      class={joinClasses(rawProps, 'solid-design-parts-SpeechBubble_root')}
      style={{
        '--solid-design-parts-SpeechBubble_background-color': props.backgroundColor,
        '--solid-design-parts-SpeechBubble_radius': props.radius,
      }}
      {...restProps}
    >
      <div class="solid-design-parts-SpeechBubble_message-box">{props.children}</div>
      <div class="solid-design-parts-SpeechBubble_triangle-area">
        <Triangle
          class="solid-design-parts-SpeechBubble_triangle"
          direction="down"
          color={props.backgroundColor}
          width={props.triangleWidth}
          height={props.triangleHeight}
          skew={props.triangleSkew}
        />
      </div>
    </div>
  )
}
