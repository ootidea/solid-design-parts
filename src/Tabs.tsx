import { createEffect, createSignal, For, Show } from 'solid-js'
import css from './Tabs.scss'
import { joinClasses, prepareProps, SkelProps, SkelSlot } from './utility/props'
import { registerCss } from './utility/registerCss'
import { Slot } from './utility/Slot'

registerCss(css)

export type TabsProps<T extends string> = SkelProps<{
  names: readonly T[]
  activeTab?: T
  children?: SkelSlot<{ activeTab: T }>
  type?: 'Colored tab and border' | 'Surrounded by border' | 'Plain background' | 'Active underline'
  passive?: boolean
  onClickTab?: (tabName: T) => void
}>

export function Tabs<T extends string>(rawProps: TabsProps<T>) {
  const [props, restProps] = prepareProps(
    rawProps,
    { activeTab: rawProps.names[0], type: 'Colored tab and border', passive: false },
    ['names', 'onClickTab', 'children']
  )

  const [activeTab, setActiveTab] = createSignal(props.activeTab)
  createEffect(() => setActiveTab(() => props.activeTab))

  function onClick(name: T) {
    if (!props.passive) {
      setActiveTab(() => name)
    }
    props.onClickTab?.(name)
  }

  return (
    <div
      class={joinClasses(rawProps, 'skel-Tabs_root')}
      style={{ '--skel-Tabs_template': `repeat(${props.names.length}, auto) minmax(0, 1fr)` }}
      data-type={props.type}
      {...restProps}
    >
      <div class="skel-Tabs_tab-bar">
        <For each={props.names}>
          {(name) => (
            <button
              class="skel-Tabs_tab"
              classList={{ 'skel-Tabs_active': activeTab() === name }}
              type="button"
              onClick={() => onClick(name)}
            >
              {name}
            </button>
          )}
        </For>
        <Show when={props.type === 'Surrounded by border'}>
          <div class="skel-Tabs_dummy-tab-for-border" />
        </Show>
      </div>
      <div class="skel-Tabs_content">
        <Slot content={props.children} params={{ activeTab: activeTab() }} />
      </div>
    </div>
  )
}
