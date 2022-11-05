import { createSignal, Show } from 'solid-js'
import css from './Button.scss'
import { Gravity } from './Gravity'
import { LayerLayout } from './LayerLayout'
import { Spinner } from './Spinner'
import { joinClasses, prepareProps, SkelProps } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type ButtonProps = SkelProps<{
  color?: 'primary' | 'achromatic' | 'error'
  ghost?: boolean
  rounded?: boolean
  disabled?: boolean
  fullWidth?: boolean
  type?: 'submit' | 'button' | 'reset'
  href?: string
  onClick?: (event: MouseEvent) => unknown
}>

export function Button(rawProps: ButtonProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      color: 'primary',
      ghost: false,
      rounded: false,
      disabled: false,
      fullWidth: false,
      type: 'button',
    },
    ['href', 'onClick']
  )

  const [isInProgress, setIsInProgress] = createSignal(false)

  function clickEventHandler(event: MouseEvent) {
    if (props.onClick === undefined) return

    event.preventDefault()
    const promise = props.onClick(event)
    if (promise instanceof Promise) {
      setIsInProgress(true)
      promise.finally(() => setIsInProgress(false))
    }
  }

  const content = (
    <Show when={isInProgress()} fallback={rawProps.children}>
      <LayerLayout>
        <div class="skel-Button_invisible">{rawProps.children}</div>
        <Gravity>
          <Spinner color="currentColor" />
        </Gravity>
      </LayerLayout>
    </Show>
  )

  if (props.href !== undefined) {
    return (
      <a
        class={joinClasses(rawProps, 'skel-Button_root', {
          'skel-Button_ghost': props.ghost,
          'skel-Button_rounded': props.rounded,
          'skel-Button_full-width': props.fullWidth,
        })}
        data-color={props.color}
        href={props.href}
        aria-disabled={props.disabled}
        onClick={clickEventHandler}
        tabindex={props.disabled ? -1 : 0}
        {...restProps}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      class={joinClasses(rawProps, 'skel-Button_root', {
        'skel-Button_ghost': props.ghost,
        'skel-Button_rounded': props.rounded,
        'skel-Button_full-width': props.fullWidth,
      })}
      type={props.type}
      data-color={props.color}
      disabled={props.disabled || isInProgress()}
      aria-disabled={props.disabled}
      onClick={clickEventHandler}
      {...restProps}
    >
      {content}
    </button>
  )
}
