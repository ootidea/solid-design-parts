import css from './Checkbox.scss'
import { joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type CheckboxProps = Props<
  {
    checked?: boolean
    value?: string | undefined
    disabled?: boolean
    onChangeChecked?: (checked: boolean) => void
  },
  'label'
>

export function Checkbox(rawProps: CheckboxProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      checked: false,
      value: undefined,
      disabled: false,
    },
    ['onChangeChecked']
  )

  function onChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      props.onChangeChecked?.(event.target.checked)
    }
  }

  return (
    <label class={joinClasses(rawProps, 'mantle-ui-Checkbox_root')} aria-disabled={props.disabled} {...restProps}>
      <input
        type="checkbox"
        class="mantle-ui-Checkbox_checkbox"
        value={props.value}
        checked={props.checked}
        disabled={props.disabled}
        onChange={onChange}
      />
      <div class="mantle-ui-Checkbox_children">{rawProps.children}</div>
    </label>
  )
}
