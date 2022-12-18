import css from './Icon.scss'
import { joinClasses, joinStyle, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type IconProps = Props<{ src: string; size?: string; color?: string; rotate?: string }>

export function Icon(rawProps: IconProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      size: 'var(--mantle-ui-Icon_default-size)',
      color: 'var(--mantle-ui-Icon_default-color)',
      rotate: '0deg',
    },
    ['src', 'style']
  )

  return (
    <div
      class={joinClasses(rawProps, 'mantle-ui-Icon_root')}
      style={joinStyle(rawProps.style, {
        '--mantle-ui-Icon_url': `url('${props.src}')`,
        '--mantle-ui-Icon_size': props.size,
        '--mantle-ui-Icon_color': props.color,
        '--mantle-ui-Icon_rotate': props.rotate,
      })}
      role="img"
      {...restProps}
    />
  )
}
