import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import { PostListPage } from '../../pages/post_list'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PostListPage />,
  },
])

export const RoutesProvider = () => {
  return (
    <RouterProvider router={router} />
  )
}
