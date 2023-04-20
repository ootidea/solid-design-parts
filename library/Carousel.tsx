import { assert, isNotNull, isNotNullish, rangeUntil } from 'base-up'
import { children, createEffect, For } from 'solid-js'
import { createMutable } from 'solid-js/store'
import { createSignalObject } from 'solid-signal-object'
import chevronLeftIcon from '../website/images/chevron-left.svg'
import chevronRightIcon from '../website/images/chevron-right.svg'
import './Carousel.scss'
import './common.scss'
import { IconButton } from './IconButton'
import { joinClasses, joinStyle, prepareProps, Props } from './utility/props'

export type CarouselProps = Props<{
  itemWidth: string
  autoScroll?: boolean
  autoScrollIntervalMs?: number
  hideNavigationButtons?: boolean
  hideIndicators?: boolean
  indicatorPosition?: 'outside' | 'inside'
}>

export function Carousel(rawProps: CarouselProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      autoScroll: false,
      autoScrollIntervalMs: 5000,
      hideNavigationButtons: false,
      hideIndicators: false,
      indicatorPosition: 'outside',
    },
    ['itemWidth', 'children']
  )
  const childrenMemo = children(() => props.children)

  const isOverflowing = createSignalObject(false)

  createEffect(() => {
    if (props.autoScroll) {
      restartAutoScrollTimer()
    } else {
      clearAutoScrollTimer()
    }
  })

  /** A Record with the key as the item's index and the value indicating whether the item is within the scroll range */
  const flagsThatIndicateWhetherItemIsWithinScrollRange = createMutable<Record<number, boolean>>({})

  let itemListElement: HTMLDivElement | undefined

  /** Set up IntersectionObserver to identify the item displayed at the center of the carousel. */
  function setUpIntersectionObserver(element: HTMLElement, index: number) {
    assert(element.parentElement, isNotNull)

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.find((entry) => entry.target === element)
        if (entry !== undefined) {
          flagsThatIndicateWhetherItemIsWithinScrollRange[index] = entry.isIntersecting
        }
      },
      { root: element.parentElement, threshold: 0.5 }
    )
    observer.observe(element)
  }

  let intervalId: ReturnType<typeof setInterval> | undefined

  function clearAutoScrollTimer() {
    if (intervalId !== undefined) {
      clearInterval(intervalId)
    }
  }

  /**
   * Set up automatic scrolling at regular intervals when called for the first time.
   * For the second call and beyond, reset the elapsed time and restart the timer.
   */
  function restartAutoScrollTimer() {
    clearAutoScrollTimer()

    intervalId = setInterval(() => {
      if (itemListElement === undefined) return

      const itemWidthPx = itemListElement.firstElementChild?.getBoundingClientRect()?.width
      if (itemWidthPx === undefined) return

      if (itemListElement.scrollLeft + itemListElement.clientWidth < itemListElement.scrollWidth) {
        // Scroll to the next item
        itemListElement.scrollBy({ left: itemWidthPx, behavior: 'smooth' })
      } else {
        // Scroll from the last item back to the first item
        itemListElement.scrollTo({ left: 0, behavior: 'smooth' })
      }
    }, props.autoScrollIntervalMs)
  }

  return (
    <div
      {...restProps}
      class={joinClasses(rawProps, 'solid-design-parts-Carousel_root', {
        'solid-design-parts-Carousel_is-overflowing': isOverflowing.value,
        'solid-design-parts-Carousel_hide-navigation-buttons': props.hideNavigationButtons,
        'solid-design-parts-Carousel_hide-indicators': props.hideIndicators,
      })}
      style={joinStyle(rawProps.style, {
        '--solid-design-parts-Carousel_item-width': props.itemWidth,
      })}
      data-indicator-position={props.indicatorPosition}
    >
      <div class="solid-design-parts-Carousel_navigation-button-layout">
        <IconButton
          class="solid-design-parts-Carousel_prev-button"
          src={chevronLeftIcon}
          backgroundColor="var(--solid-design-parts-Carousel_navigation-button-background-color)"
          iconColor="var(--solid-design-parts-Carousel_navigation-button-icon-color)"
          onClick={() => {
            if (props.autoScroll) {
              restartAutoScrollTimer()
            }

            if (itemListElement === undefined) return

            const itemWidthPx = itemListElement.firstElementChild?.getBoundingClientRect()?.width
            if (itemWidthPx === undefined) return

            itemListElement.scrollBy({ left: -itemWidthPx, behavior: 'smooth' })
          }}
        />
        <div
          class="solid-design-parts-Carousel_item-list"
          onMouseWheel={(event: WheelEvent) => {
            if (event.deltaX !== 0 || (event.shiftKey && event.deltaY !== 0)) {
              if (props.autoScroll) {
                restartAutoScrollTimer()
              }
            }
          }}
          ref={(element) => {
            itemListElement = element

            // Set up ResizeObserver to detect overflow
            isOverflowing.value = element.clientWidth < element.scrollWidth
            const resizeObserver = new ResizeObserver((entries) => {
              const found = entries.find((entry) => entry.target === element)
              assert(found, isNotNullish)
              isOverflowing.value = found.target.clientWidth < found.target.scrollWidth
            })
            resizeObserver.observe(element)

            // Set up IntersectionObserver for each item
            const observer = new MutationObserver((mutations) => {
              for (const addedNodes of mutations.flatMap((mutation) => Array.from(mutation.addedNodes))) {
                if (addedNodes instanceof HTMLElement) {
                  setUpIntersectionObserver(addedNodes, Number(addedNodes.dataset.index))
                }
              }
            })
            observer.observe(element, { childList: true })

            // The timer restarts when a horizontal scroll is performed using touch operation
            element.addEventListener('touchstart', () => element.addEventListener('touchmove', onTouchMove))
            element.addEventListener('touchend', () => element.removeEventListener('touchmove', onTouchMove))
            element.addEventListener('touchcancel', () => element.removeEventListener('touchmove', onTouchMove))
            function onTouchMove() {
              if (props.autoScroll) {
                restartAutoScrollTimer()
              }
            }
          }}
        >
          <For each={childrenMemo.toArray()}>
            {(child, i) => (
              <div class="solid-design-parts-Carousel_item" data-index={i()}>
                {child}
              </div>
            )}
          </For>
        </div>
        <IconButton
          class="solid-design-parts-Carousel_next-button"
          src={chevronRightIcon}
          backgroundColor="var(--solid-design-parts-Carousel_navigation-button-background-color)"
          iconColor="var(--solid-design-parts-Carousel_navigation-button-icon-color)"
          onClick={() => {
            if (props.autoScroll) {
              restartAutoScrollTimer()
            }

            if (itemListElement === undefined) return

            const itemWidthPx = itemListElement.firstElementChild?.getBoundingClientRect()?.width
            if (itemWidthPx === undefined) return

            itemListElement.scrollBy({ left: itemWidthPx, behavior: 'smooth' })
          }}
        />
      </div>
      <div class="solid-design-parts-Carousel_indicator-list">
        <For each={rangeUntil(childrenMemo.toArray().length)}>
          {(i) => (
            <button
              class="solid-design-parts-Carousel_indicator"
              aria-current={flagsThatIndicateWhetherItemIsWithinScrollRange[i]}
              onClick={() => {
                if (props.autoScroll) {
                  restartAutoScrollTimer()
                }

                assert(itemListElement, isNotNullish)
                const itemRect = itemListElement.children.item(i)?.getBoundingClientRect()
                assert(itemRect, isNotNullish)
                const itemListRect = itemListElement.getBoundingClientRect()
                itemListElement.scrollTo({
                  left: i * itemRect.width - itemListRect.width / 2 + itemRect.width / 2,
                  behavior: 'smooth',
                })
              }}
            />
          )}
        </For>
      </div>
    </div>
  )
}
