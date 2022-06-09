import { useParams } from '@remix-run/react'

export default function SinglePost() {
  const params = useParams()

  return (
    <>
      <h2>Titulo {params.postId}</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis facilis deleniti voluptate ratione ea fugiat quo, tenetur mollitia odio dolorum enim vero nemo voluptatibus harum, cum dolore maiores placeat impedit?</p>
    </>
  )
}
