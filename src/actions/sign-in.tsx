"use server";

import { auth } from "@/lib/auth/auth";
import {
  BetterAuthErrorCodes,
  getBetterAuthErrorMessage,
} from "@/lib/auth/better-auth-codes";
import { ActionResult } from "@/types";
import { LoginFormZodSchema, TLoginForm } from "@/zod-schema/login-form-schema";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function signInEmail(data: TLoginForm) {
  const result: ActionResult = { success: true, message: "" };

  try {
    const _data = LoginFormZodSchema.parse(data);

    await auth.api.signInEmail({
      body: {
        email: _data.email!,
        password: _data.password,
      },
      header: headers,
      asResponse: true,
    });
  } catch (err) {
    result.success = false;

    if (err instanceof ZodError) {
      result.message = fromZodError(err).message;
    } else if (err instanceof APIError) {
      if (err.body.code === BetterAuthErrorCodes.INVALID_EMAIL_OR_PASSWORD) {
        result.message = getBetterAuthErrorMessage(
          BetterAuthErrorCodes.INVALID_EMAIL_OR_PASSWORD
        );
      }
    } else if (err instanceof Error) {
      result.message =
        process.env.NODE_ENV === "development"
          ? err.message
          : "An error occurred";
    } else {
      result.message = "Unknown error";
    }
  } finally {
    return result;
  }
}
