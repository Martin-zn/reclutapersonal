import { NextResponse } from 'next/server';

const middleware = (req) => {
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;
  const hasDemo = req.cookies.get('demoEmail');

  // Redirecciones de demo-auth basadas en cookie
  if (pathname.startsWith('/auth/login') && hasDemo) {
    return NextResponse.redirect(new URL('/account', req.url));
  }
  if (pathname.startsWith('/account') && !hasDemo) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
};

export default middleware;
