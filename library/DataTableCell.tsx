import { DiscriminatedUnion } from 'base-up'
import { JSX } from 'solid-js'
import { createMemoObject } from 'solid-signal-object'
import './common.scss'
import './DataTableCell.scss'
import { Icon } from './Icon'
import checkIcon from './image/check.svg'
import { Link } from './Link'
import { joinClasses, prepareProps, Props } from './utility/props'

export type DataTableCellProps<T extends string> = Props<{ value: unknown }>

export function DataTableCell<const T extends string>(rawProps: DataTableCellProps<T>) {
  const [props, restProps] = prepareProps(rawProps, {}, ['value'])

  const analysisResult = createMemoObject(() => analyze(props.value))
  return (
    <div
      {...restProps}
      class={joinClasses(props, 'solid-design-parts-DataTableCell_root')}
      data-type={analysisResult.value.type}
    >
      {render(analysisResult.value)}
    </div>
  )
}

function render(analysisResult: AnalysisResult): JSX.Element {
  switch (analysisResult.type) {
    case 'Date':
      return analysisResult.value.toLocaleDateString()
    case 'URL':
      return <Link href={String(analysisResult.value)} />
    case 'boolean':
      if (analysisResult.value) return <Icon src={checkIcon} color="currentColor" />
      else return <Icon style="visibility: hidden" src={checkIcon} color="currentColor" />
    case 'bigint':
    case 'number':
      return analysisResult.value.toLocaleString()
    case 'string':
      return analysisResult.value
    case 'unknown':
      return String(analysisResult.value)
  }
}

type AnalysisResult = DiscriminatedUnion<{
  Date: { value: Date }
  URL: { value: URL }
  boolean: { value: boolean }
  number: { value: number }
  bigint: { value: bigint }
  string: { value: string }
  unknown: { value: unknown }
}>

function analyze(value: unknown): AnalysisResult {
  if (typeof value === 'boolean') return { type: 'boolean', value }
  if (typeof value === 'number') return { type: 'number', value }
  if (typeof value === 'bigint') return { type: 'bigint', value }

  if (value instanceof Date) return { type: 'Date', value }
  if (value instanceof URL) return { type: 'URL', value }

  if (typeof value === 'string') {
    try {
      return { type: 'URL', value: new URL(value) }
    } catch {
      return { type: 'string', value }
    }
  }

  return { type: 'unknown', value }
}
