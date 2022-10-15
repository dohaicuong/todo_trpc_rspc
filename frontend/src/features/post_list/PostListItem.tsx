import { Delete } from '@mui/icons-material'
import { IconButton, ListItemButton, ListItemSecondaryAction, ListItemText } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useBackendRustMutation } from '../../providers/BackendRust'
import { Post } from '../../providers/BackendRust/types'

type PostListItemProps = {
  post: Post
  onClick?: (id: string) => void
}

export const PostListItem: React.FC<PostListItemProps> = ({ post, onClick }) => {
  const { mutate: deletePostMutate } = useBackendRustMutation('delete_post')
  const queryClient = useQueryClient()
  
  const onDeletePost = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
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
    <ListItemButton onClick={() => onClick?.(post.id)}>
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
