import { isInstanceOf, Promisable } from 'base-up'
import { createRenderEffect, For, JSX, Show, untrack } from 'solid-js'
import { Portal } from 'solid-js/web'
import { createMemoObject, createSignalObject } from 'solid-signal-object'
import './common.scss'
import { Const } from './Const'
import { Divider } from './Divider'
import { ErrorMessage } from './ErrorMessage'
import { Icon } from './Icon'
import { IconButton } from './IconButton'
import chevronDownIcon from './image/chevron-down.svg'
import closeCircleIcon from './image/close-circle.svg'
import { RadioButtonsProps } from './RadioButtons'
import { Scrollable } from './Scrollable'
import './Select.scss'
import { TextInput } from './TextInput'
import { extractContainedTexts, isNestedClickEvent, setupFocusTrap } from './utility/dom'
import { createDeferEffect, createNormalizedSignalObject, joinClasses, prepareProps, Props } from './utility/props'

export type SelectProps<T extends readonly (string | number)[]> = Props<{
  values: T
  labels?: Partial<Record<T[number], JSX.Element>> | ((value: T[number]) => JSX.Element)
  selected?: T[number] | undefined
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: boolean | string | ((selected: T[number] | undefined) => Promisable<boolean | string>)
  validateImmediately?: boolean
  fullWidth?: boolean
  showSearchBox?: boolean
  showClearButton?: boolean
  onChangeSelected?: (selected: T[number] | undefined) => void
  onValid?: (selected: T[number] | undefined) => void
}>

export function Select<const T extends readonly (string | number)[]>(rawProps: SelectProps<T>) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      labels: {} as Required<SelectProps<T>>['labels'],
      placeholder: '',
      disabled: false,
      required: false,
      error: false as Required<SelectProps<T>>['error'],
      validateImmediately: false,
      fullWidth: false,
      showSearchBox: false,
      showClearButton: false,
    },
    ['values', 'selected', 'onChangeSelected', 'onValid']
  )

  function getLabel(value: T[number]): JSX.Element {
    if (props.labels instanceof Function) return props.labels(value)
    else return props.labels?.[value] ?? value
  }

  const selectedSignal = createNormalizedSignalObject(
    props.selected,
    () => (props.selected !== undefined && !props.values.includes(props.selected) ? undefined : props.selected),
    props.onChangeSelected
  )

  const isEditedSignal = createSignalObject(false)
  const shouldValidate = createMemoObject(() => isEditedSignal.value || props.validateImmediately)

  const errorSignal = createSignalObject<boolean | string>(false)
  createRenderEffect(async () => {
    const selected = untrack(selectedSignal.get)
    const error = await deriveError(shouldValidate.value, selected, props.error, props.required)
    errorSignal.value = error
    if (error === false) {
      props.onValid?.(selected)
    }
  })
  createDeferEffect(selectedSignal.get, async () => {
    const selected = selectedSignal.value
    props.onChangeSelected?.(selected)
    const error = await deriveError(shouldValidate.value, selected, props.error, props.required)
    errorSignal.value = error
    if (error === false) {
      props.onValid?.(selected)
    }
  })

  async function deriveError(
    shouldValidate: boolean,
    selected: T[number] | undefined,
    error: Required<RadioButtonsProps<T>>['error'],
    required: boolean
  ): Promise<boolean | string> {
    if (error === true) return true

    if (required) {
      if (!shouldValidate) {
        return false
      } else if (error === false) {
        return selected === undefined
      } else if (typeof error === 'string') {
        if (selected !== undefined) {
          return false
        } else {
          return error
        }
      } else {
        const result = await error(selected)
        if (selected === undefined && result === false) return true

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

  function search(values: T, searchQuery: string): readonly T[number][] {
    // AND-search
    const searchWords = searchQuery.split(/[ 　]/)
    return values.filter((value: T[number]) => {
      // case-insensitive search
      const lowerCaseTexts = extractContainedTexts(getLabel(value)).map((text) => text.toLowerCase())
      return searchWords.every((word) => lowerCaseTexts.some((text) => text.includes(word.toLowerCase())))
    })
  }

  type DropdownInfo = { leftPx: number; topPx: number; widthPx: number; maxHeightPx: number }
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
    isEditedSignal.value = true
    dropdownInfoSignal.value = undefined
  }

  const clearButton = () => (
    <IconButton
      class="solid-design-parts-Select_clear-button"
      src={closeCircleIcon}
      size="1.6em"
      iconSize="1.25em"
      iconColor="var(--solid-design-parts-clear-button-icon-default-color)"
      onClick={() => {
        selectedSignal.value = undefined
        isEditedSignal.value = true
      }}
    />
  )

  return (
    <>
      <div
        {...restProps}
        class={joinClasses(rawProps, 'solid-design-parts-Select_error-message-layout', {
          'solid-design-parts-Select_opened': dropdownInfoSignal.value !== undefined,
          'solid-design-parts-Select_full-width': props.fullWidth,
        })}
      >
        <button
          class="solid-design-parts-Select_launcher"
          type="button"
          disabled={props.disabled}
          aria-invalid={errorSignal.value !== false}
          onClick={onClickLauncher}
        >
          <div class="solid-design-parts-Select_preview-area">
            <div
              class="solid-design-parts-Select_placeholder"
              classList={{ 'solid-design-parts_hidden-but-keep-width': selectedSignal.value !== undefined }}
              aria-hidden={selectedSignal.value !== undefined}
            >
              {props.placeholder}
            </div>
            <For each={props.values}>
              {(value) => (
                <div
                  class="solid-design-parts-Select_preview-and-clear-button"
                  classList={{ 'solid-design-parts_hidden-but-keep-width': value !== selectedSignal.value }}
                  aria-hidden={value !== selectedSignal.value}
                >
                  <div class="solid-design-parts-Select_preview">{getLabel(value)}</div>
                  <Show when={props.showClearButton}>{clearButton()}</Show>
                </div>
              )}
            </For>
          </div>
          <Icon class="solid-design-parts-Select_icon" src={chevronDownIcon} />
          <div
            class="solid-design-parts-Select_placeholder solid-design-parts_hidden-but-keep-height"
            aria-hidden={true}
          >
            {props.placeholder}&nbsp;
          </div>
          <div class="solid-design-parts_hidden-but-keep-height" aria-hidden={true}>
            {clearButton()}
          </div>
        </button>
        <ErrorMessage>{errorSignal.value}</ErrorMessage>
      </div>
      <Show when={dropdownInfoSignal.value} keyed>
        {(dropdownInfo: DropdownInfo) => (
          <Portal>
            <Const value={createSignalObject('')}>
              {(searchQuerySignal) => (
                <div
                  class="solid-design-parts-Select_overlay"
                  tabindex={-1}
                  ref={(element) => setupFocusTrap(element)}
                  onClick={onOperateOverlay}
                  onTouchMove={onOperateOverlay}
                  onMouseWheel={onOperateOverlay}
                  onKeyDown={onKeyDown}
                >
                  <div
                    class="solid-design-parts-Select_dropdown"
                    style={{
                      '--solid-design-parts-Select_dropdown-left': `${dropdownInfo.leftPx}px`,
                      '--solid-design-parts-Select_dropdown-top': `${dropdownInfo.topPx}px`,
                      '--solid-design-parts-Select_dropdown-width': `${dropdownInfo.widthPx}px`,
                      '--solid-design-parts-Select_dropdown-max-height': `${dropdownInfo.maxHeightPx}px`,
                    }}
                  >
                    <Show when={props.showSearchBox}>
                      <div class="solid-design-parts-Select_search-box-area">
                        <TextInput
                          class="solid-design-parts-Select_search-box"
                          placeholder="search"
                          value={searchQuerySignal.value}
                          error={(value) => search(props.values, value).length === 0}
                          onChangeValue={searchQuerySignal.set}
                        />
                      </div>
                    </Show>
                    <Scrollable role="menu">
                      <For each={search(props.values, searchQuerySignal.value)}>
                        {(value, i) => (
                          <>
                            <Show when={i() > 0}>
                              <Divider />
                            </Show>
                            <button
                              class="solid-design-parts-Select_option"
                              type="button"
                              role="menuitem"
                              aria-selected={selectedSignal.value === value}
                              onClick={() => {
                                selectedSignal.value = value
                                closeDropdown()
                              }}
                            >
                              {getLabel(value)}
                            </button>
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
