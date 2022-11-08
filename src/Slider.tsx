import { createEffect, createMemo, createSignal, onMount } from 'solid-js'
import css from './Slider.scss'
import { assertNonUndefined, minBy, observeWidthPx } from './utility/others'
import { joinClasses, prepareProps, SkelProps } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type SliderProps = SkelProps<{
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
      trackColor: 'var(--skel-Slider_track-default-color)',
      trackFillColor: 'var(--skel-Slider_track-default-fill-color)',
      thumbWidth: 'var(--skel-Slider_thumb-default-width)',
      thumbHeight: 'var(--skel-Slider_thumb-default-height)',
      thumbColor: 'var(--skel-Slider_thumb-default-color)',
    },
    ['stops', 'step', 'offset', 'onChangeValue']
  )

  const stops = createMemo(() => {
    if (props.stops !== undefined) return [props.minValue, ...props.stops, props.maxValue]

    if (props.step !== undefined) {
      const outcome = []
      for (let i = props.minValue + (props.offset ?? 0); i < props.maxValue; i += props.step) {
        outcome.push(i)
      }
      outcome.push(props.maxValue)
      return outcome
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
    assertNonUndefined(trackElement)
    observeWidthPx(trackElement, setTrackWidthPx)
  })

  return (
    <div
      class={joinClasses(rawProps, 'skel-Slider_root')}
      style={{
        '--skel-Slider_track-height': 'var(--skel-Slider_track-default-height)',
        '--skel-Slider_track-background': `linear-gradient(to right, ${props.trackFillColor} ${100 * ratio()}%, ${
          props.trackColor
        } ${100 * ratio()}%)`,
        '--skel-Slider_thumb-width': props.thumbWidth,
        '--skel-Slider_thumb-height': props.thumbHeight,
        '--skel-Slider_thumb-color': props.thumbColor,
        '--skel-Slider_thumb-x': `${ratio() * (trackWidthPx() - thumbWidthPx())}px`,
      }}
      role="slider"
      {...restProps}
    >
      <div class="skel-Slider_track" ref={trackElement} onMouseDown={onMouseDownTrack} />
      <div
        class="skel-Slider_thumb"
        ref={(element) => observeWidthPx(element, setThumbWidthPx)}
        onMouseDown={onMouseDownThumb}
      />
    </div>
  )
}
