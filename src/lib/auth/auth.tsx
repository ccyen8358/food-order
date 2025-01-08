import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import cuid2 from "@paralleldrive/cuid2";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import { Account, Session, User, Verification } from "@/db/schema/auth-schema";
import FoodOrderVerifyEmail from "../../../react-email/emails/food-order-verify-email";

export const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  secure: true,
  port: 465,
  auth: {
    user: "resend",
    pass: process.env.RESEND_KEY,
  },
});

export const auth = betterAuth({
  plugins: [username()],
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite",
    schema: {
      // The Drizzle adapter expects the schema you define to match the table names.
      // https://www.better-auth.com/docs/concepts/database#mapping-schema
      user: User,
      session: Session,
      account: Account,
      verification: Verification,
    },
  }),
  advanced: {
    generateId: () => {
      return cuid2.createId();
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const emailHtml = await render(<FoodOrderVerifyEmail verifyUrl={url} />);

      const options = {
        from: "foodord@resend.dev",
        // to: "delivered@resend.dev",
        to: user.email,
        subject: "Welcome",
        html: emailHtml,
      };
      try {
        await transporter.sendMail(options);
      } catch (error) {
        console.error(error);
      }
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    fields: {
      emailVerified: "email_verified",
      image: "image",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  session: {
    fields: {
      expiresAt: "expires_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
      ipAddress: "ip_address",
      userAgent: "user_agent",
      userId: "user_id",
    },
  },
  account: {
    fields: {
      accountId: "account_id",
      providerId: "provider_id",
      userId: "user_id",
      accessToken: "access_token",
      refreshToken: "refresh_token",
      idToken: "id_token",
      accessTokenExpiresAt: "access_token_expires_at",
      refreshTokenExpiresAt: "refresh_token_expires_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  verification: {
    fields: {
      expiresAt: "expires_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
});
