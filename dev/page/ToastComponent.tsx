import { Button } from '../../src/Button'
import { showToast } from '../../src/Toasts'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function ToastComponent() {
  return (
    <article>
      <PageTitle>Toast</PageTitle>

      <Sample id="basic-example" title="Basic example" direction="horizontal">
        <Button onClick={() => showToast('message' + Math.random())}>Show toast</Button>
      </Sample>
    </article>
  )
}
