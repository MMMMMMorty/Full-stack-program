const NewNote = (props) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={props.HandleCreateBlog}>
        <div>
          title
          <input
            type="text"
            value={props.title}
            name="title"
            id="title"
            onChange={props.HandleTitle}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={props.author}
            name="author"
            id="author"
            onChange={props.HandleAuthor}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={props.url}
            name="url"
            id="url"
            onChange={props.HandleUrl}
          />
        </div>
        <button id="create-button" type="submit">create</button>
      </form>
    </div>
  )

}
export default NewNote