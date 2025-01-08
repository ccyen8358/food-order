import { SendVerificationEmailPanel } from "./components/send-verif-email-panel";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { paths } from "@/paths";
import { Container } from "@mantine/core";
import { auth } from "@/lib/auth/auth";

export default async function SendVerifEmailPage() {
  const _headers = await headers();
  const session = await auth.api.getSession({
    headers: _headers,
  });
  if (session?.user.emailVerified) {
    redirect(paths.home());
  }

  return (
    <div className="p-5 flex justify-center">
      <Container size="sm">
        <SendVerificationEmailPanel />
      </Container>
    </div>
  );
}
