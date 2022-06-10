// import { db } from './db'

import { createCookieSessionStorage, redirect } from '@remix-run/node'

export async function login({ username, password, redirectTo }) {
  console.log({ username, password })

  const redirect = await createUserSession('1233', redirectTo)
  return redirect
}

export async function logout(request) {
  const session = await getUserSession(request)
  return redirect('/', {
    headers: {
      'Set-Cookie': await storage.destroySession(session)
    }
  })
}

// validamos que exista la variable de session
const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set')
}

// creamos una cookie para almacenar el user id
const storage = createCookieSessionStorage({
  cookie: {
    name: 'RJ_session',
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true
  }
})

function getUserSession(request) {
  return storage.getSession(request.headers.get('Cookie'))
}

// con esta funcion podemos validar si existe un usuario logueado
export async function getUserId(request) {
  const session = await getUserSession(request)
  const userId = session.get('userId')
  if (!userId || typeof userId !== 'string') return null
  return userId
}

// con esta funcion podemos restringir rutas
export async function requireUserId(request, redirectTo = new URL(request.url).pathname) {
  const session = await getUserSession(request)
  const userId = session.get('userId')
  if (!userId || typeof userId !== 'string') {
    const searchParams = new URLSearchParams([
      ['redirectTo', redirectTo]
    ])
    throw redirect(`/auth/login?${searchParams}`)
  }
  return userId
}

// funcion para agregar el user id las cookies
export async function createUserSession(userId, redirectTo) {
  const session = await storage.getSession()
  session.set('userId', userId)
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session)
    }
  })
}
