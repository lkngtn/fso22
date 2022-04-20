import React, { useState } from 'react'

const Blog = ({ blog, like, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => setVisible(!visible)

  return (
    <div className="blogEntry">
      {blog.title}{' '}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      {user && blog.user.id === user.id && (
        <button onClick={() => deleteBlog(blog)}> delete </button>
      )}
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
            {blog.likes}
            <button onClick={() => like(blog)}> like </button>
          </p>
          <p>{blog.author}</p>
        </div>
      )}
    </div>
  )
}

export default Blog
