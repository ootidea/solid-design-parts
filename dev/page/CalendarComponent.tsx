import { createSignal } from "solid-js";
import { Button } from "../../src/Button";
import { Calendar } from "../../src/Calendar";
import { PageTitle } from "../PageTitle";
import { Sample } from "../Sample";

export function CalendarComponent() {
  const [date, setDate] = createSignal(new Date(), { equals: false });

  return (
    <article>
      <PageTitle>Calendar</PageTitle>

      <Sample id="basic-example" title="Basic example">
        <Calendar />
      </Sample>

      <Sample id="specify-default-month" title="Specify default month">
        <Calendar month={new Date(1999, 0)} />
      </Sample>

      <Sample id="bind-to-signal" title="Bind to signal">
        <Calendar month={date()} onChangeMonth={setDate} />
        <Button onClick={() => setDate(new Date(2 * date().getTime()))}>Change month</Button>
      </Sample>

      <Sample id="hide-month-move-buttons" title="Hide month move buttons">
        <Calendar hideMonthMoveButton />
      </Sample>

      <Sample id="overwrite-cell" title="Overwrite cell">
        <Calendar>{({ date }) => String(date.getDate()).padStart(2, "0")}</Calendar>
      </Sample>

      <Sample id="hide-dates-in-other-months" title="Hide dates in other months">
        <Calendar class="hide-dates-in-other-months" />
        <style>{`
          .hide-dates-in-other-months .skel-Calendar_cell.skel-Calendar_other-month {
            visibility: hidden;
          }
        `}</style>
      </Sample>
    </article>
  );
}
