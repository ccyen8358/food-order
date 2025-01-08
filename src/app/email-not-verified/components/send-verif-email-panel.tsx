"use client";

import { authClient } from "@/lib/auth/auth-client";
import { getErrorMessage } from "@/lib/utils";
import { SessionStorageKeys } from "@/lib/vars/session-storage";
import { paths } from "@/paths";
import { Button, Divider, Paper, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCountdown } from "usehooks-ts";

export interface SendVerificationEmailPanelProps
  extends React.ComponentPropsWithoutRef<"div"> {}

export function SendVerificationEmailPanel(
  props: SendVerificationEmailPanelProps
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 10,
    countStop: 0,
    intervalMs: 1000,
  });

  useEffect(() => {
    startCountdown();
  }, [startCountdown]);

  useEffect(() => {
    const _email = sessionStorage.getItem(SessionStorageKeys.verify_email);
    if (!_email) {
      router.push(paths.signIn());
    } else {
      setEmail(_email);
    }
  }, []);

  const handleSendEmail = async () => {
    try {
      setLoading(true);
      await authClient.sendVerificationEmail({
        email: email,
        callbackURL: paths.home(),
      });
      resetCountdown();
      startCountdown();
    } catch (err) {
      const msg = getErrorMessage(err);
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  const buttonText = "Resend" + (count > 0 ? ` (${count})` : "");

  return (
    <Paper withBorder shadow="xs" p="xl">
      <div className="text-center">
        <Title size="h2" order={1}>
          Email Verification
        </Title>
        <Text c="dimmed" size="sm">
          {email}
        </Text>
      </div>
      <p className="p-5">Please check your email for verification link.</p>
      <Divider
        size="sm"
        className="my-1"
        label={<Text size="xs">Lost your email?</Text>}
      />
      <div className="self-stretch">
        <Button
          className="w-full"
          onClick={handleSendEmail}
          disabled={count > 0 || loading}
        >
          {buttonText}
        </Button>
        {serverError}
      </div>
    </Paper>
  );
}
