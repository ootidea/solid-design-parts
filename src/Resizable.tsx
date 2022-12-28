import { assert, isNotUndefined } from 'base-up'
import { createSignal, Show } from 'solid-js'
import css from './Resizable.scss'
import { joinClasses, joinStyle, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type ResizableProps = Props<{ onChangeWidthPx?: (width: number) => void }>

export function Resizable(rawProps: ResizableProps) {
  const [props, restProps] = prepareProps(rawProps, {}, ['onChangeWidthPx', 'style'])

  const [widthPx, setWidthPx] = createSignal<number | undefined>(undefined)

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
    const widthPx = right - left - dragState.deltaX
    props.onChangeWidthPx?.(widthPx)
    setWidthPx(widthPx)
  }

  return (
    <div
      class={joinClasses(rawProps, 'mantle-ui-Resizable_root')}
      style={joinStyle(rawProps.style, { width: widthPx() !== undefined ? `${widthPx()}px` : 'max-content' })}
      ref={rootElement}
      {...restProps}
    >
      <Show when={rawProps.children instanceof Array} fallback={rawProps.children}>
        <div>{rawProps.children}</div>
      </Show>
      <div class="mantle-ui-Resizable_resize-handle" onMouseDown={onMouseDown}></div>
    </div>
  )
}
