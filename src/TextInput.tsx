import { isInstanceOf } from 'base-up'
import { Promisable } from 'base-up/dist/types/Promise'
import { createMemo, createRenderEffect, JSX, on, untrack } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
import { Gravity } from './Gravity'
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
  error?: string | ((value: string) => Promisable<string | void>)
  validateImmediately?: boolean
  radius?: string
  prepend?: JSX.Element
  append?: JSX.Element
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
      validateImmediately: false,
      radius: 'var(--solid-design-parts-input-border-radius)',
    },
    ['placeholder', 'type', 'error', 'prepend', 'append', 'onChangeValue', 'onChangeValidValue']
  )

  const valueSignal = createInjectableSignalObject(props, 'value')
  const isEditedSignal = createSignalObject(false)
  const shouldValidate = createMemo(() => isEditedSignal.value || props.validateImmediately)

  const hasInputElementFocusSignal = createSignalObject(false)

  const errorSignal = createSignalObject<string | undefined>()
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
    error: TextInputProps['error'],
    required: boolean
  ): Promise<string | undefined> {
    if (required) {
      if (!shouldValidate) {
        return undefined
      } else if (typeof error === 'string') {
        if (value) {
          return undefined
        } else {
          return error
        }
      } else {
        const result = await error?.(value)
        if (value) {
          return result ?? undefined
        } else {
          return result ?? ''
        }
      }
    } else {
      if (typeof error === 'string') {
        return error
      } else if (!shouldValidate) {
        return undefined
      } else {
        const result = await error?.(value)
        return result ?? undefined
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
      aria-invalid={errorSignal.value !== undefined}
      aria-required={props.required}
      {...restProps}
    >
      <StretchLayout class="solid-design-parts-TextInput_body" stretchAt={1}>
        <Gravity class="solid-design-parts-TextInput_prepend">{rawProps.prepend}</Gravity>
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
        <Gravity class="solid-design-parts-TextInput_append">{rawProps.append}</Gravity>
      </StretchLayout>
      <p class="solid-design-parts-TextInput_error-message">{errorSignal.value}</p>
    </div>
  )
}
