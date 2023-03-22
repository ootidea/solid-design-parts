import { Triangle } from '../../src/Triangle'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function TriangleComponent() {
  return (
    <article>
      <PageTitle>Triangle</PageTitle>

      <Sample title="Basic example" direction="horizontal">
        <Triangle height="1.4em" baseLength="2em" />
      </Sample>

      <Sample title="Color" direction="horizontal">
        <Triangle height="1.4em" baseLength="2em" color="hsl(0 0% 70%)" />
        <Triangle height="1.4em" baseLength="2em" color="lightgreen" />
      </Sample>

      <Sample title="Direction" direction="horizontal">
        <Triangle height="1.5em" baseLength="1.5em" color="gray" direction="right" />
        <Triangle height="1.5em" baseLength="1.5em" color="gray" direction="bottom" />
        <Triangle height="1.5em" baseLength="1.5em" color="gray" direction="left" />
      </Sample>
    </article>
  )
}
