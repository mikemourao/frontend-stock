import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Select, Table, Typography, notification, Popconfirm } from "antd";
import { PlusOutlined, RedoOutlined, DeleteOutlined } from '@ant-design/icons';
import { listProducts, createProducts, deleteProduct } from "../../services/products";
import { IconWrapperCenter } from "../../components/templates/App.style";

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

    const handleCreateProduct = async (values: any) => {
        try {
            setLoading(true);
            const response = await createProducts(values);
            if (response.status === 200) {
                notification.success({ message: "Cadastrado com Sucesso!" })
                setReload(!reload)
                setLoading(false)
                hideModal()
            }

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (record: any) => {
        try {
            setLoading(true);
            const response = await deleteProduct(record);
            if (response.status === 200) {
                notification.success({ message: "Excluido com Sucesso!" })
                setReload(!reload)
                setLoading(false)
                hideModal()
            }

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
            "product_name",
            "type",
            "size",
            "cost"
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
                    },
                    {
                        title: "Opções",
                        dataIndex: "options",
                        key: "options",
                        align: "center",
                        render: (record: any) => {
                          return (
                            <IconWrapperCenter>
                              <Popconfirm
                                title={"Deseja realmente excluir este Material?"}
                                onConfirm={() => handleDeleteProduct(record.id)}
                                placement="leftBottom"
                                okText="Sim"
                                cancelText="Não"
                              >
                                <Button icon={<DeleteOutlined />} type="text" />
                              </Popconfirm>
                            </IconWrapperCenter>
                          );
                        },
                    },
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
                    onFinish={handleCreateProduct}
                    layout="vertical"
                    form={forms}
                    size="large"
                >
                    <Form.Item
                        name={"product_name"}
                        label={"Produto"}
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
                        name={"type"}
                        label={"Tipo"}
                        rules={[
                            {
                                required: true,
                                message: "Campo Obrigatório!"
                            }
                        ]}
                    >
                        <Select>
                            <option value={"Normal"}>{"Normal"}</option>
                            <option value={"Especial"}>{"Especial"}</option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={"size"}
                        label={"Tamanho"}
                        rules={[
                            {
                                required: true,
                                message: "Campo Obrigatório!"
                            }
                        ]}
                    >
                        <Select>
                            <option value={"P"}>{"P"}</option>
                            <option value={"M"}>{"M"}</option>
                            <option value={"G"}>{"G"}</option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={"cost"}
                        label={"Custo (R$)"}
                        rules={[
                            {
                                required: true,
                                message: "Campo Obrigatório!"
                            }
                        ]}
                    >
                        <Input type="number" step="0.01" ></Input>
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