import { createMemo } from 'solid-js'
import css from './Spinner.scss'
import { CssColor } from './utility/color'
import { joinClasses, joinStyle, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type SpinnerProps = Props<{
  size?: string
  thickness?: number
  frequency?: number
  color?: CssColor
}>

export function Spinner(rawProps: SpinnerProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      size: 'var(--solid-design-parts-Spinner_default-size)',
      thickness: 25,
      frequency: 1.4,
      color: 'var(--solid-design-parts-primary-color)',
    },
    ['style']
  )

  const svgUrl = createMemo(
    () =>
      `url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="${
        100 - props.thickness / 2
      }" fill="none" stroke="black" stroke-width="${props.thickness}" /></svg>')`
  )

  return (
    <div
      class={joinClasses(rawProps, 'solid-design-parts-Spinner_root')}
      style={joinStyle(rawProps.style, {
        '--solid-design-parts-Spinner_size': props.size,
        '--solid-design-parts-Spinner_svg-url': svgUrl(),
        '--solid-design-parts-Spinner_period': `${1 / props.frequency}s`,
        '--solid-design-parts-Spinner_color': props.color,
      })}
      {...restProps}
    />
  )
}
