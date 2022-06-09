import { Link, useLoaderData } from '@remix-run/react'

/* se ejecuta en el servidor para recuperar la data */
export const loader = () => {
  const data = {
    posts: [
      {
        id: 1,
        title: 'Post 1',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
      },
      {
        id: 2,
        title: 'Post 2',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
      },
      {
        id: 3,
        title: 'Post 3',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
      }
    ]
  }
  return data
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
          <p>{post.title}</p>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}
