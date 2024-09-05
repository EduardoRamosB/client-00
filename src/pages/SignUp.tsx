import Layout from "../components/layout/Layout";
import { Card, Container, TextInput, Stack, PasswordInput, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { User } from "../types"; // Adjust path if necessary
import { useForm, SubmitHandler } from "react-hook-form";
import { signUp } from "../api/users.api"; // Adjust path if necessary
import { handleApiError } from "../utils/errorHandler"; // Adjust path if necessary
import { useAuth } from "../hooks/useAuth.jsx";
import {useNavigate} from "react-router-dom"; // Adjust path if necessary

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>();
  const [visible, { toggle }] = useDisclosure(false);
  const { login } = useAuth();
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<FormValues> = async data => {
    const user: User = {
      username: data.username,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword
    };

    try {
      const res = await signUp(user);
      console.log(res);

      if (res.status === 201) {
        const { id, tokens } = res.data;

        await login({ id, tokens });

        navigate('/users/dashboard')
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const password = watch("password");

  return (
    <Layout from="public">
      <Container size="xs" style={{ display: 'flex', justifyContent: 'center', paddingTop: '2rem' }}>
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '100%' }}>
          <Card.Section px="lg">
            <h1>Sign up</h1>
          </Card.Section>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack mt="md">
              <TextInput
                label="Username"
                placeholder="Input username"
                {...register("username", { required: "Username is required" })}
                error={errors.username?.message}
              />

              <TextInput
                label="Email"
                placeholder="Input email"
                type="email" // Make sure the input is of type email
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address"
                  }
                })}
                error={errors.email?.message}
              />

              <PasswordInput
                label="Password"
                description="At least 8 chars."
                placeholder="Input password"
                visible={visible}
                onVisibilityChange={toggle}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long"
                  }
                })}
                error={errors.password?.message}
              />

              <PasswordInput
                label="Confirm Password"
                description="Must be equal to password"
                placeholder="Retype password"
                visible={visible}
                onVisibilityChange={toggle}
                {...register("confirmPassword", {
                  validate: value => value === password || "Passwords must match",
                  minLength: {
                    value: 8,
                    message: "Confirm password must be at least 8 characters long"
                  }
                })}
                error={errors.confirmPassword?.message}
              />

              <Button color="violet" fullWidth mt="md" radius="md" type="submit">
                Sign Up
              </Button>
            </Stack>
          </form>
        </Card>
      </Container>
    </Layout>
  );
};

export default SignUp;
