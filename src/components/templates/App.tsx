import { useState } from 'react';
import SidebarIndex from '../sidebar';
import SidebarData from '../../utils/SidebarData'
import { Header, Content, Container, LayoutBody, RightHeader } from './App.style';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Row, Spin } from 'antd';
import { Outlet } from 'react-router-dom';
import { Login } from '../../pages/login';
import { clearLocalStorages } from '../../services/localStorage/localStorage';
import Footer from '../../components/footer/index';

const getUserToken = localStorage.getItem('@StockB:token');

export function App() {
    const [isLoading, setIsLoading] = useState(false);

    const logout = () => {
        setIsLoading(true);
        setTimeout(() => {
            clearLocalStorages();
            setIsLoading(false);
        }, 1000);
    }

    return (
        getUserToken === null ? <Login /> :
            <Spin spinning={isLoading}>
                <Container>
                    <SidebarIndex items={SidebarData} />
                    <LayoutBody>
                        <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} >
                            <Row>
                                <RightHeader span={12}>
                                    <Popconfirm
                                        placement="leftBottom"
                                        title={'Deseja realmente sair?'}
                                        onConfirm={logout}
                                        okText="Sim"
                                        cancelText="Não"
                                    >
                                        <Button type='link' icon={<PoweroffOutlined style={{ fontSize: 20 }} />}></Button>
                                    </Popconfirm>
                                </RightHeader>
                            </Row>
                        </Header>
                        <Content>
                            <Outlet />
                        </Content>
                        <Footer />
                    </LayoutBody>
                </Container>
            </Spin>
    );
}
