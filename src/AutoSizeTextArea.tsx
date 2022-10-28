import { createEffect, createSignal } from 'solid-js'
import css from './AutoSizeTextArea.scss'
import { joinClasses, prepareProps, SkelProps } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type AutoSizeTextAreaProps = SkelProps<{ value?: string; onChangeValue?: (value: string) => void }, 'textarea'>

export function AutoSizeTextArea(rawProps: AutoSizeTextAreaProps) {
  const [props, restProps] = prepareProps(rawProps, {}, ['value', 'onChangeValue'])

  const [value, setValue] = createSignal(rawProps.value)
  createEffect(() => setValue(rawProps.value))

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
    <div class="skel-AutoSizeTextArea_root" classList={{ 'skel-AutoSizeTextArea_disabled': props.disabled }}>
      <div class="skel-AutoSizeTextArea_dummy" aria-hidden="true">
        {value() ? value() : rawProps.placeholder}
        {ZERO_WIDTH_SPACE}
      </div>
      <textarea
        class={joinClasses(rawProps, 'skel-AutoSizeTextArea_text-area')}
        attr:value={value()}
        onInput={onInput}
        {...restProps}
      />
    </div>
  )
}
