import { entriesOf, isInstanceOf, Promisable } from 'base-up'
import { createRenderEffect, untrack } from 'solid-js'
import { createMemoObject, createSignalObject } from 'solid-signal-object'
import './AutoSizeTextArea.scss'
import './common.scss'
import { ErrorMessage } from './ErrorMessage'
import { TextInputProps } from './TextInput'
import { countCharacters } from './utility/other'
import { createDeferEffect, createInjectableSignalObject, joinClasses, prepareProps, Props } from './utility/props'

export type AutoSizeTextAreaProps = Props<
  {
    value?: string
    required?: boolean
    min?: number
    max?: number
    lengthCounter?: (text: string) => number
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
      lengthCounter: countCharacters,
      error: false as Required<AutoSizeTextAreaProps>['error'],
      validateImmediately: false,
    },
    ['min', 'max', 'onChangeValue']
  )

  const synthesizedPredicateFunction = createMemoObject(() => {
    const predicateFunctions = {
      required: (value: string) => 0 < props.lengthCounter(value),
      min: (value: string) => props.min! <= props.lengthCounter(value),
      max: (value: string) => props.lengthCounter(value) <= props.max!,
    } as const

    const filteredPredicateFunctions = entriesOf(predicateFunctions)
      .filter(([key]) => rawProps[key] !== undefined)
      .map(([, value]) => value)
    if (filteredPredicateFunctions.length === 0) return undefined

    return (value: string) => filteredPredicateFunctions.every((f) => f(value))
  })

  const valueSignal = createInjectableSignalObject(props, 'value')

  const isEditedSignal = createSignalObject(false)
  const shouldValidate = createMemoObject(() => isEditedSignal.value || props.validateImmediately)

  const errorSignal = createSignalObject<boolean | string>(false)
  createRenderEffect(async () => {
    const value = untrack(valueSignal.get)
    const error = await deriveError(shouldValidate.value, value, props.error, synthesizedPredicateFunction.value)
    errorSignal.value = error
    if (error === false) {
      props.onValid?.(value)
    }
  })
  createDeferEffect(valueSignal.get, async () => {
    const value = valueSignal.value
    props.onChangeValue?.(value)
    const error = await deriveError(shouldValidate.value, value, props.error, synthesizedPredicateFunction.value)
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
    error: Required<TextInputProps>['error'],
    synthesizedPredicateFunction: ((value: string) => boolean) | undefined
  ): Promise<boolean | string> {
    if (error === true) return true

    if (synthesizedPredicateFunction !== undefined) {
      if (!shouldValidate) {
        return false
      } else if (error === false) {
        return !synthesizedPredicateFunction(value)
      } else if (typeof error === 'string') {
        if (synthesizedPredicateFunction(value)) {
          return false
        } else {
          return error
        }
      } else {
        const result = await error(value)
        if (!synthesizedPredicateFunction(value) && result === false) return true

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
      <ErrorMessage>{errorSignal.value}</ErrorMessage>
    </div>
  )
}
