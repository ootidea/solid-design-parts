import { JSX, Show } from 'solid-js'
import { Gravity } from './Gravity'
import { StretchLayout } from './StretchLayout'
import css from './TextInput.scss'
import { LiteralUnion } from './utility/others'
import { joinClasses, prepareProps, SkelProps } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type TextInputProps = SkelProps<{
  value?: string
  placeholder?: string
  type?: LiteralUnion<
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
  >
  disabled?: boolean
  prepend?: JSX.Element
  append?: JSX.Element
  tailButtonContent?: JSX.Element
  headButtonContent?: JSX.Element
  onChangeValue?: (value: string) => void
  onClickHeadButton?: (event: MouseEvent) => unknown
  onClickTailButton?: (event: MouseEvent) => unknown
}>

export function TextInput(rawProps: TextInputProps) {
  const [props, restProps] = prepareProps(rawProps, { disabled: false }, [
    'value',
    'placeholder',
    'type',
    'prepend',
    'append',
    'headButtonContent',
    'tailButtonContent',
    'onChangeValue',
    'onClickHeadButton',
    'onClickTailButton',
  ])

  function onInput(event: InputEvent) {
    if (event.target instanceof HTMLInputElement) {
      props.onChangeValue?.(event.target.value)
    }
  }

  return (
    <div
      class={joinClasses(rawProps, 'skel-TextInput_root', {
        'skel-TextInput_has-head-button': props.headButtonContent !== undefined,
        'skel-TextInput_has-tail-button': props.tailButtonContent !== undefined,
      })}
      aria-disabled={props.disabled}
      {...restProps}
    >
      <div class="skel-TextInput_head-area">
        <Show when={props.headButtonContent !== undefined}>
          <button class="skel-TextInput_head-button" type="button" onClick={props.onClickHeadButton}>
            {props.headButtonContent}
          </button>
        </Show>
      </div>
      <StretchLayout class="skel-TextInput_body" stretchAt={1}>
        <Gravity class="skel-TextInput_prepend">{rawProps.prepend}</Gravity>
        <input
          class="skel-TextInput_input"
          attr:value={props.value}
          placeholder={props.placeholder}
          type={props.type}
          disabled={props.disabled}
          onInput={onInput}
        />
        <Gravity class="skel-TextInput_append">{rawProps.append}</Gravity>
      </StretchLayout>
      <div class="skel-TextInput_tail-area">
        <Show when={props.tailButtonContent !== undefined}>
          <button class="skel-TextInput_tail-button" type="button" onClick={props.onClickTailButton}>
            {props.tailButtonContent}
          </button>
        </Show>
      </div>
    </div>
  )
}
