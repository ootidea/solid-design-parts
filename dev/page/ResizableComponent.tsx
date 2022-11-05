import { Image } from '../../src/Image'
import { Resizable } from '../../src/Resizable'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function ResizableComponent() {
  return (
    <article>
      <PageTitle>Resizable</PageTitle>

      <Sample title="Basic example">
        <Resizable>
          <div style={{ border: 'gray 1px dashed', padding: '1em' }}>Resizable div element example</div>
        </Resizable>
        <Resizable>
          <Image
            width="100%"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Polar_Bear_ANWR_1.jpg/320px-Polar_Bear_ANWR_1.jpg"
          />
        </Resizable>
      </Sample>
    </article>
  )
}
