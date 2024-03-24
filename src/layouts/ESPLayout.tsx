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
  background-color: white;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
  border-radius: 200px;
  overflow: hidden;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MenuItem = styled(NavLink)`
  padding: 8px 16px;
  color: #424242;

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
  { url: "/esp32/device", label: "DEVICE" },
  { url: "/esp32/meter", label: "METER" },
  { url: "/esp32/calc", label: "CALCULATOR" },
];

const EspLayout: React.FC = () => {
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
          <LogoContainer>
            <Image
              style={{ borderRadius: 200 }}
              preview={false}
              src="/esp32_logo.png"
              alt="esp32"
              width={120}
              height={120}
            />
          </LogoContainer>
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

export default EspLayout;
