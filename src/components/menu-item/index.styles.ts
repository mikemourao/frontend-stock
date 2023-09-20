import styled from 'styled-components';
import { Menu } from 'antd';

interface IMenuItemTitle {
    collapsed?: boolean
}

export const MenuItem = styled(Menu.Item)`
    padding-left: 16px !important;
`; 

export const MenuItemTitle = styled.div<IMenuItemTitle>`
    display: ${props => props.collapsed ? 'none' : 'inline'};
    margin-left: 12px;
`;