import css from './SpeechBubble.scss'
import { joinClasses, prepareProps, SkelProps } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type SpeechBubbleProps = SkelProps<{
  triangleHeight?: string
  triangleAngle?: string
}>

export function SpeechBubble(rawProps: SpeechBubbleProps) {
  const [props, restProps] = prepareProps(rawProps, { triangleHeight: '1em', triangleAngle: `${Math.PI / 2}rad` }, [
    'children',
  ])

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
        '--skel-SpeechBubble_triangle-tangent': tangent(),
        '--skel-SpeechBubble_triangle-height': props.triangleHeight,
      }}
      {...restProps}
    >
      <div class="skel-SpeechBubble_message-box">{props.children}</div>
      <div class="skel-SpeechBubble_triangle"></div>
    </div>
  )
}
