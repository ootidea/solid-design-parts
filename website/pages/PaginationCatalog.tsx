import { createRoot } from 'solid-js'
import { Catalog } from './ComponentCatalogPage'
import { Pagination } from '../../library/Pagination'
import { showToast } from '../../library'

export const PaginationCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <Pagination totalPages={9} />
          <Pagination totalPages={100} activePageNumber={20} />
        </>
      ),
    },
    {
      title: 'Changing visibility distance',
      children: (
        <>
          <Pagination totalPages={7} visibilityDistance={1} />
          <Pagination totalPages={100} visibilityDistance={3} activePageNumber={20} />
        </>
      ),
    },
    {
      title: 'Passive pagination',
      description: (
        <>
          When the <code>passive</code> option is set, clicking the button will not change its state.
        </>
      ),
      children: (
        <>
          <Pagination totalPages={7} passive onClickPageNumber={(pageNumber) => showToast('info', `${pageNumber}`)} />
        </>
      ),
    },
    {
      title: 'Infinity pages',
      children: (
        <>
          <Pagination totalPages={Infinity} />
        </>
      ),
    },
  ],
}))
