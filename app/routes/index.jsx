import { Link, useLoaderData } from '@remix-run/react'
import { db } from '../services/db'

/* se ejecuta en el servidor para recuperar la data */
export const loader = async() => {
  const posts = await db.post.findMany()
  return { posts }
}

export default function Index() {
  /* se usa para obtener los datos que devuelve el loader */
  const { posts } = useLoaderData()

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
          <li>
            <Link to='/posts/section'>
              Categorias
            </Link>
          </li>
        </ul>
      </nav>
      {posts.map(post => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}
