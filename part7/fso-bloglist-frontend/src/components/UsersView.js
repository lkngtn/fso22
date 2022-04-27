import { useEffect, useState } from 'react'
import userService from '../services/users'

const UsersView = () => {
  const [users, setUsers] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await userService.getAll()
      setUsers(data)
      setIsLoading(false)
    }
    fetchUsers().catch(console.error)
  }, [])

  console.log(users)
  if (isLoading) return <span>is loading</span>
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
            <td> {user.username} </td>
            <td> {user.blogs.length} </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UsersView
