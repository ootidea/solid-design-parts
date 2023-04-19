import { assert, isNotNull, rangeUntil } from 'base-up'
import { children, For } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
import './Carousel.scss'
import './common.scss'
import { joinClasses, joinStyle, prepareProps, Props } from './utility/props'

export type CarouselProps = Props<{ itemWidth: string }>

export function Carousel(rawProps: CarouselProps) {
  const [props, restProps] = prepareProps(rawProps, {}, ['itemWidth', 'children'])
  const childrenMemo = children(() => props.children)

  const currentIndex = createSignalObject<number | undefined>()

  /** Set up IntersectionObserver to identify the item displayed at the center of the carousel. */
  function setupIntersectionObserver(element: HTMLElement, index: number) {
    assert(element.parentElement, isNotNull)

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.find((entry) => entry.target === element)
        if (entry?.isIntersecting) {
          currentIndex.value = index
        }
      },
      { root: element.parentElement, rootMargin: '0px -50%' }
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
      <div class="solid-design-parts-Carousel_indicator-list">
        <For each={rangeUntil(childrenMemo.toArray().length)}>
          {(i) => <div class="solid-design-parts-Carousel_indicator" aria-current={currentIndex.value === i} />}
        </For>
      </div>
    </div>
  )
}
