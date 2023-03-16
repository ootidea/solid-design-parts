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
  errorMessage?: string | ((value: string) => Promisable<string | void>)
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
    ['placeholder', 'type', 'errorMessage', 'prepend', 'append', 'onChangeValue', 'onChangeValidValue']
  )

  const valueSignal = createInjectableSignalObject(props, 'value')
  const isEditedSignal = createSignalObject(false)
  const shouldValidate = createMemo(() => isEditedSignal.value || props.validateImmediately)

  const hasInputElementFocusSignal = createSignalObject(false)

  const errorMessageSignal = createSignalObject<string | undefined>()
  createRenderEffect(async () => {
    errorMessageSignal.value = await deriveErrorMessage(
      shouldValidate(),
      untrack(valueSignal.get),
      props.errorMessage,
      props.required
    )
  })
  createRenderEffect(
    on(
      () => props.value,
      async () => {
        errorMessageSignal.value = await deriveErrorMessage(
          shouldValidate(),
          props.value,
          props.errorMessage,
          props.required
        )
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

    const nextErrorMessage = await deriveErrorMessage(shouldValidate(), newValue, props.errorMessage, props.required)
    errorMessageSignal.value = nextErrorMessage
    if (nextErrorMessage === undefined) {
      props.onChangeValidValue?.(newValue)
    }
  }

  async function deriveErrorMessage(
    shouldValidate: boolean,
    value: string,
    errorMessage: TextInputProps['errorMessage'],
    required: boolean
  ): Promise<string | undefined> {
    if (required) {
      if (!shouldValidate) {
        return undefined
      } else if (typeof errorMessage === 'string') {
        if (value) {
          return undefined
        } else {
          return errorMessage
        }
      } else {
        const result = await errorMessage?.(value)
        if (value) {
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
        const result = await errorMessage?.(value)
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
      aria-invalid={errorMessageSignal.value !== undefined}
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
      <p class="solid-design-parts-TextInput_error-message">{errorMessageSignal.value}</p>
    </div>
  )
}
