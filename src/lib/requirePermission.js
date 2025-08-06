import Role from '@/app/model/role'
import { getUserFromHeader } from './auth'

export function requirePermission(requiredPermission) {
  return async (req) => {
    const user = await getUserFromHeader(req)
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const role = await Role.findById(user.role)
    if (!role || !role.permissions.includes(requiredPermission)) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 })
    }

    return null
  }
}
