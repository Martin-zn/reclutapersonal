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
];

export default sidebarMenu;
