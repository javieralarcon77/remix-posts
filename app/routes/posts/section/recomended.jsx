import { useLoaderData } from '@remix-run/react'

/* se ejecuta en el servidor para recuperar la data */
export const loader = () => {
  const data = {
    posts: [
      {
        id: 3,
        title: 'Post 3',
        content: 'Este es un recomendado.'
      }
    ]
  }
  return data
}

export default function Index() {
  /* se usa para obtener los datos que devuelve el loader */
  const { posts } = useLoaderData()

  return (
    <>
      <h3>Recomended</h3>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <p>{post.title}</p>
            <small>{post.content}</small>
          </li>
        ))}
      </ul>
    </>
  )
}
