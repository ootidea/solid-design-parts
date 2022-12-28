import { call, isInstanceOf } from 'base-up'
import { createSignal, For, Show } from 'solid-js'
import { Portal } from 'solid-js/web'
import { Divider } from './Divider'
import { Icon } from './Icon'
import { IconButton } from './IconButton'
import chevronDownIcon from './image/chevron-down.svg'
import closeCircleIcon from './image/close-circle.svg'
import { Scrollable } from './Scrollable'
import css from './Select.scss'
import { TextInput } from './TextInput'
import { setupFocusTrap } from './utility/others'
import { createInjectableSignal, joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type SelectProps<T extends string> = Props<{
  values: readonly T[]
  titles?: Partial<Record<T, string>>
  selected?: T | undefined
  placeholder?: string
  disabled?: boolean
  fullWidth?: boolean
  showSearchBox?: boolean
  showClearButton?: boolean
  onChangeSelected?: (selected: T | undefined) => void
}>

export function Select<T extends string>(rawProps: SelectProps<T>) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      titles: {},
      placeholder: '',
      disabled: false,
      fullWidth: false,
      showSearchBox: false,
      showClearButton: false,
    },
    ['values', 'selected', 'onChangeSelected']
  )

  function getText(value: T): string {
    return props.titles?.[value] ?? value
  }

  const [selected, setSelected] = createInjectableSignal(props, 'selected')
  function changeSelected(selected: T | undefined) {
    setSelected(() => selected)
    props.onChangeSelected?.(selected)
  }

  const [searchQuery, setSearchQuery] = createSignal('')
  function search(values: readonly T[], searchQuery: string): readonly T[] {
    const searchWords = searchQuery.split(/[ 　]/)
    return values.filter((value) => {
      const lowerCaseText = getText(value).toLowerCase()
      return searchWords.every((word) => lowerCaseText.includes(word.toLowerCase()))
    })
  }

  type DropdownInfo = { leftPx: number; topPx: number; widthPx: number; maxHeightPx: number }
  const [dropdownInfo, setDropdownInfo] = createSignal<DropdownInfo | undefined>(undefined, {
    equals: false,
  })
  function onClickLauncher(event: MouseEvent) {
    if (event.defaultPrevented) return

    event.preventDefault()
    if (!isInstanceOf(event.currentTarget, HTMLElement)) return

    const rect = event.currentTarget.getBoundingClientRect()
    setDropdownInfo({
      leftPx: rect.left,
      topPx: rect.bottom,
      widthPx: rect.width,
      maxHeightPx: window.innerHeight - rect.bottom,
    })
  }

  function onOperateOverlay(event: Event) {
    if (event.target !== event.currentTarget || event.defaultPrevented) return

    event.preventDefault()
    setDropdownInfo(undefined)
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.isComposing || event.defaultPrevented) return

    if (event.code === 'Escape' && dropdownInfo() !== undefined) {
      event.preventDefault()
      setDropdownInfo(undefined)
    }
  }

  return (
    <>
      <button
        class={joinClasses(rawProps, 'mantle-ui-Select_launcher', {
          'mantle-ui-Select_opened': dropdownInfo() !== undefined,
          'mantle-ui-Select_full-width': props.fullWidth,
        })}
        type="button"
        disabled={props.disabled}
        onClick={onClickLauncher}
        {...restProps}
      >
        <div class="mantle-ui-Select_preview-area">
          {call(() => {
            const previewValue = selected()
            return (
              <>
                {previewValue !== undefined ? (
                  <div class="mantle-ui-Select_preview">{getText(previewValue)} </div>
                ) : null}
                <div
                  class="mantle-ui-Select_placeholder"
                  classList={{ 'mantle-ui-Select_invisible': previewValue !== undefined }}
                >
                  {props.placeholder}
                </div>
                <div class="mantle-ui-Select_invisible">
                  <For each={props.values}>
                    {(value) => <div class="mantle-ui-Select_preview">{getText(value)}</div>}
                  </For>
                </div>
              </>
            )
          })}
        </div>
        <Show when={props.showClearButton}>
          <IconButton
            class="mantle-ui-Select_clear-button"
            src={closeCircleIcon}
            size="1.6em"
            iconSize="1.25em"
            iconColor="var(--mantle-ui-clear-button-icon-default-color)"
            aria-hidden={selected() === undefined}
            onClick={() => changeSelected(undefined)}
          />
        </Show>
        <Icon class="mantle-ui-Select_icon" src={chevronDownIcon} />
      </button>
      {/* @ts-ignore For some reason, a type error occurs because it is typed as <Show keyed ...>...</Showed> */}
      <Show when={dropdownInfo()}>
        {(dropdownInfo: DropdownInfo) => (
          <Portal>
            <div
              class="mantle-ui-Select_overlay"
              tabindex={-1}
              ref={(element) => setupFocusTrap(element)}
              onClick={onOperateOverlay}
              onTouchMove={onOperateOverlay}
              onMouseWheel={onOperateOverlay}
              onKeyDown={onKeyDown}
            >
              <div
                class="mantle-ui-Select_dropdown"
                style={{
                  '--mantle-ui-Select_dropdown-left': `${dropdownInfo.leftPx}px`,
                  '--mantle-ui-Select_dropdown-top': `${dropdownInfo.topPx}px`,
                  '--mantle-ui-Select_dropdown-width': `${dropdownInfo.widthPx}px`,
                  '--mantle-ui-Select_dropdown-max-height': `${dropdownInfo.maxHeightPx}px`,
                }}
              >
                <Show when={props.showSearchBox}>
                  <div class="mantle-ui-Select_search-box-area">
                    <TextInput
                      class="mantle-ui-Select_search-box"
                      placeholder="search"
                      value={searchQuery()}
                      errorMessage={(value) => {
                        if (search(props.values, value).length === 0) return ''

                        return
                      }}
                      onChangeValue={setSearchQuery}
                    />
                  </div>
                </Show>
                <Scrollable role="menu">
                  <For each={search(props.values, searchQuery())}>
                    {(value, i) => (
                      <>
                        <Show when={i() > 0}>
                          <Divider />
                        </Show>
                        <button
                          class="mantle-ui-Select_option"
                          type="button"
                          role="menuitem"
                          aria-selected={selected() === value}
                          onClick={(event) => {
                            event.preventDefault()
                            changeSelected(value)
                            setDropdownInfo(undefined)
                          }}
                        >
                          {getText(value)}
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
