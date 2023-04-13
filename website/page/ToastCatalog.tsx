import { createRoot } from 'solid-js'
import { Button } from '../../library/Button'
import { showToast } from '../../library/Toasts'
import { Catalog } from './ComponentCatalogPage'

export const ToastCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      direction: 'horizontal',
      children: (
        <>
          <Button onClick={() => showToast('success', 'message' + Math.random())}>Success</Button>
          <Button color="error" onClick={() => showToast('error', 'message' + Math.random())}>
            Error
          </Button>
          <Button onClick={() => showToast('info', 'message' + Math.random())}>Info</Button>
        </>
      ),
    },
    {
      title: 'Duration',
      direction: 'horizontal',
      children: (
        <>
          <Button onClick={() => showToast('success', '2 sec.', { durationMs: 2000 })}>2 sec.</Button>
          <Button onClick={() => showToast('success', '4 sec.', { durationMs: 4000 })}>4 sec.</Button>
          <Button onClick={() => showToast('success', 'Infinity', { durationMs: Infinity })}>Infinity</Button>
        </>
      ),
    },
    {
      title: 'href',
      direction: 'horizontal',
      children: (
        <>
          <Button onClick={() => showToast('info', 'Check website', { href: 'https://www.solidjs.com/' })}>
            Show link toast
          </Button>
        </>
      ),
    },
  ],
}))
