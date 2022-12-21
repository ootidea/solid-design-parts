import { Promisable } from 'base-up/dist/types/Promise'
import { createEffect, createSignal } from 'solid-js'
import css from './AutoSizeTextArea.scss'
import { createInjectableSignal, joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type AutoSizeTextAreaProps = Props<
  {
    value?: string
    errorMessage?: string | ((value: string) => Promisable<string | void | undefined>)
    forceValidation?: boolean
    onChangeValue?: (value: string) => void
    onChangeValidValue?: (value: string) => void
  },
  'textarea'
>

export function AutoSizeTextArea(rawProps: AutoSizeTextAreaProps) {
  const [props, restProps] = prepareProps(rawProps, { forceValidation: false }, [
    'value',
    'errorMessage',
    'onChangeValue',
  ])

  const [value, setValue] = createInjectableSignal(rawProps, 'value')
  function onChangeValue(value: string) {
    setValue(value)
    props.onChangeValue?.(value)
  }

  const [shouldValidate, setShouldValidate] = createInjectableSignal(props, 'forceValidation')

  const [errorMessage, setErrorMessage] = createSignal<string | undefined>()
  createEffect(async () => {
    if (props.errorMessage === undefined) {
      setErrorMessage(undefined)
    } else if (typeof props.errorMessage === 'string') {
      setErrorMessage(props.errorMessage)
    } else if (!shouldValidate()) {
      setErrorMessage(undefined)
    } else {
      const result = await props.errorMessage(value() ?? '')
      setErrorMessage(result ?? undefined)
    }
  })

  async function onInput(event: InputEvent) {
    setShouldValidate(true)
    if (event.target instanceof HTMLTextAreaElement) {
      const newValue = event.target.value
      onChangeValue(newValue)

      if (props.onChangeValidValue !== undefined) {
        if (typeof props.errorMessage === 'string' || (await props.errorMessage?.(newValue)) === undefined) {
          props.onChangeValidValue(newValue)
        }
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
          value={value() ?? ''}
          onInput={onInput}
          {...restProps}
        />
      </div>
      <p class="mantle-ui-AutoSizeTextArea_error-message">{errorMessage()}</p>
    </div>
  )
}
