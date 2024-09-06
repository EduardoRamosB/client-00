import React from "react";
import Layout from "../components/layout/Layout.tsx";
import {useAuth} from "../hooks/useAuth.tsx";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Layout user={user} from="authenticated">
      <h1>Dashboard</h1>
    </Layout>
  );
};

export default Dashboard;
