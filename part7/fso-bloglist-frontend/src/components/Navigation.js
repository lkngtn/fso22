import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { HiLogout } from 'react-icons/hi'
import { useRef } from 'react'

import { logoutUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

import LoginForm from './LoginForm'
import AddBlogForm from './AddBlogForm'
import Togglable from './Togglable'

const Navigation = ({ user }) => {
  const dispatch = useDispatch()
  const padding = {
    paddingRight: 10,
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
    <div>
      <Link style={padding} to="/">
        Blogs
      </Link>
      <Link style={padding} to="/users">
        Users
      </Link>
      {!user && <LoginForm />}
      {user && (
        <span>
          {user.name}{' '}
          <HiLogout className="inline" onClick={() => dispatch(logoutUser())}>
            logout
          </HiLogout>
        </span>
      )}
      {user && (
        <Togglable showLabel="add blog" hideLabel="cancel" ref={addBlogRef}>
          <AddBlogForm addBlog={addBlog} />
        </Togglable>
      )}
    </div>
  )
}

export default Navigation
