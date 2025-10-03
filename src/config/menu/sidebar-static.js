import i18next from 'i18next';

const sidebarMenu = () => [
  {
    name: 'Procesos',
    menuItems: [
      {
        name: 'Mis procesos',
        path: `/account/procesos`,
      },
    ],
  },
  {
    name: 'Créditos',
    menuItems: [
      {
        name: 'Mis créditos',
        path: `/account/billing`,
      },
    ],
  },
  {
    name: 'Cuenta',
    menuItems: [
      {
        name: 'Cerrar sesión',
        path: `/auth/logout`,
      },
    ],
  },
];

export default sidebarMenu;
