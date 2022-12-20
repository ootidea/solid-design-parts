import { Button } from '../../src/Button'
import { DataTable } from '../../src/DataTable'
import { showToast } from '../../src/Toasts'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function DataTableComponent() {
  return (
    <article>
      <PageTitle>DataTable</PageTitle>

      <Sample title="Basic example">
        <DataTable
          columns={[{ id: 'ID' }, { id: 'name' }]}
          rows={[
            { ID: 1, name: 'ada' },
            { ID: 2, name: 'bob' },
          ]}
        />
      </Sample>

      <Sample title="Sort">
        <DataTable
          columns={[{ id: 'ID' }, { id: 'name', sortable: true }]}
          rows={[
            { ID: 1, name: 'ada' },
            { ID: 2, name: 'bob' },
          ]}
        />
      </Sample>

      <Sample title="Default format for data type">
        <DataTable
          columns={[{ id: 'url' }, { id: 'score' }, { id: 'unread' }, { id: 'date' }]}
          rows={[
            { url: 'https://example.com/alice', score: 47, unread: true, date: new Date() },
            { url: 'https://example.com/bob', score: 1029, unread: false, date: new Date(0) },
          ]}
        />
      </Sample>

      <Sample title="Cell slot">
        <DataTable
          columns={[
            { id: 'ID' },
            { id: 'name' },
            { id: 'date', cell: ({ value }) => value.toLocaleString() },
            {
              id: 'action',
              title: '',
              cell: ({ row }) => (
                <Button ghost href={`#${row.name}`}>
                  edit
                </Button>
              ),
            },
          ]}
          rows={[
            { ID: 1, name: 'ada', date: new Date(0) },
            { ID: 2, name: 'bob', date: new Date() },
          ]}
        />
      </Sample>

      <Sample title="Full width">
        <DataTable
          columns={[{ id: 'url' }, { id: 'score' }, { id: 'unread' }, { id: 'date' }]}
          rows={[
            { url: 'https://example.com/alice', score: 47, unread: true, date: new Date() },
            { url: 'https://example.com/bob', score: 1029, unread: false, date: new Date(0) },
          ]}
          fullWidth
        />
      </Sample>

      <Sample title="Width of each column">
        <DataTable
          columns={[
            { id: 'url', width: '4fr' },
            { id: 'score', width: '1fr' },
            { id: 'unread' },
            { id: 'date', width: '10rem' },
          ]}
          rows={[
            { url: 'https://example.com/alice', score: 47, unread: true, date: new Date() },
            { url: 'https://example.com/bob', score: 1029, unread: false, date: new Date(0) },
          ]}
          fullWidth
        />
      </Sample>

      <Sample title="Min width and max width of each column">
        <DataTable
          columns={[
            { id: 'name', minWidth: '15rem' },
            { id: 'text', maxWidth: '300px' },
          ]}
          rows={[
            { name: 'createMemo', text: 'Creates a readonly derived reactive memoized signal' },
            { name: 'onMount', text: 'run an effect only after initial render on mount' },
          ]}
        />
      </Sample>

      <Sample title="Clickable rows: onClickRow callback">
        <DataTable
          columns={[{ id: 'url' }, { id: 'score' }, { id: 'unread' }, { id: 'date' }]}
          rows={[
            { url: 'https://example.com/alice', score: 47, unread: true, date: new Date() },
            { url: 'https://example.com/bob', score: 1029, unread: false, date: new Date(0) },
          ]}
          onClickRow={(row) => showToast('success', JSON.stringify(row))}
        />
      </Sample>

      <Sample title="Empty state">
        <DataTable columns={[{ id: 'url' }, { id: 'score' }, { id: 'unread' }, { id: 'date' }]} rows={[]} />
      </Sample>

      <Sample title="Empty state slot">
        <DataTable
          columns={[{ id: 'url' }, { id: 'score' }, { id: 'unread' }, { id: 'date' }]}
          rows={[]}
          emptyState={<p style="padding: 1em">Not found😅</p>}
        />
      </Sample>
    </article>
  )
}
