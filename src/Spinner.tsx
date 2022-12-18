import { createMemo } from 'solid-js'
import css from './Spinner.scss'
import { joinClasses, joinStyle, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type SpinnerProps = Props<{
  size?: string
  thickness?: number
  frequency?: number
  color?: string
}>

export function Spinner(rawProps: SpinnerProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      size: 'var(--mantle-ui-Spinner_default-size)',
      thickness: 25,
      frequency: 1.4,
      color: 'var(--mantle-ui-primary-color)',
    },
    ['style']
  )

  const svgUrl = createMemo(
    () =>
      `url('data:image/svg+xml;utf8,<svg width="200mm" height="200mm" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="${
        100 - props.thickness / 2
      }" fill="none" stroke="black" stroke-width="${props.thickness}" /></svg>')`
  )

  return (
    <div
      class={joinClasses(rawProps, 'mantle-ui-Spinner_root')}
      style={joinStyle(rawProps.style, {
        '--mantle-ui-Spinner_size': props.size,
        '--mantle-ui-Spinner_svg-url': svgUrl(),
        '--mantle-ui-Spinner_period': `${1 / props.frequency}s`,
        '--mantle-ui-Spinner_color': props.color,
      })}
      {...restProps}
    />
  )
}
