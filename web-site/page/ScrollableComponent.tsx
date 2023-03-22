import { For } from 'solid-js'
import { Image } from '../../src/Image'
import { Scrollable } from '../../src/Scrollable'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function ScrollableComponent() {
  return (
    <article>
      <PageTitle>Scrollable</PageTitle>

      <Sample title="Basic example">
        <div style={{ height: '10rem' }}>
          <Scrollable>
            <For each={[...Array(10).keys()]}>{(i) => <p>{i}</p>}</For>
          </Scrollable>
        </div>

        <div style={{ height: '7rem', width: 'max-content' }}>
          <Scrollable>
            <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Polar_Bear_ANWR_1.jpg/320px-Polar_Bear_ANWR_1.jpg" />
          </Scrollable>
        </div>
      </Sample>
    </article>
  )
}
