import { json, redirect } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { db } from '../../services/db'
import { requireUserId } from '../../services/session'

export async function loader({ request }) {
  await requireUserId(request)
  return json({})
}

export async function action({ request }) {
  const userId = await requireUserId(request)
  console.log(userId)

  const form = await request.formData()
  const title = form.get('title')
  const body = form.get('body')
  const data = { title, body }

  await db.post.create({ data })

  return redirect('/')
}

export const ErrorBoundary = ({ error }) => {
  return (
    <>
      <h2>Create new post</h2>
      <p>Algo salio mal lo sentimos {error.message}</p>
    </>
  )
}

export default function CreatePost() {
  return (
    <>
      <h2>Create new post</h2>
      <Form method="POST">
        <div>
          <label htmlFor="title">Title</label><br/>
          <input type="text" id="title" name="title" required/>
        </div>
        <div>
          <label htmlFor="body">Body</label><br/>
          <textarea type="text" id="body" name="body" required/>
        </div>
        <button type="submit">Add new Post</button>
      </Form>
    </>
  )
}
