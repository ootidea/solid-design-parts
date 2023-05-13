import { createRoot } from 'solid-js'
import { Carousel } from '../../library/Carousel'
import { Catalog } from './ComponentCatalogPage'

export const CarouselCatalog: Catalog = createRoot(() => ({
  introduction: (
    <>
      <code>Carousel</code> is a component that displays multiple contents in a single row, with each item being the
      same size. Not only images, but any JSX.Element can be displayed.
    </>
  ),
  samples: [
    {
      title: { default: 'Basic example', ja: '基本例' },
      children: (
        <>
          <Carousel itemWidth="22rem">
            <img src="https://source.unsplash.com/600x300/?dog" alt="" />
            <img src="https://source.unsplash.com/600x300/?desk" alt="" />
            <img src="https://source.unsplash.com/600x300/?cat" alt="" />
            <img src="https://source.unsplash.com/600x300/?sky" alt="" />
            <img src="https://source.unsplash.com/600x300/?leaf" alt="" />
            <img src="https://source.unsplash.com/600x300/?device" alt="" />
          </Carousel>
        </>
      ),
    },
    {
      title: { default: 'Changing carousel width', ja: 'カルーセルの横幅を変更' },
      children: (
        <>
          <Carousel style={{ width: '18rem' }} itemWidth="18rem">
            <img src="https://source.unsplash.com/400x300/?dog" alt="" />
            <img src="https://source.unsplash.com/400x300/?cat" alt="" />
            <img src="https://source.unsplash.com/400x300/?sky" alt="" />
            <img src="https://source.unsplash.com/400x300/?leaf" alt="" />
            <img src="https://source.unsplash.com/400x300/?device" alt="" />
          </Carousel>
          <Carousel style={{ width: '40%' }} itemWidth="18rem">
            <img src="https://source.unsplash.com/400x300/?dog" alt="" />
            <img src="https://source.unsplash.com/400x300/?cat" alt="" />
            <img src="https://source.unsplash.com/400x300/?sky" alt="" />
            <img src="https://source.unsplash.com/400x300/?leaf" alt="" />
            <img src="https://source.unsplash.com/400x300/?device" alt="" />
          </Carousel>
        </>
      ),
    },
    {
      title: { default: 'Auto scroll', ja: '自動スクロール' },
      children: (
        <>
          <Carousel style={{ width: '22rem' }} itemWidth="22rem" autoScroll>
            <img src="https://source.unsplash.com/600x300/?dog" alt="" />
            <img src="https://source.unsplash.com/600x300/?cat" alt="" />
            <img src="https://source.unsplash.com/600x300/?sky" alt="" />
            <img src="https://source.unsplash.com/600x300/?leaf" alt="" />
            <img src="https://source.unsplash.com/600x300/?device" alt="" />
          </Carousel>
          <Carousel itemWidth="22rem" autoScroll autoScrollIntervalMs={3000}>
            <img src="https://source.unsplash.com/600x300/?dog" alt="" />
            <img src="https://source.unsplash.com/600x300/?cat" alt="" />
            <img src="https://source.unsplash.com/600x300/?sky" alt="" />
            <img src="https://source.unsplash.com/600x300/?leaf" alt="" />
            <img src="https://source.unsplash.com/600x300/?device" alt="" />
          </Carousel>
        </>
      ),
    },
    {
      title: { default: 'Hiding navigation buttons', ja: 'ナビゲーションボタンを非表示' },
      children: (
        <>
          <Carousel itemWidth="22rem" hideNavigationButtons>
            <img src="https://source.unsplash.com/600x300/?dog" alt="" />
            <img src="https://source.unsplash.com/600x300/?desk" alt="" />
            <img src="https://source.unsplash.com/600x300/?cat" alt="" />
            <img src="https://source.unsplash.com/600x300/?sky" alt="" />
            <img src="https://source.unsplash.com/600x300/?leaf" alt="" />
            <img src="https://source.unsplash.com/600x300/?device" alt="" />
          </Carousel>
        </>
      ),
    },
    {
      title: { default: 'Hiding indicators', ja: 'インジケーターを非表示' },
      children: (
        <>
          <Carousel itemWidth="22rem" hideIndicators>
            <img src="https://source.unsplash.com/600x300/?dog" alt="" />
            <img src="https://source.unsplash.com/600x300/?desk" alt="" />
            <img src="https://source.unsplash.com/600x300/?cat" alt="" />
            <img src="https://source.unsplash.com/600x300/?sky" alt="" />
            <img src="https://source.unsplash.com/600x300/?leaf" alt="" />
            <img src="https://source.unsplash.com/600x300/?device" alt="" />
          </Carousel>
        </>
      ),
    },
    {
      title: { default: 'Changing indicator position', ja: 'インジケーターの位置を変更' },
      children: (
        <>
          <Carousel itemWidth="22rem" indicatorPosition="inside">
            <img src="https://source.unsplash.com/600x300/?dog" alt="" />
            <img src="https://source.unsplash.com/600x300/?desk" alt="" />
            <img src="https://source.unsplash.com/600x300/?cat" alt="" />
            <img src="https://source.unsplash.com/600x300/?sky" alt="" />
            <img src="https://source.unsplash.com/600x300/?leaf" alt="" />
            <img src="https://source.unsplash.com/600x300/?device" alt="" />
          </Carousel>
        </>
      ),
    },
    {
      title: { default: 'Change the gap between items', ja: '項目間のgapを変更' },
      children: (
        <>
          <Carousel itemWidth="22rem" gap="50px">
            <img src="https://source.unsplash.com/600x300/?dog" alt="" />
            <img src="https://source.unsplash.com/600x300/?desk" alt="" />
            <img src="https://source.unsplash.com/600x300/?cat" alt="" />
            <img src="https://source.unsplash.com/600x300/?sky" alt="" />
            <img src="https://source.unsplash.com/600x300/?leaf" alt="" />
            <img src="https://source.unsplash.com/600x300/?device" alt="" />
          </Carousel>
        </>
      ),
    },
  ],
}))
