export default function CreatePost() {
  return (
    <>
      <h2>Create new post</h2>
      <form method="POST">
        <div>
          <label htmlFor="title">Title</label><br/>
          <input type="text" id="title" name="title"/>
        </div>
        <div>
          <label htmlFor="content">Content</label><br/>
          <textarea type="text" id="content" name="content"/>
        </div>
        <button type="submit">Add new Post</button>
      </form>
    </>
  )
}
