import { createEffect, createSignal, onMount } from 'solid-js'
import css from './Slider.scss'
import { assertNonUndefined, observeWidth } from './utility/others'
import { joinClasses, prepareProps, SkelProps } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type SliderProps = SkelProps<{
  value?: number
  minValue?: number
  maxValue?: number
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
    ['onChangeValue']
  )

  const [value, setValue] = createSignal(props.value)
  createEffect(() => setValue(() => props.value))
  const ratio = () => (value() - props.minValue) / (props.maxValue - props.minValue)

  function changeValue(newValue: number) {
    setValue(newValue)
    props.onChangeValue?.(newValue)
  }

  const [trackWidth, setTrackWidth] = createSignal(0)
  const [thumbWidth, setThumbWidth] = createSignal(0)
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

  function convertOffsetXToValue(offsetX: number): number {
    const validOffsetX = Math.max(thumbWidth() / 2, Math.min(offsetX, trackWidth() - thumbWidth() / 2))
    const ratio = (validOffsetX - thumbWidth() / 2) / (trackWidth() - thumbWidth())
    return props.minValue + ratio * (props.maxValue - props.minValue)
  }

  onMount(() => {
    assertNonUndefined(trackElement)
    observeWidth(trackElement, setTrackWidth)
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
        '--skel-Slider_thumb-x': `${ratio() * (trackWidth() - thumbWidth())}px`,
      }}
      {...restProps}
    >
      <div class="skel-Slider_track" ref={trackElement} onMouseDown={onMouseDownTrack} />
      <div class="skel-Slider_thumb" ref={(element) => observeWidth(element, setThumbWidth)} />
    </div>
  )
}
