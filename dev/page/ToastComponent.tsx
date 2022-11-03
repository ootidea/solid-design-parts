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

      <Sample id="duration" title="Duration" direction="horizontal">
        <Button onClick={() => showToast('2 sec.', 2000)}>2 sec.</Button>
        <Button onClick={() => showToast('4 sec.', 4000)}>4 sec.</Button>
        <Button onClick={() => showToast('Infinity', Infinity)}>Infinity</Button>
      </Sample>
    </article>
  )
}
