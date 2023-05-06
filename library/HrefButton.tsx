import './common.scss'
import './HrefButton.scss'
import { joinClasses, prepareProps, Props } from './utility/props'

type CommonOwnProps = {
  disabled?: boolean
}

export type HrefButtonProps =
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

export function HrefButton(rawProps: HrefButtonProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      disabled: false,
    },
    ['type', 'children']
  )

  return (
    <>
      {typeof rawProps.href !== 'string' ? (
        <button
          {...restProps}
          class={joinClasses(rawProps, 'solid-design-parts-HrefButton_root')}
          type={rawProps.type ?? 'button'}
          disabled={props.disabled}
          aria-disabled={props.disabled}
        >
          {props.children}
        </button>
      ) : (
        <a
          {...restProps}
          class={joinClasses(rawProps, 'solid-design-parts-HrefButton_root')}
          type={props.type}
          role="button"
          tabindex={props.disabled ? -1 : 0}
          aria-disabled={props.disabled}
        >
          {props.children}
        </a>
      )}
    </>
  )
}
