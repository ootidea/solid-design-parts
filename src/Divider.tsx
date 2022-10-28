import css from './Divider.scss'
import { joinClasses, joinStyle, prepareProps, SkelProps } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type DividerProps = SkelProps<{
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
      data-direction={props.direction}
      {...restProps}
    />
  )
}
