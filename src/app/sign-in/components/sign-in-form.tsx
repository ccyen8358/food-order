"use client";

import { useState } from "react";
import {
  Button,
  Divider,
  Paper,
  PasswordInput,
  TextInput,
  Text,
  rem,
  ActionIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { LoginFormZodSchema, TLoginForm } from "@/zod-schema/login-form-schema";
import FormDebug from "@/components/form-debug";
import { authClient } from "@/lib/auth/auth-client";
import { getErrorMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { BetterAuthErrorCodes } from "@/lib/auth/better-auth-codes";
import { paths } from "@/paths";
import { SessionStorageKeys } from "@/lib/vars/session-storage";
import { GoogleColorIcon } from "@/lib/icons/google-color-icon";
import { GitHubFilledIcon } from "@/lib/icons/github-filled-icon";

export interface SignInFormProps
  extends React.ComponentPropsWithoutRef<"div"> {}

export function SignInForm(props: SignInFormProps) {
  const router = useRouter();
  const session = authClient.useSession();
  const form = useForm<TLoginForm>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(LoginFormZodSchema),
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");

  const handleLogin = async (data: TLoginForm) => {
    try {
      setLoading(true);
      setServerError("");
      const res = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });
      if (res.error) {
        if (
          res.error?.code ===
          BetterAuthErrorCodes.EMAIL_IS_NOT_VERIFIED_CHECK_YOUR_EMAIL_FOR_A_VERIFICATION_LINK
        ) {
          sessionStorage.setItem(SessionStorageKeys.verify_email, data.email);
          router.push(paths.emailNotVerified());
        } else {
          setServerError(res.error.message || "");
        }
        return;
      }
      router.push(paths.home());
    } catch (err) {
      const msg = getErrorMessage(err);
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      const res = await authClient.signIn.social({
        provider: "github",
      });
      if (res.error) {
        setServerError(res.error.message || "");
      }
    } catch (err) {
      const msg = getErrorMessage(err);
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await authClient.signIn.social({
        provider: "google",
      });
      if (res.error) {
        setServerError(res.error.message || "");
      }
    } catch (err) {
      const msg = getErrorMessage(err);
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper className={props.className} w={400} withBorder shadow="xs" p="xl">
      <form onSubmit={form.onSubmit(handleLogin)}>
        <div>
          <div className="space-y-1">
            <TextInput
              withAsterisk
              label="Email"
              placeholder="email"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="password"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
          </div>
          <Button
            className="mt-3"
            fullWidth
            type="submit"
            loading={loading}
            disabled={session.isPending}
          >
            Login
          </Button>
          {serverError && (
            <div className="mt-2 text-red-500 text-sm">{serverError}</div>
          )}
          <FormDebug form={form} />
        </div>
        <Divider className="my-2" size="sm" label={<Text size="xs">or</Text>} />
        <div className="flex justify-center gap-2">
          <ActionIcon variant="default" size="xl" onClick={handleGitHubLogin}>
            <GitHubFilledIcon style={{ width: rem(24), height: rem(24) }} />
          </ActionIcon>
          <ActionIcon variant="default" size="xl" onClick={handleGoogleLogin}>
            <GoogleColorIcon style={{ width: rem(24), height: rem(24) }} />
          </ActionIcon>
        </div>
      </form>
    </Paper>
  );
}
