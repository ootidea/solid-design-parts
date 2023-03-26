import { isInstanceOf } from 'base-up'
import { Promisable } from 'base-up/dist/types/Promise'
import { createMemo, createRenderEffect, JSX, on, untrack } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
import { StretchLayout } from './StretchLayout'
import css from './TextInput.scss'
import { LiteralAutoComplete } from './utility/others'
import { createInjectableSignalObject, joinClasses, joinStyle, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type TextInputProps = Props<{
  value?: string
  placeholder?: string
  type?: LiteralAutoComplete<
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
  >
  disabled?: boolean
  required?: boolean
  error?: boolean | string | ((value: string) => Promisable<boolean | string>)
  validateImmediately?: boolean
  radius?: string
  prefix?: JSX.Element
  suffix?: JSX.Element
  onChangeValue?: (value: string) => void
  onChangeValidValue?: (value: string) => void
}>

export function TextInput(rawProps: TextInputProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      value: '',
      disabled: false,
      required: false,
      error: false as Required<TextInputProps>['error'],
      validateImmediately: false,
      radius: 'var(--solid-design-parts-input-border-radius)',
    },
    ['placeholder', 'type', 'prefix', 'suffix', 'onChangeValue', 'onChangeValidValue']
  )

  const valueSignal = createInjectableSignalObject(props, 'value')
  const isEditedSignal = createSignalObject(false)
  const shouldValidate = createMemo(() => isEditedSignal.value || props.validateImmediately)

  const hasInputElementFocusSignal = createSignalObject(false)

  const errorSignal = createSignalObject<boolean | string>(false)
  createRenderEffect(async () => {
    errorSignal.value = await deriveError(shouldValidate(), untrack(valueSignal.get), props.error, props.required)
  })
  createRenderEffect(
    on(
      () => props.value,
      async () => {
        errorSignal.value = await deriveError(shouldValidate(), props.value, props.error, props.required)
      },
      { defer: true }
    )
  )

  async function onInput(event: InputEvent) {
    isEditedSignal.value = true

    if (!isInstanceOf(event.target, HTMLInputElement)) return

    const newValue = event.target.value
    valueSignal.value = newValue
    props.onChangeValue?.(newValue)

    const nextError = await deriveError(shouldValidate(), newValue, props.error, props.required)
    errorSignal.value = nextError
    if (nextError === undefined) {
      props.onChangeValidValue?.(newValue)
    }
  }

  async function deriveError(
    shouldValidate: boolean,
    value: string,
    error: Required<TextInputProps>['error'],
    required: boolean
  ): Promise<boolean | string> {
    if (error === true) return true

    if (required) {
      if (!shouldValidate) {
        return false
      } else if (error === false) {
        return value.length === 0
      } else if (typeof error === 'string') {
        if (value.length > 0) {
          return false
        } else {
          return error
        }
      } else {
        const result = await error(value)
        if (value.length === 0 && result === false) return true

        return result
      }
    } else {
      if (error === false || typeof error === 'string') {
        return error
      } else if (!shouldValidate) {
        return false
      } else {
        return await error(value)
      }
    }
  }

  return (
    <div
      class={joinClasses(rawProps, 'solid-design-parts-TextInput_root', {
        'solid-design-parts-TextInput_input-element-has-focus': hasInputElementFocusSignal.value,
      })}
      style={joinStyle(rawProps.style, { '--solid-design-parts-TextInput_radius': props.radius })}
      aria-disabled={props.disabled}
      aria-invalid={errorSignal.value !== false}
      aria-required={props.required}
      {...restProps}
    >
      <StretchLayout class="solid-design-parts-TextInput_body" stretchAt={1}>
        <div class="solid-design-parts-TextInput_prefix">{rawProps.prefix}</div>
        <input
          class="solid-design-parts-TextInput_input"
          value={valueSignal.value}
          placeholder={props.placeholder}
          type={props.type}
          disabled={props.disabled}
          onInput={onInput}
          onFocus={() => (hasInputElementFocusSignal.value = true)}
          onBlur={() => {
            isEditedSignal.value = true
            hasInputElementFocusSignal.value = false
          }}
        />
        <div class="solid-design-parts-TextInput_suffix">{rawProps.suffix}</div>
      </StretchLayout>
      <p class="solid-design-parts-TextInput_error-message">{errorSignal.value}</p>
    </div>
  )
}
