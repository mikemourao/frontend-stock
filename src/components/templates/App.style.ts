import styled from 'styled-components';
import { Layout, Col } from 'antd';
import Colors from '../../components/config/Colors';

export const Container = styled(Layout)` 
    min-height: 100vh;
`;

export const LayoutBody = styled(Layout)` 
    background-color: ${Colors.backgroundColor};
`;

export const Content = styled(Layout.Content)` 
    margin: 16px 16px;
    margin-top: 5px;
`;

export const Header = styled(Layout.Header)`
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${Colors.backgroundColor};
  position: relative; /* Necessário para posicionar o pseudo-elemento */
  width: 100%;
  z-index: 10;
  height: 56px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right, ${Colors.borderColorStart}, ${Colors.borderColorEnd});
    opacity: 0.5; /* Ajuste a opacidade conforme necessário */
    z-index: -1; /* Coloca o pseudo-elemento atrás do conteúdo do Header */
  }
`;

export const RightHeader = styled(Col)`
    display: flex;
    justify-content: flex-end;
    align-self: center;
`;
