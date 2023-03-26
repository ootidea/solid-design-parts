import css from './Gravity.scss'
import { EnneaPosition, toHorizontalPosition, toVerticalPosition } from './utility/position'
import { joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type GravityProps = Props<{ to?: EnneaPosition }>

export function Gravity(rawProps: GravityProps) {
  const [props, restProps] = prepareProps(rawProps, {
    to: 'center',
  })

  return (
    <div
      class={joinClasses(rawProps, 'solid-design-parts-Gravity_root')}
      data-horizontal-position={toHorizontalPosition(props.to)}
      data-vertical-position={toVerticalPosition(props.to)}
      {...restProps}
    >
      <div class="solid-design-parts-Gravity_cage">{rawProps.children}</div>
    </div>
  )
}

Gravity.top = (props: GravityProps) => <Gravity to="top" {...props} />
Gravity.bottom = (props: GravityProps) => <Gravity to="bottom" {...props} />
Gravity.left = (props: GravityProps) => <Gravity to="left" {...props} />
Gravity.right = (props: GravityProps) => <Gravity to="right" {...props} />
Gravity.center = (props: GravityProps) => <Gravity to="center" {...props} />
Gravity.topLeft = (props: GravityProps) => <Gravity to="top left" {...props} />
Gravity.topRight = (props: GravityProps) => <Gravity to="top right" {...props} />
Gravity.bottomLeft = (props: GravityProps) => <Gravity to="bottom left" {...props} />
Gravity.bottomRight = (props: GravityProps) => <Gravity to="bottom right" {...props} />
