import { useState } from 'react';
import Link from 'next/link';

import Actions from './actions';
import Menu from './menu';
import sidebarMenu from '@/config/menu/sidebar-static';
import { useWorkspaces } from '@/hooks/data';
import { useWorkspace } from '@/providers/workspace';
import { Bars3Icon } from '@heroicons/react/24/outline';

const staticMenu = sidebarMenu();

const Sidebar = ({ menu }) => {
  const [showMenu, setMenuVisibility] = useState(false);
  const { data, isLoading } = useWorkspaces();
  const { workspace } = useWorkspace();

  const renderMenu = () => {
    return (
      workspace &&
      menu.map((item, index) => (
        <Menu
          key={index}
          data={item}
          isLoading={isLoading}
          showMenu={data?.workspaces.length > 0 || isLoading}
        />
      ))
    );
  };

  const renderStaticMenu = () => {
    return staticMenu.map((item, index) => (
      <Menu key={index} data={item} showMenu={true} />
    ));
  };

  const toggleMenu = () => setMenuVisibility(!showMenu);

  return (
    <aside className="sticky z-40 flex flex-col space-y-5 text-white bg-brand-blue md:overflow-y-auto md:w-1/6 h-screen overscroll-contain">
      <div className="relative flex items-center justify-center p-5 text-center border-b border-white/20">
        <Link
          href="/account"
          className="flex items-center justify-center space-x-2"
        >
          {/* <span className="text-2xl font-bold text-white">RP</span> */}
          <span className="text-2xl font-bold text-white">RECLUTECH</span>
        </Link>
        <button className="absolute right-0 p-5 md:hidden" onClick={toggleMenu}>
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>
      <div
        className={[
          'flex-col space-y-5 md:flex md:relative md:top-0',
          showMenu
            ? 'absolute top-12 bg-brand-blue right-0 left-0 h-screen'
            : 'hidden',
        ].join(' ')}
      >
        <Actions />
        <div className="mt-auto p-5">
          <button
            className="w-full flex items-center justify-center px-5 py-2 rounded  bg-brand-orange hover:bg-white/20 text-white space-x-2"
            onClick={() => {
              window.location.href = '/account/nuevo-proceso';
            }}
          >
            <span className="text-white">+ Nuevo Proceso</span>
          </button>
        </div>

        <div className="flex flex-col p-5 space-y-10">
          {renderStaticMenu()}
          {renderMenu()}
        </div>
      </div>
      <div className="mt-auto p-5">
        <button
          className="w-full flex items-center justify-center px-5 py-2 rounded bg-white/10 hover:bg-white/20 text-white space-x-2"
          onClick={() => {
            document.cookie = 'demoEmail=; Path=/; Max-Age=0';
            window.location.href = '/';
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="text-white">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
