import css from './SpeechBubble.scss'
import { Triangle } from './Triangle'
import { CssColor } from './utility/color'
import { joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type SpeechBubbleProps = Props<{
  backgroundColor?: CssColor
  radius?: string
  tailWidth?: string
  tailHeight?: string
  tailSkew?: string
  tailOffsetPercent?: number
}>

export function SpeechBubble(rawProps: SpeechBubbleProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      backgroundColor: 'var(--solid-design-parts-SpeechBubble_background-default-color)',
      radius: 'var(--solid-design-parts-SpeechBubble_default-radius)',
      tailWidth: '10px',
      tailHeight: '10px',
      tailSkew: '0rad',
      tailOffsetPercent: 0,
    },
    ['children']
  )

  return (
    <div
      {...restProps}
      class={joinClasses(rawProps, 'solid-design-parts-SpeechBubble_root')}
      style={{
        '--solid-design-parts-SpeechBubble_background-color': props.backgroundColor,
        '--solid-design-parts-SpeechBubble_radius': props.radius,
        '--solid-design-parts-SpeechBubble_tail-offset-percent': props.tailOffsetPercent,
      }}
    >
      <div class="solid-design-parts-SpeechBubble_message-box">{props.children}</div>
      <div class="solid-design-parts-SpeechBubble_tail-area">
        <Triangle
          class="solid-design-parts-SpeechBubble_tail"
          direction="down"
          color={props.backgroundColor}
          width={props.tailWidth}
          height={props.tailHeight}
          skew={props.tailSkew}
        />
      </div>
    </div>
  )
}
