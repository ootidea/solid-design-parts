import { Spinner } from '../../src/Spinner'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function SpinnerComponent() {
  return (
    <article>
      <PageTitle>Spinner</PageTitle>

      <Sample id="basic-example" title="Basic example" direction="horizontal">
        <Spinner />
      </Sample>

      <Sample id="size" title="Size" direction="horizontal">
        <Spinner size="10px" />
        <Spinner size="1em" />
        <Spinner size="2rem" />
      </Sample>

      <Sample
        id="frequency"
        title="Frequency"
        description="Change the number of rotations per seconds."
        direction="horizontal"
      >
        <Spinner frequency={0.7} />
        <Spinner frequency={1.4} />
        <Spinner frequency={2.1} />
        <Spinner frequency={2.8} />
      </Sample>

      <Sample id="thickness" title="Thickness" direction="horizontal">
        <Spinner thickness={10} />
        <Spinner thickness={25} />
        <Spinner thickness={50} />
        <Spinner thickness={80} />
      </Sample>

      <Sample id="color" title="Color" direction="horizontal">
        <Spinner color="currentColor" />
        <Spinner color="green" />
        <Spinner color="hsl(0 90% 50%)" />
      </Sample>
    </article>
  )
}
