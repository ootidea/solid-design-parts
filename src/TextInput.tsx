import { Promisable } from 'base-up/dist/types/Promise'
import { createEffect, createSignal, JSX, on } from 'solid-js'
import { Gravity } from './Gravity'
import { StretchLayout } from './StretchLayout'
import css from './TextInput.scss'
import { LiteralAutoComplete } from './utility/others'
import { joinClasses, joinStyle, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type TextInputProps = Props<{
  value?: string
  placeholder?: string
  type?: LiteralAutoComplete<
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
  >
  disabled?: boolean
  errorMessage?: string | ((value: string) => Promisable<string | void | undefined>)
  forceValidation?: boolean
  radius?: string
  prepend?: JSX.Element
  append?: JSX.Element
  onChangeValue?: (value: string) => void
  onChangeValidValue?: (value: string) => void
}>

export function TextInput(rawProps: TextInputProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    { disabled: false, forceValidation: false, radius: 'var(--mantle-ui-input-border-radius)' },
    ['value', 'placeholder', 'type', 'errorMessage', 'prepend', 'append', 'onChangeValue', 'onChangeValidValue']
  )

  const [value, setValue] = createSignal(props.value)
  createEffect(
    on(
      () => props.value,
      () => setValue(props.value),
      { defer: true }
    )
  )
  const [shouldValidate, setShouldValidate] = createSignal(props.forceValidation)
  createEffect(
    on(
      () => props.forceValidation,
      () => setShouldValidate(props.forceValidation),
      { defer: true }
    )
  )

  const [inputElementHasFocus, setInputElementHasFocus] = createSignal(false)

  const [errorMessage, setErrorMessage] = createSignal<string | undefined>()
  createEffect(async () => {
    if (props.errorMessage === undefined) {
      setErrorMessage(undefined)
    } else if (typeof props.errorMessage === 'string') {
      setErrorMessage(props.errorMessage)
    } else if (!shouldValidate()) {
      setErrorMessage(undefined)
    } else {
      const result = await props.errorMessage(value() ?? '')
      setErrorMessage(result ?? undefined)
    }
  })

  async function onInput(event: InputEvent) {
    setShouldValidate(true)
    if (event.target instanceof HTMLInputElement) {
      const newValue = event.target.value
      setValue(newValue)
      props.onChangeValue?.(newValue)

      if (props.onChangeValidValue !== undefined) {
        if (typeof props.errorMessage === 'string' || (await props.errorMessage?.(newValue)) === undefined) {
          props.onChangeValidValue(newValue)
        }
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
      {...restProps}
    >
      <StretchLayout class="mantle-ui-TextInput_body" stretchAt={1}>
        <Gravity class="mantle-ui-TextInput_prepend">{rawProps.prepend}</Gravity>
        <input
          class="mantle-ui-TextInput_input"
          attr:value={value()}
          placeholder={props.placeholder}
          type={props.type}
          disabled={props.disabled}
          onInput={onInput}
          onFocus={() => setInputElementHasFocus(true)}
          onBlur={() => {
            setShouldValidate(true)
            setInputElementHasFocus(false)
          }}
        />
        <Gravity class="mantle-ui-TextInput_append">{rawProps.append}</Gravity>
      </StretchLayout>
      <p class="mantle-ui-TextInput_error-message">{errorMessage()}</p>
    </div>
  )
}
