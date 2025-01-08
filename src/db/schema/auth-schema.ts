import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const User = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  email_verified: boolean("email_verified").notNull(),
  image: text("image"),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
});

export const UserRelations = relations(User, ({ many, one }) => ({
  sessions: many(Session),
  accounts: many(Account),
}));

export const Session = pgTable("session", {
  id: text("id").primaryKey(),
  expires_at: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
  ip_address: text("ip_address"),
  user_agent: text("user_agent"),
  user_id: text("user_id")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
});

export const SessionRelations = relations(Session, ({ many, one }) => ({
  user: one(User, {
    fields: [Session.user_id],
    references: [User.id],
  }),
}));

export const Account = pgTable("account", {
  id: text("id").primaryKey(),
  account_id: text("account_id").notNull(),
  provider_id: text("provider_id").notNull(),
  user_id: text("user_id")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  access_token: text("access_token"),
  refresh_token: text("refresh_token"),
  id_token: text("id_token"),
  access_token_expires_at: timestamp("access_token_expires_at"),
  refresh_token_expires_at: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
});

export const AccountRelations = relations(Account, ({ many, one }) => ({
  user: one(User, {
    fields: [Account.user_id],
    references: [User.id],
  }),
}));

export const Verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expires_at: timestamp("expires_at").notNull(),
  created_at: timestamp("created_at"),
  updated_at: timestamp("updated_at"),
});
