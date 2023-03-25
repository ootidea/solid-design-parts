import { isInstanceOf } from 'base-up'
import { Promisable } from 'base-up/dist/types/Promise'
import { createMemo, createRenderEffect, on, untrack } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
import css from './Checkbox.scss'
import { createInjectableSignalObject, joinClasses, joinStyle, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type CheckboxProps = Props<{
  checked?: boolean
  value?: string | undefined
  disabled?: boolean
  required?: boolean
  errorMessage?: string | ((checked: boolean) => Promisable<string | void>)
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
      validateImmediately: false,
      radius: 'var(--solid-design-parts-Checkbox_checkbox-default-radius)',
    },
    ['errorMessage', 'onChangeChecked', 'onChangeValidChecked']
  )

  const checkedSignal = createInjectableSignalObject(props, 'checked')

  const isEditedSignal = createSignalObject(false)
  const shouldValidate = createMemo(() => isEditedSignal.value || props.validateImmediately)

  const errorMessageSignal = createSignalObject<string | undefined>()
  createRenderEffect(async () => {
    errorMessageSignal.value = await deriveErrorMessage(
      shouldValidate(),
      untrack(checkedSignal.get),
      props.errorMessage,
      props.required
    )
  })
  createRenderEffect(
    on(
      () => props.checked,
      async () => {
        errorMessageSignal.value = await deriveErrorMessage(
          shouldValidate(),
          props.checked,
          props.errorMessage,
          props.required
        )
      },
      { defer: true }
    )
  )

  async function onChange(event: Event) {
    isEditedSignal.value = true
    if (!isInstanceOf(event.target, HTMLInputElement)) return

    const checked = event.target.checked
    checkedSignal.value = checked
    props.onChangeChecked?.(checked)

    const newErrorMessage = await deriveErrorMessage(shouldValidate(), checked, props.errorMessage, props.required)
    errorMessageSignal.value = newErrorMessage
    if (newErrorMessage === undefined) {
      props.onChangeValidChecked?.(checked)
    }
  }

  async function deriveErrorMessage(
    shouldValidate: boolean,
    checked: boolean,
    errorMessage: CheckboxProps['errorMessage'],
    required: boolean
  ): Promise<string | undefined> {
    if (required) {
      if (!shouldValidate) {
        return undefined
      } else if (typeof errorMessage === 'string') {
        if (checked) {
          return undefined
        } else {
          return errorMessage
        }
      } else {
        const result = await errorMessage?.(checked)
        if (checked) {
          return result ?? undefined
        } else {
          return result ?? ''
        }
      }
    } else {
      if (typeof errorMessage === 'string') {
        return errorMessage
      } else if (!shouldValidate) {
        return undefined
      } else {
        const result = await errorMessage?.(checked)
        return result ?? undefined
      }
    }
  }

  return (
    <div
      class={joinClasses(rawProps, 'solid-design-parts-Checkbox_root')}
      style={joinStyle(rawProps.style, { '--solid-design-parts-Checkbox_checkbox-radius': props.radius })}
      aria-disabled={props.disabled}
      aria-invalid={errorMessageSignal.value !== undefined}
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
      <p class="solid-design-parts-Checkbox_error-message">{errorMessageSignal.value}</p>
    </div>
  )
}
