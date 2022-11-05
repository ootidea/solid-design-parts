import { createSignal, For, JSX } from 'solid-js'
import { render } from 'solid-js/web'
import { Toast, ToastProps } from './Toast'
import css from './Toasts.scss'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type ToastOptions = Partial<Omit<ToastProps, 'type' | 'message'>>
type ToastModel = { id: symbol } & ToastProps
const [toastModels, setToastModels] = createSignal<ToastModel[]>([], { equals: false })

export function showToast(type: ToastProps['type'], message: JSX.Element, options?: ToastOptions) {
  const durationMs: number = options?.durationMs ?? 3000

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
    toastModels.push({
      id: newToastId,
      type,
      message,
      durationMs,
      onClick: options?.onClick,
      close: () => removeToast(newToastId),
    })
    return toastModels
  })
}

function removeToast(toastId: symbol) {
  const index = toastModels().findIndex((model) => model.id === toastId)
  if (index === -1) return

  const isFirstFiniteToast = toastId === toastModels().find(({ durationMs }) => Number.isFinite(durationMs))?.id

  setToastModels((toastModels) => {
    toastModels.splice(index, 1)
    return toastModels
  })

  if (isFirstFiniteToast) {
    const nextFiniteToast = toastModels().find(({ durationMs }) => Number.isFinite(durationMs))
    if (nextFiniteToast !== undefined) {
      setTimeout(() => removeToast(nextFiniteToast.id), nextFiniteToast.durationMs)
    }
  }
}

export function Toasts() {
  return (
    <div class="skel-Toasts_root">
      <For each={toastModels()}>{(toastModel) => <Toast {...toastModel} />}</For>
    </div>
  )
}
