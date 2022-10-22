import { createSignal } from "solid-js";
import { AutoSizeTextArea } from "../../src/AutoSizeTextArea";
import { PageTitle } from "../PageTitle";
import { Sample } from "../Sample";

export function AutoSizeTextAreaComponent() {
  const [value, setValue] = createSignal("default value");

  return (
    <article>
      <PageTitle>AutoSizeTextArea</PageTitle>

      <Sample id="basic-example" title="Basic example">
        <AutoSizeTextArea />
      </Sample>

      <Sample id="placeholder" title="Placeholder">
        <AutoSizeTextArea placeholder="placeholder" />
      </Sample>

      <Sample id="default-value" title="Default value">
        <AutoSizeTextArea value="default value" />
      </Sample>

      <Sample id="bind-to-signal" title="Bind to signal">
        <AutoSizeTextArea value={value()} onChangeValue={setValue} />
        <div style={{ "white-space": "pre-wrap" }}>value() === `{value()}`</div>
      </Sample>

      <Sample id="disabled" title="Disabled">
        <AutoSizeTextArea placeholder="placeholder" disabled />
        <AutoSizeTextArea value="default value" disabled />
      </Sample>
    </article>
  );
}
