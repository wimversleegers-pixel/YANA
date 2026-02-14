export function hasRole(roles: string[] | undefined, needed: string) {
  return Boolean(roles?.includes(needed) || roles?.includes('ADMIN'));
}
