import { redirect, type MiddlewareFunction } from 'react-router';
import { authContext } from './authContext';

export async function authMiddleware({
  context,
  request,
}: Parameters<MiddlewareFunction>[0]) {
  const token = localStorage.getItem('token');

  if (new URL(request.url).pathname === '/login') {
    return;
  }

  if (!token) {
    return redirectToLogin(request.url);
  }

  const isTokenExpired = new Date().getTime() > parseInt(token, 10);

  if (isTokenExpired) {
    return redirectToLogin(request.url);
  }

  context.set(authContext, { token });
}

/**
 * Redirects the user to the login page with return URL
 */
function redirectToLogin(currentUrl: string) {
  const loginUrl = new URL('/login', currentUrl);
  loginUrl.searchParams.set('from', new URL(currentUrl).pathname);

  localStorage.removeItem('token');

  throw redirect(loginUrl.toString());
}
