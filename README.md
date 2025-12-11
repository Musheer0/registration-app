---

# 🚀 **EventForge — Full-Stack Event Management Platform**

A modern, end-to-end typed event management system built using **Next.js 16**, **tRPC**, **Better Auth**, **Drizzle ORM**, **Redis caching**, **Neon Postgres**, **Cloudinary uploads**, and **ShadCN UI**.

This project gives users the ability to:

* Create events
* Upload event logos & banners
* Manage registrations
* View rich event statistics
* Access public & private event feeds
* Register for events with validation
* Administer participants
* Enjoy blazing-fast load times thanks to Redis caching

If Eventbrite and Google Forms had a TypeScript-obsessed baby, this is it.

---

# 📸 Home Page Preview

> A quick glimpse of the landing page your users see.

<p align="center">
  <img src="./screenshots/home.png" alt="Home Page" width="750">
</p>

---

# 🧩 **Core Features**

### 🎉 Event Management

* Create events with logos and banners
* Update event details (with optional image updates)
* Delete events (creator-only permissions)
* Fetch event by ID (cached for 5 minutes)
* Latest 10 events for:

  * User dashboard
  * Public feed

### 👥 Participant System

* Register for events
* Duplicate registration prevention
* Max participant limit enforcement
* Registration deadline support
* Admin-only participant list

### 📊 Event Statistics Dashboard

* Total registrations
* Available spots
* Registration rate (%)
* Registrations grouped by date
* Fully cached (realtime-ish)

### ⚡ High-Performance Caching

Uses Redis to cache:

* Event pages
* Dashboard lists
* Public lists
* Event stats
* Participants

Auto-invalidates on:

* Create
* Update
* Delete
* Register

---

# 🔥 **Tech Stack**

### 🖥️ Frontend / App Framework

* **Next.js 16** — server components, server actions, fast routing
* **ShadCN UI** — clean, accessible components

### 🧠 Backend Logic

* **tRPC** — end-to-end type safety
* **Zod** — input validation
* **Better Auth** — authentication & session handling

### 🗄️ Database Layer

* **Neon Postgres** — serverless, scalable PostgreSQL
* **Drizzle ORM** — type-safe SQL, migrations, schema

### ⚡ Performance & Infra

* **Redis** — caching for instant responses
* **Cloudinary** — image hosting & optimization

### 🧰 Misc

* Strict TypeScript everywhere
* Full E2E types via tRPC

---

# 📁 Project Structure

```
src/
 ├─ trpc/
 │   ├─ init.ts
 │   ├─ routers/
 │   │    ├─ eventsRouter.ts
 │   │    ├─ participantsRouter.ts
 │   ├─ appRouter.ts
 │
 ├─ db/
 │   ├─ drizzle/
 │   └─ schema.ts
 │
 ├─ lib/
 │   ├─ upload-file.ts
 │   ├─ redis.ts
 │
 ├─ zod/
 │   └─ createEventSchema.ts

screenshots/
   home.png
```

---

# 🧠 **Event API Overview (tRPC)**

### `event.create`

* Uploads banner/logo to Cloudinary
* Saves event to DB
* Invalidates caches

### `event.getOne`

* Fetches from Redis → fallback DB
* Caches for 5 minutes

### `event.delete`

* Creator-only
* Wipes all caches related to that event

### `event.update`

* Optional image updates
* Creator-only
* Auto-cache clearing

### `event.getAll`

Returns last 10 events created by user.

### `event.getAllPublic`

Returns last 10 public events.

### `event.getStatistics`

Returns:

* totalRegistered
* registrationRate
* availableSpots
* registrationsByDate
* registration list (admin only)

---

# 👥 **Participants API Overview**

### `participants.register`

* Validates:

  * duplicate registration
  * event existence
  * deadline
  * max capacity
* Saves user data
* Clears caches

### `participants.getRegistrationStatus`

Returns:

```
{
  isRegistered: boolean,
  registration: null | object
}
```

### `participants.getRegisteredUsers`

Admin-only. Cached for 60 seconds.

---

# ⚙️ Environment Variables

### Cloudinary

```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Redis

```
REDIS_URL=
REDIS_TOKEN=
```

### Neon Postgres

```
DATABASE_URL=
```

### Better Auth

```
AUTH_SECRET=
AUTH_URL=
```

---

# 🛠️ Running Locally

```bash
pnpm install

pnpm db:push     # drizzle migrations
pnpm dev
```

---

# 🚧 Future Enhancements

* Searching + filtering events
* QR code check-in
* Pagination for public + user feeds
* Webhooks for registration alerts

---

# ❤️ Author

Made with TypeScript, caffeine, and questionable life choices.

---
