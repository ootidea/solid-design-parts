import { StretchLayout } from "../../src/StretchLayout";
import { PageTitle } from "../PageTitle";
import { Sample } from "../Sample";

export function StretchLayoutComponent() {
  return (
    <article>
      <PageTitle>StretchLayout</PageTitle>

      <Sample id="basic-example" title="Basic example">
        <StretchLayout>
          <div style={{ padding: "3em", border: "gray 1px dashed" }}>area1</div>
          <div style={{ padding: "3em", border: "gray 1px solid" }}>area2</div>
        </StretchLayout>
      </Sample>

      <Sample id="negative-index" title="Negative index">
        <StretchLayout stretchAt={-1}>
          <div style={{ padding: "3em", border: "gray 1px solid" }}>area1</div>
          <div style={{ padding: "3em", border: "gray 1px solid" }}>area2</div>
          <div style={{ padding: "3em", border: "gray 1px dashed" }}>area3</div>
        </StretchLayout>
      </Sample>
    </article>
  );
}
