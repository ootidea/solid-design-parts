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
    errorMessage?: string | ((value: string) => Promisable<string | void>)
    validateInitialValue?: boolean
    onChangeValue?: (value: string) => void
    onChangeValidValue?: (value: string) => void
  },
  'textarea'
>

export function AutoSizeTextArea(rawProps: AutoSizeTextAreaProps) {
  const [props, restProps] = prepareProps(rawProps, { value: '', required: false, validateInitialValue: false }, [
    'errorMessage',
    'onChangeValue',
  ])

  const valueSignal = createInjectableSignalObject(props, 'value')

  const isEditedSignal = createSignalObject(false)
  const shouldValidate = createMemo(() => isEditedSignal.value || props.validateInitialValue)

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

    if (!isInstanceOf(event.target, HTMLTextAreaElement)) return

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
    errorMessage: AutoSizeTextAreaProps['errorMessage'],
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

  const ZERO_WIDTH_SPACE = '\u200B'

  return (
    <div
      class="mantle-ui-AutoSizeTextArea_root"
      aria-disabled={props.disabled}
      aria-invalid={errorMessageSignal.value !== undefined}
      aria-required={props.required}
    >
      <div class="mantle-ui-AutoSizeTextArea_body">
        <div class="mantle-ui-AutoSizeTextArea_dummy" aria-hidden="true">
          {valueSignal.value || rawProps.placeholder}
          {ZERO_WIDTH_SPACE}
        </div>
        <textarea
          class={joinClasses(rawProps, 'mantle-ui-AutoSizeTextArea_text-area')}
          value={valueSignal.value}
          onInput={onInput}
          onBlur={() => (isEditedSignal.value = true)}
          {...restProps}
        />
      </div>
      <p class="mantle-ui-AutoSizeTextArea_error-message">{errorMessageSignal.value}</p>
    </div>
  )
}
