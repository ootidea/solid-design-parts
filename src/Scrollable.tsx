import { createSignal, onCleanup, onMount } from "solid-js";
import css from "./Scrollable.scss";
import { assertNonUndefined } from "./utility/others";
import { joinClasses, prepareProps, SkelProps } from "./utility/props";
import { registerCss } from "./utility/registerCss";

registerCss(css);

export type ScrollableProps = SkelProps<{}>;

export function Scrollable(rawProps: ScrollableProps) {
  const [props, restProps] = prepareProps(rawProps, {}, ["children"]);

  const [rootHeight, setRootHeight] = createSignal(0);
  const [innerHeight, setInnerHeight] = createSignal(0);
  const [thumbTopPx, setThumbTopPx] = createSignal(0);
  const [dragState, setDragState] = createSignal<
    { initialMouseY: number; initialScrollTop: number } | undefined
  >(undefined);

  let outerElement: HTMLDivElement | undefined;
  let thumbElement: HTMLDivElement | undefined;

  const isOverflow = () => rootHeight() < innerHeight();

  onMount(() => {
    assertNonUndefined(thumbElement);

    setupDragAndDrop(thumbElement);

    const intersectionObserver = new IntersectionObserver(() => showThumbTemporarily(), {
      threshold: 1,
    });
    intersectionObserver.observe(thumbElement);
    onCleanup(() => intersectionObserver.disconnect());
  });

  function setupDragAndDrop(element: HTMLDivElement) {
    element.addEventListener("mousedown", onMouseDown);
    onCleanup(() => {
      element.removeEventListener("mousedown", onMouseDown);
    });

    function onMouseDown(event: MouseEvent) {
      event.preventDefault();
      if (outerElement === undefined) return;

      setDragState({ initialMouseY: event.clientY, initialScrollTop: outerElement.scrollTop });
      document.body.addEventListener("mousemove", onMouseMove);
    }

    function onMouseMove(event: MouseEvent) {
      // if left mouse button is not pressed
      if ((event.buttons & 1) === 0) {
        setDragState(undefined);
      }

      const dragStateSnapshot = dragState();
      if (dragStateSnapshot === undefined) {
        document.body.removeEventListener("mousemove", onMouseMove);
        return;
      }

      if (outerElement === undefined) return;

      outerElement.scrollTop =
        dragStateSnapshot.initialScrollTop +
        ((event.clientY - dragStateSnapshot.initialMouseY) * innerHeight()) / rootHeight();
    }
  }

  function onScroll(event: Event) {
    const element = event.target;
    if (element instanceof HTMLElement) {
      if (innerHeight() === 0) return;

      const scrollRatio = element.scrollTop / innerHeight();
      setThumbTopPx(rootHeight() * scrollRatio);
    }

    showThumbTemporarily();
  }

  function showThumbTemporarily() {
    if (isOverflow()) {
      thumbElement?.animate(
        [{ opacity: 1, visibility: "initial" }, { opacity: 1, offset: 0.7 }, { opacity: 0 }],
        1500,
      );
    }
  }

  return (
    <div
      class="skel-Scrollable_root"
      classList={{
        "skel-Scrollable_overflow": isOverflow(),
        "skel-Scrollable_dragging": dragState() !== undefined,
      }}
      style={{
        "--skel-Scrollable_thumb-height": `${(100 * rootHeight()) / innerHeight()}%`,
        "--skel-Scrollable_thumb-top": `${thumbTopPx()}px`,
      }}
      ref={(element) => observeHeight(element, setRootHeight)}
    >
      <div class="skel-Scrollable_outer" ref={outerElement} onScroll={onScroll}>
        <div
          class={joinClasses(rawProps, "skel-Scrollable_inner")}
          ref={(element) => observeHeight(element, setInnerHeight)}
          {...restProps}
        >
          {props.children}
        </div>
      </div>
      <div class="skel-Scrollable_scrollbar">
        <div class="skel-Scrollable_thumb" ref={thumbElement} />
      </div>
    </div>
  );
}

function observeHeight(element: HTMLElement, callback: (height: number) => void) {
  callback(element.getBoundingClientRect().height);
  const resizeObserver = new ResizeObserver(() => {
    callback(element.getBoundingClientRect().height);
  });
  resizeObserver.observe(element);

  onCleanup(() => {
    resizeObserver.unobserve(element);
  });
}
