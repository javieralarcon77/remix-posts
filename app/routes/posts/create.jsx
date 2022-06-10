import { json, redirect } from '@remix-run/node'
import { Form, useTransition } from '@remix-run/react'

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

  // delay para probar el useTransition
  // await new Promise(resolve => setTimeout(resolve, 1000))

  const post = await db.post.create({ data })
  return redirect(`/posts/${post.id}`)
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
  const { state } = useTransition()

  return (
    <>
      <h2>Create new post</h2>
      <Form method="POST">
        <div>
          <label htmlFor="title">Title</label><br/>
          <input type="text" id="title" name="title" placeholder="Title"/>
        </div>
        <div>
          <label htmlFor="body">Body</label><br/>
          <textarea type="text" id="body" name="body" placeholder="Body"/>
        </div>
        <button type="submit" disabled={state === 'submitting'}>
          {state === 'submitting'
            ? 'Wait for it...'
            : 'Add new Post'
          }
        </button>
      </Form>
    </>
  )
}
