import { createSignal } from "solid-js";
import { Button } from "../../src/Button";
import { FadeAnimation } from "../../src/FadeAnimation";
import { PageTitle } from "../PageTitle";
import { Sample } from "../Sample";

export function FadeAnimationComponent() {
  const [shown, setShown] = createSignal(true);

  return (
    <article>
      <PageTitle>FadeAnimation</PageTitle>

      <Sample id="basic-example" title="Basic example">
        <Button onClick={() => setShown(!shown())}>Toggle</Button>
        <FadeAnimation shown={shown()}>
          <div>Content</div>
        </FadeAnimation>
      </Sample>

      <Sample id="control-by-laucher" title="Control by launcher">
        <FadeAnimation launcher={({ toggle }) => <Button onClick={toggle}>Toggle</Button>}>
          <div>Content</div>
        </FadeAnimation>
      </Sample>

      <Sample id="duration-of-animation" title="Duration of animation">
        <FadeAnimation
          options={1000}
          launcher={({ toggle }) => <Button onClick={toggle}>Toggle</Button>}
        >
          <div>Content</div>
        </FadeAnimation>
      </Sample>

      <Sample id="on-finish-animation" title="onFinishAnimation">
        <FadeAnimation
          onFinishAnimation={(type) => console.log(type)}
          launcher={({ toggle }) => <Button onClick={toggle}>Toggle</Button>}
        >
          <div>Content</div>
        </FadeAnimation>
      </Sample>
    </article>
  );
}
