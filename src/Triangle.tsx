import css from './Triangle.scss'
import { joinClasses, prepareProps, SkelProps } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type TriangleProps = SkelProps<{
  height: string
  baseLength: string
  color?: string
  direction?: 'top' | 'bottom' | 'left' | 'right'
}>

export function Triangle(rawProps: TriangleProps) {
  const [props, restProps] = prepareProps(rawProps, { color: 'currentColor', direction: 'top' }, [
    'height',
    'baseLength',
  ])

  return (
    <div
      class={joinClasses(rawProps, 'skel-Triangle_root')}
      style={{
        '--skel-Triangle_height': props.height,
        '--skel-Triangle_base-length': props.baseLength,
        '--skel-Triangle_color': props.color,
      }}
      data-direction={props.direction}
      {...restProps}
    ></div>
  )
}
