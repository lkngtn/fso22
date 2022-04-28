import React, { useEffect } from 'react'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { logoutUser, setUser } from './reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import LoginForm from './components/LoginForm'

import Notification from './components/Notification'
import BlogListView from './components/BlogListView'
import UsersView from './components/UsersView'
import UserView from './components/UserView'
import BlogView from './components/BlogView'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
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
        <Route path="/" element={<BlogListView user={user} />} />
        <Route path="/users" element={<UsersView />} />
        <Route path="/user/:id" element={<UserView />} />
        <Route path="/blog/:id" element={<BlogView />} />
      </Routes>
    </div>
  )
}

export default App
