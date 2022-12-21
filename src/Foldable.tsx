import { Show } from 'solid-js'
import { Divider } from './Divider'
import css from './Foldable.scss'
import { Gravity } from './Gravity'
import { Icon } from './Icon'
import chevronDownIcon from './image/chevron-down.svg'
import { StretchLayout } from './StretchLayout'
import { createInjectableSignal, joinClasses, joinStyle, prepareProps, Props, SlotProp } from './utility/props'
import { registerCss } from './utility/registerCss'
import { Slot } from './utility/Slot'

registerCss(css)

export type FoldableProps = Props<{
  unfolded?: boolean
  title?: SlotProp<{ fold: () => void; unfold: () => void; toggle: () => void; unfolded: boolean }>
  icon?: SlotProp<{ fold: () => void; unfold: () => void; toggle: () => void; unfolded: boolean }>
  children?: SlotProp<{ fold: () => void; unfold: () => void; toggle: () => void }>
  headerBackgroundColor?: string
  borderColor?: string
  onChangeUnfolded?: (unfolded: boolean) => void
}>

export function Foldable(rawProps: FoldableProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      unfolded: false,
      headerBackgroundColor: 'var(--mantle-ui-Foldable_header-background-default-color)',
      borderColor: 'var(--mantle-ui-Foldable_border-default-color)',
    },
    ['title', 'icon', 'onChangeUnfolded']
  )

  const [unfolded, setUnfolded] = createInjectableSignal(props, 'unfolded')
  function changeUnfolded(newUnfolded: boolean) {
    setUnfolded(newUnfolded)
    props.onChangeUnfolded?.(newUnfolded)
  }
  const fold = () => changeUnfolded(false)
  const unfold = () => changeUnfolded(true)
  const toggle = () => changeUnfolded(!unfolded())

  return (
    <div
      class={joinClasses(rawProps, 'mantle-ui-Foldable_root')}
      style={joinStyle(rawProps.style, {
        '--mantle-ui-Foldable_header-background-color': props.headerBackgroundColor,
        '--mantle-ui-Foldable_border-color': props.borderColor,
      })}
      data-unfolded={unfolded()}
      {...restProps}
    >
      <StretchLayout class="mantle-ui-Foldable_header" direction="horizontal" onClick={toggle}>
        <div class="mantle-ui-Foldable_title">
          <Slot content={rawProps.title} params={{ fold, unfold, toggle, unfolded: unfolded() }} />
        </div>
        <Gravity>
          <Slot content={rawProps.icon} params={{ fold, unfold, toggle, unfolded: unfolded() }}>
            <Icon class="mantle-ui-Foldable_icon" src={chevronDownIcon} />
          </Slot>
        </Gravity>
      </StretchLayout>
      <Show when={unfolded()}>
        <Divider color="var(--mantle-ui-Foldable_border-color)" />
        <div class="mantle-ui-Foldable_content-area">
          <Slot content={rawProps.children} params={{ fold, unfold, toggle }} />
        </div>
      </Show>
    </div>
  )
}
