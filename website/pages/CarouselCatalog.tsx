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
      title: 'Changing carousel width',
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
      title: 'Auto scroll',
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
      title: 'In cases with few items',
      description: 'The buttons and indicators will not be displayed if there is no overflow.',
      children: (
        <>
          <Carousel itemWidth="22rem">
            <img src="https://source.unsplash.com/600x300/?dog" alt="" />
          </Carousel>
        </>
      ),
    },
    {
      title: 'Hiding navigation buttons',
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
      title: 'Hiding indicators',
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
      title: 'Changing indicator position',
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
      title: 'Changing gap',
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
