import { Layout } from 'antd';
import { Outlet } from "react-router-dom";
const { Content } = Layout;

const AppLayout = () => (
  <Layout style={{ height: "100%" }}>
    <Content>
      <Outlet />
    </Content>
  </Layout>
);


export default AppLayout;