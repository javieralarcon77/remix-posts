import { json, redirect } from '@remix-run/node'
import { Form, useActionData, useTransition } from '@remix-run/react'

import { db } from '../../services/db'
import { requireUserId } from '../../services/session'

const badRequest = data => {
  return json(data, { status: 400 })
}

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
  const fields = { title, body }

  // delay para probar el useTransition
  // await new Promise(resolve => setTimeout(resolve, 1000))
  const fieldsErrors = {
    title: title < 3 ? 'Title must be at least 3 characters' : null,
    body: body < 10 ? 'Body must be at least 10 characters' : null
  }

  const hasErrors = Object.values(fieldsErrors).some(Boolean)

  if (hasErrors) {
    return badRequest({ fieldsErrors, fields })
  }

  const post = await db.post.create({ data: fields })
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
  const actionData = useActionData() // recupera el objeto del bad request
  const { fieldsErrors } = actionData ?? {}

  return (
    <>
      <h2>Create new post</h2>
      <Form method="POST">
        <div>
          <label htmlFor="title">Title</label><br/>
          <input type="text" id="title" name="title" placeholder="Title"/>
          {fieldsErrors?.title && <small style={{ color: 'red' }}>{fieldsErrors.title}</small>}
        </div>
        <div>
          <label htmlFor="body">Body</label><br/>
          <textarea type="text" id="body" name="body" placeholder="Body"/>
          {fieldsErrors?.body && <small style={{ color: 'red' }}>{fieldsErrors.body}</small>}
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
