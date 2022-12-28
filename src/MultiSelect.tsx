import { call } from 'base-up'
import { Promisable } from 'base-up/dist/types/Promise'
import { createEffect, createMemo, createSignal, For, Show, untrack } from 'solid-js'
import { Portal } from 'solid-js/web'
import { Checkbox } from './Checkbox'
import { Divider } from './Divider'
import { Icon } from './Icon'
import chevronDownIcon from './image/chevron-down.svg'
import css from './MultiSelect.scss'
import { Scrollable } from './Scrollable'
import { TextInput } from './TextInput'
import { setupFocusTrap } from './utility/others'
import { createInjectableSignal, joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type MultiSelectProps<T extends string> = Props<{
  values: readonly T[]
  titles?: Partial<Record<T, string>>
  selected?: ReadonlySet<T>
  placeholder?: string
  disabled?: boolean
  errorMessage?: string | ((selected: ReadonlySet<T>) => Promisable<string | void>)
  validateInitialValue?: boolean
  fullWidth?: boolean
  showSearchBox?: boolean
  onChangeSelected?: (selected: Set<T>) => void
  onChangeValidSelected?: (selected: Set<T>) => void
}>

export function MultiSelect<T extends string>(rawProps: MultiSelectProps<T>) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      titles: {},
      selected: new Set(),
      placeholder: '',
      disabled: false,
      validateInitialValue: false,
      fullWidth: false,
      showSearchBox: false,
    },
    ['values', 'errorMessage', 'onChangeSelected']
  )

  function getText(value: T): string {
    return props.titles?.[value] ?? value
  }

  const [selected, setSelected] = createSignal(new Set(props.selected), { equals: false })
  createEffect(() => setSelected(() => new Set(props.selected)))
  async function changeSelected(selected: Set<T>) {
    setSelected(() => selected)
    props.onChangeSelected?.(selected)

    if (typeof props.errorMessage === 'string') {
      setErrorMessage(props.errorMessage)
    } else {
      const result = await props.errorMessage?.(selected)
      setErrorMessage(result ?? undefined)

      if (result === undefined) {
        props.onChangeValidSelected?.(selected)
      }
    }
  }

  const [shouldValidate, setShouldValidate] = createInjectableSignal(props, 'validateInitialValue')

  const [errorMessage, setErrorMessage] = createSignal<string | undefined>()
  createEffect(async () => {
    props.selected

    if (typeof props.errorMessage === 'string') {
      setErrorMessage(props.errorMessage)
    } else if (!untrack(shouldValidate)) {
      setErrorMessage(undefined)
    } else {
      const result = await props.errorMessage?.(props.selected)
      setErrorMessage(result ?? undefined)
    }
  })

  const followingCount = createMemo(() => selected().size - 1)

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
    event.preventDefault()
    if (event.currentTarget instanceof HTMLElement) {
      const rect = event.currentTarget.getBoundingClientRect()
      setDropdownInfo({
        leftPx: rect.left,
        topPx: rect.bottom,
        widthPx: rect.width,
        maxHeightPx: window.innerHeight - rect.bottom,
      })
    }
  }

  function onOperateOverlay(event: Event) {
    if (event.target !== event.currentTarget) return

    closeDropdown()
  }

  function getPrimarySelectedValue(selected: ReadonlySet<T>): T | undefined {
    const [firstValue] = selected.values()
    return firstValue
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.isComposing || event.defaultPrevented) return

    if (event.code === 'Escape' && dropdownInfo() !== undefined) {
      event.preventDefault()
      closeDropdown()
    }
  }

  function closeDropdown() {
    setShouldValidate(true)
    setDropdownInfo(undefined)
  }

  return (
    <>
      <div
        class={joinClasses(rawProps, 'mantle-ui-MultiSelect_error-message-layout', {
          'mantle-ui-MultiSelect_opened': dropdownInfo() !== undefined,
          'mantle-ui-MultiSelect_full-width': props.fullWidth,
        })}
        {...restProps}
      >
        <button
          class="mantle-ui-MultiSelect_launcher"
          type="button"
          disabled={props.disabled}
          aria-invalid={errorMessage() !== undefined}
          onClick={onClickLauncher}
        >
          <div class="mantle-ui-MultiSelect_preview-area">
            {call(() => {
              const previewValue = getPrimarySelectedValue(selected())
              return (
                <>
                  {previewValue !== undefined ? (
                    <div class="mantle-ui-MultiSelect_preview">
                      <div class="mantle-ui-MultiSelect_primary-selected-value">{getText(previewValue)}</div>
                      <Show when={followingCount() > 0}>
                        <div class="mantle-ui-MultiSelect_following-count">+{followingCount()}</div>
                      </Show>
                    </div>
                  ) : null}
                  <div
                    class="mantle-ui-MultiSelect_placeholder"
                    classList={{ 'mantle-ui-MultiSelect_invisible': previewValue !== undefined }}
                  >
                    {props.placeholder}
                  </div>
                  <div class="mantle-ui-MultiSelect_invisible">
                    <div class="mantle-ui-MultiSelect_preview">
                      <div>
                        <For each={props.values}>
                          {(value) => <div class="mantle-ui-MultiSelect_primary-selected-value">{getText(value)}</div>}
                        </For>
                      </div>
                      <div>
                        <For each={[...Array(props.values.length - 2).keys()]}>
                          {(i) => <div class="mantle-ui-MultiSelect_following-count">+{i + 1}</div>}
                        </For>
                      </div>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
          <Icon class="mantle-ui-MultiSelect_icon" src={chevronDownIcon} />
        </button>
        <p class="mantle-ui-MultiSelect_error-message">{errorMessage()}</p>
      </div>
      {/* @ts-ignore For some reason, a type error occurs because it is typed as <Show keyed ...>...</Showed> */}
      <Show when={dropdownInfo()}>
        {(dropdownInfo: DropdownInfo) => (
          <Portal>
            <div
              class="mantle-ui-MultiSelect_overlay"
              tabindex={-1}
              ref={(element) => setupFocusTrap(element)}
              onClick={onOperateOverlay}
              onTouchMove={onOperateOverlay}
              onMouseWheel={onOperateOverlay}
              onKeyDown={onKeyDown}
            >
              <div
                class="mantle-ui-MultiSelect_dropdown"
                style={{
                  '--mantle-ui-MultiSelect_dropdown-left': `${dropdownInfo.leftPx}px`,
                  '--mantle-ui-MultiSelect_dropdown-top': `${dropdownInfo.topPx}px`,
                  '--mantle-ui-MultiSelect_dropdown-width': `${dropdownInfo.widthPx}px`,
                  '--mantle-ui-MultiSelect_dropdown-max-height': `${dropdownInfo.maxHeightPx}px`,
                }}
              >
                <Show when={props.showSearchBox}>
                  <div class="mantle-ui-MultiSelect_search-box-area">
                    <TextInput
                      class="mantle-ui-MultiSelect_search-box"
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
                        <Checkbox
                          class="mantle-ui-MultiSelect_option"
                          checked={selected().has(value)}
                          role="menuitem"
                          onChangeChecked={(checked) => {
                            if (checked) {
                              selected().add(value)
                            } else {
                              selected().delete(value)
                            }
                            changeSelected(selected())
                          }}
                        >
                          {getText(value)}
                        </Checkbox>
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
