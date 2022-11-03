import { createSignal, For, JSX } from 'solid-js'
import { render } from 'solid-js/web'
import { Toast, ToastProps } from './Toast'
import css from './Toasts.scss'
import { registerCss } from './utility/registerCss'

registerCss(css)

type ToastModel = { id: symbol } & ToastProps
const [toastModels, setToastModels] = createSignal<ToastModel[]>([], { equals: false })

export function showToast(message: JSX.Element, durationMs: number = 3000) {
  const toasts = document.querySelector('.skel-Toasts_root')
  if (toasts === null) {
    render(() => <Toasts />, document.body)
  } else {
    // Move to the end of the body element so that it always appears at the top layer.
    document.body.appendChild(toasts)
  }

  const newToastId = Symbol()

  if (toastModels().every((toastModel) => !Number.isFinite(toastModel.durationMs)) && Number.isFinite(durationMs)) {
    setTimeout(() => removeToast(newToastId), durationMs)
  }

  setToastModels((toastModels) => {
    toastModels.push({ id: newToastId, message, durationMs })
    return toastModels
  })
}

function removeToast(toastId: symbol) {
  const index = toastModels().findIndex((model) => model.id === toastId)
  if (index === -1) return

  setToastModels((toastModels) => {
    toastModels.splice(index, 1)
    return toastModels
  })

  const nextFiniteToast = toastModels().find(({ durationMs }) => Number.isFinite(durationMs))
  if (nextFiniteToast !== undefined) {
    setTimeout(() => removeToast(nextFiniteToast.id), nextFiniteToast.durationMs)
  }
}

export function Toasts() {
  return (
    <div class="skel-Toasts_root">
      <For each={toastModels()}>{(toastModel) => <Toast {...toastModel} />}</For>
    </div>
  )
}
