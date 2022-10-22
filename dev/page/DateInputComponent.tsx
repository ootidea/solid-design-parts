import { createSignal } from "solid-js";
import { DateInput } from "../../src/DateInput";
import { toLiteral } from "../other";
import { PageTitle } from "../PageTitle";
import { Sample } from "../Sample";

export function DateInputComponent() {
  const [value, setValue] = createSignal(new Date());

  return (
    <article>
      <PageTitle>DateInput</PageTitle>

      <Sample id="basic-example" title="Basic example" direction="horizontal">
        <DateInput />
      </Sample>

      <Sample id="placeholder" title="Placeholder" direction="horizontal">
        <DateInput placeholder="placeholder" />
        <DateInput placeholder="a little long placeholder" />
      </Sample>

      <Sample id="default-value" title="Default value" direction="horizontal">
        <DateInput value={new Date()} />
      </Sample>

      <Sample id="bind-to-signal" title="Bind to signal">
        <DateInput value={value()} onChangeValue={setValue} />
        <div>value()?.toLocaleDateString() === {toLiteral(value()?.toLocaleDateString())}</div>
      </Sample>

      <Sample id="disabled" title="Disabled" direction="horizontal">
        <DateInput placeholder="placeholder" disabled />
        <DateInput value={new Date()} disabled />
      </Sample>

      <Sample id="disable-by-date" title="Disable by date" direction="horizontal">
        <DateInput disabled={(date) => date.getTime() < Date.now()} />
      </Sample>

      <Sample id="change-date-format" title="Change date format" direction="horizontal">
        <DateInput format={({ value }) => value?.toISOString()} />
      </Sample>
    </article>
  );
}
