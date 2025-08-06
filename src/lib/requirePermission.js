import { getUserFromHeader } from './auth';
import UserRole from '@/app/model/role';

export function requirePermission(requiredPermission) {
  return async (req) => {
    const user = await getUserFromHeader(req);
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    // role already contains permissions (as array of strings)
    const role = await UserRole.findById(user.role);
    if (!role || !role.permissions.includes(requiredPermission)) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
    }

    return null; // permission granted
  };
}
