import { useBackendRustQuery } from './providers/BackendRust'

const App = () => {
  const { data } = useBackendRustQuery(['version'])

  return (
    <>
      <>backend rust version: {data}</>
    </>
  )
}

export default App
