import { createSignal, Show } from "solid-js";
import { Portal } from "solid-js/web";
import css from "./Popover.scss";
import {
  EnneaPosition,
  setupFocusTrap,
  toHorizontalPosition,
  toOpposite,
  toVerticalPosition,
  toXPercent,
  toYPercent,
} from "./utility/others";
import { prepareProps, SkelProps, SkelSlot } from "./utility/props";
import { registerCss } from "./utility/registerCss";
import { Slot } from "./utility/Slot";

registerCss(css);

export type PopoverProps = SkelProps<{
  on?: EnneaPosition;
  joint?: EnneaPosition | undefined;
  persistent?: boolean;
  onClose?: () => void;
  launcher?: SkelSlot<{ open: () => void; close: () => void; toggle: () => void }>;
  frame?: SkelSlot<{ open: () => void; close: () => void; toggle: () => void }>;
  children?: SkelSlot<{ open: () => void; close: () => void; toggle: () => void }>;
}>;

export function Popover(rawProps: PopoverProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      on: "bottom",
      joint: undefined,
      persistent: false,
    },
    ["style"],
  );

  const [opened, setOpened] = createSignal(false);

  function open() {
    if (launcher === undefined) return;

    const range = document.createRange();
    range.selectNodeContents(launcher);
    launcherRect = range.getBoundingClientRect();
    setOpened(true);
  }

  function close() {
    setOpened(false);
    props.onClose?.();
  }

  function toggle() {
    if (opened()) {
      close();
    } else {
      open();
    }
  }

  let launcher: HTMLDivElement | undefined;
  let launcherRect: DOMRect | undefined;

  function onClickBackdrop(event: MouseEvent) {
    if (event.target !== event.currentTarget) return;

    if (!props.persistent) {
      close();
    }
  }

  return (
    <>
      <div class="skel-Popover_launcher" ref={launcher}>
        <Slot content={rawProps.launcher} params={{ open, close, toggle }} />
      </div>
      <Show when={opened()}>
        <Portal>
          <div
            class="skel-Popover_backdrop"
            style={{
              "--skel-Popover_left": launcherRect ? `${launcherRect.left}px` : "0",
              "--skel-Popover_right": launcherRect ? `${launcherRect.right}px` : "0",
              "--skel-Popover_top": launcherRect ? `${launcherRect.top}px` : "0",
              "--skel-Popover_bottom": launcherRect ? `${launcherRect.bottom}px` : "0",
              "--skel-Popover_transform": `translate(-${toXPercent(
                props.joint ?? toOpposite(props.on),
              )}, -${toYPercent(props.joint ?? toOpposite(props.on))})`,
            }}
            data-horizontal-position={toHorizontalPosition(props.on)}
            data-vertical-position={toVerticalPosition(props.on)}
            ref={(element) => setupFocusTrap(element)}
            onClick={onClickBackdrop}
            {...restProps}
          >
            <Slot content={rawProps.frame} params={{ open, close, toggle }}>
              <div class="skel-Popover_frame">
                <Slot content={rawProps.children} params={{ open, close, toggle }} />
              </div>
            </Slot>
          </div>
        </Portal>
      </Show>
    </>
  );
}
