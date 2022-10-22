import { Tabs } from "../../src/Tabs";
import { PageTitle } from "../PageTitle";
import { Sample } from "../Sample";

export function TabsComponent() {
  return (
    <article>
      <PageTitle>Tabs</PageTitle>

      <Sample id="basic-example" title="Basic example">
        <Tabs names={["tab1", "tab2", "tab3"]}>
          {({ activeTab }) => <div style="padding: 2em">{activeTab}</div>}
        </Tabs>
        <Tabs type="Surrounded by border" names={["tab1", "tab2", "tab3"]}>
          {({ activeTab }) => <div style="padding: 2em">{activeTab}</div>}
        </Tabs>
        <Tabs type="Active underline" names={["tab1", "tab2", "tab3"]}>
          {({ activeTab }) => <div style="padding: 2em">{activeTab}</div>}
        </Tabs>
      </Sample>

      <Sample id="passive" title="Passive">
        <Tabs
          passive
          names={["tab1", "tab2", "tab3"]}
          onClickTab={(tabName) => console.log(tabName)}
        ></Tabs>
      </Sample>
    </article>
  );
}
