import { For, Show } from 'solid-js'
import './common.scss'
import './Tabs.scss'
import { createInjectableSignal, joinClasses, prepareProps, Props, SlotProp } from './utility/props'
import { Slot } from './utility/Slot'

export type TabsProps<T extends string> = Props<{
  names: readonly T[]
  activeTab?: T
  children?: SlotProp<{ activeTab: T }>
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

  const [activeTab, setActiveTab] = createInjectableSignal(props, 'activeTab')

  function onClick(name: T) {
    if (!props.passive) {
      setActiveTab(() => name)
    }
    props.onClickTab?.(name)
  }

  return (
    <div
      {...restProps}
      class={joinClasses(rawProps, 'solid-design-parts-Tabs_root')}
      style={{ '--solid-design-parts-Tabs_template': `repeat(${props.names.length}, auto) minmax(0, 1fr)` }}
      data-type={props.type}
    >
      <div class="solid-design-parts-Tabs_tab-bar" role="tablist">
        <For each={props.names}>
          {(name) => (
            <button
              class="solid-design-parts-Tabs_tab"
              classList={{ 'solid-design-parts-Tabs_active': activeTab() === name }}
              role="tab"
              type="button"
              onClick={() => onClick(name)}
            >
              {name}
            </button>
          )}
        </For>
        <Show when={props.type === 'Surrounded by border'}>
          <div class="solid-design-parts-Tabs_dummy-tab-for-border" />
        </Show>
      </div>
      <div class="solid-design-parts-Tabs_content" role="tabpanel">
        <Slot content={props.children} params={{ activeTab: activeTab() }} />
      </div>
    </div>
  )
}
