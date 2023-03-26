import css from './Triangle.scss'
import { CssColor } from './utility/color'
import { joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type TriangleProps = Props<{
  height: string
  baseLength: string
  color?: CssColor
  direction?: 'top' | 'bottom' | 'left' | 'right'
}>

export function Triangle(rawProps: TriangleProps) {
  const [props, restProps] = prepareProps(rawProps, { color: 'currentColor', direction: 'top' }, [
    'height',
    'baseLength',
  ])

  return (
    <div
      class={joinClasses(rawProps, 'solid-design-parts-Triangle_root')}
      style={{
        '--solid-design-parts-Triangle_height': props.height,
        '--solid-design-parts-Triangle_base-length': props.baseLength,
        '--solid-design-parts-Triangle_color': props.color,
      }}
      data-direction={props.direction}
      {...restProps}
    ></div>
  )
}
