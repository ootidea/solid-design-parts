import './common.scss'
import './Link.scss'
import { joinClasses, prepareProps, Props } from './utility/props'

export type LinkProps = Props<{}, 'a'>

export function Link(rawProps: LinkProps) {
  const [props, restProps] = prepareProps(rawProps, {
    color: 'var(--solid-design-parts-Link_default-color)',
  })

  return (
    <a {...restProps} class={joinClasses(props, 'solid-design-parts-Link_root')}>
      {rawProps.children ?? rawProps.href}
    </a>
  )
}
