import { Button, Col, Row, Table, Typography } from "antd";
import { PlusOutlined, RedoOutlined } from '@ant-design/icons';

export function Users() {
    return (
        <div style={{ padding: 32 }}>
            <Row style={{ justifyContent: "space-between" }}>
                <Typography.Title level={4}>{"Lista de Usuários"}</Typography.Title>
                <Col>
                    <Button className="button-with-gradient" type="default" shape="round" icon={<PlusOutlined />} />
                    <Button className="button-with-gradient" style={{ marginLeft: 5 }} type="default" shape="round" icon={<RedoOutlined />} />
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
                        title: "Nome",
                        dataIndex: "name",
                        key: "name",
                    }
                ]}
                dataSource={[
                    {
                        id: 1,
                        name: "mike"
                    },
                    {
                        id: 2,
                        name: "bruna"
                    }
                ]}
                size="small"
                scroll={{ x: "max-content"}}
            >
            </Table>
        </div>
    )
}