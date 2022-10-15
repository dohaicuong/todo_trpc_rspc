import { Container } from '@mui/material'
import { PostList } from '../features/post_list/PostList'

export const PostListPage = () => {
  return (
    <Container maxWidth='xs'>
      <PostList />
    </Container>
  )
}
