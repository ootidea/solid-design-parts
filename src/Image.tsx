import { createSignal, Show } from "solid-js";
import css from "./Image.scss";
import { joinClasses, prepareProps, SkelProps, SkelSlot } from "./utility/props";
import { registerCss } from "./utility/registerCss";
import { Slot } from "./utility/Slot";

registerCss(css);

export type ImageProps = SkelProps<
  {
    alt?: string;
    fallback?: SkelSlot<{}>;
    onLoad?: (event: Event) => void;
    onError?: (event: Event) => void;
  },
  "img"
>;

type LoadingState = "loading" | "complete" | "failed";

export function Image(rawProps: ImageProps) {
  const [props, restProps] = prepareProps(rawProps, { alt: "" }, ["fallback", "onLoad", "onError"]);

  const [loadingState, setLoadingState] = createSignal<LoadingState>("loading");

  function onLoad(event: Event) {
    setLoadingState("complete");
    props.onLoad?.(event);
  }

  function onError(event: Event) {
    setLoadingState("failed");
    props.onError?.(event);
  }

  return (
    <Show
      when={loadingState() === "failed" && props.fallback}
      fallback={
        <img
          class={joinClasses(rawProps, "skel-Image_root")}
          alt={props.alt}
          onLoad={onLoad}
          onError={onError}
          {...restProps}
        />
      }
    >
      <Slot content={props.fallback} params={{}} />
    </Show>
  );
}
