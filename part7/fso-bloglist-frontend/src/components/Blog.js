import { Link } from 'react-router-dom'
import { HiOutlineTrash } from 'react-icons/hi'

const Blog = ({ blog, deleteBlog, user }) => {
  return (
    <div className="text-lg">
      <Link className="text-sky-700" to={`/blog/${blog.id}`}>
        {blog.title}
      </Link>{' '}
      {user && blog.user.id === user.id && (
        <HiOutlineTrash onClick={() => deleteBlog(blog)}>delete</HiOutlineTrash>
      )}
    </div>
  )
}

export default Blog
