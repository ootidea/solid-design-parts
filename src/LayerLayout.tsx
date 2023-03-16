import { For } from 'solid-js'
import css from './LayerLayout.scss'
import { toArray } from './utility/others'
import { joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type LayerLayoutProps = Props<{}>

export function LayerLayout(rawProps: LayerLayoutProps) {
  const [props, restProps] = prepareProps(rawProps, {})

  return (
    <div class={joinClasses(rawProps, 'solid-design-parts-LayerLayout_root')} {...restProps}>
      <For each={toArray(rawProps.children)}>
        {(child, i) => {
          if (i() === 0) {
            return child
          } else {
            return <div class="solid-design-parts-LayerLayout_non-base-layer">{child}</div>
          }
        }}
      </For>
    </div>
  )
}
