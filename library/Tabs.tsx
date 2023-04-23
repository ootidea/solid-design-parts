import { For, JSX, Show } from 'solid-js'
import './common.scss'
import './Tabs.scss'
import { createInjectableSignal, joinClasses, prepareProps, Props, SlotProp } from './utility/props'
import { Slot } from './utility/Slot'

export type TabsProps<T extends readonly string[]> = Props<{
  tabNames: T
  tabTitles?: Partial<Record<T[number], JSX.Element>> | ((tabName: T[number]) => JSX.Element)
  activeTabName?: T[number]
  children?: SlotProp<{ activeTabName: T[number] }>
  variant?: 'colored tab and divider' | 'bordered tab' | 'underlined tab'
  passive?: boolean
  onClickTab?: (tabName: T[number]) => void
}>

export function Tabs<const T extends readonly string[]>(rawProps: TabsProps<T>) {
  const [props, restProps] = prepareProps(
    rawProps,
    { activeTabName: rawProps.tabNames[0], variant: 'colored tab and divider', passive: false },
    ['tabNames', 'tabTitles', 'onClickTab', 'children']
  )

  const [activeTabName, setActiveTabName] = createInjectableSignal(props, 'activeTabName')

  function onClick(tabName: T[number]) {
    if (!props.passive) {
      setActiveTabName(() => tabName)
    }
    props.onClickTab?.(tabName)
  }

  function getTabTitle(tabName: T[number]) {
    if (props.tabTitles instanceof Function) return props.tabTitles(tabName)

    return props.tabTitles?.[tabName] ?? tabName
  }

  return (
    <div
      {...restProps}
      class={joinClasses(rawProps, 'solid-design-parts-Tabs_root')}
      style={{ '--solid-design-parts-Tabs_template': `repeat(${props.tabNames.length}, auto) minmax(0, 1fr)` }}
      data-variant={props.variant}
    >
      <div class="solid-design-parts-Tabs_tab-bar" role="tablist">
        <For each={props.tabNames}>
          {(name) => (
            <button
              class="solid-design-parts-Tabs_tab"
              classList={{ 'solid-design-parts-Tabs_active': activeTabName() === name }}
              role="tab"
              type="button"
              onClick={() => onClick(name)}
            >
              <div class="solid-design-parts-Tabs_tab-title">{getTabTitle(name)}</div>
            </button>
          )}
        </For>
        <Show when={props.variant === 'bordered tab'}>
          <div class="solid-design-parts-Tabs_dummy-tab-for-border" />
        </Show>
      </div>
      <div class="solid-design-parts-Tabs_content" role="tabpanel">
        <Slot content={props.children} params={{ activeTabName: activeTabName() }} />
      </div>
    </div>
  )
}

Tabs.coloredTabAndDivider = <const T extends readonly string[]>(props: TabsProps<T>) => (
  <Tabs variant="colored tab and divider" {...props} />
)
Tabs.borderedTab = <const T extends readonly string[]>(props: TabsProps<T>) => (
  <Tabs variant="bordered tab" {...props} />
)
Tabs.underlinedTab = <const T extends readonly string[]>(props: TabsProps<T>) => (
  <Tabs variant="underlined tab" {...props} />
)
