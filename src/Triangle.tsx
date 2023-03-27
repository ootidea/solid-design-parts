import { LiteralAutoComplete } from 'base-up'
import css from './Triangle.scss'
import { CssColor } from './utility/color'
import { joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type TriangleProps = Props<{
  width?: string
  height?: string
  color?: CssColor
  direction?: 'up' | 'down' | 'left' | 'right'
  skew?: string
  transformOrigin?: LiteralAutoComplete<'top' | 'bottom' | 'left' | 'right'>
}>

const paths: Record<Required<TriangleProps>['direction'], string> = {
  up: 'M50 0 L0 100 L100 100 Z',
  down: 'M50 100 L0 0 L100 0 Z',
  left: 'M0 50 L100 0 L100 100 Z',
  right: 'M100 50 L0 0 L0 100 Z',
}

const transformOrigins: Record<Required<TriangleProps>['direction'], string> = {
  up: 'bottom',
  down: 'top',
  left: 'right',
  right: 'left',
}

export function Triangle(rawProps: TriangleProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    { color: 'currentColor', direction: 'up', transformOrigin: transformOrigins[rawProps.direction ?? 'up'] },
    ['width', 'height', 'skew']
  )

  return (
    <svg
      class={joinClasses(rawProps, 'solid-design-parts-Triangle_root')}
      style={{
        '--solid-design-parts-Triangle_width': props.width,
        '--solid-design-parts-Triangle_height': props.height,
        '--solid-design-parts-Triangle_color': props.color,
        '--solid-design-parts-Triangle_skew': props.skew,
        '--solid-design-parts-Triangle_transform-origin': props.transformOrigin,
      }}
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      data-direction={props.direction}
      {...restProps}
    >
      <path class="solid-design-parts-Triangle_path" d={paths[props.direction]} />
    </svg>
  )
}
