import { varchar, pgTable, index, uniqueIndex } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { User } from "./user";
import { long_id_length } from "@/vars";

export const UserProvider = pgTable(
  "user_provider",
  {
    id: varchar("id", { length: long_id_length })
      .primaryKey()
      .$defaultFn(() => createId()),
    user_id: varchar("user_id", { length: long_id_length }).notNull(),
    provider: varchar("provider", {
      enum: ["github", "google"],
      length: 20,
    }).notNull(),
    provider_uid: varchar("provider_uid", { length: 255 }).notNull(),
  },
  (table) => [
    index("user_id_idx").on(table.user_id),
    uniqueIndex("provider_provider_uid_idx").on(
      table.provider,
      table.provider_uid
    ),
  ]
);

export const UserProviderRelations = relations(
  UserProvider,
  ({ many, one }) => ({
    user: one(User, {
      fields: [UserProvider.user_id],
      references: [User.id],
    }),
  })
);
