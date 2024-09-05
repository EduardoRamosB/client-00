import Layout from "../components/layout/Layout";
import AuthForm from "../components/auth/AuthForm";
import { logIn } from "../api/users.api";
import { handleApiError } from "../utils/errorHandler";
import { useAuth } from "../hooks/useAuth.tsx";
import { useNavigate } from "react-router-dom";
import {Center} from "@mantine/core";

const LoginPage = () => {
  const { login: performLogin } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const res = await logIn(data.email, data.password);
      console.log('res:', res)

      if (res.status === 200) {
        const { id, tokens } = res.data;
        performLogin({ id, tokens });

        navigate("/users/dashboard");
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <Layout from="public">
      <Center>
        <h1>Login</h1>
      </Center>
      <AuthForm
        onSubmit={onSubmit}
        fields={{ username: false, confirmPassword: false }}
        submitLabel="Log In"
      />
    </Layout>
  );
};

export default LoginPage;
