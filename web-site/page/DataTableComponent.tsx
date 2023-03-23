import { Button } from '../../src/Button'
import { DataTable } from '../../src/DataTable'
import { showToast } from '../../src/Toasts'
import { Catalog } from './ComponentCatalog'

export const DataTableCatalog: Catalog = {
  samples: [
    {
      title: 'Basic example',
      children: (
        <DataTable
          columns={[{ id: 'ID' }, { id: 'name' }]}
          rows={[
            { ID: 1, name: 'alice' },
            { ID: 2, name: 'bob' },
          ]}
        />
      ),
    },
    {
      title: 'Sort',
      children: (
        <DataTable
          columns={[{ id: 'ID' }, { id: 'name', sortable: true }, { id: 'age', sortable: true }]}
          rows={[
            { ID: 1, name: 'alice', age: 25 },
            { ID: 2, name: 'bob', age: 30 },
            { ID: 3, name: 'charlie', age: 20 },
          ]}
        />
      ),
    },
    {
      title: 'Default format for data type',
      children: (
        <DataTable
          columns={[{ id: 'url' }, { id: 'score' }, { id: 'unread' }, { id: 'date' }]}
          rows={[
            { url: 'https://example.com/alice', score: 47, unread: true, date: new Date() },
            { url: 'https://example.com/bob', score: 1029, unread: false, date: new Date(0) },
          ]}
        />
      ),
    },
    {
      title: 'Cell slot',
      children: (
        <DataTable
          columns={[
            { id: 'ID' },
            { id: 'name' },
            { id: 'date', cell: ({ value }) => value.toLocaleString() },
            {
              id: 'action',
              title: '',
              cell: ({ row }) => <Button.ghost href={`#${row.name}`}>edit</Button.ghost>,
            },
          ]}
          rows={[
            { ID: 1, name: 'alice', date: new Date(0) },
            { ID: 2, name: 'bob', date: new Date() },
          ]}
        />
      ),
    },
    {
      title: 'Full width',
      children: (
        <DataTable
          columns={[{ id: 'url' }, { id: 'score' }, { id: 'unread' }, { id: 'date' }]}
          rows={[
            { url: 'https://example.com/alice', score: 47, unread: true, date: new Date() },
            { url: 'https://example.com/bob', score: 1029, unread: false, date: new Date(0) },
          ]}
          fullWidth
        />
      ),
    },
    {
      title: 'Width of column',
      children: (
        <>
          <DataTable
            columns={[{ id: 'url' }, { id: 'score' }, { id: 'unread', width: 'max-content' }, { id: 'date' }]}
            rows={[
              { url: 'https://example.com/alice', score: 47, unread: true, date: new Date() },
              { url: 'https://example.com/bob', score: 1029, unread: false, date: new Date(0) },
            ]}
            fullWidth
          />

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
        </>
      ),
    },
    {
      title: 'Min width and max width of column',
      children: (
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
      ),
    },
    {
      title: 'Clickable rows: onClickRow callback',
      children: (
        <DataTable
          columns={[{ id: 'url' }, { id: 'score' }, { id: 'unread' }, { id: 'date' }]}
          rows={[
            { url: 'https://example.com/alice', score: 47, unread: true, date: new Date() },
            { url: 'https://example.com/bob', score: 1029, unread: false, date: new Date(0) },
          ]}
          onClickRow={(row) => showToast('success', JSON.stringify(row))}
        />
      ),
    },
    {
      title: 'Clickable rows: rowHref',
      children: (
        <DataTable
          columns={[{ id: 'name' }, { id: 'score' }, { id: 'unread' }, { id: 'date' }]}
          rows={[
            { name: 'Alice', score: 47, unread: true, date: new Date() },
            { name: 'Bob', score: 1029, unread: false, date: new Date(0) },
          ]}
          rowHref={(row) => 'https://example.com/' + row.name}
        />
      ),
    },
    {
      title: 'Empty state',
      children: <DataTable columns={[{ id: 'url' }, { id: 'score' }, { id: 'unread' }, { id: 'date' }]} rows={[]} />,
    },
    {
      title: 'Empty state slot',
      children: (
        <DataTable
          columns={[{ id: 'url' }, { id: 'score' }, { id: 'unread' }, { id: 'date' }]}
          rows={[]}
          emptyState={<p style="padding: 1em">Not found😅</p>}
        />
      ),
    },
  ],
}
