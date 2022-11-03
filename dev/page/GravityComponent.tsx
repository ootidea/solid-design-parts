import { Gravity } from '../../src/Gravity'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function GravityComponent() {
  return (
    <article>
      <PageTitle>Gravity</PageTitle>
      <Sample title="Basic example">
        <div style={{ width: '20rem', height: '10rem', border: '1px dashed gray' }}>
          <Gravity>center</Gravity>
        </div>
      </Sample>
    </article>
  )
}
