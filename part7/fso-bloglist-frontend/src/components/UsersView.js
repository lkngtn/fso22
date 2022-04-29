import { useSelector } from 'react-redux'

const UsersView = () => {
  const users = useSelector((state) => state.users)
  if (!users) return <span>is loading</span>
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <a href={`/user/${user.id}`}>{user.username}</a>
            </td>
            <td> {user.blogs.length} </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UsersView
