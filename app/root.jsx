import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react'

export const meta = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1'
})

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
        <title>Remix Posts</title>
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
