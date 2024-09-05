import Layout from "../components/layout/Layout.tsx";
import {Card, Container, TextInput, Stack, PasswordInput, Button} from "@mantine/core";

const SignUp = () => {
  return (
    <Layout from="public">
      <Container size="xs" style={{ display: 'flex', justifyContent: 'center', paddingTop: '2rem' }}>
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '100%' }}>
          <Card.Section px="lg">
            <h1>Sign up</h1>
          </Card.Section>

          <Stack mt="md">
            <TextInput
              label="Username"
              placeholder="Input username"
            />
            <PasswordInput
              label="Pasword"
              description="At least 8 chars."
              placeholder="Input password"
            />
            <PasswordInput
              label="Confirmation Password"
              description="Must be equal to Pasword"
              placeholder="Retype password"
            />
            <Button color="violet" fullWidth mt="md" radius="md">
              Sign Up
            </Button>
          </Stack>
        </Card>
      </Container>
    </Layout>
  );
}

export default SignUp;
