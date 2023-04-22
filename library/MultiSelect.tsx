import {
  assert,
  entriesOf,
  intersectionOf,
  isInstanceOf,
  isNotUndefined,
  isSubsetOf,
  Promisable,
  toggle,
} from 'base-up'
import { createRenderEffect, For, JSX, Show, untrack } from 'solid-js'
import { Portal } from 'solid-js/web'
import { createMemoObject, createSignalObject } from 'solid-signal-object'
import { Checkbox } from './Checkbox'
import { CheckboxesProps } from './Checkboxes'
import './common.scss'
import { Const } from './Const'
import { Divider } from './Divider'
import { ErrorMessage } from './ErrorMessage'
import { Icon } from './Icon'
import chevronDownIcon from './image/chevron-down.svg'
import './MultiSelect.scss'
import { Scrollable } from './Scrollable'
import { TextInput } from './TextInput'
import { extractContainedTexts, isNestedClickEvent, setupFocusTrap } from './utility/dom'
import { createDeferEffect, createNormalizedSignalObject, joinClasses, prepareProps, Props } from './utility/props'

export type MultiSelectProps<T extends readonly (string | number)[]> = Props<{
  values: T
  labels?: Partial<Record<T[number], JSX.Element>> | ((value: T[number]) => JSX.Element)
  selected?: ReadonlySet<T[number]>
  placeholder?: string
  disabled?: boolean
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

export function MultiSelect<const T extends readonly (string | number)[]>(rawProps: MultiSelectProps<T>) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      labels: {} as Required<MultiSelectProps<T>>['labels'],
      selected: new Set() as Required<MultiSelectProps<T>>['selected'],
      placeholder: '',
      disabled: false,
      required: false,
      error: false as Required<MultiSelectProps<T>>['error'],
      validateImmediately: false,
      fullWidth: false,
      showSearchBox: false,
    },
    ['values', 'min', 'max', 'onChangeSelected']
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

  const previewValueMemo = createMemoObject(() => props.values.find((value) => selectedSignal.value.has(value)))

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

  const followingCount = createMemoObject(() => selectedSignal.value.size - 1)

  function search(values: T, searchQuery: string) {
    // AND-search
    const searchWords = searchQuery.split(/[ 　]/)
    return values.filter((value) => {
      // case-insensitive search
      const lowerCaseTexts = extractContainedTexts(getLabel(value)).map((text) => text.toLowerCase())
      return searchWords.every((word) => lowerCaseTexts.some((text) => text.includes(word.toLowerCase())))
    })
  }

  type DropdownInfo = {
    leftPx: number
    topPx: number
    widthPx: number
    maxHeightPx: number
    selected: ReadonlySet<T[number]>
  }
  const dropdownInfoSignal = createSignalObject<DropdownInfo | undefined>(undefined, {
    equals: false,
  })
  function onClickLauncher(event: MouseEvent) {
    if (isNestedClickEvent(event)) return

    if (!isInstanceOf(event.currentTarget, HTMLElement)) return

    const rect = event.currentTarget.getBoundingClientRect()
    dropdownInfoSignal.value = {
      leftPx: rect.left,
      topPx: rect.bottom,
      widthPx: rect.width,
      maxHeightPx: window.innerHeight - rect.bottom,
      selected: selectedSignal.value,
    }
  }

  function onOperateOverlay(event: Event) {
    if (event.target !== event.currentTarget) return

    closeDropdown()
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.isComposing || event.defaultPrevented) return

    if (event.code === 'Escape' && dropdownInfoSignal.value !== undefined) {
      event.preventDefault()
      closeDropdown()
    }
  }

  function closeDropdown() {
    assert(dropdownInfoSignal.value, isNotUndefined)
    selectedSignal.value = dropdownInfoSignal.value.selected
    dropdownInfoSignal.value = undefined
    isEditedSignal.value = true
  }

  return (
    <>
      <div
        {...restProps}
        class={joinClasses(rawProps, 'solid-design-parts-MultiSelect_error-message-layout', {
          'solid-design-parts-MultiSelect_opened': dropdownInfoSignal.value !== undefined,
          'solid-design-parts-MultiSelect_full-width': props.fullWidth,
        })}
      >
        <button
          class="solid-design-parts-MultiSelect_launcher"
          type="button"
          disabled={props.disabled}
          aria-invalid={errorSignal.value !== false}
          onClick={onClickLauncher}
        >
          <div class="solid-design-parts-MultiSelect_preview-area">
            <Show when={previewValueMemo.value} keyed>
              {(previewValue) => (
                <div class="solid-design-parts-MultiSelect_preview">
                  <div class="solid-design-parts-MultiSelect_primary-selected-value">{getLabel(previewValue)}</div>
                  <Show when={followingCount.value > 0}>
                    <div class="solid-design-parts-MultiSelect_following-count">+{followingCount.value}</div>
                  </Show>
                </div>
              )}
            </Show>
            <div
              class="solid-design-parts-MultiSelect_placeholder"
              classList={{ 'solid-design-parts_hidden-but-keep-width': previewValueMemo.value !== undefined }}
              aria-hidden={previewValueMemo.value !== undefined}
            >
              {props.placeholder}
            </div>
            <div
              class="solid-design-parts-MultiSelect_preview solid-design-parts_hidden-but-keep-width"
              aria-hidden={true}
            >
              <div>
                <For each={props.values}>
                  {(value) => (
                    <div class="solid-design-parts-MultiSelect_primary-selected-value">{getLabel(value)}</div>
                  )}
                </For>
              </div>
              <div>
                <For each={[...Array(props.values.length - 2).keys()]}>
                  {(i) => <div class="solid-design-parts-MultiSelect_following-count">+{i + 1}</div>}
                </For>
              </div>
            </div>
          </div>
          <Icon class="solid-design-parts-MultiSelect_icon" src={chevronDownIcon} />
        </button>
        <ErrorMessage>{errorSignal.value}</ErrorMessage>
      </div>
      <Show when={dropdownInfoSignal.value} keyed>
        {(dropdownInfo: DropdownInfo) => (
          <Portal>
            <Const value={createSignalObject('')}>
              {(searchQuerySignal) => (
                <div
                  class="solid-design-parts-MultiSelect_overlay"
                  tabindex={-1}
                  ref={(element) => setupFocusTrap(element)}
                  onClick={onOperateOverlay}
                  onTouchMove={onOperateOverlay}
                  onMouseWheel={onOperateOverlay}
                  onKeyDown={onKeyDown}
                >
                  <div
                    class="solid-design-parts-MultiSelect_dropdown"
                    style={{
                      '--solid-design-parts-MultiSelect_dropdown-left': `${dropdownInfo.leftPx}px`,
                      '--solid-design-parts-MultiSelect_dropdown-top': `${dropdownInfo.topPx}px`,
                      '--solid-design-parts-MultiSelect_dropdown-width': `${dropdownInfo.widthPx}px`,
                      '--solid-design-parts-MultiSelect_dropdown-max-height': `${dropdownInfo.maxHeightPx}px`,
                    }}
                  >
                    <Show when={props.showSearchBox}>
                      <div class="solid-design-parts-MultiSelect_search-box-area">
                        <TextInput
                          class="solid-design-parts-MultiSelect_search-box"
                          placeholder="search"
                          value={searchQuerySignal.value}
                          error={(value) => search(props.values, value).length === 0}
                          onChangeValue={searchQuerySignal.set}
                        />
                      </div>
                    </Show>
                    <Scrollable role="menu" aria-multiselectable="true">
                      <For each={search(props.values, searchQuerySignal.value)}>
                        {(value, i) => (
                          <>
                            <Show when={i() > 0}>
                              <Divider />
                            </Show>
                            <Checkbox
                              checked={dropdownInfo.selected.has(value)}
                              disabled={props.disabled}
                              labelProps={{
                                class: 'solid-design-parts-MultiSelect_checkbox-label',
                              }}
                              onChangeChecked={() => {
                                dropdownInfo.selected = toggle(dropdownInfo.selected, value)
                              }}
                            >
                              {getLabel(value)}
                            </Checkbox>
                          </>
                        )}
                      </For>
                    </Scrollable>
                  </div>
                </div>
              )}
            </Const>
          </Portal>
        )}
      </Show>
    </>
  )
}
