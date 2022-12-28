import { assert, isNotUndefined, minBy } from 'base-up'
import { createEffect, createMemo, createSignal, onMount } from 'solid-js'
import css from './Slider.scss'
import { observeWidthPx } from './utility/others'
import { joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type SliderProps = Props<{
  value?: number
  minValue?: number
  maxValue?: number
  stops?: readonly number[]
  step?: number
  offset?: number
  trackColor?: string
  trackFillColor?: string
  thumbWidth?: string
  thumbHeight?: string
  thumbColor?: string
  onChangeValue?: (value: number) => void
}>

export function Slider(rawProps: SliderProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      minValue: 0,
      maxValue: 1,
      value: rawProps.minValue ?? 0,
      trackColor: 'var(--mantle-ui-Slider_track-default-color)',
      trackFillColor: 'var(--mantle-ui-Slider_track-default-fill-color)',
      thumbWidth: 'var(--mantle-ui-Slider_thumb-default-width)',
      thumbHeight: 'var(--mantle-ui-Slider_thumb-default-height)',
      thumbColor: 'var(--mantle-ui-Slider_thumb-default-color)',
    },
    ['stops', 'step', 'offset', 'onChangeValue']
  )

  const stops = createMemo(() => {
    if (props.stops !== undefined) return [props.minValue, ...props.stops, props.maxValue]

    if (props.step !== undefined) {
      const result = []
      for (let i = props.minValue + (props.offset ?? 0); i < props.maxValue; i += props.step) {
        result.push(i)
      }
      result.push(props.maxValue)
      return result
    }

    return undefined
  })

  const [value, setValue] = createSignal(props.value)
  createEffect(() => setValue(correctValue(props.value)))
  const ratio = () => (value() - props.minValue) / (props.maxValue - props.minValue)

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
    return props.minValue + ratio * (props.maxValue - props.minValue)
  }

  onMount(() => {
    assert(trackElement, isNotUndefined)
    observeWidthPx(trackElement, setTrackWidthPx)
  })

  return (
    <div
      class={joinClasses(rawProps, 'mantle-ui-Slider_root')}
      style={{
        '--mantle-ui-Slider_track-height': 'var(--mantle-ui-Slider_track-default-height)',
        '--mantle-ui-Slider_track-background': `linear-gradient(to right, ${props.trackFillColor} ${100 * ratio()}%, ${
          props.trackColor
        } ${100 * ratio()}%)`,
        '--mantle-ui-Slider_thumb-width': props.thumbWidth,
        '--mantle-ui-Slider_thumb-height': props.thumbHeight,
        '--mantle-ui-Slider_thumb-color': props.thumbColor,
        '--mantle-ui-Slider_thumb-x': `${ratio() * (trackWidthPx() - thumbWidthPx())}px`,
      }}
      role="slider"
      {...restProps}
    >
      <div class="mantle-ui-Slider_track" ref={trackElement} onMouseDown={onMouseDownTrack} />
      <div
        class="mantle-ui-Slider_thumb"
        ref={(element) => observeWidthPx(element, setThumbWidthPx)}
        onMouseDown={onMouseDownThumb}
      />
    </div>
  )
}
