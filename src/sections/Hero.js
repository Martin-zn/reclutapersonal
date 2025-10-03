import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showMenu, setMenuVisibility] = useState(false);

  useEffect(() => {
    // Check for demo cookie
    const hasDemo = document.cookie.includes('demoEmail=');
    setIsAuthenticated(hasDemo);
  }, []);

  const toggleMenu = () => setMenuVisibility(!showMenu);
  const { t } = useTranslation();

  return (
    <div className="w-full py-10">
      <div className="relative flex flex-col px-10 mx-auto space-y-5 md:w-3/4">
        <header className="flex items-center justify-between space-x-3">
          <Link href="/" className="text-2xl font-bold">
            reclutapersonal
          </Link>
          <button className="md:hidden" onClick={toggleMenu}>
            {!showMenu ? (
              <Bars3Icon className="w-8 h-8" />
            ) : (
              <XMarkIcon className="w-8 h-8" />
            )}
          </button>
          <div
            className={[
              'items-center justify-center md:flex-row md:flex md:relative md:bg-transparent md:shadow-none md:top-0 md:backdrop-blur-none md:space-x-3',
              showMenu
                ? 'absolute z-50 flex flex-col py-5 space-x-0 rounded shadow-xl md:py-0 left-8 right-8 bg-white top-24 space-y-3 md:space-y-0 px-5'
                : 'hidden',
            ].join(' ')}
          >
            <nav className="flex flex-col w-full space-x-0 space-y-3 text-center md:space-y-0 md:space-x-3 md:flex-row">
              <a className="px-5 py-2 rounded hover:bg-gray-100">
                {t('common.label.guides')}
              </a>
              <a className="px-5 py-2 rounded hover:bg-gray-100">
                {t('common.label.pricing')}
              </a>
              <a className="px-5 py-2 rounded hover:bg-gray-100">
                {t('common.label.blog')}
              </a>
            </nav>
            <Link
              href={isAuthenticated ? '/account' : '/auth/login'}
              className="w-full px-5 py-2 text-center text-white bg-brand-orange rounded shadow hover:opacity-90"
            >
              {isAuthenticated ? 'Ir al Dashboard' : 'Ingresar'}
            </Link>
          </div>
        </header>
        <div className="flex flex-col items-center justify-center pt-10 mx-auto md:w-3/5">
          <h1 className="text-6xl font-extrabold text-center">
            <span className="block">Construye plataformas SaaS</span>
            <span className="block text-brand-orange">como nunca antes</span>
          </h1>
          <p className="mt-5 text-center text-gray-600">
            Construye rápidamente páginas de aterrizaje que te ayudarán a
            obtener resultados rápidos
          </p>
        </div>
        <div className="flex items-center justify-center space-x-5">
          <a className="px-10 py-3 text-center text-white bg-brand-orange rounded shadow hover:opacity-90">
            Comenzar
          </a>
          <a className="px-10 py-3 text-center text-brand-orange rounded shadow hover:bg-orange-50">
            Demo en vivo
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
