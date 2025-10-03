import Link from 'next/link';
import {
  HomeIcon,
  UserIcon,
  CreditCardIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

const getIcon = (name) => {
  switch (name) {
    case 'Ver solicitudes':
      return <HomeIcon className="w-6 h-6" />;
    case 'Configuración':
      return <UserIcon className="w-6 h-6" />;
    case 'Créditos':
      return <CreditCardIcon className="w-6 h-6" />;
    case 'Nueva solicitud':
      return <PlusIcon className="w-6 h-6" />;
    default:
      return <HomeIcon className="w-6 h-6" />;
  }
};

const Item = ({ data, isLoading }) => {
  return isLoading ? (
    <div className="h-4 bg-gray-600 rounded animate-pulse" />
  ) : (
    <li>
      <Link
        href={data.path}
        className="flex items-center px-4 py-2 text-sm text-white hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
      >
        <span className="flex-shrink-0 text-white">{getIcon(data.name)}</span>
        <span className="ml-3 whitespace-nowrap text-white">{data.name}</span>
      </Link>
    </li>
  );
};

Item.defaultProps = {
  data: null,
  isLoading: false,
};

export default Item;
