import React from 'react';
import { Menu } from 'antd';
import MenuItem from '../../components/menu-item/index';
import ISubMenu from '../../components/sub-menu/interface/index';
import { Link } from 'react-router-dom';

const Index: React.FC<ISubMenu> = (props) => {
    const { key, icon, title, items } = props;

    const renderMenuItems = ()=> {
        return (
            <>{items.map((v: any)=>
                <MenuItem
                    key={v.key} 
                    title={v.title}
                >
                    <Link to={v.path ? v.path : ''}/>
                </MenuItem>
            )}</>
        )
    }

    return (
        <Menu.SubMenu 
            {...props} 
            key={key} 
            icon={<img src={icon} alt={title} height={24} style={{marginLeft: -6}}/>} 
            title={<span style={{marginLeft: 22}}>{title}</span>}
        >
            {renderMenuItems()}
        </Menu.SubMenu>
    )
}

export default Index;