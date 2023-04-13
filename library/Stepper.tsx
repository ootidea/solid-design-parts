import { rangeTo } from 'base-up'
import { For, JSX, Show } from 'solid-js'
import './common.scss'
import { Icon } from './Icon'
import checkIcon from './image/check.svg'
import './Stepper.scss'
import { joinClasses, prepareProps, Props } from './utility/props'

export type StepperProps = Props<{ titles: JSX.Element[]; currentStep: number }>

export function Stepper(rawProps: StepperProps) {
  const [props, restProps] = prepareProps(rawProps, {}, ['titles', 'currentStep'])

  return (
    <div
      {...restProps}
      class={joinClasses(rawProps, 'solid-design-parts-Stepper_root')}
      style={{ '--solid-design-parts-Stepper_circle-size': '2.5rem' }}
    >
      <div
        class="solid-design-parts-Stepper_diagram"
        style={{ 'grid-template-columns': `1fr ${props.titles.map(() => 'max-content').join(' 2fr ')} 1fr` }}
      >
        {/* dummy element for grid layout */}
        <div />
        <For each={rangeTo(props.titles.length)}>
          {(i) => (
            <>
              <Show when={i > 0}>
                <div
                  class="solid-design-parts-Stepper_line"
                  classList={{ 'solid-design-parts-Stepper_reached': i <= props.currentStep }}
                />
              </Show>
              <div
                class="solid-design-parts-Stepper_stop"
                classList={{
                  'solid-design-parts-Stepper_reached': i <= props.currentStep,
                }}
                aria-current={i === props.currentStep ? 'step' : false}
              >
                <Show when={i < props.currentStep} fallback={i + 1}>
                  <Icon src={checkIcon} color="currentColor" size="70%" />
                </Show>
              </div>
            </>
          )}
        </For>
        {/* dummy element for grid layout */}
        <div />
      </div>

      <div
        class="solid-design-parts-Stepper_titles-area"
        style={{ 'grid-template-columns': `repeat(${props.titles.length}, 1fr)` }}
      >
        <For each={props.titles}>
          {(title, i) => (
            <div
              class="solid-design-parts-Stepper_title"
              classList={{
                'solid-design-parts-Stepper_reached': i() <= props.currentStep,
              }}
              aria-current={i() === props.currentStep ? 'step' : false}
            >
              {title}
            </div>
          )}
        </For>
      </div>
    </div>
  )
}
