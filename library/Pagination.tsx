import './Pagination.scss'
import './common.scss'
import { createNormalizedSignalObject, joinClasses, prepareProps, Props } from './utility/props'
import { clamp, lastOf, rangeThrough } from 'base-up'
import { For, Show } from 'solid-js'
import { IconButton } from './IconButton'
import chevronLeftIcon from './image/chevron-left.svg'
import chevronRightIcon from './image/chevron-right.svg'
import ellipsisHorizontal from './image/ellipsis-horizontal.svg'
import { createMemoObject } from 'solid-signal-object'
import { Icon } from './Icon'

export type PaginationProps = Props<{
  totalPages: number
  visibilityDistance?: number
  activePageNumber?: number
  onChangeActivePageNumber?: (pageNumber: number) => void
}>

export function Pagination(rawProps: PaginationProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      visibilityDistance: 2,
      activePageNumber: 1,
    },
    ['totalPages', 'onChangeActivePageNumber']
  )

  const activePageNumberSignal = createNormalizedSignalObject(
    props.activePageNumber,
    () => clamp(1, props.activePageNumber, props.totalPages),
    props.onChangeActivePageNumber
  )

  const surroundingRangeMemo = createMemoObject(() =>
    rangeThrough(
      Math.max(1, activePageNumberSignal.value - props.visibilityDistance),
      Math.min(props.totalPages, activePageNumberSignal.value + props.visibilityDistance)
    )
  )

  return (
    <div {...restProps} class={joinClasses(rawProps, 'solid-design-parts-Pagination_root')}>
      <IconButton
        src={chevronLeftIcon}
        disabled={activePageNumberSignal.value <= 1}
        radius="var(--solid-design-parts-Pagination_button-default-radius)"
        onClick={() => activePageNumberSignal.value--}
      />
      <Show when={surroundingRangeMemo.value[0] > 1}>
        <button class="solid-design-parts-Pagination_page-number" onClick={() => (activePageNumberSignal.value = 1)}>
          1
        </button>
      </Show>
      <Show when={surroundingRangeMemo.value[0] > 2}>
        <Icon src={ellipsisHorizontal} size="1em" />
      </Show>
      <div>
        <For each={surroundingRangeMemo.value}>
          {(pageNumber) => (
            <button
              class="solid-design-parts-Pagination_page-number"
              aria-current={pageNumber === activePageNumberSignal.value}
              onClick={() => (activePageNumberSignal.value = pageNumber)}
            >
              {pageNumber}
            </button>
          )}
        </For>
      </div>
      <Show when={lastOf(surroundingRangeMemo.value) < props.totalPages - 1}>
        <Icon src={ellipsisHorizontal} size="1em" />
      </Show>
      <Show when={lastOf(surroundingRangeMemo.value) < props.totalPages && props.totalPages !== Infinity}>
        <button
          class="solid-design-parts-Pagination_page-number"
          onClick={() => (activePageNumberSignal.value = props.totalPages)}
        >
          {props.totalPages}
        </button>
      </Show>
      <IconButton
        src={chevronRightIcon}
        disabled={activePageNumberSignal.value >= props.totalPages}
        radius="var(--solid-design-parts-Pagination_button-default-radius)"
        onClick={() => activePageNumberSignal.value++}
      />
    </div>
  )
}
