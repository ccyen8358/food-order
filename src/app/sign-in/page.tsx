import { headers } from "next/headers";
import { SignInForm } from "./components/sign-in-form";
import Link from "next/link";
import { redirect } from "next/navigation";
import { paths } from "@/paths";
import { auth } from "@/lib/auth/auth";

export default async function SignInPage() {
  const _headers = await headers();
  const session = await auth.api.getSession({
    headers: _headers,
  });
  if (session) {
    redirect(paths.home());
  }

  return (
    <div className="p-5 flex flex-col items-center gap-5">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Sign in</h1>
      </div>
      <SignInForm className="mx-auto" />
      <p>
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-blue-600 font-semibold underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
