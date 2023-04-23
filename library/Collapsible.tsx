import { ComponentProps } from 'solid-js'
import { AnimatedShow } from './AnimatedShow'
import './Collapsible.scss'
import './common.scss'
import { Icon } from './Icon'
import chevronRightIcon from './image/chevron-right.svg'
import { createScaleYAnimation } from './SolidDesignPartsAnimation'
import { isNestedClickEvent } from './utility/dom'
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
  title?: SlotProp<{ collapse: () => void; expand: () => void; toggle: () => void; isCollapsed: boolean }>
  icon?: SlotProp<{ collapse: () => void; expand: () => void; toggle: () => void; isCollapsed: boolean }>
  children?: SlotProp<{ collapse: () => void; expand: () => void; toggle: () => void }>
  onChangeCollapsed?: (collapsed: boolean) => void
  titleAreaProps?: ComponentProps<'button'>
}>

export function Collapsible(rawProps: CollapsibleProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      collapsed: false,
    },
    ['title', 'icon', 'onChangeCollapsed', 'titleAreaProps']
  )

  const collapsedSignal = createInjectableSignalObject(props, 'collapsed')
  createDeferEffect(collapsedSignal.get, () => props.onChangeCollapsed?.(collapsedSignal.value))

  const collapse = () => (collapsedSignal.value = true)
  const expand = () => (collapsedSignal.value = false)
  const toggle = () => (collapsedSignal.value = !collapsedSignal.value)

  return (
    <div {...restProps} class={joinClasses(rawProps, 'solid-design-parts-Collapsible_root')}>
      <button
        {...props.titleAreaProps}
        class={joinClasses(props.titleAreaProps, 'solid-design-parts-Collapsible_title-area')}
        aria-expanded={!collapsedSignal.value}
        onClick={(event) => {
          if (isNestedClickEvent(event)) return

          collapsedSignal.value = !collapsedSignal.value
        }}
      >
        <Slot content={rawProps.icon} params={{ collapse, expand, toggle, isCollapsed: collapsedSignal.value }}>
          <Icon class="solid-design-parts-Collapsible_icon" src={chevronRightIcon} />
        </Slot>
        <div class="solid-design-parts-Collapsible_title">
          <Slot content={rawProps.title} params={{ collapse, expand, toggle, isCollapsed: collapsedSignal.value }} />
        </div>
      </button>
      <AnimatedShow when={!collapsedSignal.value} animation={createScaleYAnimation({ duration: 140 }, 'top')}>
        <div class="solid-design-parts-Collapsible_detail-area">
          <Slot content={rawProps.children} params={{ collapse, expand, toggle }} />
        </div>
      </AnimatedShow>
    </div>
  )
}
