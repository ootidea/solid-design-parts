import { Show } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
import './common.scss'
import './Image.scss'
import { joinClasses, prepareProps, Props, SlotProp } from './utility/props'
import { Slot } from './utility/Slot'

export type ImageProps = Props<
  {
    alt?: string
    fallback?: SlotProp<{}>
    onLoad?: (event: Event) => void
    onError?: (event: Event) => void
  },
  'img'
>

type LoadingState = 'loading' | 'complete' | 'failed'

export function Image(rawProps: ImageProps) {
  const [props, restProps] = prepareProps(rawProps, { alt: '' }, ['fallback', 'onLoad', 'onError'])

  const loadingState = createSignalObject<LoadingState>('loading')

  function onLoad(event: Event) {
    loadingState.value = 'complete'
    props.onLoad?.(event)
  }

  function onError(event: Event) {
    loadingState.value = 'failed'
    props.onError?.(event)
  }

  return (
    <Show
      when={loadingState.value === 'failed' && props.fallback}
      fallback={
        <img
          {...restProps}
          class={joinClasses(rawProps, 'solid-design-parts-Image_root')}
          alt={props.alt}
          draggable={false}
          onLoad={onLoad}
          onError={onError}
        />
      }
    >
      <Slot content={props.fallback} params={{}} />
    </Show>
  )
}
