import { assert, isNotNull, isNotNullish, rangeUntil } from 'base-up'
import { children, For, Show } from 'solid-js'
import { createMutable } from 'solid-js/store'
import './Carousel.scss'
import './common.scss'
import { joinClasses, joinStyle, prepareProps, Props } from './utility/props'

export type CarouselProps = Props<{ itemWidth: string }>

export function Carousel(rawProps: CarouselProps) {
  const [props, restProps] = prepareProps(rawProps, {}, ['itemWidth', 'children'])
  const childrenMemo = children(() => props.children)

  /** A Record with the key as the item's index and the value indicating whether the item is within the scroll range */
  const flagsThatIndicateWhetherItemIsWithinScrollRange = createMutable<Record<number, boolean>>({})

  let itemListElement: HTMLDivElement | undefined

  /** Set up IntersectionObserver to identify the item displayed at the center of the carousel. */
  function setupIntersectionObserver(element: HTMLElement, index: number) {
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

  return (
    <div
      {...restProps}
      class={joinClasses(rawProps, 'solid-design-parts-Carousel_root')}
      style={joinStyle(rawProps.style, {
        '--solid-design-parts-Carousel_item-width': props.itemWidth,
      })}
    >
      <div
        class="solid-design-parts-Carousel_item-list"
        ref={(element) => {
          itemListElement = element

          const observer = new MutationObserver((mutations) => {
            for (const addedNodes of mutations.flatMap((mutation) => Array.from(mutation.addedNodes))) {
              if (addedNodes instanceof HTMLElement) {
                setupIntersectionObserver(addedNodes, Number(addedNodes.dataset.index))
              }
            }
          })
          observer.observe(element, { childList: true })
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
      <Show
        when={
          !rangeUntil(childrenMemo.toArray().length).every((i) => flagsThatIndicateWhetherItemIsWithinScrollRange[i])
        }
      >
        <div class="solid-design-parts-Carousel_indicator-list">
          <For each={rangeUntil(childrenMemo.toArray().length)}>
            {(i) => (
              <button
                class="solid-design-parts-Carousel_indicator"
                aria-current={flagsThatIndicateWhetherItemIsWithinScrollRange[i]}
                onClick={() => {
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
      </Show>
    </div>
  )
}
