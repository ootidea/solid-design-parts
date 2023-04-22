import { ComponentProps } from 'solid-js'
import './Collapsible.scss'
import './common.scss'
import { Icon } from './Icon'
import chevronRightIcon from './image/chevron-right.svg'
import {
  createDeferEffect,
  createInjectableSignalObject,
  joinClasses,
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
  onChangeCollapsed?: (collapsed: boolean) => void
  summaryProps?: ComponentProps<'summary'>
}>

export function Collapsible(rawProps: CollapsibleProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      collapsed: false,
    },
    ['title', 'icon', 'onChangeCollapsed', 'summaryProps']
  )

  const collapsedSignal = createInjectableSignalObject(props, 'collapsed')
  createDeferEffect(collapsedSignal.get, () => props.onChangeCollapsed?.(collapsedSignal.value))

  const collapse = () => (collapsedSignal.value = true)
  const expand = () => (collapsedSignal.value = false)
  const toggle = () => (collapsedSignal.value = !collapsedSignal.value)

  return (
    <details
      {...restProps}
      class={joinClasses(rawProps, 'solid-design-parts-Collapsible_root')}
      open={!collapsedSignal.value}
      onToggle={(event) => (collapsedSignal.value = !event.currentTarget.open)}
    >
      <summary
        {...props.summaryProps}
        class={joinClasses(props.summaryProps, 'solid-design-parts-Collapsible_summary')}
      >
        <Slot content={rawProps.icon} params={{ collapse, expand, toggle, collapsed: collapsedSignal.value }}>
          <Icon class="solid-design-parts-Collapsible_icon" src={chevronRightIcon} />
        </Slot>
        <div class="solid-design-parts-Collapsible_title">
          <Slot content={rawProps.title} params={{ collapse, expand, toggle, collapsed: collapsedSignal.value }} />
        </div>
      </summary>
      <div class="solid-design-parts-Collapsible_detail-area">
        <Slot content={rawProps.children} params={{ collapse, expand, toggle }} />
      </div>
    </details>
  )
}
