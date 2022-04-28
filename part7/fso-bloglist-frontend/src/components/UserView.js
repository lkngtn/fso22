import { useSelector } from 'react-redux'
import { useMatch, Link } from 'react-router-dom'

const UserView = () => {
  const users = useSelector((state) => state.users)
  const match = useMatch('/user/:id')

  const user = match
    ? users && users.find((u) => u.id === match.params.id)
    : null

  if (!user) return <span>loading...</span>
  if (user) {
    return (
      <div>
        <h2>{user.username}</h2>
        <h4>Added blogs</h4>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default UserView
