import { createRoot } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
import { showToast } from '../../library'
import { Const } from '../../library/Const'
import { Pagination } from '../../library/Pagination'
import { Catalog } from './ComponentCatalogPage'

export const PaginationCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: { default: 'Basic example', ja: '基本例' },
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
      title: {
        default: (
          <>
            Binding <code>activePageNumber</code> to a signal
          </>
        ),
        ja: (
          <>
            <code>activePageNumber</code>とsignalの双方向バインディング
          </>
        ),
      },
      children: (
        <Const value={createSignalObject(20)}>
          {(activePageNumberSignal) => (
            <>
              <Pagination
                totalPages={100}
                activePageNumber={activePageNumberSignal.value}
                onChangeActivePageNumber={activePageNumberSignal.set}
              />
              <div>activePageNumber: {activePageNumberSignal.value}</div>
            </>
          )}
        </Const>
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
