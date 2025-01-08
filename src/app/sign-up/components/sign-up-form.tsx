"use client";

import { useState } from "react";
import { Button, Paper, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { getErrorMessage } from "@/lib/utils";
import { zodResolver } from "mantine-form-zod-resolver";
import FormDebug from "@/components/form-debug";
import {
  SignUpFormZodSchema,
  TSignUpForm,
} from "@/zod-schema/register-form-schema";
import { authClient } from "@/lib/auth/auth-client";
import { getRandomUserName } from "@/actions/get-random-username";
import { redirect, useRouter } from "next/navigation";
import { paths } from "@/paths";

export type SignUpFormData = Omit<TSignUpForm, "password_confirm">;

export interface SignUpFormProps
  extends React.ComponentPropsWithoutRef<"div"> {}

export function RegisterForm(props: SignUpFormProps) {
  const router = useRouter();
  const session = authClient.useSession();
  if (session.data) {
    redirect(paths.home());
  }

  const form = useForm<TSignUpForm>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      username: "",
      password: "",
      password_confirm: "",
    },
    validate: zodResolver(SignUpFormZodSchema),
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");

  const handleSubmit = async (form_data: TSignUpForm) => {
    try {
      setLoading(true);
      setServerError("");

      let username = form_data.username;
      if (!username) {
        username = await getRandomUserName();
      }
      const res = await authClient.signUp.email({
        email: form_data.email,
        password: form_data.password,
        name: username,
      });
      if (res.error) {
        setServerError(res.error.message || "");
        return;
      }
      router.push(paths.emailNotVerified());
    } catch (err) {
      const msg = getErrorMessage(err);
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper className={props.className} w={400} withBorder shadow="xs" p="xl">
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <TextInput
            withAsterisk
            label="Email"
            placeholder="email"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <TextInput
            label="User name"
            placeholder="user name"
            description="Leave it blank to get a random name"
            key={form.key("username")}
            {...form.getInputProps("username")}
          />
          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="password"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <PasswordInput
            withAsterisk
            label="Confirm Password"
            placeholder="confirm password"
            key={form.key("password_confirm")}
            {...form.getInputProps("password_confirm")}
          />
        </div>
        <Button
          loading={loading}
          onClick={() => {
            form.onSubmit(handleSubmit)();
          }}
        >
          Register
        </Button>
        {serverError && (
          <div className="text-red-500 text-sm">{serverError}</div>
        )}
        <FormDebug form={form} />
      </form>
    </Paper>
  );
}
