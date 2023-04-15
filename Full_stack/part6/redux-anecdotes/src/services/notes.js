import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
  }

  const updateNote = async (note) => {
    const content = note.content
    const id = note.id
    const votes = note.votes
    const newNote = {
        content: content,
        id: id,
        votes: votes + 1
    }
    const response = await axios.put(`${baseUrl}/${id}`, newNote)
    return response.data
  }

export default { getAll, createNew, updateNote }