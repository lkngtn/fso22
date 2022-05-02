const BlogComments = () => {
  const mockComments = [
    {
      content: 'this is a comment',
      timestamp: new Date(2022, 5, 12, 2, 30),
    },
    {
      content: 'this is yet another comment',
      timestamp: new Date(2022, 5, 12, 2, 40),
    },
  ]
  return (
    <div>
      {mockComments.map((comment) => (
        <div key={comment.content} className="border-b border-solid px-8 m-2">
          {comment.content}{' '}
          <span className="text-xs">
            {comment.timestamp.toLocaleDateString()}
          </span>
        </div>
      ))}
    </div>
  )
}

export default BlogComments
