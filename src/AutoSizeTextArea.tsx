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
    error?: string | ((value: string) => Promisable<string | void>)
    validateImmediately?: boolean
    onChangeValue?: (value: string) => void
    onChangeValidValue?: (value: string) => void
  },
  'textarea'
>

export function AutoSizeTextArea(rawProps: AutoSizeTextAreaProps) {
  const [props, restProps] = prepareProps(rawProps, { value: '', required: false, validateImmediately: false }, [
    'error',
    'onChangeValue',
  ])

  const valueSignal = createInjectableSignalObject(props, 'value')

  const isEditedSignal = createSignalObject(false)
  const shouldValidate = createMemo(() => isEditedSignal.value || props.validateImmediately)

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
    error: AutoSizeTextAreaProps['error'],
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

  const ZERO_WIDTH_SPACE = '\u200B'

  return (
    <div
      class="solid-design-parts-AutoSizeTextArea_root"
      aria-disabled={props.disabled}
      aria-invalid={errorSignal.value !== undefined}
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
