import { Delete } from '@mui/icons-material'
import { IconButton, ListItemButton, ListItemSecondaryAction, ListItemText } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { useBackendRustMutation } from '../../providers/BackendRust'
import { Post } from '../../providers/BackendRust/types'

type PostListItemProps = {
  post: Post
}

export const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
  const { mutate: deletePostMutate } = useBackendRustMutation('delete_post')
  const queryClient = useQueryClient()
  
  const onDeletePost = () => {
    deletePostMutate(post.id, {
      onSuccess: ({ id }) => {
        queryClient.setQueryData<Post[]>(
          ['get_posts'],
          posts => {
            return posts?.filter(post => post.id !== id)
          }
        )
      }
    })
  }

  return (
    <ListItemButton>
      <ListItemText
        primary={post.title}
        secondary={post.content.slice(0, 25)}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={onDeletePost}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItemButton>
  )
}
