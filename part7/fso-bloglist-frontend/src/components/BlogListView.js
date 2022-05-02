import { useDispatch, useSelector } from 'react-redux'

import Blog from './Blog'

import { setNotification } from '../reducers/notificationReducer'
import { addLike, destroyBlog } from '../reducers/blogReducer'

const BlogListView = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => {
    return [...state.blogs].sort((a, b) => b.likes - a.likes)
  })

  const like = (blog) => {
    dispatch(addLike(blog))
  }

  const deleteBlog = (blog) => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}`)) {
      dispatch(
        setNotification(`Successfully deleted: "${blog.title}"`, 'success', 5)
      )
      dispatch(destroyBlog(blog))
    }
  }

  return (
    <>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          like={like}
          deleteBlog={deleteBlog}
          user={user}
        />
      ))}
    </>
  )
}

export default BlogListView
