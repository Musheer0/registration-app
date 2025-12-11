import { relations } from "drizzle-orm";
import { uniqueIndex } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { date } from "drizzle-orm/pg-core";
import { pgTable, text, timestamp, boolean, index,pgEnum } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));


export const event = pgTable("event", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  creator_id: text("creator_id").references(()=>user.id,{onDelete:"cascade"}),
  eventName: text("event_name").notNull(),          // String → text
  description: text("description"),                 // String → text
  venue: text("venue"),                             // String → text
  time: text("time"),                               // String → text
  eventStartTime: text("event_start_time"),         // String → text
  eventEndTime: text("event_end_time"),             // String → text
  dateOfEvent: date("date_of_event"),               // Date → date
  maxParticipants: integer("max_participants"),     // Number → integer
  registrationEnd: date("registration_end"),        // Date → date
  clubName: text("club_name"),                      // String → text
  eventPoster: text("event_poster"),                // String → text (URL or path),
  logo: text("logo"),
    googleFormLink: text("google_form_link")
      .notNull()
      .default("https://forms.gle/CdFuxvgp4uyhmKNH7"),
   createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),

},
  (table) => ({
    // 1️⃣ Composite index (eventName + venue)
    nameVenueIdx: index("event_name_venue_idx").on(
      table.eventName,
      table.venue
    ),

    // 2️⃣ Separate index on eventName
    nameIdx: index("event_name_idx").on(table.eventName),

    // 3️⃣ Separate index on venue
    venueIdx: index("event_venue_idx").on(table.venue),
  }));

export const eventRegisteredUsers = pgTable("event_registered_users", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  eventId: text("event_id")
    .notNull()
    .references(() => event.id, { onDelete: "cascade" }),  
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  usn: text("usn").notNull(),
  phoneNumber: text("phone_number").notNull(),
  attendedAt: date("attended_at").defaultNow(), 
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),},
    (table) => ({
    // 1️⃣ Composite: userId + eventId
    userEventIdx: index("event_reg_user_event_idx").on(
      table.userId,
      table.eventId
    ),

    // 2️⃣ Single: userId
    userIdx: index("event_reg_user_idx").on(table.userId),

    // 3️⃣ Single: eventId
    eventIdx: index("event_reg_event_idx").on(table.eventId),

  EventUnique: uniqueIndex("event_reg_unique")
  .on(table.userId, table.eventId),

  })

    );
