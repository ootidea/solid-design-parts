import { assert, isNotUndefined } from 'base-up'
import { Show } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
import './common.scss'
import './Resizable.scss'
import { createDeferEffect, joinClasses, joinStyle, prepareProps, Props } from './utility/props'

export type ResizableProps = Props<{ widthPx?: number; onChangeWidthPx?: (width: number) => void }>

export function Resizable(rawProps: ResizableProps) {
  const [props, restProps] = prepareProps(rawProps, {}, ['widthPx', 'onChangeWidthPx', 'style'])

  const initialWidthPx = props.widthPx !== undefined ? Math.max(0, props.widthPx) : undefined
  if (initialWidthPx !== props.widthPx && initialWidthPx !== undefined) {
    props.onChangeWidthPx?.(initialWidthPx)
  }
  const widthPxSignal = createSignalObject(initialWidthPx)
  createDeferEffect(
    () => props.widthPx,
    () => {
      const newWidthPx = props.widthPx !== undefined ? Math.max(0, props.widthPx) : undefined
      widthPxSignal.value = newWidthPx
    }
  )

  let rootElement: HTMLDivElement | undefined = undefined
  let dragState: { deltaX: number } | undefined = undefined

  function onMouseDown(event: MouseEvent) {
    event.preventDefault()

    assert(rootElement, isNotUndefined)
    dragState = { deltaX: event.clientX - rootElement.getBoundingClientRect().right }
    document.body.addEventListener('mousemove', onMouseMove)
  }

  function onMouseMove(event: MouseEvent) {
    // if left mouse button is not pressed
    if ((event.buttons & 1) === 0) {
      dragState = undefined
    }

    if (dragState === undefined) {
      document.body.removeEventListener('mousemove', onMouseMove)
      return
    }

    assert(rootElement, isNotUndefined)
    const right = event.clientX
    const left = rootElement.getBoundingClientRect().left
    const newWidthPx = Math.max(0, right - left - dragState.deltaX)
    props.onChangeWidthPx?.(newWidthPx)
    widthPxSignal.value = newWidthPx
  }

  return (
    <div
      {...restProps}
      class={joinClasses(rawProps, 'solid-design-parts-Resizable_root')}
      style={joinStyle(rawProps.style, {
        width: widthPxSignal.value !== undefined ? `${widthPxSignal.value}px` : 'max-content',
      })}
      ref={rootElement}
    >
      <Show when={rawProps.children instanceof Array} fallback={rawProps.children}>
        <div>{rawProps.children}</div>
      </Show>
      <div class="solid-design-parts-Resizable_resize-handle" onMouseDown={onMouseDown}></div>
    </div>
  )
}
