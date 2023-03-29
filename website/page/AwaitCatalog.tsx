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

let id = 0
async function requestNextId() {
  return new Promise<number>((resolve) => {
    setTimeout(() => resolve(id++), 500)
  })
}

const [idPromise, setIdPromise] = createSignal(requestNextId())

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
          <Await value={new Promise((resolve) => setTimeout(resolve, 2000))}>
            <p>resolved</p>
          </Await>
        </>
      ),
    },
    {
      title: 'Loading state',
      children: (
        <>
          <Await value={new Promise(() => {})} loading={<p>loading</p>}>
            <p>resolved</p>
          </Await>
        </>
      ),
    },
    {
      title: 'Catching an error',
      children: (
        <>
          <Await
            value={new Promise((_, reject) => setTimeout(() => reject('error'), 5000))}
            loading={<Spinner />}
            catch={(error) => <p>{error}</p>}
          />
        </>
      ),
    },
    {
      title: 'Reassigning a promise',
      children: (
        <>
          <div>
            <Await value={promise()} loading={<Spinner />}>
              resolved
            </Await>
          </div>
          <Button onClick={() => setPromise(new Promise((resolve) => setTimeout(resolve, 1000)))}>Refresh</Button>
        </>
      ),
    },
    {
      title: 'Preventing the display of the loading state when reassigning a Promise',
      children: (
        <>
          <div>
            <Await value={idPromise()} loading={<Spinner />} showPreviousValueDuringAwait>
              {(value) => <div>ID: {value}</div>}
            </Await>
          </div>
          <Button onClick={() => setIdPromise(requestNextId())}>Refresh</Button>
        </>
      ),
    },
    {
      title: 'Awaiting a non-promise value',
      children: (
        <>
          <Await value={Math.PI} loading={<Spinner />} catch="🤔 An error occurred.">
            {(value) => <p>result: {value}</p>}
          </Await>
        </>
      ),
    },
  ],
}))
