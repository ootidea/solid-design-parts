import { createSignal, Show } from 'solid-js'
import css from './DateInput.scss'
import { DatePicker } from './DatePicker'
import { Gravity } from './Gravity'
import { Icon } from './Icon'
import calendarIcon from './image/calendar.svg'
import { Modal } from './Modal'
import { joinClasses, prepareProps, SkelProps, SlotProp } from './utility/props'
import { registerCss } from './utility/registerCss'
import { Slot } from './utility/Slot'

registerCss(css)

export type DateInputProps = SkelProps<{
  value?: Date | undefined
  placeholder?: string
  disabled?: boolean | ((date: Date) => boolean)
  onChangeValue?: ((value: Date) => void) | undefined
  format?: SlotProp<{ value: Date | undefined }>
}>

export function DateInput(rawProps: DateInputProps) {
  const [props, restProps] = prepareProps(rawProps, { disabled: false }, [
    'value',
    'placeholder',
    'onChangeValue',
    'format',
  ])
  const [value, setValue] = createSignal<Date | undefined>(props.value)

  const dummyDate = new Date(9999, 11, 29, 23, 59, 59, 999)

  return (
    <Modal
      launcher={({ toggle }) => (
        <button
          class={joinClasses(props, 'skel-DateInput_launcher')}
          type="button"
          disabled={props.disabled === true}
          onClick={(event) => {
            event.preventDefault()
            toggle()
          }}
          {...restProps}
        >
          <div class="skel-DateInput_preview-area">
            <Show when={value() !== undefined}>
              <div class="skel-DateInput_format">
                <Slot content={props.format} params={{ value: value() }}>
                  {value()!.toLocaleDateString()}
                </Slot>
              </div>
            </Show>
            <div class="skel-DateInput_placeholder" classList={{ 'skel-DateInput_invisible': value() !== undefined }}>
              {props.placeholder}
            </div>
            <div class="skel-DateInput_format skel-DateInput_invisible">
              {/* Intended to be the maximum rendering width */}
              <Slot content={props.format} params={{ value: dummyDate }}>
                {dummyDate.toLocaleDateString()}
              </Slot>
            </div>
          </div>
          <Gravity>
            <Icon class="skel-DateInput_icon" src={calendarIcon} size="1.3em" />
          </Gravity>
        </button>
      )}
    >
      {({ toggle }) => (
        <DatePicker
          class="skel-DateInput_date-picker"
          value={value()}
          disabled={props.disabled instanceof Function ? props.disabled : undefined}
          onChangeValue={(value) => {
            toggle()
            setValue(value)
            props.onChangeValue?.(value)
          }}
        />
      )}
    </Modal>
  )
}
