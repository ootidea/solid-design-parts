import { For } from 'solid-js'
import { Scrollable } from '../../src/Scrollable'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function ScrollableComponent() {
  return (
    <article>
      <PageTitle>Scrollable</PageTitle>

      <Sample title="Basic example">
        <div style={{ height: '10rem', width: '100%' }}>
          <Scrollable>
            <For each={[...Array(10).keys()]}>{(i) => <p>{i}</p>}</For>
          </Scrollable>
        </div>
      </Sample>
    </article>
  )
}
