import { Layout } from 'antd';
import { Outlet } from "react-router-dom";
const { Content } = Layout;

const AppLayout = () => {
  return (
    <Layout style={{ height: "100%", position: 'relative' }}>
      <Content style={{ position: 'relative' }}>
        <Outlet />
      </Content>
    </Layout>
  );
}



export default AppLayout;