import { useState } from 'react'
import { IconButton, List, ListItemSecondaryAction, ListSubheader } from '@mui/material'
import { Add } from '@mui/icons-material'

import { useBackendRustQuery } from '../../providers/BackendRust'
import { CreatePostDialog } from '../post_create_dialog'

import { PostListItem } from './PostListItem'
import { useNavigate } from 'react-router-dom'

export const PostList = () => {
  const { data: posts } = useBackendRustQuery(['get_posts'])

  const [createPostDialogOpen, setCreatePostDialogOpen] = useState(false)

  const navigate = useNavigate()

  return (
    <List>
      <ListSubheader>
        New posts
        <ListItemSecondaryAction>
          <IconButton onClick={() => setCreatePostDialogOpen(true)}>
            <Add />
          </IconButton>
        </ListItemSecondaryAction>
        <CreatePostDialog
          open={createPostDialogOpen}
          onClose={() => setCreatePostDialogOpen(false)}
        />
      </ListSubheader>
      {posts?.map(post => (
        <PostListItem
          key={post.id}
          post={post}
          onClick={id => navigate(id)}
        />
      ))}
    </List>
  )
}
