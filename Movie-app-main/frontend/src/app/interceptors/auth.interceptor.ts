import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access');

  const isAuthRequest =
    req.url.includes('/api/auth/login/') ||
    req.url.includes('/api/auth/register/') ||
    req.url.includes('/api/auth/refresh/');

  if (token && !isAuthRequest) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};