import { createRoot } from 'solid-js'
import { showToast, Tabs } from '../../library'
import { Catalog } from './ComponentCatalogPage'

export const TabsCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <Tabs tabNames={['tab1', 'tab2', 'tab3']}>
            {({ activeTabName }) => <div style="padding: 2em">{activeTabName}</div>}
          </Tabs>
        </>
      ),
    },
    {
      title: 'Variants',
      children: (
        <>
          <Tabs variant="bordered tab" tabNames={['tab1', 'tab2', 'tab3']}>
            {({ activeTabName }) => <div style="padding: 2em">{activeTabName}</div>}
          </Tabs>
          <Tabs variant="underlined tab" tabNames={['tab1', 'tab2', 'tab3']}>
            {({ activeTabName }) => <div style="padding: 2em">{activeTabName}</div>}
          </Tabs>
        </>
      ),
    },
    {
      title: 'Changing default tab',
      children: (
        <>
          <Tabs tabNames={['tab1', 'tab2', 'tab3']} activeTabName="tab2">
            {({ activeTabName }) => <div style="padding: 2em">{activeTabName}</div>}
          </Tabs>
        </>
      ),
    },
    {
      title: 'Passive tabs',
      description: (
        <>
          If the <code>passive</code> option is set, tab clicks will not change the active tab.
        </>
      ),
      children: (
        <>
          <Tabs
            passive
            tabNames={['tab1', 'tab2', 'tab3']}
            onClickTab={(tabName) => showToast('success', tabName)}
          ></Tabs>
        </>
      ),
    },
  ],
}))
