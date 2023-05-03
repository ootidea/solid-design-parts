import './common.scss'
import './Icon.scss'
import { CssColor } from './utility/color'
import { joinClasses, joinStyle, prepareProps, Props } from './utility/props'

export type IconProps = Props<{
  src: string
  size?: string
  color?: CssColor
  rotate?: string
}>

export function Icon(rawProps: IconProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      size: 'var(--solid-design-parts-Icon_default-size)',
      color: 'var(--solid-design-parts-Icon_default-color)',
      rotate: '0deg',
    },
    ['src', 'style']
  )

  return (
    <div
      {...restProps}
      class={joinClasses(rawProps, 'solid-design-parts-Icon_root')}
      style={joinStyle(rawProps.style, {
        '--solid-design-parts-Icon_url': `url('${props.src}')`,
        '--solid-design-parts-Icon_size': props.size,
        '--solid-design-parts-Icon_color': props.color,
        '--solid-design-parts-Icon_rotate': props.rotate,
      })}
      role="img"
    />
  )
}
