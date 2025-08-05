export function hasPermission(user, permission) {
  return user?.role?.permissions?.includes(permission);
}
