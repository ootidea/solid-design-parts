import { isInstanceOf, Promisable } from 'base-up'
import { createRenderEffect, untrack } from 'solid-js'
import { createMemoObject, createSignalObject } from 'solid-signal-object'
import './AutoSizeTextArea.scss'
import './common.scss'
import { createDeferEffect, createInjectableSignalObject, joinClasses, prepareProps, Props } from './utility/props'

export type AutoSizeTextAreaProps = Props<
  {
    value?: string
    required?: boolean
    error?: boolean | string | ((value: string) => Promisable<boolean | string>)
    validateImmediately?: boolean
    onChangeValue?: (value: string) => void
    onValid?: (value: string) => void
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
  const shouldValidate = createMemoObject(() => isEditedSignal.value || props.validateImmediately)

  const errorSignal = createSignalObject<boolean | string>(false)
  createRenderEffect(async () => {
    const value = untrack(valueSignal.get)
    const error = await deriveError(shouldValidate.value, value, props.error, props.required)
    errorSignal.value = error
    if (error === false) {
      props.onValid?.(value)
    }
  })
  createDeferEffect(valueSignal.get, async () => {
    const value = valueSignal.value
    props.onChangeValue?.(value)
    const error = await deriveError(shouldValidate.value, value, props.error, props.required)
    errorSignal.value = error
    if (error === false) {
      props.onValid?.(value)
    }
  })

  async function onInput(event: InputEvent) {
    if (!isInstanceOf(event.target, HTMLTextAreaElement)) return

    isEditedSignal.value = true
    valueSignal.value = event.target.value
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
          {...restProps}
          class={joinClasses(rawProps, 'solid-design-parts-AutoSizeTextArea_text-area')}
          value={valueSignal.value}
          onInput={onInput}
          onBlur={() => (isEditedSignal.value = true)}
        />
      </div>
      <p class="solid-design-parts-AutoSizeTextArea_error-message">{errorSignal.value}</p>
    </div>
  )
}
