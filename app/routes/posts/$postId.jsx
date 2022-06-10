import { useLoaderData } from '@remix-run/react'
import { db } from '../../services/db'

export async function loader({ params }) {
  const post = await db.post.findUnique({
    where: {
      id: params.postId
    }
  })
  return { post }
}

export const ErrorBoundary = () => {
  return (
    <>
      <h2>Post not Found</h2>
      <p>El post que buscabas ya no existe</p>
    </>
  )
}

export const meta = ({ data }) => {
  const { post } = data
  return { title: `Remix Posts | ${post?.title || 'Not Found'}` }
}

export default function SinglePost() {
  const { post } = useLoaderData()

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <small>{post.createdAt}</small>
    </>
  )
}
