import Item from './item';

const Menu = ({ data, isLoading, showMenu }) => {
  return showMenu ? (
    <div className="transition-all duration-300">
      <h5 className="text-sm font-bold text-white px-4 text-left">
        {data.name}
      </h5>
      <ul className="space-y-1">
        {data.menuItems.map((entry, index) => (
          <Item key={index} data={entry} isLoading={isLoading} />
        ))}
      </ul>
    </div>
  ) : null;
};

Menu.defaultProps = {
  isLoading: false,
  showMenu: false,
};

export default Menu;
