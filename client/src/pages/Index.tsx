import React from "react";
import { Layout, Typography } from "antd";
import Sidebar from "../components/sidebar";
import SearchBar from "../components/SearchBar";
import UserProfile from "../components/UserProfile";
import WorkspaceHeader from "../components/WorkspaceHeader";
import PostFeed from "../components/PostFeed";
import FilterSidebar from "../components/FilterSidebar";

const { Header, Content } = Layout;
const { Title } = Typography;

const Index = () => {
  return (
    <Layout style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <Sidebar />

      <Layout style={{ marginLeft: 240 }}>
        <Header
          style={{
            background: "white",
            padding: "0 24px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "64px",
          }}
        >
          <Title level={4} style={{ margin: 0, color: "#1f2937" }}>
            Hello Jacob Kristian,
          </Title>
          <UserProfile />
        </Header>

        <Content style={{ padding: "24px", background: "#f8f9fa" }}>
          <SearchBar />
          <WorkspaceHeader />

          <div
            style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <PostFeed />
            </div>
            <div style={{ flexShrink: 0 }}>
              <FilterSidebar />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Index;
