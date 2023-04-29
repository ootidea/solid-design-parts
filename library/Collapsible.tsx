import { ComponentProps } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
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
  children?: SlotProp<{ collapse: () => void; expand: () => void; toggle: () => void; isCollapsed: boolean }>
  onChangeCollapsed?: (collapsed: boolean) => void
  titleAreaProps?: ComponentProps<'button'>
}>

export function Collapsible(rawProps: CollapsibleProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      collapsed: false,
    },
    ['title', 'icon', 'onChangeCollapsed', 'titleAreaProps', 'children']
  )

  const collapsedSignal = createInjectableSignalObject(props, 'collapsed')
  createDeferEffect(collapsedSignal.get, () => props.onChangeCollapsed?.(collapsedSignal.value))

  const collapse = () => (collapsedSignal.value = true)
  const expand = () => (collapsedSignal.value = false)
  const toggle = () => (collapsedSignal.value = !collapsedSignal.value)

  // The duration should be the same length as the transition of solid-design-parts-Collapsible_icon
  const animation = createScaleYAnimation({ duration: 140 }, 'top')

  const isHiddenSignal = createSignalObject(collapsedSignal.value)
  let lastAnimation: Animation | undefined
  let detailAreaElement: HTMLDivElement | undefined
  createDeferEffect(
    () => collapsedSignal.value,
    () => {
      lastAnimation?.cancel()
      if (collapsedSignal.value) {
        lastAnimation = detailAreaElement?.animate(animation.keyframes, {
          ...animation.options,
          direction: 'reverse',
        })
        lastAnimation?.addEventListener('finish', () => {
          isHiddenSignal.value = true
        })
      } else {
        isHiddenSignal.value = false
        lastAnimation = detailAreaElement?.animate(animation.keyframes, animation.options)
      }
    }
  )

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
        <Slot content={props.icon} params={{ collapse, expand, toggle, isCollapsed: collapsedSignal.value }}>
          <Icon class="solid-design-parts-Collapsible_icon" src={chevronRightIcon} />
        </Slot>
        <div class="solid-design-parts-Collapsible_title">
          <Slot content={props.title} params={{ collapse, expand, toggle, isCollapsed: collapsedSignal.value }} />
        </div>
      </button>
      <div
        class="solid-design-parts-Collapsible_detail-area"
        classList={{ 'solid-design-parts_hidden-but-keep-width': isHiddenSignal.value }}
        aria-hidden={isHiddenSignal.value}
        ref={detailAreaElement}
      >
        <Slot content={props.children} params={{ collapse, expand, toggle, isCollapsed: collapsedSignal.value }} />
      </div>
    </div>
  )
}
