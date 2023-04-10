import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (newBlog, token) => {
  const response = await axios.post(baseUrl, newBlog,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  console.log(response)
  return response
}

const likeBlog = async (newBlog) => {
  let blog = {
    title: newBlog.title, author: newBlog.author, url: newBlog.url, likes: newBlog.likes+1
  }
  const response = await axios.put(baseUrl+'/'+newBlog.id, blog)
  return response
}

const getBlog = async (id) => {
  console.log(id)
  const response = await axios.get(baseUrl+'/'+id)
  return response.data
}

const deleteBlog = async (id, token) => {
  const response = await axios.delete(baseUrl + '/' + id,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  return response
}

export default { getAll , createBlog, likeBlog, getBlog, deleteBlog }