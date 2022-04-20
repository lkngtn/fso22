import React, { useState, useEffect, useRef } from 'react'
import {
  initializeBlogs,
  createBlog,
  addLike,
  destroyBlog,
} from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => {
    return [...state.blogs].sort((a, b) => b.likes - a.likes)
  })
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type, duration) => {
    setNotification({ message: message, type: type })
    setTimeout(() => {
      setNotification(null)
    }, duration)
  }

  const addBlog = async (blogObject) => {
    addBlogRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
    notify(`Successfully added '${blogObject.title}'`, 'success', 5000)
  }

  const like = (blog) => {
    dispatch(addLike(blog))
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
    notify('Logout Sucessful', 'success', 5000)
  }

  const login = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      notify('Login Successful', 'success', 5000)
    } catch (exception) {
      notify('Wrong Credentials', 'error', 5000)
    }
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}`)) {
      await blogService.destroy(blog.id)
      notify(`Successfully deleted: "${blog.title}"`, 'success', 5000)
      dispatch(destroyBlog(blog))
    }
  }

  const addBlogRef = useRef()

  return (
    <div>
      {notification && <Notification notification={notification} />}
      <h2>blogs</h2>
      {!user && <LoginForm login={login} />}
      {user && (
        <div>
          <p>
            {user.name} logged-in <button onClick={logout}>logout</button>
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
