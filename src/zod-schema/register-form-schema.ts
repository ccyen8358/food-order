import { z } from "zod";

const _SignUpFormZodSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
    })
    .trim()
    .min(1, { message: "email is required" })
    .max(256, { message: "email cannot be longer than 256 characters" })
    .email({ message: "invalid email format" }),
  username: z.union([
    z
      .string({
        required_error: "username is required",
      })
      .trim()
      .min(1, { message: "username is required" })
      .min(3, { message: "username must be at least 3 characters" })
      .max(50, { message: "username cannot be longer than 50 characters" })
      .refine((value) => /^[A-Za-z]/.test(value), {
        message: "username must start with a letter",
      })
      .refine((value) => /^[A-Za-z][A-Za-z0-9_]*$/.test(value), {
        message: "username can only contain letters, numbers, and underscores",
      })
      .optional(),
    z.literal(""),
  ]),
  password: z
    .string({
      required_error: "password is required",
    })
    .trim()
    .min(1, { message: "password is required" })
    .min(8, { message: "password must be at least 8 characters" })
    .max(20, { message: "password cannot be longer than 20 characters" })
    .refine(
      (password) =>
        /[A-Z]/.test(password) && // contains at least one uppercase letter
        /[a-z]/.test(password) && // contains at least one lowercase letter
        /[0-9]/.test(password) && // contains at least one number
        /[^A-Za-z0-9]/.test(password), // contains at least one special character
      {
        message:
          "password must contain one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
  password_confirm: z
    .string({
      required_error: "confirm password is required",
    })
    .trim()
    .min(1, { message: "confirm password is required" }),
});

export const SignUpFormZodSchema = _SignUpFormZodSchema.refine((schema) => {
  return schema.password === schema.password_confirm;
}, "confirm password do not match");

const SignUpFormZodSchemaKey = _SignUpFormZodSchema.keyof();
export type TSignUpFormKey = z.infer<typeof SignUpFormZodSchemaKey>;
export type TSignUpForm = z.infer<typeof _SignUpFormZodSchema>;
