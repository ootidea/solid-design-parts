import { rangeTo } from 'base-up'
import { For } from 'solid-js'
import { Gravity } from './Gravity'
import { LayerLayout } from './LayerLayout'
import css from './Stepper.scss'
import { joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type StepperProps = Props<{ titles: string[]; currentStep: number }>

export function Stepper(rawProps: StepperProps) {
  const [props, restProps] = prepareProps(rawProps, {}, ['titles', 'currentStep'])

  return (
    <div
      class={joinClasses(rawProps, 'mantle-ui-Stepper_root')}
      style={{ '--mantle-ui-Stepper_circle-size': '2.5rem' }}
      {...restProps}
    >
      <LayerLayout style={{ width: '100%' }}>
        <div
          class="mantle-ui-Stepper_line-layer"
          style={{ 'grid-template-columns': `1fr repeat(${props.titles.length - 1}, 2fr) 1fr` }}
        >
          <div />
          <For each={rangeTo(props.titles.length - 1)}>
            {(i) => (
              <div class="mantle-ui-Stepper_line" classList={{ 'mantle-ui-Stepper_reached': i < props.currentStep }} />
            )}
          </For>
          <div />
        </div>
        <div
          class="mantle-ui-Stepper_circle-layer"
          style={{ 'grid-template-columns': `repeat(${props.titles.length}, 1fr)` }}
        >
          <For each={rangeTo(props.titles.length)}>
            {(i) => (
              <Gravity>
                <div
                  class="mantle-ui-Stepper_circle"
                  classList={{
                    'mantle-ui-Stepper_past-step': i < props.currentStep,
                    'mantle-ui-Stepper_current-step': i === props.currentStep,
                    'mantle-ui-Stepper_future-step': i > props.currentStep,
                  }}
                >
                  {i + 1}
                </div>
              </Gravity>
            )}
          </For>
        </div>
      </LayerLayout>
      <div
        class="mantle-ui-Stepper_titles-area"
        style={{ 'grid-template-columns': `repeat(${props.titles.length}, 1fr)` }}
      >
        <For each={props.titles}>
          {(title, i) => (
            <div
              class="mantle-ui-Stepper_title"
              classList={{
                'mantle-ui-Stepper_past-step': i() < props.currentStep,
                'mantle-ui-Stepper_current-step': i() === props.currentStep,
                'mantle-ui-Stepper_future-step': i() > props.currentStep,
              }}
            >
              {title}
            </div>
          )}
        </For>
      </div>
    </div>
  )
}
