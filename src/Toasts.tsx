import { For, JSX } from 'solid-js'
import { render } from 'solid-js/web'
import { createSignalObject } from 'solid-signal-object'
import { Toast, ToastProps } from './Toast'
import css from './Toasts.scss'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type ToastOptions = Partial<Omit<ToastProps, 'type' | 'message'>>
type ToastModel = { id: symbol } & ToastProps
const toastModels = createSignalObject<ToastModel[]>([], { equals: false })

export function showToast(type: ToastProps['type'], message: JSX.Element, options?: ToastOptions) {
  const durationMs: number = options?.durationMs ?? 3000

  const toasts = document.querySelector('.solid-design-parts-Toasts_root')
  if (toasts === null) {
    render(() => <Toasts />, document.body)
  } else {
    // Move to the end of the body element so that it always appears at the top layer.
    document.body.appendChild(toasts)
  }

  const newToastId = Symbol()

  if (toastModels.value.every((toastModel) => !Number.isFinite(toastModel.durationMs)) && Number.isFinite(durationMs)) {
    setTimeout(() => removeToast(newToastId), durationMs)
  }

  toastModels.update((toastModels) => {
    toastModels.push({
      ...options,
      id: newToastId,
      type,
      message,
      durationMs,
      close: () => removeToast(newToastId),
    })
    return toastModels
  })
}

function removeToast(toastId: symbol) {
  const index = toastModels.value.findIndex((model) => model.id === toastId)
  if (index === -1) return

  const isFirstFiniteToast = toastId === toastModels.value.find(({ durationMs }) => Number.isFinite(durationMs))?.id

  toastModels.update((toastModels) => {
    toastModels.splice(index, 1)
    return toastModels
  })

  if (isFirstFiniteToast) {
    const nextFiniteToast = toastModels.value.find(({ durationMs }) => Number.isFinite(durationMs))
    if (nextFiniteToast !== undefined) {
      setTimeout(() => removeToast(nextFiniteToast.id), nextFiniteToast.durationMs)
    }
  }
}

export function Toasts() {
  return (
    <div class="solid-design-parts-Toasts_root">
      <For each={toastModels.value}>{(toastModel) => <Toast {...toastModel} />}</For>
    </div>
  )
}
