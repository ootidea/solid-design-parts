import './common.scss'
import './Divider.scss'
import { CssColor } from './utility/color'
import { joinClasses, joinStyle, prepareProps, Props } from './utility/props'

export type DividerProps = Props<{
  direction?: 'horizontal' | 'vertical'
  thickness?: string
  color?: CssColor
}>

export function Divider(rawProps: DividerProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      direction: 'horizontal',
      thickness: 'var(--solid-design-parts-Divider_default-thickness)',
      color: 'var(--solid-design-parts-Divider_default-color)',
    },
    ['style']
  )

  return (
    <div
      {...restProps}
      class={joinClasses(rawProps, 'solid-design-parts-Divider_root')}
      style={joinStyle(rawProps.style, {
        '--solid-design-parts-Divider_thickness': props.thickness,
        '--solid-design-parts-Divider_color': props.color,
      })}
      role="separator"
      data-direction={props.direction}
    />
  )
}
