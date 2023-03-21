import { rangeTo } from 'base-up'
import { For, Show } from 'solid-js'
import css from './Stepper.scss'
import { joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type StepperProps = Props<{ titles: string[]; currentStep: number }>

export function Stepper(rawProps: StepperProps) {
  const [props, restProps] = prepareProps(rawProps, {}, ['titles', 'currentStep'])

  return (
    <div
      class={joinClasses(rawProps, 'solid-design-parts-Stepper_root')}
      style={{ '--solid-design-parts-Stepper_circle-size': '2.5rem' }}
      {...restProps}
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
                class="solid-design-parts-Stepper_circle"
                classList={{
                  'solid-design-parts-Stepper_reached': i <= props.currentStep,
                }}
                aria-current={i === props.currentStep ? 'step' : false}
              >
                {i + 1}
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
