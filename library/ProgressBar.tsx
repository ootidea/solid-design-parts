import { clamp } from 'base-up'
import './common.scss'
import './ProgressBar.scss'
import { createNormalizedSignalObject, joinClasses, prepareProps, Props } from './utility/props'

export type ProgressBarProps = Props<{
  value?: number
}>

export function ProgressBar(rawProps: ProgressBarProps) {
  const [props, restProps] = prepareProps(rawProps, {
    value: 0,
  })

  const valueSignal = createNormalizedSignalObject(props.value, () => clamp(0, props.value, 1))

  return (
    <div
      {...restProps}
      class={joinClasses(rawProps, 'solid-design-parts-ProgressBar_root')}
      style={{
        '--solid-design-parts-ProgressBar_value': valueSignal.value,
      }}
      role="progressbar"
      aria-valuenow={valueSignal.value}
      aria-valuemin={0}
      aria-valuemax={1}
    >
      <div class="solid-design-parts-ProgressBar_progress" />
    </div>
  )
}
