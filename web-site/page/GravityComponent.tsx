import { Gravity } from '../../src/Gravity'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function GravityComponent() {
  return (
    <article>
      <PageTitle>Gravity</PageTitle>
      <Sample title="Basic example">
        <div style={{ width: '12rem', height: '9rem', border: '1px dashed gray' }}>
          <Gravity>center</Gravity>
        </div>
        <div style={{ width: '12rem', height: '9rem', border: '1px dashed gray' }}>
          <Gravity to="bottom">center</Gravity>
        </div>
        <div style={{ width: '12rem', height: '9rem', border: '1px dashed gray' }}>
          <Gravity to="left">center</Gravity>
        </div>
      </Sample>

      <Sample title="Corners">
        <div style={{ width: '12rem', height: '9rem', border: '1px dashed gray' }}>
          <Gravity to="top right">center</Gravity>
        </div>
        <div style={{ width: '12rem', height: '9rem', border: '1px dashed gray' }}>
          <Gravity to="bottom left">center</Gravity>
        </div>
      </Sample>
    </article>
  )
}
