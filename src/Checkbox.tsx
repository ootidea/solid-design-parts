import { isInstanceOf, Promisable } from 'base-up'
import { createMemo, createRenderEffect, untrack } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
import css from './Checkbox.scss'
import {
  createDeferEffect,
  createInjectableSignalObject,
  joinClasses,
  joinStyle,
  prepareProps,
  Props,
} from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type CheckboxProps = Props<{
  checked?: boolean
  value?: string | undefined
  disabled?: boolean
  required?: boolean
  error?: boolean | string | ((checked: boolean) => Promisable<boolean | string>)
  validateImmediately?: boolean
  radius?: string
  onChangeChecked?: (checked: boolean) => void
  onChangeValidChecked?: (checked: boolean) => void
}>

export function Checkbox(rawProps: CheckboxProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      checked: false,
      value: undefined,
      disabled: false,
      required: false,
      error: false as Required<CheckboxProps>['error'],
      validateImmediately: false,
      radius: 'var(--solid-design-parts-Checkbox_checkbox-default-radius)',
    },
    ['onChangeChecked', 'onChangeValidChecked']
  )

  const checkedSignal = createInjectableSignalObject(props, 'checked')

  const isEditedSignal = createSignalObject(false)
  const shouldValidate = createMemo(() => isEditedSignal.value || props.validateImmediately)

  const errorSignal = createSignalObject<boolean | string>(false)
  createRenderEffect(async () => {
    errorSignal.value = await deriveError(shouldValidate(), untrack(checkedSignal.get), props.error, props.required)
  })
  createDeferEffect(
    () => props.checked,
    async () => {
      errorSignal.value = await deriveError(shouldValidate(), props.checked, props.error, props.required)
    }
  )

  async function onChange(event: Event) {
    isEditedSignal.value = true
    if (!isInstanceOf(event.target, HTMLInputElement)) return

    const checked = event.target.checked
    checkedSignal.value = checked
    props.onChangeChecked?.(checked)

    const newError = await deriveError(shouldValidate(), checked, props.error, props.required)
    errorSignal.value = newError
    if (newError === false) {
      props.onChangeValidChecked?.(checked)
    }
  }

  async function deriveError(
    shouldValidate: boolean,
    checked: boolean,
    error: Required<CheckboxProps>['error'],
    required: boolean
  ): Promise<boolean | string> {
    if (error === true) return true

    if (required) {
      if (!shouldValidate) {
        return false
      } else if (error === false) {
        return !checked
      } else if (typeof error === 'string') {
        if (checked) {
          return false
        } else {
          return error
        }
      } else {
        const result = await error(checked)
        if (!checked && result === false) return true

        return result
      }
    } else {
      if (error === false || typeof error === 'string') {
        return error
      } else if (!shouldValidate) {
        return false
      } else {
        return await error(checked)
      }
    }
  }

  return (
    <div
      class={joinClasses(rawProps, 'solid-design-parts-Checkbox_root')}
      style={joinStyle(rawProps.style, { '--solid-design-parts-Checkbox_checkbox-radius': props.radius })}
      aria-disabled={props.disabled}
      aria-invalid={errorSignal.value !== false}
      {...restProps}
    >
      <label class="solid-design-parts-Checkbox_label">
        <input
          type="checkbox"
          class="solid-design-parts-Checkbox_checkbox"
          value={props.value}
          checked={checkedSignal.value}
          disabled={props.disabled}
          onChange={onChange}
        />
        <div class="solid-design-parts-Checkbox_children">{rawProps.children}</div>
      </label>
      <p class="solid-design-parts-Checkbox_error-message">{errorSignal.value}</p>
    </div>
  )
}
