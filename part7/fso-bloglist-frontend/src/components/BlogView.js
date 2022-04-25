import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AddBlogForm from './AddBlogForm'
import Togglable from './Togglable'
import Blog from './Blog'

import { setNotification } from '../reducers/notificationReducer'
import { createBlog, addLike, destroyBlog } from '../reducers/blogReducer'

const BlogView = ({ user }) => {
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

  const addBlog = (blog) => {
    addBlogRef.current.toggleVisibility()
    dispatch(createBlog(blog))
    dispatch(
      setNotification(`Successfully added '${blog.title}'`, 'success', 5)
    )
  }

  const addBlogRef = useRef()

  return (
    <>
      {user && (
        <Togglable showLabel="add blog" hideLabel="cancel" ref={addBlogRef}>
          <AddBlogForm addBlog={addBlog} />
        </Togglable>
      )}
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

export default BlogView
