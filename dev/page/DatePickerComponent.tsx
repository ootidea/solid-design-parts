import { createSignal } from "solid-js";
import { DatePicker } from "../../src/DatePicker";
import { toLiteral } from "../other";
import { PageTitle } from "../PageTitle";
import { Sample } from "../Sample";

export function DatePickerComponent() {
  const [value, setValue] = createSignal<Date | undefined>(undefined);

  return (
    <article>
      <PageTitle>DatePicker</PageTitle>

      <Sample id="basic-example" title="Basic example">
        <DatePicker />
      </Sample>

      <Sample id="specify-default-month" title="Specify default month">
        <DatePicker month={new Date(1999, 0)} />
      </Sample>

      <Sample id="specify-default-selected-date" title="Specify default selected date">
        <DatePicker value={new Date()} />
      </Sample>

      <Sample id="bind-to-signal" title="Bind to signal">
        <DatePicker value={value()} onChangeValue={setValue} />
        <div>value()?.toLocaleDateString() === {toLiteral(value()?.toLocaleDateString())}</div>
      </Sample>

      <Sample id="disabled" title="Disabled">
        <DatePicker disabled={(date) => date.getTime() < Date.now()} />
      </Sample>
    </article>
  );
}
