import { createEffect, createMemo, createSignal, For, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { Checkbox } from "./Checkbox";
import chevronDownIcon from "./chevron-down.svg";
import { Divider } from "./Divider";
import { Icon } from "./Icon";
import css from "./MultiSelect.scss";
import { Scrollable } from "./Scrollable";
import { TextInput } from "./TextInput";
import { call, objectFromEntries, setupFocusTrap } from "./utility/others";
import { joinClasses, prepareProps, SkelProps } from "./utility/props";
import { registerCss } from "./utility/registerCss";

registerCss(css);

export type MultiSelectProps<T extends string> = SkelProps<{
  values: readonly T[];
  titles?: Partial<Record<T, string>>;
  selected?: Partial<Record<T, boolean>>;
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  showSearchBox?: boolean;
  onChangeSelected?: (selected: Partial<Record<T, boolean>>) => void;
}>;

export function MultiSelect<T extends string>(rawProps: MultiSelectProps<T>) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      titles: {},
      selected: objectFromEntries(rawProps.values.map((value) => [value, false])),
      placeholder: "",
      disabled: false,
      fullWidth: false,
      showSearchBox: false,
    },
    ["values", "selected", "onChangeSelected"],
  );

  function getText(value: T): string {
    return props.titles?.[value] ?? value;
  }

  const [selected, setSelected] = createSignal(props.selected, { equals: false });
  createEffect(() => setSelected(() => props.selected));
  function changeSelected(selected: Partial<Record<T, boolean>>) {
    setSelected(() => selected);
    props.onChangeSelected?.(selected);
  }

  const followingCount = createMemo(
    () => Object.entries(selected()).filter(([, value]) => value).length - 1,
  );

  const [searchQuery, setSearchQuery] = createSignal("");
  function search(values: readonly T[]): readonly T[] {
    const searchWords = searchQuery().split(/[ 　]/);
    return values.filter((value) => {
      const lowerCaseText = getText(value).toLowerCase();
      return searchWords.every((word) => lowerCaseText.includes(word.toLowerCase()));
    });
  }

  type DropdownInfo = { leftPx: number; topPx: number; widthPx: number; maxHeightPx: number };
  const [dropdownInfo, setDropdownInfo] = createSignal<DropdownInfo | undefined>(undefined, {
    equals: false,
  });
  function onClickLauncher(event: MouseEvent) {
    if (event.currentTarget instanceof HTMLElement) {
      const rect = event.currentTarget.getBoundingClientRect();
      setDropdownInfo({
        leftPx: rect.left,
        topPx: rect.bottom,
        widthPx: rect.width,
        maxHeightPx: window.innerHeight - rect.bottom,
      });
    }
  }

  function onClickBackdrop(event: MouseEvent) {
    if (event.target !== event.currentTarget) return;

    setDropdownInfo(undefined);
  }

  function getPrimarySelectedValue(selected: Partial<Record<T, boolean>>): T | undefined {
    for (const key in selected) {
      if (selected[key]) return key;
    }
    return undefined;
  }

  return (
    <>
      <button
        class={joinClasses(rawProps, "skel-MultiSelect_launcher", {
          "skel-MultiSelect_disabled": props.disabled,
          "skel-MultiSelect_opened": dropdownInfo() !== undefined,
          "skel-MultiSelect_full-width": props.fullWidth,
        })}
        type="button"
        disabled={props.disabled}
        onClick={onClickLauncher}
        {...restProps}
      >
        <div class="skel-MultiSelect_preview-area">
          {call(() => {
            const previewValue = getPrimarySelectedValue(selected());
            return (
              <>
                {previewValue !== undefined ? (
                  <div class="skel-MultiSelect_preview">
                    <div class="skel-MultiSelect_primary-selected-value">
                      {getText(previewValue)}
                    </div>
                    <Show when={followingCount() > 0}>
                      <div class="skel-MultiSelect_following-count">+{followingCount()}</div>
                    </Show>
                  </div>
                ) : null}
                <div
                  class="skel-MultiSelect_placeholder"
                  classList={{ "skel-MultiSelect_invisible": previewValue !== undefined }}
                >
                  {props.placeholder}
                </div>
                <div class="skel-MultiSelect_invisible">
                  <div class="skel-MultiSelect_preview">
                    <div>
                      <For each={props.values}>
                        {(value) => (
                          <div class="skel-MultiSelect_primary-selected-value">
                            {getText(value)}
                          </div>
                        )}
                      </For>
                    </div>
                    <div>
                      <For each={[...Array(props.values.length - 2).keys()]}>
                        {(i) => <div class="skel-MultiSelect_following-count">+{i + 1}</div>}
                      </For>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <Icon class="skel-MultiSelect_icon" src={chevronDownIcon} />
      </button>
      <Show when={dropdownInfo()}>
        {(dropdownInfo) => (
          <Portal>
            <div
              class="skel-MultiSelect_backdrop"
              ref={(element) => setupFocusTrap(element)}
              onClick={onClickBackdrop}
            >
              <div
                class="skel-MultiSelect_dropdown"
                style={{
                  "--skel-MultiSelect_dropdown-left": `${dropdownInfo.leftPx}px`,
                  "--skel-MultiSelect_dropdown-top": `${dropdownInfo.topPx}px`,
                  "--skel-MultiSelect_dropdown-width": `${dropdownInfo.widthPx}px`,
                  "--skel-MultiSelect_dropdown-max-height": `${dropdownInfo.maxHeightPx}px`,
                }}
              >
                <Show when={props.showSearchBox}>
                  <div class="skel-MultiSelect_search-box-area">
                    <TextInput
                      class="skel-MultiSelect_search-box"
                      placeholder="search"
                      value={searchQuery()}
                      onChangeValue={setSearchQuery}
                    />
                  </div>
                </Show>
                <Scrollable>
                  {/* TODO: implement empty state */}
                  <For each={search(props.values)}>
                    {(value, i) => (
                      <>
                        <Show when={i() > 0}>
                          <Divider />
                        </Show>
                        <Checkbox
                          class="skel-MultiSelect_option"
                          checked={Boolean(selected()[value])}
                          onChangeChecked={(checked) => {
                            changeSelected({
                              ...selected(),
                              [value]: checked,
                            });
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
  );
}
