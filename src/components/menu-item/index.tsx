import IMenuItem from '../../components/menu-item/interface/index';
import { MenuItem, MenuItemTitle } from './index.styles';

export function MenuItemIndex ({ key, icon, title, children }: IMenuItem) {
    const handleIcon = () => {
      return icon ? { icon: <img src={icon} alt={title} height={50} /> } : null;
    };
  
    return (
      <MenuItem {...handleIcon()} key={key}>
        <MenuItemTitle>{title}</MenuItemTitle>
        {children}
      </MenuItem>
    );
  }
  

export default MenuItemIndex;