var _ = require('lodash')
const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const likes = Math.max.apply(Math, blogs.map(item => {return item.likes}))
  const favourite_blog = blogs.filter(item => item.likes === likes)
  return favourite_blog[0]
}

const mostBlogs = (blogs) => {
  blogs = _.groupBy(blogs, 'author')
  var mostblogs = 0
  var mostblogsKey = ''
  Object.keys(blogs).forEach(function(key){
    if(blogs[key].length > mostblogs){
      mostblogs = blogs[key].length
      mostblogsKey = key
    }
  })
  return { 'author': mostblogsKey, 'blogs': mostblogs }
}

const mostLikes = (blogs) => {
  const reducer = (group, item) => {
    if(item.author in group){
      group[item.author] += item.likes
    }else{
      group[item.author] = item.likes
    }
    return group
  }
  blogs = blogs.reduce(reducer, {})
  var mostlikes = 0
  var mostlikesKey = ''
  console.log(blogs)
  Object.keys(blogs).forEach(function(key){
    if(blogs[key] > mostlikes){
      mostlikes = blogs[key]
      mostlikesKey = key
    }
  })
  const result = { 'author' : mostlikesKey, 'likes': mostlikes }
  return result
}
module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}