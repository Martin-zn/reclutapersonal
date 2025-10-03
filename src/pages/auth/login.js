import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import isEmail from 'validator/lib/isEmail';

import Meta from '@/components/Meta/index';
import { AuthLayout } from '@/layouts/index';

const Login = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [isSubmitting, setSubmittingState] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [name, setName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [company, setCompany] = useState('');
  const [rut, setRut] = useState('');
  const [industry, setIndustry] = useState('');

  useEffect(() => {
    // La redirección por sesión demo ahora la maneja el middleware (vía cookie)
    const stored = null;
    if (stored) {
      // Si ya existe sesión demo, redirigir
      router.replace('/account');
    }
  }, [router]);

  const onSubmitLogin = (event) => {
    event.preventDefault();
    setSubmittingState(true);
    if (isEmail(loginEmail) && loginPassword.length > 0) {
      document.cookie = `demoEmail=${encodeURIComponent(
        loginEmail
      )}; Path=/; Max-Age=${60 * 60 * 24 * 7}`;
      router.replace('/account');
    } else {
      setSubmittingState(false);
    }
  };

  const onSubmitRegister = (event) => {
    event.preventDefault();
    setSubmittingState(true);
    if (name && isEmail(regEmail) && regPassword.length > 0) {
      document.cookie = `demoEmail=${encodeURIComponent(
        regEmail
      )}; Path=/; Max-Age=${60 * 60 * 24 * 7}`;
      // Podríamos guardar datos adicionales en localStorage si se requiere para la demo
      router.replace('/account');
    } else {
      setSubmittingState(false);
    }
  };

  return (
    <AuthLayout>
      <Meta
        title="reclutapersonal | Login"
        description="Demo de reclutapersonal"
      />
      <div className="min-h-screen flex items-center justify-center bg-section-muted w-full">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <div className="mb-6 text-center">
            <Link
              href="/"
              className="text-3xl font-extrabold text-text-primary"
            >
              reclutapersonal
            </Link>
          </div>
          <div className="flex w-full mb-6 overflow-hidden border border-gray-200 rounded">
            <button
              className={`w-1/2 px-4 py-2 text-center font-medium ${
                activeTab === 'login'
                  ? 'bg-brand-blue text-white'
                  : 'bg-gray-100 text-text-primary'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Ingresar
            </button>
            <button
              className={`w-1/2 px-4 py-2 text-center font-medium ${
                activeTab === 'register'
                  ? 'bg-brand-blue text-white'
                  : 'bg-gray-100 text-text-primary'
              }`}
              onClick={() => setActiveTab('register')}
            >
              Registrarse
            </button>
          </div>

          {activeTab === 'login' ? (
            <form
              className="flex flex-col w-full space-y-4"
              onSubmit={onSubmitLogin}
            >
              <div>
                <label className="block mb-1 text-sm font-semibold text-text-primary">
                  Correo
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  placeholder="correo@empresa.com"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-semibold text-text-primary">
                  Contraseña
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  placeholder="********"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <button
                className="py-2 rounded disabled:opacity-75 bg-brand-orange text-white"
                disabled={isSubmitting}
                type="submit"
              >
                Ingresar
              </button>
            </form>
          ) : (
            <form
              className="flex flex-col w-full space-y-4"
              onSubmit={onSubmitRegister}
            >
              <div>
                <label className="block mb-1 text-sm font-semibold text-text-primary">
                  Nombre
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  placeholder="Tu nombre"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-semibold text-text-primary">
                  Correo
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  placeholder="correo@empresa.com"
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-semibold text-text-primary">
                  Contraseña
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  placeholder="********"
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-semibold text-text-primary">
                  Nombre empresa
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  placeholder="Mi Empresa S.A."
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-semibold text-text-primary">
                  RUT (opcional)
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  placeholder="12.345.678-9"
                  type="text"
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-semibold text-text-primary">
                  Rubro o campo
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  placeholder="Construcción, Tecnología, etc."
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                />
              </div>
              <button
                className="py-2 rounded disabled:opacity-75 bg-brand-orange text-white"
                disabled={isSubmitting}
                type="submit"
              >
                Crear cuenta
              </button>
            </form>
          )}
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
