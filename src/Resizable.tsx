import { createSignal, Show } from 'solid-js'
import css from './Resizable.scss'
import { assertNonUndefined } from './utility/others'
import { joinClasses, joinStyle, prepareProps, SkelProps } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type ResizableProps = SkelProps<{ onChangeWidth?: (width: number) => void }>

export function Resizable(rawProps: ResizableProps) {
  const [props, restProps] = prepareProps(rawProps, {}, ['onChangeWidth', 'style'])

  const [width, setWidth] = createSignal<number | undefined>(undefined)

  let rootElement: HTMLDivElement | undefined = undefined
  let dragState: { deltaX: number } | undefined = undefined

  function onMouseDown(event: MouseEvent) {
    assertNonUndefined(rootElement)
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

    assertNonUndefined(rootElement)
    const right = event.clientX
    const left = rootElement.getBoundingClientRect().left
    const width = right - left - dragState.deltaX
    props.onChangeWidth?.(width)
    setWidth(width)
  }

  return (
    <div
      class={joinClasses(rawProps, 'skel-Resizable_root')}
      style={joinStyle(rawProps.style, { width: width() ? `${width()}px` : 'auto' })}
      ref={rootElement}
      {...restProps}
    >
      <Show when={rawProps.children instanceof Array} fallback={rawProps.children}>
        <div>{rawProps.children}</div>
      </Show>
      <div class="skel-Resizable_resize-handle" onMouseDown={onMouseDown}></div>
    </div>
  )
}
