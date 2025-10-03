import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    signOut({ callbackUrl: '/auth/login' });
  }, []);

  return null;
};

export default Logout;