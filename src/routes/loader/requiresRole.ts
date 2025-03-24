import { useAuthStore, UserRole } from '@stores/client/useAuthStore';
import { redirect } from 'react-router-dom';

export async function requiresRole({
  request,
  allowedRoles,
}: {
  request: Request;
  allowedRoles: UserRole[];
}) {
  const { accessToken, role, identifier } = useAuthStore.getState().user;
  const url = new URL(request.url);

  if (!accessToken) {
    return redirect(`/login?redirectTo=${encodeURIComponent(url.pathname)}`);
  }

  if (!allowedRoles.includes(role)) {
    return redirect('/403');
  }

  return { accessToken, role, identifier };
}
