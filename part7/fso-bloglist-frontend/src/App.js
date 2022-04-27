import React, { useEffect } from 'react'
import { initializeBlogs } from './reducers/blogReducer'
import { logoutUser, setUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import LoginForm from './components/LoginForm'

import Notification from './components/Notification'
import BlogView from './components/BlogView'
import UsersView from './components/UsersView'

const App = () => {
  const dispatch = useDispatch()
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

  return (
    <div>
      {notification && <Notification notification={notification} />}
      <h2>blogs</h2>
      <div>
        {!user && <LoginForm />}
        {user && (
          <p>
            {user.name} logged-in{' '}
            <button onClick={() => dispatch(logoutUser())}>logout</button>
          </p>
        )}
      </div>
      <Routes>
        <Route path="/" element={<BlogView user={user} />} />
        <Route path="/users" element={<UsersView />} />
      </Routes>
    </div>
  )
}

export default App
