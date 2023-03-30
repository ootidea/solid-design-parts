import { assert, isNotUndefined } from 'base-up'
import { onCleanup, onMount } from 'solid-js'
import { createMemoObject, createSignalObject } from 'solid-signal-object'
import './common.scss'
import './Scrollable.scss'
import { observeHeightPx } from './utility/others'
import { joinClasses, prepareProps, Props } from './utility/props'

export type ScrollableProps = Props<{}>

export function Scrollable(rawProps: ScrollableProps) {
  const [props, restProps] = prepareProps(rawProps, {}, ['children'])

  const rootHeightPx = createSignalObject(0)
  const innerHeightPx = createSignalObject(0)
  const thumbTopPx = createSignalObject(0)
  const dragState = createSignalObject<{ initialMouseY: number; initialScrollTop: number } | undefined>(undefined)

  let outerElement: HTMLDivElement | undefined
  let thumbElement: HTMLDivElement | undefined

  const isOverflow = createMemoObject(() => rootHeightPx.value < innerHeightPx.value)

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

      dragState.value = { initialMouseY: event.clientY, initialScrollTop: outerElement.scrollTop }
      document.body.addEventListener('mousemove', onMouseMove)
    }

    function onMouseMove(event: MouseEvent) {
      // if left mouse button is not pressed
      if ((event.buttons & 1) === 0) {
        dragState.value = undefined
      }

      if (dragState.value === undefined) {
        document.body.removeEventListener('mousemove', onMouseMove)
        return
      }

      if (outerElement === undefined) return

      outerElement.scrollTop =
        dragState.value.initialScrollTop +
        ((event.clientY - dragState.value.initialMouseY) * innerHeightPx.value) / rootHeightPx.value
    }
  }

  function onScroll(event: Event) {
    const element = event.target
    if (element instanceof HTMLElement) {
      if (innerHeightPx.value === 0) return

      const scrollRatio = element.scrollTop / innerHeightPx.value
      thumbTopPx.value = rootHeightPx.value * scrollRatio
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
        'solid-design-parts-Scrollable_dragging': dragState.value !== undefined,
      }}
      style={{
        '--solid-design-parts-Scrollable_thumb-height': `${(100 * rootHeightPx.value) / innerHeightPx.value}%`,
        '--solid-design-parts-Scrollable_thumb-top': `${thumbTopPx.value}px`,
      }}
      ref={(element) => observeHeightPx(element, rootHeightPx.set)}
      onMouseEnter={showThumbTemporarily}
    >
      <div class="solid-design-parts-Scrollable_outer" ref={outerElement} onScroll={onScroll}>
        <div
          {...restProps}
          class={joinClasses(rawProps, 'solid-design-parts-Scrollable_inner')}
          ref={(element) => observeHeightPx(element, innerHeightPx.set)}
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
