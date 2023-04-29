import { createMemoObject, createSignalObject } from 'solid-signal-object'
import './common.scss'
import { Icon } from './Icon'
import './IconButton.scss'
import { Spinner } from './Spinner'
import { calculateActiveColor, calculateHoverColor, CssColor, resolveColorOnBodyElement } from './utility/color'
import { joinClasses, joinStyle, prepareProps, Props } from './utility/props'

export type IconButtonProps = Props<
  {
    src: string
    size?: string
    radius?: string
    iconSize?: string
    iconColor?: CssColor
    backgroundColor?: CssColor
    disabledColor?: CssColor
    type?: 'submit' | 'button' | 'reset'
    rotate?: string
    onClick?: (event: MouseEvent) => unknown
  },
  'button'
>

export function IconButton(rawProps: IconButtonProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      size: 'var(--solid-design-parts-IconButton_default-size)',
      radius: 'var(--solid-design-parts-IconButton_default-radius)',
      iconSize: 'var(--solid-design-parts-IconButton_icon-default-size)',
      iconColor: 'var(--solid-design-parts-Icon_default-color)',
      backgroundColor: 'transparent',
      disabledColor: 'var(--solid-design-parts-IconButton_disabled-default-color)',
      type: 'button',
    },
    ['src', 'disabled', 'rotate', 'onClick']
  )

  const backgroundColor = createMemoObject(() => resolveColorOnBodyElement(props.backgroundColor))
  const isInProgress = createSignalObject(false)

  function onClick(event: MouseEvent) {
    if (isInProgress.value) return

    const promise = props.onClick?.(event)
    if (promise instanceof Promise) {
      isInProgress.value = true
      promise.finally(() => (isInProgress.value = false))
    }
  }

  return (
    <button
      {...restProps}
      class={joinClasses(rawProps, 'solid-design-parts-IconButton_root')}
      style={joinStyle(rawProps.style, {
        '--solid-design-parts-IconButton_size': props.size,
        '--solid-design-parts-IconButton_radius': props.radius,
        '--solid-design-parts-IconButton_icon-size': props.iconSize,
        '--solid-design-parts-IconButton_background-color': backgroundColor.value,
        '--solid-design-parts-IconButton_background-hover-color': calculateHoverColor(backgroundColor.value),
        '--solid-design-parts-IconButton_background-active-color': calculateActiveColor(backgroundColor.value),
      })}
      type={props.type}
      disabled={props.disabled}
      aria-disabled={props.disabled}
      onClick={onClick}
    >
      {isInProgress.value ? (
        <Spinner size="65%" color={props.disabled ? props.disabledColor : props.iconColor} />
      ) : (
        <Icon
          src={props.src}
          size={props.iconSize}
          color={props.disabled ? props.disabledColor : props.iconColor}
          rotate={props.rotate}
        />
      )}
    </button>
  )
}
