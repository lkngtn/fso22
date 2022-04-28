import { useSelector, useDispatch } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { addLike } from '../reducers/blogReducer'

const BlogView = () => {
  const blogs = useSelector((state) => state.blogs)
  const match = useMatch('/blog/:id')
  const dispatch = useDispatch()

  const blog = match
    ? blogs && blogs.find((item) => item.id === match.params.id)
    : null

  if (!blog) return <span>loading...</span>
  if (blog) {
    return (
      <div>
        <h2>{blog.title}</h2>
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <button onClick={() => dispatch(addLike(blog))}> like </button>
        </p>
        <p>{blog.author}</p>
      </div>
    )
  }
}

export default BlogView
