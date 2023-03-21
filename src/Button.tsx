import { createSignal, Show } from 'solid-js'
import css from './Button.scss'
import { Gravity } from './Gravity'
import { LayerLayout } from './LayerLayout'
import { Spinner } from './Spinner'
import { joinClasses, joinStyle, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type ButtonProps = Props<{
  color?: 'primary' | 'achromatic' | 'error'
  variant?: 'solid' | 'ghost'
  disabled?: boolean
  fullWidth?: boolean
  type?: 'submit' | 'button' | 'reset'
  href?: string
  radius?: string
  onClick?: (event: MouseEvent) => unknown
}>

export function Button(rawProps: ButtonProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      color: 'primary',
      variant: 'solid',
      disabled: false,
      fullWidth: false,
      type: 'button',
      radius: '0.3em',
    },
    ['href', 'onClick']
  )

  const [isInProgress, setIsInProgress] = createSignal(false)

  function clickEventHandler(event: MouseEvent) {
    const promise = props.onClick?.(event)
    if (promise instanceof Promise) {
      setIsInProgress(true)
      promise.finally(() => setIsInProgress(false))
    }
  }

  const content = (
    <Show when={isInProgress()} fallback={rawProps.children}>
      <LayerLayout>
        <div class="solid-design-parts-Button_invisible">{rawProps.children}</div>
        <Gravity>
          <Spinner color="currentColor" />
        </Gravity>
      </LayerLayout>
    </Show>
  )

  if (props.href !== undefined) {
    return (
      <a
        class={joinClasses(rawProps, 'solid-design-parts-Button_root', {
          'solid-design-parts-Button_full-width': props.fullWidth,
        })}
        style={joinStyle(rawProps.style, { '--solid-design-parts-Button_radius': props.radius })}
        href={props.href}
        role="button"
        tabindex={props.disabled ? -1 : 0}
        aria-disabled={props.disabled}
        data-variant={props.variant}
        data-color={props.color}
        onClick={clickEventHandler}
        {...restProps}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      class={joinClasses(rawProps, 'solid-design-parts-Button_root', {
        'solid-design-parts-Button_full-width': props.fullWidth,
      })}
      style={joinStyle(rawProps.style, { '--solid-design-parts-Button_radius': props.radius })}
      type={props.type}
      data-variant={props.variant}
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

/** <Button.ghost ...> is shorthand for <Button variant="ghost" ...> */
Button.ghost = (rawProps: Omit<ButtonProps, 'variant'>) => <Button variant="ghost" {...rawProps} />

/** <Button.solid ...> is shorthand for <Button variant="solid" ...> */
Button.solid = (rawProps: Omit<ButtonProps, 'variant'>) => <Button variant="solid" {...rawProps} />
