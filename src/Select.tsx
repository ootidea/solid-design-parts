import { isInstanceOf } from 'base-up'
import { createRenderEffect, For, JSX, Show } from 'solid-js'
import { Portal } from 'solid-js/web'
import { createSignalObject } from 'solid-signal-object'
import { Divider } from './Divider'
import { Icon } from './Icon'
import { IconButton } from './IconButton'
import chevronDownIcon from './image/chevron-down.svg'
import closeCircleIcon from './image/close-circle.svg'
import { Scrollable } from './Scrollable'
import css from './Select.scss'
import { TextInput } from './TextInput'
import { extractContainedTexts, isNestedClickEvent, setupFocusTrap } from './utility/others'
import { joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type SelectProps<T extends readonly (string | number)[]> = Props<{
  values: T
  labels?: Partial<Record<T[number], JSX.Element>>
  selected?: T[number] | undefined
  placeholder?: string
  disabled?: boolean
  fullWidth?: boolean
  showSearchBox?: boolean
  showClearButton?: boolean
  onChangeSelected?: (selected: T[number] | undefined) => void
}>

export function Select<T extends readonly (string | number)[]>(rawProps: SelectProps<T>) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      labels: {} as Required<SelectProps<T>>['labels'],
      placeholder: '',
      disabled: false,
      fullWidth: false,
      showSearchBox: false,
      showClearButton: false,
    },
    ['values', 'selected', 'onChangeSelected']
  )

  function getLabel(value: T[number]): JSX.Element {
    return props.labels?.[value] ?? value
  }

  const selectedSignal = createSignalObject<T[number] | undefined>(undefined)
  createRenderEffect(() => {
    // Treat as undefined if props.selected is out of range.
    if (props.selected !== undefined && !props.values.includes(props.selected)) {
      changeSelected(undefined)
    } else {
      selectedSignal.value = props.selected
    }
  })
  function changeSelected(selected: T[number] | undefined) {
    selectedSignal.value = selected
    props.onChangeSelected?.(selected)
  }

  const searchQuerySignal = createSignalObject('')
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

    dropdownInfoSignal.value = undefined
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.isComposing || event.defaultPrevented) return

    if (event.code === 'Escape' && dropdownInfoSignal.value !== undefined) {
      event.preventDefault()
      dropdownInfoSignal.value = undefined
    }
  }

  return (
    <>
      <button
        class={joinClasses(rawProps, 'solid-design-parts-Select_launcher', {
          'solid-design-parts-Select_opened': dropdownInfoSignal.value !== undefined,
          'solid-design-parts-Select_full-width': props.fullWidth,
        })}
        type="button"
        disabled={props.disabled}
        onClick={onClickLauncher}
        {...restProps}
      >
        <div class="solid-design-parts-Select_preview-area">
          {selectedSignal.value !== undefined ? (
            <div class="solid-design-parts-Select_preview">{getLabel(selectedSignal.value)}</div>
          ) : null}
          <div class="solid-design-parts-Select_placeholder" aria-hidden={selectedSignal.value !== undefined}>
            {props.placeholder}
          </div>
          <For each={props.values}>
            {(value) => (
              <div class="solid-design-parts-Select_preview" aria-hidden="true">
                {getLabel(value)}
              </div>
            )}
          </For>
        </div>
        <Show when={props.showClearButton}>
          <IconButton
            class="solid-design-parts-Select_clear-button"
            src={closeCircleIcon}
            size="1.6em"
            iconSize="1.25em"
            iconColor="var(--solid-design-parts-clear-button-icon-default-color)"
            aria-hidden={selectedSignal.value === undefined}
            onClick={() => changeSelected(undefined)}
          />
        </Show>
        <Icon class="solid-design-parts-Select_icon" src={chevronDownIcon} />
      </button>
      {/* @ts-ignore For some reason, a type error occurs because it is typed as <Show keyed ...>...</Showed> */}
      <Show when={dropdownInfoSignal.value}>
        {(dropdownInfo: DropdownInfo) => (
          <Portal>
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
                      error={(value) => {
                        if (search(props.values, value).length === 0) return ''

                        return
                      }}
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
                            changeSelected(value)
                            dropdownInfoSignal.value = undefined
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
          </Portal>
        )}
      </Show>
    </>
  )
}
