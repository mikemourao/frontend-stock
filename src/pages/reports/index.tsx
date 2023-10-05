import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Select, Space, Table, Typography } from "antd";
import { PlusOutlined, RedoOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { listProducts } from "../../services/products";
const { Paragraph } = Typography;

export function Reports() {
  const [isLoading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [dataReports, setReports] = useState<any>([]);
  const [dataProduct, setProduct] = useState<any>([]);
  const [isModal, setModal] = useState(false);
  const [dataQtde, setQtde] = useState<Number>(0);
  const [isChangeQtde, handleChangeQtde] = useState(false);

  console.log('dataQtde', dataQtde);

  const [forms] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    listProducts()
      .then((response) => {
        setReports(response.data);
        getProducts()
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [reload]);

  const handleCreateReport = async (values: any) => {
    try {
      setLoading(true);
      // console.log('prod', dataProduct);
      console.log('form', values);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleReload = () => {
    setReports([]);
    setReload(!reload);
  };

  const hideModal = () => {
    forms.resetFields([
      "qtde",
      "product_name",
      "products"
    ]);
    setModal(false)
    handleChangeQtde(false)
  };

  const getProducts = async () => {
    const response = await listProducts()
    const data: any = [];

    response.data.forEach((v: any) => {
      data.push({
        id: v.id,
        value: v.product_name,
      });
    });
    setProduct(data)
  }

  const handleQtdeChange = (event: any) => {
    const newQtde = event.target.value;
    setTimeout(() => {
      setQtde(newQtde)
      handleChangeQtde(true)
    }, 2000);
  };

  return (
    <div style={{ padding: 32 }}>
      <Row style={{ justifyContent: "space-between" }}>
        <Typography.Title level={4}>{"Lista de Orçamentos"}</Typography.Title>
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
            title: "Nome do Relatório",
            dataIndex: "report_name",
            key: "report_name",
          },
          {
            title: "Data de Criação",
            dataIndex: "created_at",
            key: "created_at",
          },
          {
            title: "Orçamento",
            dataIndex: "budget",
            key: "budget",
            render: (text: any) => `R$ ${text}`
          },
        ]}
        // dataSource={dataReports}
        size="small"
        scroll={{ x: "max-content" }}
        loading={isLoading}
      >
      </Table>
      <Modal
        title="Simulação/Cadastro de Orçamento"
        open={isModal}
        onCancel={hideModal}
        okText="Salvar"
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        destroyOnClose
        maskClosable={false}
        closable={false}
      >
        <Form
          onFinish={handleCreateReport}
          layout="vertical"
          form={forms}
          size="large"
        >
          <Form.Item
            name={"report_name"}
            label={"Nome do Relatório"}
            rules={[
              {
                required: true,
                message: "Campo Obrigatório!"
              }
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name={"qtde"}
            label={"Quantidade"}
            rules={[
              {
                required: true,
                message: "Campo Obrigatório!"
              }
            ]}
          >
            <Input width={'50%'} type="number" onChange={handleQtdeChange}></Input>
          </Form.Item>
          {
            !isChangeQtde && (
              <Form.Item>
                <Button
                  htmlType="button"
                  onClick={hideModal}
                  style={{ float: "right", marginRight: "10px" }}
                >
                  Cancelar
                </Button>
              </Form.Item>
            )
          }
          {
            isChangeQtde && (
              <>
                <Form.List name="products">
                  {(fields, { add, remove }) => (
                    <>
                      <Typography.Paragraph>Materiais</Typography.Paragraph>
                      {fields.map(({ key, name, ...resetField }) => (
                        <Space key={key} style={{ display: 'flex', marginBottom: 8, width: '100%' }} align="baseline">
                          <Form.Item
                            {...resetField}
                            name={[name, 'product_name']}
                            rules={[{ required: true, message: 'Campo obrigatório!' }]}
                            style={{ width: '100%' }}
                          >
                            <Select
                              size="large"
                              style={{ width: 450 }}
                              maxTagCount="responsive"
                              showSearch
                              optionFilterProp="children"
                            >
                              {dataProduct.map((a: any, b: any) => (
                                <Select.Option value={a["id"]} key={a["id"]}>
                                  {a["value"]}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                          Add Material
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
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
              </>
            )
          }
        </Form>
      </Modal>
    </div>
  )
}