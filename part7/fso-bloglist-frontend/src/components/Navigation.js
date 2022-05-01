import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { HiLogout } from 'react-icons/hi'

import { logoutUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

import LoginForm from './LoginForm'
import AddBlogModal from './AddBlogModal'

const Navigation = ({ user }) => {
  const dispatch = useDispatch()
  const padding = {
    paddingRight: 10,
  }
  const addBlog = (blog) => {
    dispatch(createBlog(blog))
    dispatch(
      setNotification(`Successfully added '${blog.title}'`, 'success', 5)
    )
  }
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
      {user && <AddBlogModal addBlog={addBlog} />}
    </div>
  )
}

export default Navigation
