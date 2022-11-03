import { Button } from '../../src/Button'
import { showToast } from '../../src/Toasts'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function ToastComponent() {
  return (
    <article>
      <PageTitle>Toast</PageTitle>

      <Sample title="Basic example" direction="horizontal">
        <Button onClick={() => showToast('success', 'message' + Math.random())}>Success</Button>
        <Button color="error" onClick={() => showToast('error', 'message' + Math.random())}>
          Error
        </Button>
        <Button onClick={() => showToast('info', 'message' + Math.random())}>Info</Button>
      </Sample>

      <Sample title="Duration" direction="horizontal">
        <Button onClick={() => showToast('success', '2 sec.', 2000)}>2 sec.</Button>
        <Button onClick={() => showToast('success', '4 sec.', 4000)}>4 sec.</Button>
        <Button onClick={() => showToast('success', 'Infinity', Infinity)}>Infinity</Button>
      </Sample>
    </article>
  )
}
