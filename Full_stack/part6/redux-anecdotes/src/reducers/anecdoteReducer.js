import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/notes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action) {
      state.push(action.payload)
    },
    voteNote(state, action) {
      const id = action.payload.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { 
        ...noteToChange,
        votes: noteToChange.votes + 1 
      }
      return state.map(note =>
        note.id !== id ? note : changedNote 
      )     
    },
    setNotes(state, action) {
      return action.payload
    }
  },
})

export const { createNote, voteNote, setNotes } = noteSlice.actions

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const appendNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(createNote(newNote))
  }
}

export const voteAnecdote = note => {
  return async dispatch => {
    const newNote = await noteService.updateNote(note)
    dispatch(voteNote(newNote))
  }
}


export default noteSlice.reducer


// const anecdoteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'VOTE':
//       const id = action.payload.id
//       const noteToChange = state.find(n => n.id === id)
//       const changedNote = { 
//         ...noteToChange,
//         votes: noteToChange.votes + 1 
//       }
//       return state.map(note =>
//         note.id !== id ? note : changedNote 
//       )
//     case 'NEW_NOTE':
//       return state.concat(action.payload)
//     default: 
//       return state
//   }
// }

// export default anecdoteReducer