import { createSignal } from 'solid-js'
import { Image } from '../../src/Image'
import { Resizable } from '../../src/Resizable'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function ResizableComponent() {
  const [widthPx, setWidthPx] = createSignal(500)

  return (
    <article>
      <PageTitle>Resizable</PageTitle>

      <Sample title="Basic example">
        <Resizable>
          <div style={{ border: '1px dashed gray', padding: '1em' }}>Resizable div element example</div>
        </Resizable>
        <Resizable>
          <Image
            width="100%"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Polar_Bear_ANWR_1.jpg/320px-Polar_Bear_ANWR_1.jpg"
          />
        </Resizable>
      </Sample>

      <Sample title="Bind to signal">
        <Resizable onChangeWidthPx={setWidthPx}>
          <div
            style={{ width: `${widthPx()}px`, border: '1px dashed gray', padding: '1em', 'box-sizing': 'border-box' }}
          >
            widthPx() === {widthPx()}
          </div>
        </Resizable>
      </Sample>
    </article>
  )
}
