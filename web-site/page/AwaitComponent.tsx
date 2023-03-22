import { createSignal } from 'solid-js'
import { Await } from '../../src/Await'
import { Button } from '../../src/Button'
import { Spinner } from '../../src/Spinner'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function AwaitComponent() {
  const [promise, setPromise] = createSignal(
    new Promise((resolve) => {
      setTimeout(resolve, 2000)
    })
  )

  return (
    <article>
      <PageTitle>Await</PageTitle>

      <Sample title="Basic example">
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
      </Sample>

      <Sample title="Catch error">
        <Await
          promise={
            new Promise((_, reject) => {
              setTimeout(reject, 5000)
            })
          }
          loading={<Spinner />}
          catch="🤔 An error occurred."
        />
      </Sample>

      <Sample title="Reassign promise">
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
      </Sample>
    </article>
  )
}
