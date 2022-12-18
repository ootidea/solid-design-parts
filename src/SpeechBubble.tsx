import css from './SpeechBubble.scss'
import { joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type SpeechBubbleProps = Props<{
  backgroundColor?: string
  borderColor?: string
  borderWidth?: string
  triangleHeight?: string
  triangleAngle?: string
  triangleX?: string
  triangleSkew?: string
}>

export function SpeechBubble(rawProps: SpeechBubbleProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      backgroundColor: 'var(--skel-SpeechBubble_background-default-color)',
      borderColor: 'var(--skel-SpeechBubble_border-default-color)',
      borderWidth: 'var(--skel-SpeechBubble_border-default-width)',
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
      class={joinClasses(rawProps, 'skel-SpeechBubble_root')}
      style={{
        '--skel-SpeechBubble_background-color': props.backgroundColor,
        '--skel-SpeechBubble_border-color': props.borderColor,
        '--skel-SpeechBubble_border-width': props.borderWidth,
        '--skel-SpeechBubble_triangle-tangent': tangent(),
        '--skel-SpeechBubble_triangle-height': props.triangleHeight,
        '--skel-SpeechBubble_triangle-x': props.triangleX,
        '--skel-SpeechBubble_triangle-skew': props.triangleSkew,
      }}
      {...restProps}
    >
      <div class="skel-SpeechBubble_message-box">{props.children}</div>
      <div class="skel-SpeechBubble_triangle"></div>
    </div>
  )
}
