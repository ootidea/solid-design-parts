import { isInstanceOf } from 'base-up'
import { Promisable } from 'base-up/dist/types/Promise'
import { createRenderEffect, createSignal, untrack } from 'solid-js'
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
  function onChangeValue(value: string) {
    setValue(value)
    props.onChangeValue?.(value)
  }

  const [shouldValidate, setShouldValidate] = createInjectableSignal(props, 'validateInitialValue')

  const [errorMessage, setErrorMessage] = createSignal<string | undefined>()
  createRenderEffect(async () => {
    props.value

    if (typeof props.errorMessage === 'string') {
      setErrorMessage(props.errorMessage)
    } else if (!untrack(shouldValidate)) {
      setErrorMessage(undefined)
    } else {
      const result = await props.errorMessage?.(props.value)
      setErrorMessage(result ?? undefined)
    }
  })

  async function onInput(event: InputEvent) {
    setShouldValidate(true)

    if (!isInstanceOf(event.target, HTMLTextAreaElement)) return

    const newValue = event.target.value
    onChangeValue(newValue)

    if (typeof props.errorMessage === 'string') {
      setErrorMessage(props.errorMessage)
    } else {
      const result = await props.errorMessage?.(newValue)
      setErrorMessage(result ?? undefined)

      if (result === undefined) {
        props.onChangeValidValue?.(newValue)
      }
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
