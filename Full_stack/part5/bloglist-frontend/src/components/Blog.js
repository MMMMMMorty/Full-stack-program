import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, setErrorMessage, setMessage }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(0)
  const [deleted, setDelete] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleLike = async (blog) => {
    try{
      //get the user first
      let id = blog.id
      const newblog = await blogService.getBlog(id)
      const response = await blogService.likeBlog(newblog)
      setLikes(response.data.likes)
    }catch(exception){
      console.log(exception)
      setErrorMessage('Wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm('Remove blog: '+ blog.title)) {
      try{
        let id = blog.id
        const response = await blogService.deleteBlog(id, user.token)
        if (response.status === 204){
          setDelete(true)
          setMessage('Successfully delete the blog')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
      }catch(exception){
        setErrorMessage('Wrong User, you can not delete this one')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  const hideBlogVisible = { display: visible ? 'none' : '' }
  const showBlogVisible = { display: visible ? '' : 'none' }
  const same = (blog.user.id === user.id || blog.user === user.id)
  if (same){
    if (likes > 0 && deleted === false) {
      return (
        <div style={blogStyle}>
          <div style={hideBlogVisible}>
            {blog.title}<button className='view-button' onClick={() => setVisible(true)}>view</button>
          </div>
          <div style={showBlogVisible}>
            <div className='blogTitle'>
              {blog.title}
            </div>
            <div>
              {blog.author}
            </div>
            <div>
              {blog.url}
            </div>
            <div>
              likes {likes}
              <button className='like-button' onClick={() => handleLike(blog)}>like</button>
            </div>
            <button className='delete-button' onClick={() => handleDelete(blog)}>remove</button>
            <button onClick={() => setVisible(false)}>hide</button>
          </div>
        </div>
      )
    }
    if (deleted === true){
      return
    }
    return(
      <div style={blogStyle}>
        <div style={hideBlogVisible}>
          {blog.title}<button className='view-button' onClick={() => setVisible(true)}>view</button>
        </div>
        <div style={showBlogVisible}>
          <div className='blogTitle'>
            {blog.title}
          </div>
          <div className='blogAuthor'>
            {blog.author}
          </div>
          <div className='blogUrl'>
            {blog.url}
          </div>
          <div className='blogLikes'>
            likes {blog.likes}
            <button className='like-button' onClick={() => handleLike(blog)}>like</button>
          </div>
          <button className='delete-button' onClick={() => handleDelete(blog)}>remove</button>
          <button onClick={() => setVisible(false)}>hide</button>
        </div>
      </div>
    )
  } else {
    if (likes > 0 && deleted === false) {
      return (
        <div style={blogStyle}>
          <div style={hideBlogVisible}>
            {blog.title}<button className='view-button' onClick={() => setVisible(true)}>view</button>
          </div>
          <div style={showBlogVisible}>
            <div className='blogTitle'>
              {blog.title}
            </div>
            <div>
              {blog.author}
            </div>
            <div>
              {blog.url}
            </div>
            <div>
              likes {likes}
              <button className='like-button' onClick={() => handleLike(blog)}>like</button>
            </div>
            <button onClick={() => setVisible(false)}>hide</button>
          </div>
        </div>
      )
    }
    if (deleted === true){
      return
    }
    return(
      <div style={blogStyle}>
        <div style={hideBlogVisible}>
          {blog.title}<button className='view-button' onClick={() => setVisible(true)}>view</button>
        </div>
        <div style={showBlogVisible}>
          <div className='blogTitle'>
            {blog.title}
          </div>
          <div className='blogAuthor'>
            {blog.author}
          </div>
          <div className='blogUrl'>
            {blog.url}
          </div>
          <div className='blogLikes'>
            likes {blog.likes}
            <button className='like-button' onClick={() => handleLike(blog)}>like</button>
          </div>
          <button onClick={() => setVisible(false)}>hide</button>
        </div>
      </div>
    )
  }



}

export default Blog