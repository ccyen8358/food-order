import { z } from "zod";

export const LoginFormZodSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
    })
    .trim()
    .min(1, { message: "email is required" })
    .email({ message: "invalid email" }),
  password: z
    .string({
      required_error: "password is required",
    })
    .trim()
    .min(1, { message: "password is required" }),
});

const LoginFormZodSchemaKey = LoginFormZodSchema.keyof();
export type TLoginFormKey = z.infer<typeof LoginFormZodSchemaKey>;
export type TLoginForm = z.infer<typeof LoginFormZodSchema>;
