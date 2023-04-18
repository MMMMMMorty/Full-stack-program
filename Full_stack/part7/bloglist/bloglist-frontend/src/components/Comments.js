import React, { useState } from 'react'
import NewNote from './NewNote'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Comments = ({blog}) => {
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()

  const HandleCreateComment = async (event) => {
    event.preventDefault()

    try {
      dispatch(commentBlog(blog, comment))
      // props.setBlogs(blogs.concat(response.data))
      dispatch(
        setNotification(
          `Succefully created a new comment by ${comment}`,
          5000
        )
      )
      setComment('')
    } catch (exception) {
      dispatch(setNotification(`wrong`, 5000))
    }
  }

  return (
    <div>
        <b>comments</b>
        <form onSubmit={HandleCreateComment}>
        <input
            type="text"
            value={comment}
            name="comment"
            id="comment"
            onChange={({ target }) => setComment(target.value)}
          />
        <button type='submit'>add comment</button>
        </form>
        <div>
        <ul>{blog.comments.map(comment=>(<li>{comment}</li>))}</ul>
        </div>
    </div>
  )
}

export default Comments
