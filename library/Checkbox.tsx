import { isInstanceOf, Promisable } from 'base-up'
import { ComponentProps, createRenderEffect, untrack } from 'solid-js'
import { createMemoObject, createSignalObject } from 'solid-signal-object'
import './Checkbox.scss'
import './common.scss'
import { ErrorMessage } from './ErrorMessage'
import {
  createDeferEffect,
  createInjectableSignalObject,
  joinClasses,
  joinStyle,
  prepareProps,
  Props,
} from './utility/props'

export type CheckboxProps = Props<{
  checked?: boolean
  value?: string | undefined
  disabled?: boolean
  required?: boolean
  error?: boolean | string | ((checked: boolean) => Promisable<boolean | string>)
  validateImmediately?: boolean
  radius?: string
  onChangeChecked?: (checked: boolean) => void
  onValid?: (checked: boolean) => void
  labelProps?: ComponentProps<'label'>
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
    ['onChangeChecked', 'onValid', 'labelProps']
  )

  const checkedSignal = createInjectableSignalObject(props, 'checked')

  const isEditedSignal = createSignalObject(false)
  const shouldValidate = createMemoObject(() => isEditedSignal.value || props.validateImmediately)

  const errorSignal = createSignalObject<boolean | string>(false)
  createRenderEffect(async () => {
    const checked = untrack(checkedSignal.get)
    const error = await deriveError(shouldValidate.value, checked, props.error, props.required)
    errorSignal.value = error
    if (error === false) {
      props.onValid?.(checked)
    }
  })
  createDeferEffect(checkedSignal.get, async () => {
    const checked = checkedSignal.value
    props.onChangeChecked?.(checked)
    const error = await deriveError(shouldValidate.value, checked, props.error, props.required)
    errorSignal.value = error
    if (error === false) {
      props.onValid?.(checked)
    }
  })

  async function onChange(event: Event) {
    isEditedSignal.value = true
    if (!isInstanceOf(event.target, HTMLInputElement)) return

    checkedSignal.value = event.target.checked
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
      {...restProps}
      class={joinClasses(rawProps, 'solid-design-parts-Checkbox_root')}
      style={joinStyle(rawProps.style, { '--solid-design-parts-Checkbox_checkbox-radius': props.radius })}
      aria-disabled={props.disabled}
      aria-invalid={errorSignal.value !== false}
    >
      <label {...props.labelProps} class={joinClasses(props.labelProps, 'solid-design-parts-Checkbox_label')}>
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
      <ErrorMessage>{errorSignal.value}</ErrorMessage>
    </div>
  )
}
