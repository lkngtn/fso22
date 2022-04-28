import { Link } from 'react-router-dom'

const Blog = ({ blog, deleteBlog, user }) => {
  return (
    <div className="blogEntry">
      <Link to={`/blog/${blog.id}`}>{blog.title}</Link>{' '}
      {user && blog.user.id === user.id && (
        <button onClick={() => deleteBlog(blog)}> delete </button>
      )}
    </div>
  )
}

export default Blog
