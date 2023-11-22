import { useState } from 'react';
import { Image, Form, Input, Button, notification } from "antd";
import { LeftContent, RightContent, Container, FormContent } from '../login/index.style';
import logoLogin from "../../assets/logo_login.png"; 
import keyUser from "../../assets/key_user.png"; 
import { Grid } from 'antd';
import { validateLogin } from "../../services/login";
import { setEmployee, setToken } from '../../services/localStorage/localStorage';

const { useBreakpoint } = Grid;

export function Login() {
    const [forms] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (values: any) => {
        try {
            setIsLoading(true);
            const name = values.name
            const password = values.password

            const userData = await validateLogin(name, password);

            if (userData.status === 200) {
                setIsLoading(false);
                notification.success({ message: "Bem Vindo!" })
                setToken(userData.data.data[0].token);
                setEmployee(JSON.stringify(userData.data.data[0].name));
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            forms.resetFields([
                "name",
                "password",
            ]);
            notification.error({ message: "Usuário ou senha incorretos." })
            setIsLoading(false);
        }
    };
    
    return (
        <Container>
            <LeftContent xs={0} sm={0} md={12} lg={12} xl={12} hidden={!useBreakpoint().md}>
                <Image
                    src={logoLogin}
                    preview={false}
                />
            </LeftContent>
            <RightContent xs={24} sm={24} md={12} lg={12} xl={12}>
                <FormContent>
                    <div>
                        <Image
                            src={keyUser}
                            preview={false}
                            width={200}
                            height={200}
                        />
                    </div>
                    <Form
                        onFinish={handleLogin}
                        layout="vertical"
                        form={forms}
                        size="large"
                    >
                        <Form.Item
                            name={"name"}
                            label={"Usuário"}
                            rules={[
                                {
                                    required: true,
                                    message: "Campo Obrigatório!"
                                }
                            ]}
                        >
                            <Input type="text"></Input>
                        </Form.Item>
                        <Form.Item
                            name={"password"}
                            label={"Senha"}
                            rules={[
                                {
                                    required: true,
                                    message: "Campo Obrigatório!"
                                }
                            ]}
                        >
                            <Input.Password ></Input.Password>
                        </Form.Item>
                        <Form.Item style={{display: "flex", justifyContent:"center"}}>
                            <Button type="primary" htmlType="submit" style={{backgroundColor: '#ff6b6bc9'}} loading={isLoading}>
                                LOGIN
                            </Button>
                        </Form.Item>
                    </Form>
                </FormContent>
            </RightContent>

        </Container>
    )
}