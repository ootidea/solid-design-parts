import { Tabs } from '../../src/Tabs'
import { showToast } from '../../src/Toasts'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function TabsComponent() {
  return (
    <article>
      <PageTitle>Tabs</PageTitle>

      <Sample title="Basic example">
        <Tabs names={['tab1', 'tab2', 'tab3']}>{({ activeTab }) => <div style="padding: 2em">{activeTab}</div>}</Tabs>
        <Tabs type="Surrounded by border" names={['tab1', 'tab2', 'tab3']}>
          {({ activeTab }) => <div style="padding: 2em">{activeTab}</div>}
        </Tabs>
        <Tabs type="Active underline" names={['tab1', 'tab2', 'tab3']}>
          {({ activeTab }) => <div style="padding: 2em">{activeTab}</div>}
        </Tabs>
      </Sample>

      <Sample title="Default tab">
        <Tabs names={['tab1', 'tab2', 'tab3']} activeTab="tab2">
          {({ activeTab }) => <div style="padding: 2em">{activeTab}</div>}
        </Tabs>
      </Sample>

      <Sample title="Passive" description="If the passive flag is set, tab clicks will not change the active tab.">
        <Tabs passive names={['tab1', 'tab2', 'tab3']} onClickTab={(tabName) => showToast('success', tabName)}></Tabs>
      </Sample>
    </article>
  )
}
