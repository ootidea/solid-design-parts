import { createSignal } from 'solid-js'
import { Gravity } from './Gravity'
import { Icon } from './Icon'
import css from './IconButton.scss'
import { Spinner } from './Spinner'
import { calculateActiveColor, calculateHoverColor, toHsl } from './utility/color'
import { joinClasses, joinStyle, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type IconButtonProps = Props<
  {
    src: string
    size?: string
    iconSize?: string
    iconColor?: string
    backgroundColor?: string
    disabledColor?: string
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
      size: 'var(--skel-IconButton_default-size)',
      iconSize: 'var(--skel-IconButton_icon-default-size)',
      iconColor: 'var(--skel-Icon_default-color)',
      backgroundColor: 'transparent',
      disabledColor: 'var(--skel-IconButton_disabled-default-color)',
      type: 'button',
    },
    ['src', 'disabled', 'rotate', 'onClick']
  )

  const [isInProgress, setIsInProgress] = createSignal(false)

  function clickEventHandler(event: MouseEvent) {
    if (isInProgress()) return

    if (props.onClick !== undefined) {
      event.preventDefault()
    }

    const promise = props.onClick?.(event)
    if (promise instanceof Promise) {
      setIsInProgress(true)
      promise.finally(() => setIsInProgress(false))
    }
  }

  return (
    <button
      class={joinClasses(rawProps, 'skel-IconButton_root')}
      style={joinStyle(rawProps.style, {
        '--skel-IconButton_size': props.size,
        '--skel-IconButton_icon-size': props.iconSize,
        '--skel-IconButton_background-color': toHsl(props.backgroundColor),
        '--skel-IconButton_background-hover-color': calculateHoverColor(props.backgroundColor),
        '--skel-IconButton_background-active-color': calculateActiveColor(props.backgroundColor),
      })}
      type={props.type}
      disabled={props.disabled}
      aria-disabled={props.disabled}
      onClick={clickEventHandler}
      {...restProps}
    >
      {isInProgress() ? (
        <Gravity>
          <Spinner size="65%" />
        </Gravity>
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
