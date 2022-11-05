import { StretchLayout } from '../../src/StretchLayout'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function StretchLayoutComponent() {
  return (
    <article>
      <PageTitle>StretchLayout</PageTitle>

      <Sample title="Basic example">
        <StretchLayout>
          <div style={{ padding: '3em', border: '1px dashed gray' }}>area1</div>
          <div style={{ padding: '3em', border: '1px solid gray' }}>area2</div>
        </StretchLayout>
      </Sample>

      <Sample title="Negative index">
        <StretchLayout stretchAt={-1}>
          <div style={{ padding: '3em', border: '1px solid gray' }}>area1</div>
          <div style={{ padding: '3em', border: '1px solid gray' }}>area2</div>
          <div style={{ padding: '3em', border: '1px dashed gray' }}>area3</div>
        </StretchLayout>
      </Sample>
    </article>
  )
}
