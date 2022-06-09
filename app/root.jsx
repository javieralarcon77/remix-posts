import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react'

import globalStyles from './styles/global.css'

export const meta = () => ({
  charset: 'utf-8',
  title: 'Remix Posts',
  viewport: 'width=device-width,initial-scale=1'
})

export const links = () => ([
  {
    rel: 'stylesheet',
    href: globalStyles
  }
])

function Layout() {
  return (
    <>
      <header>
        <h1>Remix Posts</h1>
      </header>
      <Outlet />
      <footer>Copyrigth 2022</footer>
    </>
  )
}

export default function App() {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
