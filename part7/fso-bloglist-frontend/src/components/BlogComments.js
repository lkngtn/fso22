import CommentForm from './CommentForm'

const BlogComments = ({ blog }) => {
  const comments = blog.comments ? blog.comments : []
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.content} className="border-b border-solid px-8 m-2">
          {comment.content} <span className="text-xs">{comment.timestamp}</span>
        </div>
      ))}
      <CommentForm blog={blog} />
    </div>
  )
}

export default BlogComments
