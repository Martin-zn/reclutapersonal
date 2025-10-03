import { NextResponse } from 'next/server';

const middleware = (req) => {
  const { host } = new URL(process.env.APP_URL);
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;
  const hostname = req.headers.get('host');
  const currentHost = hostname.replace(`.${host}`, '');
  const hasDemo = req.cookies.get('demoEmail');

  // Redirecciones de demo-auth basadas en cookie
  if (pathname.startsWith('/auth/login') && hasDemo) {
    return NextResponse.redirect(new URL('/account', req.url));
  }
  if (pathname.startsWith('/account') && !hasDemo) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
  if (pathname.startsWith(`/_sites`)) {
    return new Response(null, { status: 404 });
  }

  if (!pathname.includes('.') && !pathname.startsWith('/api')) {
    if (hostname === host) {
      url.pathname = `${pathname}`;
    } else {
      url.pathname = `/_sites/${currentHost}${pathname}`;
    }

    return NextResponse.rewrite(url);
  }
};

export default middleware;
