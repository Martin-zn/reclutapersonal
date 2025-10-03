import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { Toaster } from 'react-hot-toast';

const AuthLayout = ({ children }) => {
  const router = useRouter();
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('light');
  }, [setTheme]);

  return (
    <main className="relative flex flex-col items-center justify-center h-screen">
      <Toaster position="bottom-center" toastOptions={{ duration: 10000 }} />
      {children}
    </main>
  );
};

export default AuthLayout;
