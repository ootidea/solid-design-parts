import { assert, isNotUndefined } from 'base-up'
import { createSignal, onCleanup, onMount } from 'solid-js'
import { createMemoObject } from 'solid-signal-object'
import css from './Scrollable.scss'
import { observeHeightPx } from './utility/others'
import { joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type ScrollableProps = Props<{}>

export function Scrollable(rawProps: ScrollableProps) {
  const [props, restProps] = prepareProps(rawProps, {}, ['children'])

  const [rootHeightPx, setRootHeightPx] = createSignal(0)
  const [innerHeightPx, setInnerHeightPx] = createSignal(0)
  const [thumbTopPx, setThumbTopPx] = createSignal(0)
  const [dragState, setDragState] = createSignal<{ initialMouseY: number; initialScrollTop: number } | undefined>(
    undefined
  )

  let outerElement: HTMLDivElement | undefined
  let thumbElement: HTMLDivElement | undefined

  const isOverflow = createMemoObject(() => rootHeightPx() < innerHeightPx())

  onMount(() => {
    assert(thumbElement, isNotUndefined)

    setupDragAndDrop(thumbElement)

    const intersectionObserver = new IntersectionObserver(() => showThumbTemporarily(), {
      threshold: 1,
    })
    intersectionObserver.observe(thumbElement)
    onCleanup(() => intersectionObserver.disconnect())
  })

  function setupDragAndDrop(element: HTMLDivElement) {
    element.addEventListener('mousedown', onMouseDown)
    onCleanup(() => {
      element.removeEventListener('mousedown', onMouseDown)
    })

    function onMouseDown(event: MouseEvent) {
      event.preventDefault()
      if (outerElement === undefined) return

      setDragState({ initialMouseY: event.clientY, initialScrollTop: outerElement.scrollTop })
      document.body.addEventListener('mousemove', onMouseMove)
    }

    function onMouseMove(event: MouseEvent) {
      // if left mouse button is not pressed
      if ((event.buttons & 1) === 0) {
        setDragState(undefined)
      }

      const dragStateSnapshot = dragState()
      if (dragStateSnapshot === undefined) {
        document.body.removeEventListener('mousemove', onMouseMove)
        return
      }

      if (outerElement === undefined) return

      outerElement.scrollTop =
        dragStateSnapshot.initialScrollTop +
        ((event.clientY - dragStateSnapshot.initialMouseY) * innerHeightPx()) / rootHeightPx()
    }
  }

  function onScroll(event: Event) {
    const element = event.target
    if (element instanceof HTMLElement) {
      if (innerHeightPx() === 0) return

      const scrollRatio = element.scrollTop / innerHeightPx()
      setThumbTopPx(rootHeightPx() * scrollRatio)
    }

    showThumbTemporarily()
  }

  function showThumbTemporarily() {
    if (isOverflow.value) {
      thumbElement?.animate([{ opacity: 1, visibility: 'initial' }, { opacity: 1, offset: 0.7 }, { opacity: 0 }], 800)
    }
  }

  return (
    <div
      class="solid-design-parts-Scrollable_root"
      classList={{
        'solid-design-parts-Scrollable_overflow': isOverflow.value,
        'solid-design-parts-Scrollable_dragging': dragState() !== undefined,
      }}
      style={{
        '--solid-design-parts-Scrollable_thumb-height': `${(100 * rootHeightPx()) / innerHeightPx()}%`,
        '--solid-design-parts-Scrollable_thumb-top': `${thumbTopPx()}px`,
      }}
      ref={(element) => observeHeightPx(element, setRootHeightPx)}
      onMouseEnter={showThumbTemporarily}
    >
      <div class="solid-design-parts-Scrollable_outer" ref={outerElement} onScroll={onScroll}>
        <div
          class={joinClasses(rawProps, 'solid-design-parts-Scrollable_inner')}
          ref={(element) => observeHeightPx(element, setInnerHeightPx)}
          {...restProps}
        >
          {props.children}
        </div>
      </div>
      <div class="solid-design-parts-Scrollable_overlay">
        <div class="solid-design-parts-Scrollable_dummy" />
        <div class="solid-design-parts-Scrollable_scrollbar" role="scrollbar">
          <div class="solid-design-parts-Scrollable_thumb" ref={thumbElement} />
        </div>
      </div>
    </div>
  )
}
