import { For, JSX } from 'solid-js'
import { render } from 'solid-js/web'
import { createSignalObject } from 'solid-signal-object'
import './common.scss'
import { Toast, ToastProps } from './Toast'
import './Toasts.scss'

export type ToastOptions = Partial<Omit<ToastProps, 'type' | 'message'>>
type ToastModel = { id: symbol } & ToastProps
const toastModelsSignal = createSignalObject<ToastModel[]>([], { equals: false })

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

  if (
    toastModelsSignal.value.every((toastModel) => !Number.isFinite(toastModel.durationMs)) &&
    Number.isFinite(durationMs)
  ) {
    setTimeout(() => removeToast(newToastId), durationMs)
  }

  toastModelsSignal.update((toastModels) => {
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
  const index = toastModelsSignal.value.findIndex((model) => model.id === toastId)
  if (index === -1) return

  const isFirstFiniteToast =
    toastId === toastModelsSignal.value.find(({ durationMs }) => Number.isFinite(durationMs))?.id

  toastModelsSignal.update((toastModels) => {
    toastModels.splice(index, 1)

    if (toastModels.length === 0) {
      const toastsElement = document.querySelector('.solid-design-parts-Toasts_root')
      toastsElement?.remove()
    }

    return toastModels
  })

  if (isFirstFiniteToast) {
    const nextFiniteToast = toastModelsSignal.value.find(({ durationMs }) => Number.isFinite(durationMs))
    if (nextFiniteToast !== undefined) {
      setTimeout(() => removeToast(nextFiniteToast.id), nextFiniteToast.durationMs)
    }
  }
}

export function Toasts() {
  return (
    <div class="solid-design-parts-Toasts_root">
      <For each={toastModelsSignal.value}>{(toastModel) => <Toast {...toastModel} />}</For>
    </div>
  )
}
