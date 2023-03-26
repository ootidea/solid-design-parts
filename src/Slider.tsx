import { assert, isNotUndefined, minBy } from 'base-up'
import { createMemo, createRenderEffect, createSignal, onMount } from 'solid-js'
import css from './Slider.scss'
import { CssColor } from './utility/color'
import { observeWidthPx } from './utility/others'
import { joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type SliderProps = Props<{
  value?: number
  min?: number
  max?: number
  stops?: readonly number[]
  step?: number
  offset?: number
  trackColor?: CssColor
  trackFillColor?: CssColor
  thumbWidth?: string
  thumbHeight?: string
  thumbColor?: CssColor
  onChangeValue?: (value: number) => void
}>

export function Slider(rawProps: SliderProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      min: 0,
      max: 1,
      value: rawProps.min ?? 0,
      trackColor: 'var(--solid-design-parts-Slider_track-default-color)',
      trackFillColor: 'var(--solid-design-parts-Slider_track-default-fill-color)',
      thumbWidth: 'var(--solid-design-parts-Slider_thumb-default-width)',
      thumbHeight: 'var(--solid-design-parts-Slider_thumb-default-height)',
      thumbColor: 'var(--solid-design-parts-Slider_thumb-default-color)',
    },
    ['stops', 'step', 'offset', 'onChangeValue']
  )

  const stops = createMemo(() => {
    if (props.stops !== undefined) return [props.min, ...props.stops, props.max]

    if (props.step !== undefined) {
      const result = []
      for (let i = props.min + (props.offset ?? 0); i < props.max; i += props.step) {
        result.push(i)
      }
      result.push(props.max)
      return result
    }

    return undefined
  })

  const [value, setValue] = createSignal(props.value)
  createRenderEffect(() => setValue(correctValue(props.value)))
  const ratio = () => (value() - props.min) / (props.max - props.min)

  // Change internal state and callback it.
  // For discrete sliders, the value is corrected to the nearest stop.
  function changeValue(newValue: number) {
    const value = correctValue(newValue)
    setValue(value)
    props.onChangeValue?.(value)
  }

  // If it is a discrete slider, it is corrected to the nearest stop.
  function correctValue(value: number): number {
    if (stops() === undefined) {
      return value
    } else {
      // stops() is now neither undefined nor empty. So ! can be used.
      return minBy(stops()!, (stop) => Math.abs(stop - value))!
    }
  }

  const [trackWidthPx, setTrackWidthPx] = createSignal(0)
  const [thumbWidthPx, setThumbWidthPx] = createSignal(0)
  let trackElement: HTMLDivElement | undefined = undefined

  function onMouseDownTrack(event: MouseEvent) {
    event.preventDefault()
    changeValue(convertOffsetXToValue(event.offsetX))
    document.body.addEventListener('mousemove', onMouseMove)
  }

  function onMouseMove(event: MouseEvent) {
    // If left mouse button is not pressed
    if ((event.buttons & 1) === 0) {
      document.body.removeEventListener('mousemove', onMouseMove)
      return
    }

    if (trackElement === undefined) return

    const offsetX = event.clientX - trackElement.getBoundingClientRect().x
    changeValue(convertOffsetXToValue(offsetX))
  }

  function onMouseDownThumb(event: MouseEvent) {
    event.preventDefault()

    if (trackElement === undefined) return

    const offsetX = event.clientX - trackElement.getBoundingClientRect().x
    changeValue(convertOffsetXToValue(offsetX))

    document.body.addEventListener('mousemove', onMouseMove)
  }

  function convertOffsetXToValue(offsetX: number): number {
    const validOffsetX = Math.max(thumbWidthPx() / 2, Math.min(offsetX, trackWidthPx() - thumbWidthPx() / 2))
    const ratio = (validOffsetX - thumbWidthPx() / 2) / (trackWidthPx() - thumbWidthPx())
    return props.min + ratio * (props.max - props.min)
  }

  onMount(() => {
    assert(trackElement, isNotUndefined)
    observeWidthPx(trackElement, setTrackWidthPx)
  })

  return (
    <div
      class={joinClasses(rawProps, 'solid-design-parts-Slider_root')}
      style={{
        '--solid-design-parts-Slider_track-height': 'var(--solid-design-parts-Slider_track-default-height)',
        '--solid-design-parts-Slider_track-background': `linear-gradient(to right, ${props.trackFillColor} ${
          100 * ratio()
        }%, ${props.trackColor} ${100 * ratio()}%)`,
        '--solid-design-parts-Slider_thumb-width': props.thumbWidth,
        '--solid-design-parts-Slider_thumb-height': props.thumbHeight,
        '--solid-design-parts-Slider_thumb-color': props.thumbColor,
        '--solid-design-parts-Slider_thumb-x': `${ratio() * (trackWidthPx() - thumbWidthPx())}px`,
      }}
      role="slider"
      {...restProps}
    >
      <div class="solid-design-parts-Slider_track" ref={trackElement} onMouseDown={onMouseDownTrack} />
      <div
        class="solid-design-parts-Slider_thumb"
        ref={(element) => observeWidthPx(element, setThumbWidthPx)}
        onMouseDown={onMouseDownThumb}
      />
    </div>
  )
}
