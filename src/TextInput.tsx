import { isInstanceOf } from 'base-up'
import { Promisable } from 'base-up/dist/types/Promise'
import { createMemo, createRenderEffect, createSignal, JSX, untrack } from 'solid-js'
import { Gravity } from './Gravity'
import { StretchLayout } from './StretchLayout'
import css from './TextInput.scss'
import { LiteralAutoComplete } from './utility/others'
import { createInjectableSignal, joinClasses, joinStyle, prepareProps, Props } from './utility/props'
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
  validateInitialValue?: boolean
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
      validateInitialValue: false,
      radius: 'var(--mantle-ui-input-border-radius)',
    },
    ['placeholder', 'type', 'errorMessage', 'prepend', 'append', 'onChangeValue', 'onChangeValidValue']
  )

  const [value, setValue] = createInjectableSignal(props, 'value')
  const [isEdited, setEdited] = createSignal(false)
  const shouldValidate = createMemo(() => isEdited() || props.validateInitialValue)

  const [inputElementHasFocus, setInputElementHasFocus] = createSignal(false)

  const [errorMessage, setErrorMessage] = createSignal<string | undefined>()
  createRenderEffect(async () => {
    setErrorMessage(await deriveErrorMessage(untrack(value), shouldValidate(), props.required, props.errorMessage))
  })

  async function onInput(event: InputEvent) {
    setEdited(true)

    if (!isInstanceOf(event.target, HTMLInputElement)) return

    const newValue = event.target.value
    setValue(newValue)
    props.onChangeValue?.(newValue)

    const nextErrorMessage = await deriveErrorMessage(newValue, shouldValidate(), props.required, props.errorMessage)
    setErrorMessage(nextErrorMessage)
    if (nextErrorMessage === undefined) {
      props.onChangeValidValue?.(newValue)
    }
  }

  async function deriveErrorMessage(
    value: string,
    shouldValidate: boolean,
    required: boolean,
    errorMessage: TextInputProps['errorMessage']
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
      class={joinClasses(rawProps, 'mantle-ui-TextInput_root', {
        'mantle-ui-TextInput_input-element-has-focus': inputElementHasFocus(),
      })}
      style={joinStyle(rawProps.style, { '--mantle-ui-TextInput_radius': props.radius })}
      aria-disabled={props.disabled}
      aria-invalid={errorMessage() !== undefined}
      aria-required={props.required}
      {...restProps}
    >
      <StretchLayout class="mantle-ui-TextInput_body" stretchAt={1}>
        <Gravity class="mantle-ui-TextInput_prepend">{rawProps.prepend}</Gravity>
        <input
          class="mantle-ui-TextInput_input"
          value={value()}
          placeholder={props.placeholder}
          type={props.type}
          disabled={props.disabled}
          onInput={onInput}
          onFocus={() => setInputElementHasFocus(true)}
          onBlur={() => {
            setEdited(true)
            setInputElementHasFocus(false)
          }}
        />
        <Gravity class="mantle-ui-TextInput_append">{rawProps.append}</Gravity>
      </StretchLayout>
      <p class="mantle-ui-TextInput_error-message">{errorMessage()}</p>
    </div>
  )
}
