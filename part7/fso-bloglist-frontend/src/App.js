import React, { useEffect, useRef } from 'react'
import {
  initializeBlogs,
  createBlog,
  addLike,
  destroyBlog,
} from './reducers/blogReducer'
import { logoutUser, setUser } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => {
    return [...state.blogs].sort((a, b) => b.likes - a.likes)
  })
  const notification = useSelector((state) => state.notification)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  const addBlog = (blog) => {
    addBlogRef.current.toggleVisibility()
    dispatch(createBlog(blog))
    dispatch(
      setNotification(`Successfully added '${blog.title}'`, 'success', 5)
    )
  }

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

  const addBlogRef = useRef()

  return (
    <div>
      {notification && <Notification notification={notification} />}
      <h2>blogs</h2>
      {!user && <LoginForm />}
      {user && (
        <div>
          <p>
            {user.name} logged-in{' '}
            <button onClick={() => dispatch(logoutUser())}>logout</button>
          </p>
          <Togglable showLabel="add blog" hideLabel="cancel" ref={addBlogRef}>
            <AddBlogForm addBlog={addBlog} />
          </Togglable>
        </div>
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
    </div>
  )
}

export default App
