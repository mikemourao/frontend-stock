import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Table, Typography, notification } from "antd";
import { PlusOutlined, RedoOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { listProducts } from "../../services/products";

export function Products() {
    const [isLoading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [dataProducts, setProducts] = useState<any>([]);
    const [isModal, setModal] = useState(false);

    const [forms] = Form.useForm();

    useEffect(() => {
        setLoading(true);
        listProducts()
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [reload]);

    const handleCreateUser = async (values: any) => {
        try {
            setLoading(true);
            console.log('values', values);
            
            // const response = await createUser(values);

            // if (response.status === 200) {
            //     notification.success({ message: "Cadastrado com Sucesso!" })
            //     setReload(!reload)
            //     setLoading(false)
            //     hideModal()
            // }

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleReload = () => {
        setProducts([]);
        setReload(!reload);
    };

    const hideModal = () => {
        forms.resetFields([
            "name",
            "password",
        ]);
        setModal(false)
    };

    return (
        <div style={{ padding: 32 }}>
            <Row style={{ justifyContent: "space-between" }}>
                <Typography.Title level={4}>{"Lista de Materiais"}</Typography.Title>
                <Col>
                    <Button className="button-with-gradient" type="default" shape="round" icon={<PlusOutlined />} onClick={() => setModal(true)} />
                    <Button className="button-with-gradient" style={{ marginLeft: 5 }} type="default" shape="round" icon={<RedoOutlined />} onClick={handleReload} />
                </Col>
            </Row>
            <Table
                columns={[
                    {
                        title: "ID",
                        dataIndex: "id",
                        key: "id",
                    },
                    {
                        title: "Produto",
                        dataIndex: "product_name",
                        key: "product_name",
                    },
                    {
                        title: "Tipo",
                        dataIndex: "type",
                        key: "type",
                    },
                    {
                        title: "Tamanho",
                        dataIndex: "size",
                        key: "size",
                    },
                    {
                        title: "Custo",
                        dataIndex: "cost",
                        key: "cost",
                        render: (text: any) => `R$ ${text}`
                    }
                ]}
                dataSource={dataProducts}
                size="small"
                scroll={{ x: "max-content" }}
                loading={isLoading}
            >
            </Table>
            <Modal
                title="Cadastro de Materiais"
                open={isModal}
                onCancel={hideModal}
                okText="Cadastrar"
                okButtonProps={{ style: { display: "none" } }}
                cancelButtonProps={{ style: { display: "none" } }}
                destroyOnClose
                maskClosable={false}
                closable={false}
            >
                <Form
                    onFinish={handleCreateUser}
                    layout="vertical"
                    form={forms}
                    size="large"
                >
                    <Form.Item
                        name={"name"}
                        label={"Nome"}
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
                        <Input.Password
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />

                    </Form.Item>
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            style={{
                                float: "right",
                                backgroundColor: "#ff6b6bc9",
                                color: "white",
                            }}
                        >
                            Cadastrar
                        </Button>
                        <Button
                            htmlType="button"
                            onClick={hideModal}
                            style={{ float: "right", marginRight: "10px" }}
                        >
                            Cancelar
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}