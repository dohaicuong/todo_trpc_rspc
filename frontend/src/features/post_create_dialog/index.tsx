import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { useBackendRustMutation } from '../../providers/BackendRust'
import { Post, PostCreateInput } from '../../providers/BackendRust/types'

type CreatePostDialogProps = {
  open: boolean
  onClose: () => void
}

export const CreatePostDialog: React.FC<CreatePostDialogProps> = ({ open, onClose }) => {
  const { mutate: createPostMutate } = useBackendRustMutation(['create_post'])
  const queryClient = useQueryClient()

  const { register, handleSubmit, reset } = useForm<PostCreateInput>()

  const onSubmit: SubmitHandler<PostCreateInput> = (input) => {
    createPostMutate(
      input,
      {
        onSuccess(post) {
          queryClient.setQueryData<Post[]>(['get_posts'], posts => ([...(posts || []), post]))
          onClose()
          reset()
        },
      }
    )
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          Create a new post
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={2}>
            <TextField
              label='title'
              {...register('title')}
            />
            <TextField
              label='content'
              multiline
              rows={3}
              maxRows={5}
              {...register('content')}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type='submit' autoFocus>
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
