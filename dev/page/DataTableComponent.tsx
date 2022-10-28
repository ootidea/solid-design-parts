import { Button } from '../../src/Button'
import { DataTable } from '../../src/DataTable'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function DataTableComponent() {
  return (
    <article>
      <PageTitle>DataTable</PageTitle>

      <Sample id="basic-example" title="Basic example">
        <DataTable
          columns={[{ id: 'ID' }, { id: 'name' }]}
          rows={[
            { ID: 1, name: 'ada' },
            { ID: 2, name: 'bob' },
          ]}
        />
      </Sample>

      <Sample id="sort" title="Sort">
        <DataTable
          columns={[{ id: 'ID' }, { id: 'name', sortable: true }]}
          rows={[
            { ID: 1, name: 'ada' },
            { ID: 2, name: 'bob' },
          ]}
        />
      </Sample>

      <Sample id="default-format" title="Default format for data type">
        <DataTable
          columns={[{ id: 'url' }, { id: 'score' }, { id: 'unread' }, { id: 'date' }]}
          rows={[
            { url: 'https://example.com/alice', score: 47, unread: true, date: new Date() },
            { url: 'https://example.com/bob', score: 1029, unread: false, date: new Date(0) },
          ]}
        />
      </Sample>

      <Sample id="empty-state" title="Empty state">
        <DataTable columns={[{ id: 'url' }, { id: 'score' }, { id: 'unread' }, { id: 'date' }]} rows={[]} />
      </Sample>

      <Sample id="cell-slot" title="Cell slot">
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

      <Sample id="full-width" title="Full width">
        <DataTable
          columns={[{ id: 'url' }, { id: 'score' }, { id: 'unread' }, { id: 'date' }]}
          rows={[
            { url: 'https://example.com/alice', score: 47, unread: true, date: new Date() },
            { url: 'https://example.com/bob', score: 1029, unread: false, date: new Date(0) },
          ]}
          fullWidth
        />
      </Sample>

      <Sample id="empty-state-slot" title="Empty state slot">
        <DataTable
          columns={[{ id: 'url' }, { id: 'score' }, { id: 'unread' }, { id: 'date' }]}
          rows={[]}
          emptyState={<p style="padding: 1em">Not found😅</p>}
        />
      </Sample>
    </article>
  )
}
