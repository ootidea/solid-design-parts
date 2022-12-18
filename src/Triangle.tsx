import css from './Triangle.scss'
import { joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type TriangleProps = Props<{
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
      class={joinClasses(rawProps, 'mantle-ui-Triangle_root')}
      style={{
        '--mantle-ui-Triangle_height': props.height,
        '--mantle-ui-Triangle_base-length': props.baseLength,
        '--mantle-ui-Triangle_color': props.color,
      }}
      data-direction={props.direction}
      {...restProps}
    ></div>
  )
}
