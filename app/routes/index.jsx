import { Link } from '@remix-run/react'

export default function Index() {
  return (
    <div>
      <h1>Remix Posts</h1>
      <nav>
        <ul>
          <li>
            <Link to='/about'>
              Ir al about
            </Link>
          </li>
          <li>
            <Link to='/posts/create'>
              Crear un post
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
