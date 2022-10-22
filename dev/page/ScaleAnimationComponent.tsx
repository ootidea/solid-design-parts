import { createSignal } from "solid-js";
import { Button } from "../../src/Button";
import { ScaleAnimation } from "../../src/ScaleAnimation";
import { PageTitle } from "../PageTitle";
import { Sample } from "../Sample";

export function ScaleAnimationComponent() {
  const [shown, setShown] = createSignal(true);

  return (
    <article>
      <PageTitle>ScaleAnimation</PageTitle>

      <Sample id="basic-example" title="Basic example">
        <Button onClick={() => setShown(!shown())}>Toggle</Button>
        <ScaleAnimation shown={shown()}>
          <span>Content</span>
        </ScaleAnimation>
      </Sample>

      <Sample id="control-by-laucher" title="Control by launcher">
        <ScaleAnimation launcher={({ toggle }) => <Button onClick={toggle}>Toggle</Button>}>
          <div>Content</div>
        </ScaleAnimation>
      </Sample>

      <Sample id="duration-of-animation" title="Duration of animation">
        <ScaleAnimation
          options={1000}
          launcher={({ toggle }) => <Button onClick={toggle}>Toggle</Button>}
        >
          <div>Content</div>
        </ScaleAnimation>
      </Sample>

      <Sample id="on-finish-animation" title="onFinishAnimation">
        <ScaleAnimation
          onFinishAnimation={(type) => console.log(type)}
          launcher={({ toggle }) => <Button onClick={toggle}>Toggle</Button>}
        >
          <div>Content</div>
        </ScaleAnimation>
      </Sample>
    </article>
  );
}
