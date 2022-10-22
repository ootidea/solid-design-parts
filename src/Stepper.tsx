import { For } from "solid-js";
import { Gravity } from "./Gravity";
import { LayerLayout } from "./LayerLayout";
import css from "./Stepper.scss";
import { until } from "./utility/others";
import { joinClasses, prepareProps, SkelProps } from "./utility/props";
import { registerCss } from "./utility/registerCss";

registerCss(css);

export type StepperProps = SkelProps<{ titles: string[]; currentStep: number }>;

export function Stepper(rawProps: StepperProps) {
  const [props, restProps] = prepareProps(rawProps, {}, ["titles", "currentStep"]);

  return (
    <div
      class={joinClasses(rawProps, "skel-Stepper_root")}
      style={{ "--skel-Stepper_circle-size": "2.5rem" }}
      {...restProps}
    >
      <LayerLayout style={{ width: "100%" }}>
        <div
          class="skel-Stepper_line-layer"
          style={{ "grid-template-columns": `1fr repeat(${props.titles.length - 1}, 2fr) 1fr` }}
        >
          <div />
          <For each={until(props.titles.length - 1)}>
            {(i) => (
              <div
                class="skel-Stepper_line"
                classList={{ "skel-Stepper_reached": i < props.currentStep }}
              />
            )}
          </For>
          <div />
        </div>
        <div
          class="skel-Stepper_circle-layer"
          style={{ "grid-template-columns": `repeat(${props.titles.length}, 1fr)` }}
        >
          <For each={until(props.titles.length)}>
            {(i) => (
              <Gravity>
                <div
                  class="skel-Stepper_circle"
                  classList={{
                    "skel-Stepper_past-step": i < props.currentStep,
                    "skel-Stepper_current-step": i === props.currentStep,
                    "skel-Stepper_future-step": i > props.currentStep,
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
        class="skel-Stepper_titles-area"
        style={{ "grid-template-columns": `repeat(${props.titles.length}, 1fr)` }}
      >
        <For each={props.titles}>
          {(title, i) => (
            <div
              class="skel-Stepper_title"
              classList={{
                "skel-Stepper_past-step": i() < props.currentStep,
                "skel-Stepper_current-step": i() === props.currentStep,
                "skel-Stepper_future-step": i() > props.currentStep,
              }}
            >
              {title}
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
