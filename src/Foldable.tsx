import { Show } from 'solid-js'
import './common.scss'
import { Divider } from './Divider'
import './Foldable.scss'
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

export type FoldableProps = Props<{
  unfolded?: boolean
  title?: SlotProp<{ fold: () => void; unfold: () => void; toggle: () => void; unfolded: boolean }>
  icon?: SlotProp<{ fold: () => void; unfold: () => void; toggle: () => void; unfolded: boolean }>
  children?: SlotProp<{ fold: () => void; unfold: () => void; toggle: () => void }>
  headerBackgroundColor?: CssColor
  borderColor?: CssColor
  onChangeUnfolded?: (unfolded: boolean) => void
}>

export function Foldable(rawProps: FoldableProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      unfolded: false,
      headerBackgroundColor: 'var(--solid-design-parts-Foldable_header-background-default-color)',
      borderColor: 'var(--solid-design-parts-Foldable_border-default-color)',
    },
    ['title', 'icon', 'onChangeUnfolded']
  )

  const unfoldedSignal = createInjectableSignalObject(props, 'unfolded')
  createDeferEffect(unfoldedSignal.get, () => props.onChangeUnfolded?.(unfoldedSignal.value))

  const fold = () => (unfoldedSignal.value = false)
  const unfold = () => (unfoldedSignal.value = true)
  const toggle = () => (unfoldedSignal.value = !unfoldedSignal.value)

  return (
    <div
      {...restProps}
      class={joinClasses(rawProps, 'solid-design-parts-Foldable_root')}
      style={joinStyle(rawProps.style, {
        '--solid-design-parts-Foldable_header-background-color': props.headerBackgroundColor,
        '--solid-design-parts-Foldable_border-color': props.borderColor,
      })}
      data-unfolded={unfoldedSignal.value}
    >
      <StretchLayout class="solid-design-parts-Foldable_header" direction="horizontal" onClick={toggle}>
        <div class="solid-design-parts-Foldable_title">
          <Slot content={rawProps.title} params={{ fold, unfold, toggle, unfolded: unfoldedSignal.value }} />
        </div>
        <Gravity>
          <Slot content={rawProps.icon} params={{ fold, unfold, toggle, unfolded: unfoldedSignal.value }}>
            <Icon class="solid-design-parts-Foldable_icon" src={chevronDownIcon} />
          </Slot>
        </Gravity>
      </StretchLayout>
      <Show when={unfoldedSignal.value}>
        <Divider color="var(--solid-design-parts-Foldable_border-color)" />
        <div class="solid-design-parts-Foldable_content-area">
          <Slot content={rawProps.children} params={{ fold, unfold, toggle }} />
        </div>
      </Show>
    </div>
  )
}
