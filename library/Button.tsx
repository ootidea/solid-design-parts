import { createSignalObject } from 'solid-signal-object'
import './Button.scss'
import './common.scss'
import { Spinner } from './Spinner'
import { joinClasses, joinStyle, prepareProps, Props } from './utility/props'

export type ButtonProps = Props<
  {
    color?: 'primary' | 'achromatic' | 'error'
    variant?: 'solid' | 'ghost'
    disabled?: boolean
    fullWidth?: boolean
    radius?: string
    onClick?: (event: MouseEvent) => unknown
  } & (
    | {
        href?: never
        type?: 'submit' | 'button' | 'reset'
      }
    | {
        href: string
        type?: string
      }
  )
>

export function Button(rawProps: ButtonProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      color: 'primary',
      variant: 'solid',
      disabled: false,
      fullWidth: false,
      radius: '0.3em',
    },
    ['href', 'type', 'onClick']
  )

  const isInProgress = createSignalObject(false)

  function onClick(event: MouseEvent) {
    const promise = props.onClick?.(event)
    if (promise instanceof Promise) {
      isInProgress.value = true
      promise.finally(() => (isInProgress.value = false))
    }
  }

  const content = (
    <div class="solid-design-parts-Button_overlay-layout">
      <div class="solid-design-parts-Button_children" aria-hidden={isInProgress.value}>
        {rawProps.children}
      </div>
      <div class="solid-design-parts-Button_waiting-state" aria-hidden={!isInProgress.value}>
        <Spinner color="currentColor" />
      </div>
    </div>
  )

  return (
    <>
      {typeof rawProps.href !== 'string' ? (
        <button
          {...restProps}
          class={joinClasses(rawProps, 'solid-design-parts-Button_root', {
            'solid-design-parts-Button_full-width': props.fullWidth,
          })}
          style={joinStyle(rawProps.style, { '--solid-design-parts-Button_radius': props.radius })}
          type={rawProps.type ?? 'button'}
          data-variant={props.variant}
          data-color={props.color}
          disabled={props.disabled || isInProgress.value}
          aria-disabled={props.disabled}
          onClick={onClick}
        >
          {content}
        </button>
      ) : (
        <a
          {...restProps}
          class={joinClasses(rawProps, 'solid-design-parts-Button_root', {
            'solid-design-parts-Button_full-width': props.fullWidth,
          })}
          style={joinStyle(rawProps.style, { '--solid-design-parts-Button_radius': props.radius })}
          href={props.href}
          type={rawProps.type}
          role="button"
          tabindex={props.disabled ? -1 : 0}
          aria-disabled={props.disabled}
          data-variant={props.variant}
          data-color={props.color}
          onClick={onClick}
        >
          {content}
        </a>
      )}
    </>
  )
}

/** <Button.ghost ...> is shorthand for <Button variant="ghost" ...> */
Button.ghost = (props: ButtonProps) => <Button variant="ghost" {...props} />

/** <Button.solid ...> is shorthand for <Button variant="solid" ...> */
Button.solid = (props: ButtonProps) => <Button variant="solid" {...props} />
