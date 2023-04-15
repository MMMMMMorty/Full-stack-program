import { useDispatch } from 'react-redux'
// import noteReducer from '../reducers/filterReducer'
// import noteService from '../services/notes'
import { appendNote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  // const generateId = () => (100000 * Math.random()).toFixed(0)

  // const newNote = (content) => {
  //   return {
  //     content,
  //     votes: 0,
  //     id: generateId()
  //   }
  // }
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    // dispatch(createNote(newNote(content)))
    // const newNote = await noteService.createNew(content)
    // dispatch({ type: 'notes/createNote', payload: newNote })
    dispatch(appendNote(content))
    // dispatch({ type: 'notification/createNotification', payload: 'you created \''+ content + '\''})
    // setTimeout(() => {
    //   dispatch({type: 'notification/createNotification', payload: ''})
    // }, "5000");
    dispatch(setNotification(`you created '${content}'`, 5000))
  }

  return(
    <div>
        <h2>create new</h2>
        <form onSubmit={addNote}>
            <div><input name="note"/></div>
            <button>create</button>
        </form> 
    </div> 
    )
}

export default AnecdoteForm