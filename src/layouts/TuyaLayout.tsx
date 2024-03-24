import { Drawer, Image } from "antd";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

const LayoutContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100vh;
`;

const SideBar = styled.aside`
  width: 260px;
  height: 100%;
  background-color: #845EC2;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MenuItem = styled(NavLink)`
  padding: 8px 16px;
  color: white;

  &.pending {
    color: #00b9b9;
  }

  &.active {
    color: #00b96b;
  }
`;

const MainContainer = styled.main<{ is_open?: string }>`
  margin-left: ${({ is_open }) => (is_open ? 260 : 100)}px;
  flex: 1;
`;

const menuItems = [
  { url: "/tuya/device", label: "DEVICE INFO" },
  { url: "/tuya/meter", label: "CONSUME HISTORY" },
  // { url: "/tuya/current", label: "CURRENT" },
  // { url: "/tuya/voltage", label: "VOLTAGE" },
  // { url: "/tuya/kwh", label: "kWh" },
  { url: "/tuya/calc", label: "COST CALCULATION" },
  { url: "/tuya/calc", label: "OUR TEAM" },
];

const TuyaLayout: React.FC = () => {
  const [drawer] = useState<boolean>(true);
  return (
    <LayoutContainer>
      <Drawer
        open={drawer}
        width={260}
        placement="left"
        rootStyle={{ padding: 0 }}
        mask={false}
        closable={false}
        maskClosable={false}
        styles={{ body: { padding: 0 } }}
      >
        <SideBar>
          <h1 style={{color: "white", textAlign: "center"}}>Green Computing (CSE407)</h1>
          <MenuList>
            {menuItems.map((menu) => (
              <MenuItem
                key={menu.url}
                to={menu.url}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                {menu.label}
              </MenuItem>
            ))}
          </MenuList>
        </SideBar>
      </Drawer>

      <MainContainer is_open={drawer ? "true" : undefined}>
        <Outlet />
      </MainContainer>
    </LayoutContainer>
  );
};

export default TuyaLayout;
