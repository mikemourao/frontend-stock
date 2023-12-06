import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Select, Space, Steps, Table, Tag, Typography, notification, theme } from "antd";
import { PlusOutlined, RedoOutlined, DeleteOutlined } from '@ant-design/icons';
import { listProducts } from "../../services/products";
import { getProductID, createReport, listReports } from "../../services/reports"
import { format } from "date-fns";

export function Reports() {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = async () => {
    try {
      await forms.validateFields(); // This ensures the form is validated before moving to the next step
      setCurrent(current + 1);
      const values = await forms.getFieldsValue();
      handleCreateReport(values);
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const [isLoading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [dataReports, setReports] = useState<any>([]);
  const [dataReport, setDataReport] = useState<any>([]);
  const [dataProduct, setProduct] = useState<any>([]);
  const [isModal, setModal] = useState(false);
  const [dataQtde, setQtde] = useState<any>(0);
  const [totalManufacturingCost, setTotalManufacturingCost] = useState<any>(0);
  const [isChangeQtde, handleChangeQtde] = useState(false);
  const [productInfo, setProductInfo] = useState<any>([]);

  const [forms] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    listReports()
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

      const allData = [];
      let totalManufacturingCost = 0;
      for (let i = 0; i < productInfo.length; i++) {
        const manufacturingCost = productInfo[i].data.data.map((v: any) => v.manufacturing_cost * dataQtde);
        const mergeData = {
          ...productInfo[i].data.data,
          ...values,
          valueManufacturing: manufacturingCost
        };
        allData.push(mergeData);
        totalManufacturingCost += manufacturingCost.reduce((acc: number, val: number) => acc + val, 0);
      }
      setDataReport(allData)
      setTotalManufacturingCost(totalManufacturingCost)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReport = async () => {
    try {
      setLoading(true);
      const data: any = []
      data.push({
        report_name: dataReport[0]?.report_name,
        product_name: dataReport.map((v: any) => ({ material: v[0]?.product_name })),
        budget: (Vl * dataQtde + Number(Watts) + Number(dataQtde)).toFixed(2),
        qtde: dataQtde
      })

      const response = await createReport(data[0]);
      if (response.status === 200) {
        notification.success({ message: "Salvo com sucesso!" })
        setReload(!reload)
        setLoading(false)
        hideModal()
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const handleReload = () => {
    setReports([]);
    setReload(!reload);
  };

  const hideModal = () => {
    forms.resetFields([
      "report_name",
      "qtde",
      "product_name",
      "products"
    ]);
    current !== 0 ? prev() : console.log('nada');
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

  const fetchProductInfo = async (productId: any) => {
    try {
      // Lógica para fazer a consulta usando o productId
      const productData = await getProductID(productId);

      // Adicione um novo objeto ao estado
      setProductInfo((prevProductInfo: any) => [
        ...prevProductInfo,
        { productId, data: productData },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const Vl = (totalManufacturingCost / dataQtde) * 1.3
  const Watts = Number(dataQtde * 0.0732).toFixed(2)

  const steps = [
    {
      title: 'Simulação',
      content:
        <>
          <Form
            onFinish={handleCreateReport}
            layout="vertical"
            form={forms}
            size="large"
            style={{ margin: 5 }}
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
              <Input type="number" onChange={handleQtdeChange}></Input>
            </Form.Item>
            {
              isChangeQtde && (
                <>
                  <Form.List name="products">
                    {(fields, { add, remove }) => (
                      <>
                        <Typography.Paragraph>Materiais</Typography.Paragraph>
                        {fields.map(({ key, name, ...resetField }) => (
                          <Space key={key} style={{ margin: 5 }} align="baseline">
                            <Form.Item
                              {...resetField}
                              name={[name, 'product_name']}
                              rules={[{ required: true, message: 'Campo obrigatório!' }]}
                            >
                              <Select
                                size="large"
                                style={{ width: 200 }}
                                maxTagCount="responsive"
                                showSearch
                                optionFilterProp="children"
                                onChange={(productId) => {
                                  fetchProductInfo(productId);
                                }}
                              >
                                {dataProduct.map((a: any) => (
                                  <Select.Option value={a["id"]} key={a["id"]}>
                                    {a["value"]}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <DeleteOutlined style={{ color: "red" }} onClick={() => remove(name)} />
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
                </>
              )
            }
          </Form>
        </>
      ,
    },
    {
      title: 'Registrar',
      content:
        <>
          <Table
            columns={[
              {
                title: "Materia Prima",
                dataIndex: "",
                key: "",
                render: ((text: any) => text[0]?.product_name)
              },
              {
                title: "Tamanho",
                dataIndex: "",
                key: "",
                render: ((text: any) => text[0]?.size)
              },
              {
                title: "Tipo",
                dataIndex: "",
                key: "",
                render: ((text: any) => text[0]?.type)
              },
              {
                title: "Custo",
                dataIndex: "",
                key: "",
                render: ((text: any) => `R$ ${text[0]?.cost}`)
              },
              {
                title: "Custo de Produção",
                dataIndex: "valueManufacturing",
                key: "valueManufacturing",
                render: ((text: any) => `R$ ${text}`)
              },
            ]}
            dataSource={dataReport}
            size="small"
            scroll={{ x: "max-content" }}
            loading={isLoading}
            footer={() => (
              <div style={{ fontSize: 15 }}>
                <strong>Qtde. Prod.:</strong> {dataQtde} <strong>|</strong>
                <strong> Custo Prod. Total:</strong> R$ {totalManufacturingCost} <strong>|</strong>
                <strong> Vl. por peça:</strong> R$ {((totalManufacturingCost / dataQtde) * 1.3).toFixed(2)} <strong>|</strong>
                <strong> Mão de Obra:</strong> R$ {dataQtde} <strong>|</strong>
                <strong> Energia:</strong> R$ {Watts} <strong>|</strong>
                <strong> Vl. Total(30%):</strong> R$ {(Vl * dataQtde + Number(Watts) + Number(dataQtde)).toFixed(2)}
              </div>
            )}
          >
          </Table>
        </>
      ,
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    marginTop: 16,
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
            title: "Materiais",
            dataIndex: "product_name",
            key: "product_name",
            render: (text: any) => (
              <>
                {JSON.parse(text).map((text: any) => {
                  let materials = `${text.material}`;
                  return (
                    <Tag color="magenta" key={materials}>
                      {materials.toUpperCase()}
                    </Tag>
                  );
                })}
              </>
            ),
          },
          {
            title: "Data de Criação",
            dataIndex: "created_at",
            key: "created_at",
            render: (text: any) => format(new Date(text), "dd/MM/yyyy | h:mm:ss a")
          },
          {
            title: "Qtde.",
            dataIndex: "qtde",
            key: "qtde",
          },
          {
            title: "Orçamento (30%)",
            dataIndex: "budget",
            key: "budget",
            render: (text: any) => `R$ ${text}`
          },
        ]}
        dataSource={dataReports}
        size="small"
        scroll={{ x: "max-content" }}
        loading={isLoading}
      >
      </Table>
      <Modal
        open={isModal}
        onCancel={hideModal}
        onOk={handleAddReport}
        okText="Salvar"
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        destroyOnClose
        maskClosable={false}
        closable={true}
        width={'40%'}
      >
        <>
          <Steps current={current} items={items} style={{ marginTop: 20 }} />
          <div style={contentStyle}>{steps[current].content}</div>
          <div style={{ marginTop: 24 }}>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Próximo
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={handleAddReport}>
                Salvar
              </Button>
            )}
          </div>
        </>
      </Modal>
    </div>
  )
}