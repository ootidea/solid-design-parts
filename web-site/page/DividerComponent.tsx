import { Divider } from '../../src/Divider'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function DividerComponent() {
  return (
    <article>
      <PageTitle>Divider</PageTitle>

      <Sample title="Basic example">
        <Divider />
      </Sample>

      <Sample title="Vertical divider">
        <div style="height: 100px; width: 100%; display: flex; justify-content: space-evenly;">
          <Divider direction="vertical" />
          <Divider direction="vertical" />
          <Divider direction="vertical" />
        </div>
      </Sample>

      <Sample title="Color">
        <Divider color="green" />
        <Divider color="hsl(0 0% 0%)" />
        <Divider color="linear-gradient(to right, red, blue)" />
      </Sample>

      <Sample title="Thickness">
        <Divider thickness="1px" />
        <Divider thickness="0.2em" />
        <Divider thickness="0.5rem" />
      </Sample>
    </article>
  )
}
