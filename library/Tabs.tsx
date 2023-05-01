import { fromEntries, map } from 'base-up'
import { For, JSX, Show } from 'solid-js'
import { createMemoObject } from 'solid-signal-object'
import './common.scss'
import './Tabs.scss'
import { createInjectableSignalObject, joinClasses, prepareProps, Props } from './utility/props'

export type TabsProps<T extends readonly (string | number)[]> = Props<{
  tabNames: T
  /**
   * The content displayed within each tab in the tab bar.
   * If omitted, the tab name will be displayed.
   */
  tabTitles?: Partial<Record<T[number], JSX.Element>> | ((tabName: T[number]) => JSX.Element)
  /** The name of the tab selected initially. If omitted, the first tab will be selected by default. */
  activeTabName?: T[number]
  children?: Record<T[number], JSX.Element> | ((tabName: T[number]) => JSX.Element)
  /** Appearance types */
  variant?: 'colored tab and divider' | 'bordered tab' | 'underlined tab'
  /** When set to true, clicking on a tab will not change its state. However, onClickTab will still be called. */
  passive?: boolean
  onClickTab?: (tabName: T[number]) => void
}>

export function Tabs<const T extends readonly (string | number)[]>(rawProps: TabsProps<T>) {
  const [props, restProps] = prepareProps(
    rawProps,
    { activeTabName: rawProps.tabNames[0], variant: 'colored tab and divider', passive: false },
    ['tabNames', 'tabTitles', 'onClickTab', 'children']
  )

  const currentTabNameSignal = createInjectableSignalObject(props, 'activeTabName')

  function onClick(tabName: T[number]) {
    if (!props.passive) {
      currentTabNameSignal.value = tabName
    }
    props.onClickTab?.(tabName)
  }

  function getTabTitle(tabName: T[number]) {
    if (props.tabTitles instanceof Function) return props.tabTitles(tabName)

    return props.tabTitles?.[tabName] ?? tabName
  }

  // DOM elements of each tab content are not recreated when the active tab is changed.
  const tabContentsMemo = createMemoObject(() => {
    const children = props.children
    if (children instanceof Function) {
      return fromEntries(map(props.tabNames, (tabName) => [tabName, children(tabName)] as const))
    }

    return children ?? {}
  })

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
              role="tab"
              type="button"
              aria-current={currentTabNameSignal.value === name}
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
        {tabContentsMemo.value[currentTabNameSignal.value]}
      </div>
    </div>
  )
}

Tabs.coloredTabAndDivider = <const T extends readonly (string | number)[]>(props: TabsProps<T>) => (
  <Tabs variant="colored tab and divider" {...props} />
)
Tabs.borderedTab = <const T extends readonly (string | number)[]>(props: TabsProps<T>) => (
  <Tabs variant="bordered tab" {...props} />
)
Tabs.underlinedTab = <const T extends readonly (string | number)[]>(props: TabsProps<T>) => (
  <Tabs variant="underlined tab" {...props} />
)
