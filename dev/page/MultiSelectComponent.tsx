import { createSignal } from "solid-js";
import { MultiSelect } from "../../src/MultiSelect";
import { PageTitle } from "../PageTitle";
import { Sample } from "../Sample";

export function MultiSelectComponent() {
  const [selected, setSelected] = createSignal({ Other: true }, { equals: false });

  return (
    <article>
      <PageTitle>MultiSelect</PageTitle>

      <Sample id="basic-example" title="Basic example">
        <MultiSelect values={["Female", "Male", "Other"]} />
      </Sample>

      <Sample id="placeholder" title="Placeholder">
        <MultiSelect values={["Female", "Male", "Other"]} placeholder="placeholder" />
      </Sample>

      <Sample id="change-titles" title="Change titles">
        <MultiSelect
          values={["dog", "cat", "rabbit"]}
          titles={{ dog: "🐶", cat: "😺", rabbit: "🐰" }}
        />
      </Sample>

      <Sample id="default-selected" title="Default selected">
        <MultiSelect values={["Female", "Male", "Other"]} selected={{ Female: true, Male: true }} />
      </Sample>

      <Sample id="bind-to-signal" title="Bind to signal">
        <MultiSelect
          values={["Female", "Male", "Other"]}
          selected={selected()}
          onChangeSelected={setSelected}
        />
        <div>JSON.stringify(selected()) === '{JSON.stringify(selected())}'</div>
      </Sample>

      <Sample id="disabled" title="Disabled" direction="horizontal">
        <MultiSelect values={["Female", "Male", "Other"]} placeholder="placeholder" disabled />
        <MultiSelect
          values={["Female", "Male", "Other"]}
          selected={{ Female: true, Male: true }}
          disabled
        />
      </Sample>

      <Sample id="search" title="Search">
        <MultiSelect
          showSearchBox
          values={[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ]}
        />
      </Sample>

      <Sample id="full-width" title="Full width">
        <MultiSelect fullWidth values={["Female", "Male", "Other"]} placeholder="placeholder" />
      </Sample>
    </article>
  );
}
