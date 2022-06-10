import { logout } from '../../services/session'

export async function loader({ request }) {
  return logout(request)
}
