import React from "react";
import { Layout } from 'antd';
import { Outlet } from "react-router-dom";
const { Content } = Layout;

const AppLayout: React.FC = () => {
    return (
        <Layout>
            <Content>
                <Outlet />
            </Content>
        </Layout>
    );
}

export default AppLayout;