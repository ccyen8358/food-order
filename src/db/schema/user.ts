import {
  varchar,
  pgTable,
  timestamp,
  text,
  index,
  date,
  char,
  serial,
  bigserial,
  bigint,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { UserProvider } from "./user-provider";
// import { Product } from "./product";
// import { CartItem } from "./cart-item";
// import { order } from "./order";
// import { PurchasedProduct } from "./purchased-product";
import { long_id_length } from "@/vars";
import { createSelectSchema } from "drizzle-zod";

export type TGender = "M" | "F" | "O";

export const User = pgTable(
  "user",
  {
    id: bigint("id", {
      mode: "number",
    })
      .primaryKey()
      .generatedByDefaultAsIdentity(),
    long_id: varchar("long_id", { length: long_id_length }).$defaultFn(() =>
      createId()
    ),
    username: varchar("username", { length: 50 }).notNull(),
    display_name: varchar("display_name", { length: 50 }),
    email: varchar("email", { length: 320 }).notNull(),
    email_verified: timestamp("email_verified"),
    password: varchar("password", { length: 100 }),
    image: text("image"),
    gender: char("gender", { enum: ["M", "F", "O"], length: 1 }),
    birthdate: date("birthdate", { mode: "date" }),
    created_at: timestamp("created_at", { mode: "date" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("email_idx").on(table.email),
    uniqueIndex("username_idx").on(table.username),
    uniqueIndex("long_id_idx").on(table.long_id),
  ]
);

export const UserRelations = relations(User, ({ many, one }) => ({
  user_providers: many(UserProvider),
  //   products: many(Product),
  //   cart_items: many(CartItem),
  //   orders: many(order),
  //   purchased_products: many(PurchasedProduct),
}));

export const selectUserSchema = createSelectSchema(User);
