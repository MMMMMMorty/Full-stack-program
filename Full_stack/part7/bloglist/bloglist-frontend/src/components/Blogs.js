import React, { useState } from 'react'
import NewNote from './NewNote'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

const Blogs = ({ loginVisible, setLoginVisible }) => {
  const user = useSelector((state) => state.user)
  const tmp = useSelector((state) => state.blogs)
  const blogs = tmp
    .filter((blog) => blog != null)
    .sort((a, b) => b.likes - a.likes)
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  return (
    <div>
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>new note</button>
        </div>
        <div style={showWhenVisible}>
          <NewNote user={user} />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
      {blogs.map((blog) => (
        <>
          <div>
            <Link className="linkPadding" to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
            {/* <Blog key={blog.id} blog={blog} user={user} /> */}
          </div>
        </>
      ))}
    </div>
  )
}

export default Blogs
