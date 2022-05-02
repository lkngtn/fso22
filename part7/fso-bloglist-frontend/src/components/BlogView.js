import { useSelector, useDispatch } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { addLike, destroyBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { HiOutlineTrash, HiOutlineHeart } from 'react-icons/hi'
import BlogComments from './BlogComments'
import { setNotification } from '../reducers/notificationReducer'

const BlogView = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const match = useMatch('/blog/:id')
  const dispatch = useDispatch()

  const blog = match
    ? blogs && blogs.find((item) => item.id === match.params.id)
    : null

  // TODO: refactor so that deleteBlog function isn't duplicated in BlogListView component
  const deleteBlog = (blog) => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}`)) {
      dispatch(
        setNotification(`Successfully deleted: "${blog.title}"`, 'success', 5)
      )
      dispatch(destroyBlog(blog))
    }
  }

  if (!blog) return <span>loading...</span>
  if (blog) {
    return (
      <div>
        <div className="border-slate-200 border-b border-solid m-2 py-2 px-8">
          <Link className="text-sky-700 text-xl" to={`/blog/${blog.id}`}>
            {blog.title}
          </Link>{' '}
          <br />
          <a className="text-xs" href={blog.url}>
            {blog.url}
          </a>
          <p className="text-xs">{blog.likes} likes</p>
          <p className="text-xs">
            Submitted by:{' '}
            <a href={`/user/${blog.user.id}`}> {blog.user.username} </a>
          </p>
          <HiOutlineHeart
            className="inline"
            onClick={() => dispatch(addLike(blog))}
          >
            like
          </HiOutlineHeart>
          {user && blog.user.id === user.id && (
            <HiOutlineTrash className="inline" onClick={() => deleteBlog(blog)}>
              delete
            </HiOutlineTrash>
          )}
        </div>
        <BlogComments blog={blog} />
      </div>
    )
  }
}

export default BlogView
