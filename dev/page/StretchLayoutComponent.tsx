import { StretchLayout } from '../../src/StretchLayout'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function StretchLayoutComponent() {
  return (
    <article>
      <PageTitle>StretchLayout</PageTitle>

      <Sample title="Basic example">
        <StretchLayout>
          <div style={{ padding: '3em', border: '1px solid gray' }}>Flexible area</div>
          <div style={{ padding: '3em', border: '1px dashed gray' }}>Fixed area</div>
        </StretchLayout>
      </Sample>

      <Sample title="Negative index">
        <StretchLayout stretchAt={-1}>
          <div style={{ padding: '3em', border: '1px dashed gray' }}>Fixed area</div>
          <div style={{ padding: '3em', border: '1px dashed gray' }}>Fixed area</div>
          <div style={{ padding: '3em', border: '1px solid gray' }}>Flexible area</div>
        </StretchLayout>
      </Sample>
    </article>
  )
}
