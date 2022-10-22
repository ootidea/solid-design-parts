import { createSignal } from "solid-js";
import { Checkbox } from "../../src/Checkbox";
import { PageTitle } from "../PageTitle";
import { Sample } from "../Sample";

export function CheckboxComponent() {
  const [checked, setChecked] = createSignal(true);

  return (
    <article>
      <PageTitle>Checkbox</PageTitle>

      <Sample id="basic-example" title="Basic example" direction="horizontal">
        <Checkbox>Agree</Checkbox>
        <Checkbox>Accept</Checkbox>
      </Sample>

      <Sample id="default-checked" title="Default checked">
        <Checkbox checked>Agree</Checkbox>
      </Sample>

      <Sample id="bind-to-signal" title="Bind to signal">
        <Checkbox checked={checked()} onChangeChecked={setChecked}>
          Agree
        </Checkbox>
        <div>checked() === {String(checked())}</div>
      </Sample>

      <Sample id="disabled" title="Disabled" direction="horizontal">
        <Checkbox disabled>Agree</Checkbox>
        <Checkbox checked disabled>
          Accept
        </Checkbox>
      </Sample>

      <Sample id="size" title="Size" direction="horizontal">
        <Checkbox style="font-size: 14px" checked>
          14px
        </Checkbox>
        <Checkbox style="font-size: 16px" checked>
          16px
        </Checkbox>
        <Checkbox style="font-size: 18px" checked>
          18px
        </Checkbox>
      </Sample>
    </article>
  );
}
