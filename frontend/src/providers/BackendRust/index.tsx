import { QueryClient } from '@tanstack/react-query'
import { FetchTransport, createClient } from '@rspc/client'
import { createReactQueryHooks } from '@rspc/react'

import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { Suspense } from 'react'

import type { Procedures as BackendRustProcedures } from './types'

export const client = createClient<BackendRustProcedures>({
  transport: new FetchTransport('http://localhost:4000/rspc')
})

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: true,
      suspense: true,
    },
  },
})

const rspc = createReactQueryHooks<BackendRustProcedures>()

console.log(queryClient)

export const {
  useContext: useBackendRustContext,
  useMutation: useBackendRustMutation,
  useQuery: useBackendRustQuery,
  useSubscription: useBackendRustSubscription,
} = rspc

type BackendRustProviderProps = {
  children?: React.ReactNode
}
export const BackendRustProvider: React.FC<BackendRustProviderProps> = ({ children }) => {
  return (
    <rspc.Provider client={client} queryClient={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <div>
                There was an error!
                <button onClick={() => resetErrorBoundary()}>Try again</button>
              </div>
            )}
          >
            <Suspense fallback='Loading...'>
              {children}
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </rspc.Provider>
  )
}
