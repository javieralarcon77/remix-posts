import { Link, useLoaderData } from '@remix-run/react'
import { db } from '../services/db'
import { getUserId } from '../services/session'

/* se ejecuta en el servidor para recuperar la data */
export const loader = async({ request }) => {
  const posts = await db.post.findMany()
  // obtenemos el user logueado en caso de no existir devuelve null
  const user = await getUserId(request)
  return { posts, user }
}

export default function Index() {
  /* se usa para obtener los datos que devuelve el loader */
  const { posts, user } = useLoaderData()

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
          {user
            ? <Link to='/posts/create'>
              Crear un post
            </Link>
            : <Link to='/auth/login'>
              Login
            </Link>
            }
          </li>
          <li>
            <Link to='/posts/section'>
              Categorias
            </Link>
          </li>
          {user &&
            <li>
              <Link to='/auth/logout'>
                Logout
              </Link>
            </li>
          }
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
