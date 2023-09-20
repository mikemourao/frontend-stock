import SidebarIndex from '../sidebar';
import SidebarData from '../../utils/SidebarData'
import { Header, Content, Container, LayoutBody, RightHeader } from './App.style';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Row } from 'antd';
import { Outlet } from 'react-router-dom';

export function App() {    
    return (
        <Container>
            <SidebarIndex items={SidebarData} />
            <LayoutBody>
                 <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} >
                     <Row>
                         <RightHeader span={12}>
                             <Popconfirm
                                placement="leftBottom"
                                title={'Deseja realmente sair?'}
                                // onConfirm={logout}
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
            </LayoutBody>
        </Container>
    );
}
