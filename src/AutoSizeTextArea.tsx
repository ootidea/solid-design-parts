import { isInstanceOf } from 'base-up'
import { Promisable } from 'base-up/dist/types/Promise'
import { createMemo, createRenderEffect, on, untrack } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
import css from './AutoSizeTextArea.scss'
import { createInjectableSignalObject, joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type AutoSizeTextAreaProps = Props<
  {
    value?: string
    required?: boolean
    error?: boolean | string | ((value: string) => Promisable<boolean | string>)
    validateImmediately?: boolean
    onChangeValue?: (value: string) => void
    onChangeValidValue?: (value: string) => void
  },
  'textarea'
>

export function AutoSizeTextArea(rawProps: AutoSizeTextAreaProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      value: '',
      required: false,
      error: false as Required<AutoSizeTextAreaProps>['error'],
      validateImmediately: false,
    },
    ['onChangeValue']
  )

  const valueSignal = createInjectableSignalObject(props, 'value')

  const isEditedSignal = createSignalObject(false)
  const shouldValidate = createMemo(() => isEditedSignal.value || props.validateImmediately)

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

    if (!isInstanceOf(event.target, HTMLTextAreaElement)) return

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
    error: Required<AutoSizeTextAreaProps>['error'],
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

  const ZERO_WIDTH_SPACE = '\u200B'

  return (
    <div
      class="solid-design-parts-AutoSizeTextArea_root"
      aria-disabled={props.disabled}
      aria-invalid={errorSignal.value !== false}
      aria-required={props.required}
    >
      <div class="solid-design-parts-AutoSizeTextArea_body">
        <div class="solid-design-parts-AutoSizeTextArea_dummy" aria-hidden="true">
          {valueSignal.value || rawProps.placeholder}
          {ZERO_WIDTH_SPACE}
        </div>
        <textarea
          class={joinClasses(rawProps, 'solid-design-parts-AutoSizeTextArea_text-area')}
          value={valueSignal.value}
          onInput={onInput}
          onBlur={() => (isEditedSignal.value = true)}
          {...restProps}
        />
      </div>
      <p class="solid-design-parts-AutoSizeTextArea_error-message">{errorSignal.value}</p>
    </div>
  )
}
