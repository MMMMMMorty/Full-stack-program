import { useDispatch, useSelector } from 'react-redux'
// import noteReducer from '../reducers/filterReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const newNote = useSelector(state => {
      if ( state.filter === 'ALL' || state.filter === '') {
        return state.notes
      }
      return state.notes.filter(note => note.content.includes(state.filter))
    })
    const anecdotes = [...newNote]

    anecdotes.sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()
    
    const vote = (id) => {
      //  dispatch(voteNote(id))
        const anecdote = anecdotes.filter(anecdote => anecdote.id === id)[0]
        dispatch(voteAnecdote(anecdote))
        // dispatch({ type: 'notes/voteNote', payload: id })
        // dispatch({type: 'notification/createNotification', payload: 'you voted \''+ content+'\''})
        // setTimeout(() => {
        //   dispatch({type: 'notification/createNotification', payload: ''})
        // }, "5000");
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5000))
    }
    

  return(
    <ul>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
    </ul>
  )
}

export default AnecdoteList