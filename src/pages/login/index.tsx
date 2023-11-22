import { Image, Form, Input, Button } from "antd";
import { LeftContent, RightContent, Container, FormContent } from '../login/index.style';
import logoLogin from "../../assets/logo_login.png"; // Importe a imagem do logotipo
import keyUser from "../../assets/key_user.png"; // Importe a imagem do logotipo
import { Grid } from 'antd';

const { useBreakpoint } = Grid;

export function Login() {
    const [forms] = Form.useForm();
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
                        // onFinish={handleCreateUser}
                        layout="vertical"
                        form={forms}
                        size="large"
                    >
                        <Form.Item
                            name={"user"}
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
                            <Button type="primary" htmlType="submit" style={{backgroundColor: '#ff6b6bc9'}}>
                                LOGIN
                            </Button>
                        </Form.Item>
                    </Form>
                </FormContent>
            </RightContent>

        </Container>
    )
}