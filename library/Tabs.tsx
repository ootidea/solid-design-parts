import { For, Show } from 'solid-js'
import './common.scss'
import './Tabs.scss'
import { createInjectableSignal, joinClasses, prepareProps, Props, SlotProp } from './utility/props'
import { Slot } from './utility/Slot'

export type TabsProps<T extends string> = Props<{
  names: readonly T[]
  activeTab?: T
  children?: SlotProp<{ activeTab: T }>
  variant?: 'colored tab and divider' | 'bordered tab' | 'underlined tab'
  passive?: boolean
  onClickTab?: (tabName: T) => void
}>

export function Tabs<const T extends string>(rawProps: TabsProps<T>) {
  const [props, restProps] = prepareProps(
    rawProps,
    { activeTab: rawProps.names[0], variant: 'colored tab and divider', passive: false },
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
      data-variant={props.variant}
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
        <Show when={props.variant === 'bordered tab'}>
          <div class="solid-design-parts-Tabs_dummy-tab-for-border" />
        </Show>
      </div>
      <div class="solid-design-parts-Tabs_content" role="tabpanel">
        <Slot content={props.children} params={{ activeTab: activeTab() }} />
      </div>
    </div>
  )
}

Tabs.coloredTabAndDivider = <const T extends string>(props: TabsProps<T>) => (
  <Tabs variant="colored tab and divider" {...props} />
)
Tabs.borderedTab = <const T extends string>(props: TabsProps<T>) => <Tabs variant="bordered tab" {...props} />
Tabs.underlinedTab = <const T extends string>(props: TabsProps<T>) => <Tabs variant="underlined tab" {...props} />
