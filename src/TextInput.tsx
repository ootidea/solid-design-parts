import { entriesOf, isInstanceOf, LiteralAutoComplete, Promisable } from 'base-up'
import { createRenderEffect, JSX, Show, untrack } from 'solid-js'
import { createMemoObject, createSignalObject } from 'solid-signal-object'
import './common.scss'
import { IconButton } from './IconButton'
import closeCircleIcon from './image/close-circle.svg'
import './TextInput.scss'
import {
  createDeferEffect,
  createInjectableSignalObject,
  joinClasses,
  joinStyle,
  prepareProps,
  Props,
} from './utility/props'

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
  min?: number
  max?: number
  error?: boolean | string | ((value: string) => Promisable<boolean | string>)
  validateImmediately?: boolean
  showClearButton?: boolean
  radius?: string
  prefix?: JSX.Element
  suffix?: JSX.Element
  onChangeValue?: (value: string) => void
  onValid?: (value: string) => void
}>

export function TextInput(rawProps: TextInputProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      value: '',
      disabled: false,
      required: false,
      error: false as Required<TextInputProps>['error'],
      validateImmediately: false,
      showClearButton: false,
      radius: 'var(--solid-design-parts-input-border-radius)',
    },
    ['placeholder', 'type', 'min', 'max', 'prefix', 'suffix', 'onChangeValue', 'onValid']
  )

  const synthesizedPredicateFunction = createMemoObject(() => {
    const predicateFunctions = {
      required: (value: string) => 0 < countCharacters(value),
      min: (value: string) => props.min! <= countCharacters(value),
      max: (value: string) => countCharacters(value) <= props.max!,
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

  const hasInputElementFocusSignal = createSignalObject(false)

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
    if (!isInstanceOf(event.target, HTMLInputElement)) return

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

  return (
    <div
      {...restProps}
      class={joinClasses(rawProps, 'solid-design-parts-TextInput_root', {
        'solid-design-parts-TextInput_input-element-has-focus': hasInputElementFocusSignal.value,
      })}
      style={joinStyle(rawProps.style, { '--solid-design-parts-TextInput_radius': props.radius })}
      aria-disabled={props.disabled}
      aria-invalid={errorSignal.value !== false}
      aria-required={props.required}
    >
      <div class="solid-design-parts-TextInput_frame">
        <div class="solid-design-parts-TextInput_prefix">{rawProps.prefix}</div>
        <div class="solid-design-parts-TextInput_body">
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
          <Show when={props.showClearButton}>
            <IconButton
              class="solid-design-parts-TextInput_clear-button"
              src={closeCircleIcon}
              size="1.6em"
              iconSize="1.25em"
              iconColor="var(--solid-design-parts-clear-button-icon-default-color)"
              aria-hidden={valueSignal.value.length === 0}
              onClick={() => {
                isEditedSignal.value = true
                valueSignal.value = ''
              }}
            />
          </Show>
        </div>
        <div class="solid-design-parts-TextInput_suffix">{rawProps.suffix}</div>
      </div>
      <p class="solid-design-parts-TextInput_error-message">{errorSignal.value}</p>
    </div>
  )
}

function countCharacters(text: string): number {
  if (Intl?.Segmenter !== undefined) {
    const segmenter = new Intl.Segmenter([], { granularity: 'grapheme' })
    return [...segmenter.segment(text)].length
  } else {
    return [...text].length
  }
}
