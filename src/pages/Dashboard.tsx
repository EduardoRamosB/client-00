import React from "react";
import Layout from "../components/layout/Layout.tsx";

const Dashboard: React.FC = () => {
  return (
    <Layout from='authenticated'>
      <h1>Dashboard</h1>
    </Layout>
  )
}

export default Dashboard