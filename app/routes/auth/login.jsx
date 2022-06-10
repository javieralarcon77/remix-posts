import { Form, useSearchParams } from '@remix-run/react'
import { login } from '../../services/session'

export async function action({ request }) {
  const form = await request.formData()
  const username = form.get('username')
  const password = form.get('password')
  const redirectTo = form.get('redirectTo')

  const redirect = await login({ username, password, redirectTo })
  return redirect
}

export default function Login() {
  const [searchParams] = useSearchParams()

  return (
    <>
      <h2>Login</h2>
      <Form method="post">
        <input
          type="hidden"
          name="redirectTo"
          value={
            searchParams.get('redirectTo') ?? '/'
          }
        />
        <div>
          <label htmlFor="username">Username</label><br/>
          <input type="text" id="username" name="username"/>
        </div>
        <div>
          <label htmlFor="password">Password</label><br/>
          <input type="password" id="password" name="password"/>
        </div>
        <button type="submit">Login</button>
      </Form>
    </>
  )
}
