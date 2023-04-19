import { entriesOf, intersectionOf, isSubsetOf, Promisable, toggle } from 'base-up'
import { createRenderEffect, For, JSX, untrack } from 'solid-js'
import { createMemoObject, createSignalObject } from 'solid-signal-object'
import { Checkbox } from './Checkbox'
import './Checkboxes.scss'
import './common.scss'
import { ErrorMessage } from './ErrorMessage'
import {
  createDeferEffect,
  createNormalizedSignalObject,
  joinClasses,
  joinStyle,
  prepareProps,
  Props,
} from './utility/props'

export type CheckboxesProps<T extends readonly (string | number)[]> = Props<{
  values: T
  labels?: Partial<Record<T[number], JSX.Element>> | ((value: T[number]) => JSX.Element)
  selected?: ReadonlySet<T[number]>
  placeholder?: string
  layout?: 'horizontal' | 'vertical' | 'flex-wrap' | 'space-between' | 'space-around' | 'space-evenly'
  gap?: string
  gridColumnsCount?: number | undefined
  disabled?: boolean
  disabledValues?: ReadonlySet<T[number]>
  required?: boolean
  min?: number
  max?: number
  error?: boolean | string | ((selected: ReadonlySet<T[number]>) => Promisable<boolean | string>)
  validateImmediately?: boolean
  fullWidth?: boolean
  showSearchBox?: boolean
  onChangeSelected?: (selected: ReadonlySet<T[number]>) => void
  onValid?: (selected: ReadonlySet<T[number]>) => void
}>

export function Checkboxes<const T extends readonly (string | number)[]>(rawProps: CheckboxesProps<T>) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      labels: {} as Required<CheckboxesProps<T>>['labels'],
      selected: new Set(),
      placeholder: '',
      layout: 'horizontal',
      gap: '0.2em 1em',
      disabled: false,
      disabledValues: new Set(),
      required: false,
      error: false as Required<CheckboxesProps<T>>['error'],
      validateImmediately: false,
      fullWidth: false,
      showSearchBox: false,
    },
    ['values', 'gridColumnsCount', 'min', 'max', 'onChangeSelected']
  )

  function getLabel(value: T[number]): JSX.Element {
    if (props.labels instanceof Function) return props.labels(value)
    else return props.labels?.[value] ?? value
  }

  const synthesizedPredicateFunction = createMemoObject(() => {
    const predicateFunctions = {
      required: (selected: ReadonlySet<T[number]>) => 0 < selected.size,
      min: (selected: ReadonlySet<T[number]>) => props.min! <= selected.size,
      max: (selected: ReadonlySet<T[number]>) => selected.size <= props.max!,
    } as const

    const filteredPredicateFunctions = entriesOf(predicateFunctions)
      .filter(([key]) => rawProps[key] !== undefined)
      .map(([, value]) => value)
    if (filteredPredicateFunctions.length === 0) return undefined

    return (selected: ReadonlySet<T[number]>) => filteredPredicateFunctions.every((f) => f(selected))
  })

  const selectedSignal = createNormalizedSignalObject(
    props.selected,
    () => {
      const valueSet = new Set(props.values)
      // Avoid cloning for equivalence testing in createNormalizedSignalObject.
      return isSubsetOf(props.selected, valueSet) ? props.selected : intersectionOf(props.selected, valueSet)
    },
    props.onChangeSelected
  )

  const isEditedSignal = createSignalObject(false)
  const shouldValidate = createMemoObject(() => isEditedSignal.value || props.validateImmediately)

  const errorSignal = createSignalObject<boolean | string>(false)
  createRenderEffect(async () => {
    const selected = untrack(selectedSignal.get)
    const error = await deriveError(shouldValidate.value, selected, props.error, synthesizedPredicateFunction.value)
    errorSignal.value = error
    if (error === false) {
      props.onValid?.(selected)
    }
  })
  createDeferEffect(selectedSignal.get, async () => {
    const selected = selectedSignal.value
    props.onChangeSelected?.(selected)
    const error = await deriveError(shouldValidate.value, selected, props.error, synthesizedPredicateFunction.value)
    errorSignal.value = error
    if (error === false) {
      props.onValid?.(selected)
    }
  })

  async function deriveError(
    shouldValidate: boolean,
    selected: ReadonlySet<T[number]>,
    error: Required<CheckboxesProps<T>>['error'],
    synthesizedPredicateFunction: ((selected: ReadonlySet<T[number]>) => boolean) | undefined
  ): Promise<boolean | string> {
    if (error === true) return true

    if (synthesizedPredicateFunction !== undefined) {
      if (!shouldValidate) {
        return false
      } else if (error === false) {
        return !synthesizedPredicateFunction(selected)
      } else if (typeof error === 'string') {
        if (synthesizedPredicateFunction(selected)) {
          return false
        } else {
          return error
        }
      } else {
        const result = await error(selected)
        if (!synthesizedPredicateFunction(selected) && result === false) return true

        return result
      }
    } else {
      if (error === false || typeof error === 'string') {
        return error
      } else if (!shouldValidate) {
        return false
      } else {
        return await error(selected)
      }
    }
  }

  return (
    <div
      class={joinClasses(rawProps, 'solid-design-parts-Checkboxes_root', {
        'solid-design-parts-Checkboxes_has-columns-count': props.gridColumnsCount !== undefined,
      })}
      style={joinStyle(rawProps.style, {
        '--solid-design-parts-Checkboxes_gap': props.gap,
        '--solid-design-parts-Checkboxes_grid-columns-count': props.gridColumnsCount,
      })}
      aria-invalid={errorSignal.value !== false}
      data-layout={props.layout}
      data-grid-columns-count={props.gridColumnsCount}
    >
      <div class="solid-design-parts-Checkboxes_checkboxes" role="group" aria-required={props.required}>
        <For each={props.values}>
          {(value) => (
            <Checkbox
              checked={selectedSignal.value.has(value)}
              disabled={props.disabled || props.disabledValues.has(value)}
              error={errorSignal.value !== false}
              onChangeChecked={(checked) => {
                // If props.selected changes, this condition is not satisfied.
                if (checked !== selectedSignal.value.has(value)) {
                  isEditedSignal.value = true
                  selectedSignal.value = toggle(selectedSignal.value, value)
                }
              }}
            >
              {getLabel(value)}
            </Checkbox>
          )}
        </For>
      </div>
      <ErrorMessage>{errorSignal.value}</ErrorMessage>
    </div>
  )
}
