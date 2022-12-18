import { JSX } from 'solid-js'
import { Gravity } from './Gravity'
import css from './TitleBarLayout.scss'
import { joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type TitleBarLayoutProps = Props<{ left?: JSX.Element; right?: JSX.Element }>

export function TitleBarLayout(rawProps: TitleBarLayoutProps) {
  const [props, restProps] = prepareProps(rawProps, {}, ['left', 'right', 'children'])

  return (
    <div class={joinClasses(rawProps, 'mantle-ui-TitleBarLayout_root')} {...restProps}>
      <div class="mantle-ui-TitleBarLayout_left-area">
        <div class="mantle-ui-TitleBarLayout_left">{props.left}</div>
        <div class="mantle-ui-TitleBarLayout_invisible">{props.right}</div>
      </div>
      <Gravity class="mantle-ui-TitleBarLayout_title">{props.children}</Gravity>
      <div class="mantle-ui-TitleBarLayout_right-area">
        <div class="mantle-ui-TitleBarLayout_right">{props.right}</div>
        <div class="mantle-ui-TitleBarLayout_invisible">{props.left}</div>
      </div>
    </div>
  )
}
