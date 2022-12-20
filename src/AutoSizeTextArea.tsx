import css from './AutoSizeTextArea.scss'
import { createInjectableSignal, joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type AutoSizeTextAreaProps = Props<{ value?: string; onChangeValue?: (value: string) => void }, 'textarea'>

export function AutoSizeTextArea(rawProps: AutoSizeTextAreaProps) {
  const [props, restProps] = prepareProps(rawProps, {}, ['value', 'onChangeValue'])

  const [value, setValue] = createInjectableSignal(rawProps, 'value')

  function onChangeValue(value: string) {
    setValue(value)
    props.onChangeValue?.(value)
  }

  function onInput(event: InputEvent) {
    if (event.target instanceof HTMLTextAreaElement) {
      onChangeValue(event.target.value)
    }
  }

  const ZERO_WIDTH_SPACE = '\u200B'

  return (
    <div class="mantle-ui-AutoSizeTextArea_root" aria-disabled={props.disabled}>
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
  )
}
