import './common.scss'
import './SpeechBubble.scss'
import { Triangle } from './Triangle'
import { CssColor } from './utility/color'
import { joinClasses, joinStyle, prepareProps, Props } from './utility/props'

export type SpeechBubbleProps = Props<{
  backgroundColor?: CssColor
  padding?: string
  radius?: string
  direction?: 'down' | 'up' | 'left' | 'right'
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
      padding: 'var(--solid-design-parts-SpeechBubble_default-padding)',
      radius: 'var(--solid-design-parts-SpeechBubble_default-radius)',
      direction: 'down',
      tailWidth: '0.5em',
      tailHeight: '0.5em',
      tailSkew: '0rad',
      tailOffsetPercent: 0,
    },
    ['children']
  )

  return (
    <div
      {...restProps}
      class={joinClasses(rawProps, 'solid-design-parts-SpeechBubble_root')}
      style={joinStyle(rawProps.style, {
        '--solid-design-parts-SpeechBubble_background-color': props.backgroundColor,
        '--solid-design-parts-SpeechBubble_padding': props.padding,
        '--solid-design-parts-SpeechBubble_radius': props.radius,
        '--solid-design-parts-SpeechBubble_tail-offset-percent': props.tailOffsetPercent,
      })}
      data-direction={props.direction}
    >
      <div class="solid-design-parts-SpeechBubble_message-box">{props.children}</div>
      <div class="solid-design-parts-SpeechBubble_tail-area">
        <Triangle
          class="solid-design-parts-SpeechBubble_tail"
          direction={props.direction}
          color={props.backgroundColor}
          width={props.tailWidth}
          height={props.tailHeight}
          skew={props.tailSkew}
        />
      </div>
    </div>
  )
}
