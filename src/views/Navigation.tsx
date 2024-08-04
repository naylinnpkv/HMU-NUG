import React from "react";
import { Layout as AntLayout } from "antd";
import { Anchor } from "antd";
const { Header, Content, Footer, Sider } = AntLayout;

const { Link } = Anchor;

interface Item {
  key: string;
  href: string;
  title: string;
}

interface AnchorProps {
  items: Item[];
}
const items = [
  { key: "1", href: "#section1", title: "Section 1" },
  { key: "2", href: "#section2", title: "Section 2" },
  { key: "3", href: "#section3", title: "Section 3" },
];

const CustomAnchor: React.FC<AnchorProps> = ({ items }) => (
  <Anchor style={{ lineHeight: "64px" }}>
    {items.map((item) => (
      <Link key={item.key} href={item.href} title={item.title} />
    ))}
  </Anchor>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AntLayout style={{ minHeight: "100vh" }}>
    <Header style={{ background: "#fff", padding: "0 16px" }}>
      <CustomAnchor items={items} />
    </Header>
    <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
      {children}
    </Content>
    <Footer style={{ textAlign: "center" }}>Your App ©2024</Footer>
  </AntLayout>
);

export default Layout;
