import { createSignal } from "solid-js";
import { Foldable } from "../../src/Foldable";
import { toLiteral } from "../other";
import { PageTitle } from "../PageTitle";
import { Sample } from "../Sample";

export function FoldableComponent() {
  const [unfolded, setUnfolded] = createSignal(false);

  return (
    <article>
      <PageTitle>Foldable</PageTitle>

      <Sample id="basic-example" title="Basic example">
        <Foldable title="Title">content</Foldable>
      </Sample>

      <Sample id="default-unfolded" title="Default unfolded">
        <Foldable title="Title" unfolded>
          content
        </Foldable>
      </Sample>

      <Sample id="bind-to-signal" title="Bind to signal">
        <Foldable title="Title" unfolded={unfolded()} onChangeUnfolded={setUnfolded}>
          content
        </Foldable>
        <div>unfolded() === {toLiteral(unfolded())}</div>
      </Sample>

      <Sample id="nested" title="Nested">
        <Foldable title="1" unfolded>
          <Foldable title="1.1">...</Foldable>
          <Foldable title="1.2">...</Foldable>
        </Foldable>
      </Sample>
    </article>
  );
}