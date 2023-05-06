import { createRoot } from 'solid-js'
import { IconButton, showToast, Tabs } from '../../library'
import { Catalog } from './ComponentCatalogPage'
import closeIcon from '../images/close.svg'

export const TabsCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <Tabs tabNames={['tab1', 'tab2', 'tab3']}>
            {(tabName) => <div style="padding: 2em">{tabName} contents</div>}
          </Tabs>
        </>
      ),
    },
    {
      title: 'Variants',
      children: (
        <>
          <Tabs variant="bordered tab" tabNames={['tab1', 'tab2', 'tab3']}>
            {(tabName) => <div style="padding: 2em">{tabName} contents</div>}
          </Tabs>
          <Tabs variant="underlined tab" tabNames={['tab1', 'tab2', 'tab3']}>
            {(tabName) => <div style="padding: 2em">{tabName} contents</div>}
          </Tabs>
        </>
      ),
    },
    {
      title: 'Changing default tab',
      children: (
        <>
          <Tabs tabNames={['tab1', 'tab2', 'tab3']} activeTabName="tab2">
            {(tabName) => <div style="padding: 2em">{tabName} contents</div>}
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
    {
      title: 'Custom tab titles',
      children: (
        <>
          <Tabs
            tabNames={['tab1', 'tab2', 'tab3']}
            tabTitles={(tabName) => (
              <>
                {tabName}
                <IconButton src={closeIcon} iconColor="currentColor" size="1.3em" />
              </>
            )}
          />
        </>
      ),
    },
  ],
}))
