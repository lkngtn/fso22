import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import Toggalable from './Togglable'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(addComment(blog, comment))
    setComment('')
  }

  return (
    <div className="px-8 m-2">
      <Toggalable showLabel="add comment" hideLabel="cancel">
        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              className="border-2 w-auto"
              type="textarea"
              id="comment"
              value={comment}
              name="Comment"
              onChange={({ target }) => setComment(target.value)}
              placeholder="comment"
            />
          </div>
          <button type="submit" id="coment-button">
            add comment
          </button>
        </form>
      </Toggalable>
    </div>
  )
}

export default CommentForm
