import { redirect } from '@remix-run/node'

export async function action({ request }) {
  const form = await request.formData()
  const title = form.get('title')
  const body = form.get('body')

  console.log({ title, body })

  return redirect('/')
}

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
          <label htmlFor="body">Content</label><br/>
          <textarea type="text" id="body" name="body"/>
        </div>
        <button type="submit">Add new Post</button>
      </form>
    </>
  )
}
