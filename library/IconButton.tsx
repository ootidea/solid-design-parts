import { Show } from 'solid-js'
import { createMemoObject, createSignalObject } from 'solid-signal-object'
import './common.scss'
import { Icon } from './Icon'
import './IconButton.scss'
import { Spinner } from './Spinner'
import { calculateActiveColor, calculateHoverColor, CssColor, resolveColorOnBodyElement } from './utility/color'
import { joinClasses, joinStyle, prepareProps, Props } from './utility/props'

type CommonOwnProps = {
  src: string
  size?: string
  /**
   * The border-radius of the button.
   * @example
   * radius="0.5rem"
   * @example
   * radius="50%"
   * @example
   * radius="0"
   * @example
   * radius="0 1em 1em 0"
   */
  radius?: string
  iconSize?: string
  iconColor?: CssColor
  disabled?: boolean
  backgroundColor?: CssColor
  /** @deprecated */
  disabledColor?: CssColor
  /**
   * Icon rotation mount.
   * @example
   * rotate="90deg"
   * @example
   * rotate="-0.5turn"
   * @example
   * rotate="3.14159rad"
   */
  rotate?: string
  onClick?: (event: MouseEvent) => unknown
}

export type IconButtonProps =
  | Props<
      CommonOwnProps & {
        href?: never
        type?: 'submit' | 'button' | 'reset'
      },
      'button'
    >
  | Props<
      CommonOwnProps & {
        href: string
        type?: string
      },
      'a'
    >

export function IconButton(rawProps: IconButtonProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      disabled: false,
      size: 'var(--solid-design-parts-IconButton_default-size)',
      radius: 'var(--solid-design-parts-IconButton_default-radius)',
      iconSize: 'var(--solid-design-parts-IconButton_icon-default-size)',
      iconColor: 'var(--solid-design-parts-Icon_default-color)',
      backgroundColor: 'transparent',
      disabledColor: 'var(--solid-design-parts-IconButton_disabled-default-color)',
    },
    ['src', 'type', 'rotate', 'onClick']
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

  const content = (
    <Show
      when={!isInProgress.value}
      fallback={<Spinner size="65%" color={props.disabled ? props.disabledColor : props.iconColor} />}
    >
      <Icon
        src={props.src}
        size={props.iconSize}
        color={props.disabled ? props.disabledColor : props.iconColor}
        rotate={props.rotate}
      />
    </Show>
  )

  return typeof rawProps.href !== 'string' ? (
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
      type={rawProps.type ?? 'button'}
      disabled={props.disabled || isInProgress.value}
      aria-disabled={props.disabled}
      onClick={onClick}
    >
      {content}
    </button>
  ) : (
    <a
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
      aria-disabled={props.disabled}
      onClick={onClick}
    >
      {content}
    </a>
  )
}
