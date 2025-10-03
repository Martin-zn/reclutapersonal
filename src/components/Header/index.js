import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  ArrowRightOnRectangleIcon,
  CogIcon,
  CreditCardIcon,
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';

const Header = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const logOut = () => {
    const result = confirm('Are you sure you want to logout?');

    if (result) {
      document.cookie = 'demoEmail=; Path=/; Max-Age=0';
      router.replace('/');
    }
  };

  const toggleTheme = (event) => {
    event.preventDefault();
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex flex-row items-center justify-between bg-brand-blue text-white px-4 py-3 rounded">
      <div />
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex items-center  justify-center px-5 py-2 space-x-3 border border-white rounded hover:bg-white/10">
            <CogIcon aria-hidden="true" className="w-5 h-5 text-white" />
            <span className=" text-white">Configuración</span>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white border divide-y divide-gray-100 rounded text-text-primary">
            <div className="p-2">
              <Menu.Item>
                <Link
                  href="/account/settings"
                  className="flex items-center w-full px-3 py-2 space-x-2 text-sm rounded hover:bg-brand-orange hover:text-white group"
                >
                  <UserCircleIcon aria-hidden="true" className="w-5 h-5" />
                  <span>{t('common.label.account')}</span>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  href="/account/billing"
                  className="flex items-center w-full px-3 py-2 space-x-2 text-sm rounded hover:bg-brand-orange hover:text-white group"
                >
                  <CreditCardIcon aria-hidden="true" className="w-5 h-5" />
                  <span>{t('common.label.billing')}</span>
                </Link>
              </Menu.Item>
            </div>
            {/* <div className="p-2">
              <Menu.Item>
                <Link
                  href="/"
                  className="flex items-center w-full px-3 py-2 space-x-2 text-sm rounded hover:bg-brand-orange hover:text-white group"
                >
                  <ComputerDesktopIcon aria-hidden="true" className="w-5 h-5" />
                  <span>{t('common.label.landingpage')}</span>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <button
                  className="flex items-center w-full px-3 py-2 space-x-2 text-sm rounded hover:bg-brand-orange hover:text-white group"
                  onClick={toggleTheme}
                >
                  {theme === 'dark' ? (
                    <>
                      <SunIcon className="w-5 h-5" />
                      <span>{t('common.label.light.mode')}</span>
                    </>
                  ) : (
                    <>
                      <MoonIcon className="w-5 h-5" />
                      <span>{t('common.label.dark.mode')}</span>
                    </>
                  )}
                </button>
              </Menu.Item>
            </div> */}
            <div className="p-2">
              <Menu.Item>
                <button
                  className="flex items-center w-full px-3 py-2 space-x-2 text-sm rounded hover:bg-brand-orange hover:text-white group"
                  onClick={logOut}
                >
                  <ArrowRightOnRectangleIcon
                    aria-hidden="true"
                    className="w-5 h-5"
                  />
                  <span>{t('common.label.logout')}</span>
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Header;
