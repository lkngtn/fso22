const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div><strong>author:</strong> {anecdote.author}</div>
      <div><strong>info:</strong> <a href={anecdote.info}>{anecdote.info}</a></div>
      <div><strong>votes:</strong> {anecdote.votes}</div>
    </div>
  )
}

export default Anecdote