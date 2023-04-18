import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteOneBlog } from '../reducers/blogReducer'
import { useParams, useNavigate } from 'react-router-dom'
import Comments from './Comments'

const Blog = () => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  // const [likes, setLikes] = useState(0)
  const user = useSelector((state) => state.user)
  const tmp = useSelector((state) => state.blogs)
  const blogs = tmp.filter((blog) => blog != null)
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)
  console.log(blog.user)

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = async (blog) => {
    try {
      dispatch(likeBlog(blog))
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification('Wrong', 5000))
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm('Remove blog: ' + blog.title)) {
      try {
        dispatch(deleteOneBlog(blog, user.token))
        navigate('/')
      } catch (exception) {
        dispatch(
          setNotification('Wrong User, you can not delete this one', 5000)
        )
      }
    }
  }

  // const hideBlogVisible = { display: visible ? 'none' : '' }
  // const showBlogVisible = { display: visible ? '' : 'none' }
  const same = blog.user.id === user.id || blog.user === user.id
  if (same) {
    return (
      <div style={blogStyle}>
        <div>
          <h2>{blog.title}</h2>
          <div className="blogUrl">{blog.url}</div>
          <div className="blogAuthor">created by {blog.author}</div>
          <div className="blogLikes">
            {blog.likes} likes 
            <button className="like-button" onClick={() => handleLike(blog)}>
              like
            </button>
          </div>
          <button className="delete-button" onClick={() => handleDelete(blog)}>
            remove
          </button>
        </div>
        <Comments blog={blog}/>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div>
        <h2>{blog.title}</h2>
          <div className="blogUrl">{blog.url}</div>
          <div className="blogAuthor">created by {blog.author}</div>
          <div className="blogLikes">
            {blog.likes} likes 
            <button className="like-button" onClick={() => handleLike(blog)}>
              like
            </button>
          </div>
        </div>
        <Comments blog={blog}/>
      </div>
    )
  }
}

export default Blog
