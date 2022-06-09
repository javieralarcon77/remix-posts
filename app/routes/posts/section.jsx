import { Link, Outlet } from '@remix-run/react'

export default function IndexSection() {
  return (
    <div>
      <h1>Sections Post</h1>
      <Link to="/posts/section/recomended">
        Recomended
      </Link>
      <section>
        <Outlet/>
      </section>
    </div>
  )
}
