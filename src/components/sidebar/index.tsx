import { useState } from "react";
import { Grid } from "antd";
import { Sider, Menu, Trigger } from "./index.styles";
import MenuItem from "../menu-item/index";
import SubMenu from "../../components/sub-menu/index";
import ISidebar from "../../components/sidebar/interface/index";
import { Link, useLocation } from "react-router-dom";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import logoImage from "../../assets/logo_user.png"; // Importe a imagem do logotipo

const { useBreakpoint } = Grid;

export function Index(props: ISidebar) {
  const [collapsed, setCollapsed] = useState(true);
  const { items } = props;
  const { pathname } = useLocation();

  const screens = useBreakpoint();

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  const TriggerButton = () => {
    return (
      <Trigger>
        {!collapsed ? (
          <LeftOutlined style={{ color: "white" }} />
        ) : (
          <RightOutlined style={{ color: "white" }} />
        )}
      </Trigger>
    );
  };

  const handleMenuItem = () => {
    return (
      <>
        {items.map((v) => {
          if (v.items) {
            return (
              <SubMenu
                title={v.title}
                key={v.key}
                icon={v.icon}
                items={v.items}
              />
            );
          }
          return (
            <MenuItem key={v.key} icon={v.icon} title={v.title}>
              <Link to={v.path ? v.path : ""} />
            </MenuItem>
          );
        })}
      </>
    );
  };

  return (
    <Sider
      {...props}
      collapsible
      collapsed={collapsed}
      breakpoint="md"
      collapsedWidth={0}
      onCollapse={onCollapse}
      trigger={<TriggerButton />}
      fixed={!screens.md}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img alt="Logo" src={logoImage} width={90} height={80} />
      </div>
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        selectable
        selectedKeys={[`${pathname}`]}
      >
        {handleMenuItem()}
      </Menu>
    </Sider>
  );
}

export default Index;
