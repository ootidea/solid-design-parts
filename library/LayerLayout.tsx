import { children, For } from 'solid-js'
import './common.scss'
import './LayerLayout.scss'
import { joinClasses, prepareProps, Props } from './utility/props'

export type LayerLayoutProps = Props<{}>

export function LayerLayout(rawProps: LayerLayoutProps) {
  const [props, restProps] = prepareProps(rawProps, {})

  return (
    <div {...restProps} class={joinClasses(rawProps, 'solid-design-parts-LayerLayout_root')}>
      <For each={children(() => rawProps.children).toArray()}>
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
