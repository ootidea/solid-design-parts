import css from './SpeechBubble.scss'
import { CssColor } from './utility/color'
import { joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type SpeechBubbleProps = Props<{
  backgroundColor?: CssColor
  radius?: string
  triangleHeight?: string
  triangleAngle?: string
  triangleX?: string
  triangleSkew?: string
}>

export function SpeechBubble(rawProps: SpeechBubbleProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      backgroundColor: 'var(--solid-design-parts-SpeechBubble_background-default-color)',
      radius: 'var(--solid-design-parts-SpeechBubble_default-radius)',
      triangleHeight: '1em',
      triangleAngle: `${Math.PI / 2}rad`,
      triangleX: '50%',
      triangleSkew: '0rad',
    },
    ['children']
  )

  const angleRad = () => {
    if (props.triangleAngle.endsWith('grad')) {
      return (Math.PI / 200) * parseFloat(props.triangleAngle)
    } else if (props.triangleAngle.endsWith('deg')) {
      return (Math.PI / 180) * parseFloat(props.triangleAngle)
    } else if (props.triangleAngle.endsWith('turn')) {
      return 2 * Math.PI * parseFloat(props.triangleAngle)
    } else {
      return parseFloat(props.triangleAngle)
    }
  }
  const tangent = () => Math.tan(angleRad() / 2)

  return (
    <div
      class={joinClasses(rawProps, 'solid-design-parts-SpeechBubble_root')}
      style={{
        '--solid-design-parts-SpeechBubble_background-color': props.backgroundColor,
        '--solid-design-parts-SpeechBubble_radius': props.radius,
        '--solid-design-parts-SpeechBubble_triangle-tangent': tangent(),
        '--solid-design-parts-SpeechBubble_triangle-height': props.triangleHeight,
        '--solid-design-parts-SpeechBubble_triangle-x': props.triangleX,
        '--solid-design-parts-SpeechBubble_triangle-skew': props.triangleSkew,
      }}
      {...restProps}
    >
      <div class="solid-design-parts-SpeechBubble_message-box">{props.children}</div>
      <div class="solid-design-parts-SpeechBubble_triangle"></div>
    </div>
  )
}
