import { createRoot, createSignal } from 'solid-js'
import { Slider } from '../../library'
import { Catalog } from './ComponentCatalogPage'

const [value, setValue] = createSignal(0)

export const SliderCatalog: Catalog = createRoot(() => ({
  introduction: {
    default: (
      <>
        <code>Slider</code> is a component for inputting a numerical value within a certain range through intuitive
        interaction.
      </>
    ),
    ja: (
      <>
        <code>Slider</code>は一定範囲内の数値を直感的な操作で入力できるコンポーネントです。
      </>
    ),
  },
  samples: [
    {
      title: { default: 'Basic example', ja: '基本例' },
      children: (
        <>
          <Slider />
          <Slider value={0.5} />
          <Slider value={1} />
        </>
      ),
    },
    {
      title: { default: 'Minimum and maximum value', ja: '最小値、最大値の設定' },
      children: (
        <>
          <Slider min={-1} />
          <Slider max={100} value={30} />
          <Slider min={-2} max={2} value={0} />
        </>
      ),
    },
    {
      title: { default: 'Discrete slider', ja: '離散スライダー' },
      description: {
        default: (
          <>
            By setting the <code>stops</code> or <code>steps</code>, the slider will become a discrete slider, allowing
            input of discrete values only.
          </>
        ),
        ja: (
          <>
            <code>stops</code>か<code>steps</code>を設定すると離散値のみ入力できる離散スライダーになります。
          </>
        ),
      },
      children: (
        <>
          <Slider stops={[25, 50, 75]} max={100} />
          <Slider step={0.1} max={10} />
          <Slider step={10} offset={3} max={50} />
        </>
      ),
    },
    {
      title: { default: 'Changing thumb size', ja: 'つまみ（thumb）のサイズを変更' },
      children: (
        <>
          <Slider thumbWidth="5px" value={0.2} />
          <Slider thumbWidth="1.5rem" thumbHeight="1.5rem" value={0.3} />
        </>
      ),
    },
    {
      title: {
        default: (
          <>
            Binding <code>value</code> to a signal
          </>
        ),
        ja: (
          <>
            <code>value</code>とsignalの双方向バインディング
          </>
        ),
      },
      children: (
        <>
          <Slider value={value()} onChangeValue={setValue} />
          <div>value: {value()}</div>
        </>
      ),
    },
  ],
}))
