import css from './Divider.scss'
import { joinClasses, joinStyle, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type DividerProps = Props<{
  direction?: 'horizontal' | 'vertical'
  thickness?: string
  color?: string
}>

export function Divider(rawProps: DividerProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      direction: 'horizontal',
      thickness: 'var(--skel-Divider_default-thickness)',
      color: 'var(--skel-Divider_default-color)',
    },
    ['style']
  )

  return (
    <div
      class={joinClasses(rawProps, 'skel-Divider_root')}
      style={joinStyle(rawProps.style, {
        '--skel-Divider_thickness': props.thickness,
        '--skel-Divider_color': props.color,
      })}
      role="separator"
      data-direction={props.direction}
      {...restProps}
    />
  )
}
