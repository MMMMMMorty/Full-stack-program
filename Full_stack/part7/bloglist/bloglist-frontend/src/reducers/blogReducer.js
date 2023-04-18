import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload)
    },
    voteBlog(state, action) {
      const id = action.payload.id
      // console.log(id)
      // console.log(JSON.parse(JSON.stringify(state)))
      const blogToChange = state.find((n) => n.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    },
    updateBlog(state, action) {
      const id = action.payload.id
      const comment = action.payload.comment
      // console.log(id)
      // console.log(JSON.parse(JSON.stringify(state)))
      console.log(comment)

      const blogToChange = state.find((n) => n.id === id)
      console.log(blogToChange.comments)
      const changedBlog = {
        ...blogToChange,
        comments: blogToChange.comments.concat(comment)
      }
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    },
    setBlogs(state, action) {
      return action.payload
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.map((blog) => (blog.id !== id ? blog : null))
    },
  },
})

export const { createBlog, voteBlog, setBlogs, deleteBlog, updateBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const appendBlog = (appendedBlog, user) => {
  return async (dispatch) => {
    // const newBlog = await blogService.createNew(newBlog)
    const newBlog = await blogService.createBlog(appendedBlog, user.token)
    dispatch(createBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.likeBlog(blog)
    dispatch(voteBlog(newBlog))
  }
}

export const commentBlog = (blog, comment) =>{
  return async (dispatch) => {
    const newBlog = await blogService.commentBlog(blog, comment)
    dispatch(updateBlog({id: newBlog.id, comment: comment}))
  }
}

export const deleteOneBlog = (blog, token) => {
  const id = blog.id
  return async (dispatch) => {
    const response = await blogService.deleteBlog(id, token)
    if (response.status === 204) {
      dispatch(deleteBlog(id))
    }
  }
}

export default blogSlice.reducer
