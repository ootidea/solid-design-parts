import { entriesOf, isInstanceOf, Promisable } from 'base-up'
import { createRenderEffect, JSX, Show, untrack } from 'solid-js'
import { createMemoObject, createSignalObject } from 'solid-signal-object'
import './common.scss'
import { IconButton } from './IconButton'
import closeCircleIcon from './image/close-circle.svg'
import './NumberInput.scss'
import { createDeferEffect, joinClasses, joinStyle, prepareProps, Props } from './utility/props'

export type NumberInputProps = Props<{
  value?: number | undefined
  placeholder?: string
  inputMode?: 'decimal' | 'numeric'
  disabled?: boolean
  required?: boolean
  min?: number
  max?: number
  integerOnly?: boolean
  error?: boolean | string | ((value: number | undefined) => Promisable<boolean | string>)
  validateImmediately?: boolean
  showClearButton?: boolean
  radius?: string
  prefix?: JSX.Element
  suffix?: JSX.Element
  onChangeValue?: (value: number | undefined) => void
  onValid?: (value: number | undefined) => void
}>

export function NumberInput(rawProps: NumberInputProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      inputMode: rawProps.integerOnly ? 'numeric' : 'decimal',
      disabled: false,
      required: false,
      integerOnly: false,
      error: false as Required<NumberInputProps>['error'],
      validateImmediately: false,
      showClearButton: false,
      radius: 'var(--solid-design-parts-input-border-radius)',
    },
    ['value', 'placeholder', 'min', 'max', 'prefix', 'suffix', 'onChangeValue', 'onValid']
  )

  const synthesizedPredicateFunction = createMemoObject(() => {
    const predicateFunctions = {
      required: (value: number | undefined) => value !== undefined,
      min: (value: number | undefined) => value === undefined || props.min! <= value,
      max: (value: number | undefined) => value === undefined || value <= props.max!,
      integerOnly: (value: number | undefined) => value === undefined || Number.isInteger(value),
    } as const

    const filteredPredicateFunctions = entriesOf(predicateFunctions)
      .filter(([key]) => rawProps[key] !== undefined)
      .map(([, value]) => value)
    if (filteredPredicateFunctions.length === 0) return undefined

    return (value: number | undefined) => filteredPredicateFunctions.every((f) => f(value))
  })

  const stringSignal = createSignalObject(stringify(props.value))
  createDeferEffect(
    () => props.value,
    () => {
      if (props.value !== numberSignal.value) {
        stringSignal.value = stringify(props.value)
        numberSignal.value = props.value
      }
    }
  )
  const numberSignal = createSignalObject(props.value)
  const isEditedSignal = createSignalObject(false)
  const shouldValidate = createMemoObject(() => isEditedSignal.value || props.validateImmediately)

  const hasInputElementFocusSignal = createSignalObject(false)

  const errorSignal = createSignalObject<boolean | string>(false)
  createRenderEffect(async () => {
    const value = untrack(numberSignal.get)
    const error = await deriveError(shouldValidate.value, value, props.error, synthesizedPredicateFunction.value)
    errorSignal.value = error
    if (error === false) {
      props.onValid?.(value)
    }
  })
  createDeferEffect(numberSignal.get, async () => {
    const value = numberSignal.value
    props.onChangeValue?.(value)
    const error = await deriveError(shouldValidate.value, value, props.error, synthesizedPredicateFunction.value)
    errorSignal.value = error
    if (error === false) {
      props.onValid?.(value)
    }
  })

  async function onInput(event: InputEvent) {
    if (!isInstanceOf(event.target, HTMLInputElement)) return

    changeValue(event.target.value)
  }

  function changeValue(newString: string) {
    isEditedSignal.value = true

    stringSignal.value = newString
    numberSignal.value = defaultParser(newString)
  }

  function defaultParser(text: string): number | undefined {
    // Since Number('') returns 0, not NaN
    if (text.trim() === '') return undefined

    const asNumber = Number(text)
    return Number.isFinite(asNumber) ? asNumber : undefined
  }

  function stringify(value: number | undefined): string {
    return Number.isFinite(value) ? String(value) : ''
  }

  async function deriveError(
    shouldValidate: boolean,
    value: number | undefined,
    error: Required<NumberInputProps>['error'],
    synthesizedPredicateFunction: ((value: number | undefined) => boolean) | undefined
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
      class={joinClasses(rawProps, 'solid-design-parts-NumberInput_root', {
        'solid-design-parts-NumberInput_input-element-has-focus': hasInputElementFocusSignal.value,
      })}
      style={joinStyle(rawProps.style, { '--solid-design-parts-NumberInput_radius': props.radius })}
      aria-disabled={props.disabled}
      aria-invalid={errorSignal.value !== false}
      aria-required={props.required}
    >
      <div class="solid-design-parts-NumberInput_frame">
        <div class="solid-design-parts-NumberInput_prefix">{rawProps.prefix}</div>
        <div class="solid-design-parts-NumberInput_body">
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
          <Show when={props.showClearButton}>
            <IconButton
              class="solid-design-parts-TextInput_clear-button"
              src={closeCircleIcon}
              size="1.6em"
              iconSize="1.25em"
              iconColor="var(--solid-design-parts-clear-button-icon-default-color)"
              aria-hidden={stringSignal.value.length === 0}
              onClick={() => changeValue('')}
            />
          </Show>
        </div>
        <div class="solid-design-parts-NumberInput_suffix">{rawProps.suffix}</div>
      </div>
      <p class="solid-design-parts-NumberInput_error-message">{errorSignal.value}</p>
    </div>
  )
}
