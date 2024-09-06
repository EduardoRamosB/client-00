import React from "react";
import { Card, Container, Stack, TextInput, PasswordInput, Button, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

interface FormValues {
  email: string;
  password: string;
  confirmPassword?: string;
  username?: string;
  role?: string;
}

interface AuthFormProps {
  onSubmit: SubmitHandler<FormValues>;
  fields: {
    username?: boolean;
    confirmPassword?: boolean;
    role?: boolean;
  };
  submitLabel: string;
  isLoading: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, fields, submitLabel, isLoading }) => {
  const { control, register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>();
  const [visible, { toggle }] = useDisclosure(false);
  const password = watch("password");

  return (
    <Container size="xs" style={{ display: 'flex', justifyContent: 'center', paddingTop: '2rem' }}>
      <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '100%' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack mt="md">
            {fields.role && (
              <Controller
                name="role"
                control={control}
                rules={{ required: "Role is required" }}
                render={({ field }) => (
                  <Select
                    label="Role"
                    placeholder="Select role"
                    data={[
                      { value: 'volunteer', label: 'Volunteer' },
                      { value: 'adoptant', label: 'Adoptant' }
                    ]}
                    {...field}
                    error={errors.role?.message}
                  />
                )}
              />
            )}

            {fields.username && (
              <TextInput
                label="Username"
                placeholder="Input username"
                {...register("username", { required: "Username is required" })}
                error={errors.username?.message}
              />
            )}

            <TextInput
              label="Email"
              placeholder="Input email"
              type="email"
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

            {fields.confirmPassword && (
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
            )}

            <Button color="violet" fullWidth mt="md" radius="md" type="submit" loading={isLoading}>
              {submitLabel}
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
};

export default AuthForm;
