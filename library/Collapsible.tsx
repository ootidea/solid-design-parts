import { Show } from 'solid-js'
import './Collapsible.scss'
import './common.scss'
import { Divider } from './Divider'
import { Gravity } from './Gravity'
import { Icon } from './Icon'
import chevronDownIcon from './image/chevron-down.svg'
import { StretchLayout } from './StretchLayout'
import { CssColor } from './utility/color'
import {
  createDeferEffect,
  createInjectableSignalObject,
  joinClasses,
  joinStyle,
  prepareProps,
  Props,
  SlotProp,
} from './utility/props'
import { Slot } from './utility/Slot'

export type CollapsibleProps = Props<{
  collapsed?: boolean
  title?: SlotProp<{ collapse: () => void; expand: () => void; toggle: () => void; collapsed: boolean }>
  icon?: SlotProp<{ collapse: () => void; expand: () => void; toggle: () => void; collapsed: boolean }>
  children?: SlotProp<{ collapse: () => void; expand: () => void; toggle: () => void }>
  headerBackgroundColor?: CssColor
  borderColor?: CssColor
  onChangeCollapsed?: (collapsed: boolean) => void
}>

export function Collapsible(rawProps: CollapsibleProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      collapsed: false,
      headerBackgroundColor: 'var(--solid-design-parts-Collapsible_header-background-default-color)',
      borderColor: 'var(--solid-design-parts-Collapsible_border-default-color)',
    },
    ['title', 'icon', 'onChangeCollapsed']
  )

  const collapsedSignal = createInjectableSignalObject(props, 'collapsed')
  createDeferEffect(collapsedSignal.get, () => props.onChangeCollapsed?.(collapsedSignal.value))

  const collapse = () => (collapsedSignal.value = true)
  const expand = () => (collapsedSignal.value = false)
  const toggle = () => (collapsedSignal.value = !collapsedSignal.value)

  return (
    <div
      {...restProps}
      class={joinClasses(rawProps, 'solid-design-parts-Collapsible_root')}
      style={joinStyle(rawProps.style, {
        '--solid-design-parts-Collapsible_header-background-color': props.headerBackgroundColor,
        '--solid-design-parts-Collapsible_border-color': props.borderColor,
      })}
      data-collapsed={collapsedSignal.value}
    >
      <StretchLayout class="solid-design-parts-Collapsible_header" direction="horizontal" onClick={toggle}>
        <div class="solid-design-parts-Collapsible_title">
          <Slot content={rawProps.title} params={{ collapse, expand, toggle, collapsed: collapsedSignal.value }} />
        </div>
        <Gravity>
          <Slot content={rawProps.icon} params={{ collapse, expand, toggle, collapsed: collapsedSignal.value }}>
            <Icon class="solid-design-parts-Collapsible_icon" src={chevronDownIcon} />
          </Slot>
        </Gravity>
      </StretchLayout>
      <Show when={!collapsedSignal.value}>
        <Divider color="var(--solid-design-parts-Collapsible_border-color)" />
        <div class="solid-design-parts-Collapsible_content-area">
          <Slot content={rawProps.children} params={{ collapse, expand, toggle }} />
        </div>
      </Show>
    </div>
  )
}
