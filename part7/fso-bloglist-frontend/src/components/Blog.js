import { Link } from 'react-router-dom'
import { HiOutlineTrash, HiOutlineHeart } from 'react-icons/hi'

const Blog = ({ blog, deleteBlog, like, user }) => {
  return (
    <div className="border-slate-400 border-2 border-solid m-2 p-2">
      <Link className="text-sky-700 text-xl" to={`/blog/${blog.id}`}>
        {blog.title}
      </Link>{' '}
      <br />
      <a className="text-xs" href={blog.url}>
        {blog.url}
      </a>
      <br />
      <HiOutlineHeart className="inline" onClick={() => like(blog)}>
        like
      </HiOutlineHeart>
      {user && blog.user.id === user.id && (
        <HiOutlineTrash className="inline" onClick={() => deleteBlog(blog)}>
          delete
        </HiOutlineTrash>
      )}
    </div>
  )
}

export default Blog
