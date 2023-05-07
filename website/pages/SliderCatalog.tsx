import { createRoot, createSignal } from 'solid-js'
import { Slider } from '../../library'
import { Catalog } from './ComponentCatalogPage'
import { createI18nGetters } from '../../library/utility/i18n'

const [value, setValue] = createSignal(0)

const i18nGetters = createI18nGetters({
  introduction: {
    default: (
      <>
        <code>Slider</code> is a component for inputting a numerical value within a certain range through intuitive
        interaction.
      </>
    ),
    ja: (
      <>
        <code>Slider</code>は直感的な操作で数値を入力できるコンポーネントです。
      </>
    ),
  },
  minimumAndMaximumValue: {
    default: 'Minimum and maximum value',
    ja: '最小値、最大値の設定',
  },
  discreteSliders: {
    default: 'Discrete slider',
    ja: '離散スライダー',
  },
  discreteSlidersDescription: {
    default: (
      <>
        Specifying <code>stops</code> or <code>steps</code> prop will make it a discrete slider.
      </>
    ),
    ja: (
      <>
        <code>stops</code>か<code>steps</code>を設定すると離散値のみ入力できる離散スライダーになります。
      </>
    ),
  },
  changingThumbSize: {
    default: 'Changing thumb size',
    ja: 'つまみ（thumb）のサイズを変更',
  },
})

export const SliderCatalog: Catalog = createRoot(() => ({
  introduction: <>{i18nGetters.introduction}</>,
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <Slider />
          <Slider value={0.5} />
          <Slider value={1} />
        </>
      ),
    },
    {
      title: <>{i18nGetters.minimumAndMaximumValue}</>,
      children: (
        <>
          <Slider min={-1} />
          <Slider max={100} value={30} />
          <Slider min={-2} max={2} value={0} />
        </>
      ),
    },
    {
      title: <>{i18nGetters.discreteSliders}</>,
      description: <>{i18nGetters.discreteSlidersDescription}</>,
      children: (
        <>
          <Slider stops={[25, 50, 75]} max={100} />
          <Slider step={0.1} max={10} />
          <Slider step={10} offset={3} max={50} />
        </>
      ),
    },
    {
      title: <>{i18nGetters.changingThumbSize}</>,
      children: (
        <>
          <Slider thumbWidth="5px" value={0.2} />
          <Slider thumbWidth="1.5rem" thumbHeight="1.5rem" value={0.3} />
        </>
      ),
    },
    {
      title: (
        <>
          Binding <code>value</code> to a signal
        </>
      ),
      children: (
        <>
          <Slider value={value()} onChangeValue={setValue} />
          <div>value: {value()}</div>
        </>
      ),
    },
  ],
}))
