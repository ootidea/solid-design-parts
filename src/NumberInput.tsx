import { isInstanceOf } from 'base-up'
import { Promisable } from 'base-up/dist/types/Promise'
import { createMemo, createRenderEffect, JSX, on, untrack } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
import { Gravity } from './Gravity'
import css from './NumberInput.scss'
import { StretchLayout } from './StretchLayout'
import { joinClasses, joinStyle, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type NumberInputProps = Props<{
  value?: number | undefined
  placeholder?: string
  inputMode?: 'decimal' | 'numeric'
  disabled?: boolean
  required?: boolean
  error?: string | ((value: number | undefined) => Promisable<string | void>)
  validateImmediately?: boolean
  radius?: string
  prepend?: JSX.Element
  append?: JSX.Element
  onChangeValue?: (value: number | undefined) => void
  onChangeValidValue?: (value: number | undefined) => void
}>

export function NumberInput(rawProps: NumberInputProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      inputMode: 'numeric',
      disabled: false,
      required: false,
      validateImmediately: false,
      radius: 'var(--solid-design-parts-input-border-radius)',
    },
    ['value', 'placeholder', 'error', 'prepend', 'append', 'onChangeValue', 'onChangeValidValue']
  )

  const stringSignal = createSignalObject(stringify(props.value))
  createRenderEffect(
    on(
      () => props.value,
      () => {
        if (props.value !== numberSignal.value) {
          stringSignal.value = stringify(props.value)
          numberSignal.value = props.value
        }
      },
      { defer: true }
    )
  )
  const numberSignal = createSignalObject(props.value)
  const isEditedSignal = createSignalObject(false)
  const shouldValidate = createMemo(() => isEditedSignal.value || props.validateImmediately)

  const hasInputElementFocusSignal = createSignalObject(false)

  const errorSignal = createSignalObject<string | undefined>()
  createRenderEffect(async () => {
    errorSignal.value = await deriveError(shouldValidate(), untrack(numberSignal.get), props.error, props.required)
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

    stringSignal.value = event.target.value
    const newValue = defaultParser(stringSignal.value)
    numberSignal.value = newValue
    props.onChangeValue?.(newValue)

    const nextError = await deriveError(shouldValidate(), newValue, props.error, props.required)
    errorSignal.value = nextError
    if (nextError === undefined) {
      props.onChangeValidValue?.(newValue)
    }
  }

  function defaultParser(text: string): number | undefined {
    // Since Number('') returns 0, not NaN
    if (text.length === 0) return undefined

    const asNumber = Number(text)
    return Number.isFinite(asNumber) ? asNumber : undefined
  }

  function stringify(value: number | undefined): string {
    return Number.isFinite(value) ? String(value) : ''
  }

  async function deriveError(
    shouldValidate: boolean,
    value: number | undefined,
    error: NumberInputProps['error'],
    required: boolean
  ): Promise<string | undefined> {
    if (required) {
      if (!shouldValidate) {
        return undefined
      } else if (typeof error === 'string') {
        if (value !== undefined) {
          return undefined
        } else {
          return error
        }
      } else {
        const result = await error?.(value)
        if (value !== undefined) {
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
      class={joinClasses(rawProps, 'solid-design-parts-NumberInput_root', {
        'solid-design-parts-NumberInput_input-element-has-focus': hasInputElementFocusSignal.value,
      })}
      style={joinStyle(rawProps.style, { '--solid-design-parts-NumberInput_radius': props.radius })}
      aria-disabled={props.disabled}
      aria-invalid={errorSignal.value !== undefined}
      aria-required={props.required}
      {...restProps}
    >
      <StretchLayout class="solid-design-parts-NumberInput_body" stretchAt={1}>
        <Gravity class="solid-design-parts-NumberInput_prepend">{rawProps.prepend}</Gravity>
        <input
          class="solid-design-parts-NumberInput_input"
          type="text"
          value={stringSignal.value}
          inputMode={props.inputMode}
          placeholder={props.placeholder}
          disabled={props.disabled}
          onInput={onInput}
          onFocus={() => (hasInputElementFocusSignal.value = true)}
          onBlur={() => {
            isEditedSignal.value = true
            hasInputElementFocusSignal.value = false
          }}
        />
        <Gravity class="solid-design-parts-NumberInput_append">{rawProps.append}</Gravity>
      </StretchLayout>
      <p class="solid-design-parts-NumberInput_error-message">{errorSignal.value}</p>
    </div>
  )
}
