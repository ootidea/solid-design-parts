import { createRoot, createSignal } from 'solid-js'
import { Await } from '../../src/Await'
import { Button } from '../../src/Button'
import { Spinner } from '../../src/Spinner'
import { Catalog } from './ComponentCatalogPage'

const [promise, setPromise] = createSignal(
  new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
)

export const AwaitCatalog: Catalog = createRoot(() => ({
  introduction: (
    <>
      <code>Await</code> is a component that switches the display based on the state of the given Promise.
    </>
  ),
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <Await
            promise={
              new Promise((resolve) => {
                setTimeout(resolve, 2000)
              })
            }
            loading={<Spinner />}
          >
            <p>resolved</p>
          </Await>
        </>
      ),
    },
    {
      title: 'Catch an error',
      children: (
        <>
          <Await
            promise={
              new Promise((_, reject) => {
                setTimeout(reject, 5000)
              })
            }
            loading={<Spinner />}
            catch="🤔 An error occurred."
          />
        </>
      ),
    },
    {
      title: 'Reassign a promise',
      children: (
        <>
          <Await promise={promise()} loading={<p>loading</p>}>
            <p>resolved</p>
          </Await>
          <Button
            onClick={() =>
              setPromise(
                new Promise((resolve) => {
                  setTimeout(resolve, 2000)
                })
              )
            }
          >
            Refresh
          </Button>
        </>
      ),
    },
    {
      title: 'Await a non-promise value',
      children: (
        <>
          <Await promise={Math.random()} loading={<Spinner />} catch="🤔 An error occurred.">
            {(value) => <p>result: {value}</p>}
          </Await>
        </>
      ),
    },
  ],
}))
