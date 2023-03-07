import { isInstanceOf } from 'base-up'
import { Promisable } from 'base-up/dist/types/Promise'
import { createMemo, createRenderEffect, createSignal, on, untrack } from 'solid-js'
import css from './AutoSizeTextArea.scss'
import { createInjectableSignal, joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type AutoSizeTextAreaProps = Props<
  {
    value?: string
    errorMessage?: string | ((value: string) => Promisable<string | void>)
    validateInitialValue?: boolean
    onChangeValue?: (value: string) => void
    onChangeValidValue?: (value: string) => void
  },
  'textarea'
>

export function AutoSizeTextArea(rawProps: AutoSizeTextAreaProps) {
  const [props, restProps] = prepareProps(rawProps, { value: '', validateInitialValue: false }, [
    'errorMessage',
    'onChangeValue',
  ])

  const [value, setValue] = createInjectableSignal(props, 'value')

  const [isEdited, setEdited] = createSignal(false)
  const shouldValidate = createMemo(() => isEdited() || props.validateInitialValue)

  const [errorMessage, setErrorMessage] = createSignal<string | undefined>()
  createRenderEffect(async () => {
    setErrorMessage(await deriveErrorMessage(shouldValidate(), untrack(value), props.errorMessage))
  })
  createRenderEffect(
    on(
      () => props.value,
      async () => {
        setErrorMessage(await deriveErrorMessage(shouldValidate(), props.value, props.errorMessage))
      },
      { defer: true }
    )
  )

  async function onInput(event: InputEvent) {
    setEdited(true)

    if (!isInstanceOf(event.target, HTMLTextAreaElement)) return

    const newValue = event.target.value
    setValue(newValue)
    props.onChangeValue?.(newValue)

    const nextErrorMessage = await deriveErrorMessage(shouldValidate(), newValue, props.errorMessage)
    setErrorMessage(nextErrorMessage)
    if (nextErrorMessage === undefined) {
      props.onChangeValidValue?.(newValue)
    }
  }

  async function deriveErrorMessage(
    shouldValidate: boolean,
    value: string,
    errorMessage: AutoSizeTextAreaProps['errorMessage']
  ): Promise<string | undefined> {
    if (typeof errorMessage === 'string') {
      return errorMessage
    } else if (!shouldValidate) {
      return undefined
    } else {
      const result = await errorMessage?.(value)
      return result ?? undefined
    }
  }

  const ZERO_WIDTH_SPACE = '\u200B'

  return (
    <div
      class="mantle-ui-AutoSizeTextArea_root"
      aria-disabled={props.disabled}
      aria-invalid={errorMessage() !== undefined}
    >
      <div class="mantle-ui-AutoSizeTextArea_body">
        <div class="mantle-ui-AutoSizeTextArea_dummy" aria-hidden="true">
          {value() ? value() : rawProps.placeholder}
          {ZERO_WIDTH_SPACE}
        </div>
        <textarea
          class={joinClasses(rawProps, 'mantle-ui-AutoSizeTextArea_text-area')}
          value={value()}
          onInput={onInput}
          {...restProps}
        />
      </div>
      <p class="mantle-ui-AutoSizeTextArea_error-message">{errorMessage()}</p>
    </div>
  )
}
