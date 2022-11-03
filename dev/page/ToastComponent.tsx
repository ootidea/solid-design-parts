import { Button } from '../../src/Button'
import { showToast } from '../../src/Toasts'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function ToastComponent() {
  return (
    <article>
      <PageTitle>Toast</PageTitle>

      <Sample title="Basic example" direction="horizontal">
        <Button onClick={() => showToast('success', 'message' + Math.random())}>Show success toast</Button>
        <Button color="error" onClick={() => showToast('error', 'message' + Math.random())}>
          Show error toast
        </Button>
        <Button onClick={() => showToast('info', 'message' + Math.random())}>Show info toast</Button>
      </Sample>

      <Sample title="Duration" direction="horizontal">
        <Button onClick={() => showToast('success', '2 sec.', 2000)}>2 sec.</Button>
        <Button onClick={() => showToast('success', '4 sec.', 4000)}>4 sec.</Button>
        <Button onClick={() => showToast('success', 'Infinity', Infinity)}>Infinity</Button>
      </Sample>
    </article>
  )
}
