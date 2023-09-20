import styled from 'styled-components';
import { Layout, Menu as MenuAntd } from 'antd';
import Color from '../../components/config/Colors';

interface ISider {
    fixed?: boolean
}

export const Sider = styled(Layout.Sider)<ISider>`
    background: linear-gradient(to bottom, ${Color.borderColorStart}, ${Color.borderColorEnd}) !important;
    opacity: 0.5;
    padding-top: 0px;
    position: ${props => props.fixed ? 'fixed' : 'relative'};
    height: 100vh;
    z-index: 99;
`;

export const Menu = styled(MenuAntd)`
    background: none;
    border-right: unset;
`;

export const Trigger = styled.div`
    background-color: none;
`;