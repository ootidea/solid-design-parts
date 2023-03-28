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
    <div {...restProps} class={joinClasses(rawProps, 'solid-design-parts-TitleBarLayout_root')}>
      <div class="solid-design-parts-TitleBarLayout_left-area">
        <div class="solid-design-parts-TitleBarLayout_left">{props.left}</div>
        <div class="solid-design-parts-TitleBarLayout_right" aria-hidden="true">
          {props.right}
        </div>
      </div>
      <Gravity class="solid-design-parts-TitleBarLayout_title">{props.children}</Gravity>
      <div class="solid-design-parts-TitleBarLayout_right-area">
        <div class="solid-design-parts-TitleBarLayout_right">{props.right}</div>
        <div class="solid-design-parts-TitleBarLayout_left" aria-hidden="true">
          {props.left}
        </div>
      </div>
    </div>
  )
}
