import Link from "next/link";
import { RegisterForm } from "./components/sign-up-form";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { paths } from "@/paths";

export default async function SignUpPage() {
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
        <h1 className="text-3xl font-bold">Sign up</h1>
      </div>
      <RegisterForm className="mx-auto" />
      <p>
        Already have an account?{" "}
        <Link href="/sign-in" className="text-blue-600 font-semibold underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
