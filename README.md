# yana MVP (You Are Not Alone)

Production-ready MVP for loneliness and mental health support (non-crisis) with safe defaults.

## Confirmed product decisions
- Brand: **yana** with olive/gold calm palette matching provided logo.
- Region: **Belgium** emergency resources.
- Chat hours: **17:00–22:00 Europe/Brussels**.
- Exact event address: visible **after RSVP approval and for members only**.
- Waitlist: **enabled**.
- Recurrence: **weekly + monthly**.
- Transcript storage: **OFF by default**.
- Moderation flags: **all reasons allowed**.
- Magic links email provider: **Resend SMTP**.
- Deployment: **Vercel + managed Postgres**.

## Simple architecture
- **Next.js App Router + TypeScript + Tailwind** for UI and API routes.
- **Prisma** for data layer.
  - Local development: SQLite.
  - Production: Postgres.
- **NextAuth email magic links** for approved members.
- **Role-based access control** server-side (`ADMIN`, `HOST`, `VOLUNTEER`, base `MEMBER`).
- **Safety controls**: disclaimer on all pages, crisis resources, self-harm keyword prompt, spam honeypots, basic in-memory rate limits.

## Data model (Prisma)
- `User`, `UserRole`
- `MemberApplication`
- `Event` (approval status + recurrence fields)
- `RSVP` (anonymous token + waitlist/pending/approved)
- `ChatSettings`, `ChatSession`, `ChatFlag`
- `AuditLog`
- NextAuth models: `Account`, `Session`, `VerificationToken`

## Folder structure
- `src/app/*` pages and API routes
- `src/components/*` shared UI (header, safety banner, chat widget)
- `src/lib/*` prisma/auth/validation/rate-limit/events helpers
- `src/server/*` role permission helper
- `prisma/*` schema, migration SQL, seed data
- `tests/*` critical flow tests

## Local run (beginner friendly)
If you already ran `git clone ...` and then `cd <repo>`, yes — the project files should appear in that folder (`package.json`, `README.md`, `src`, `prisma`, etc.).

1. Install Node.js 20+.
2. Copy env file:
   ```bash
   cp .env.example .env
   ```
3. Install packages:
   ```bash
   npm install
   ```
4. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```
5. Run migration:
   ```bash
   npm run prisma:migrate -- --name init
   ```
6. Seed sample data:
   ```bash
   npm run prisma:seed
   ```
7. Start app:
   ```bash
   npm run dev
   ```
8. Open `http://localhost:3000`.

### Quick check after cloning
Run this to confirm you are in the cloned project folder:

```bash
pwd
ls
```

On Windows PowerShell, use:

```powershell
Get-Location
dir
```

If you do not see project files, you are likely in the wrong folder. Use `cd` to move into the folder created by `git clone`.


### If `copy .env.example .env` fails on Windows
If you see `Cannot find path ... .env.example`, one of these is true:
- You are not in the project root folder.
- The repository clone is incomplete/wrong folder.

Run:

```powershell
Get-Location
dir
```

You should see files like `README.md`, `package.json`, and `.env.example`.

If not, move into the correct cloned folder:

```powershell
cd "C:\path\to\your\cloned\repo"
dir
```

If `.env.example` is still missing, re-clone and ensure no errors occurred:

```powershell
cd C:\Coding
git clone <your-repo-url>
cd <repo-name>
dir
```

Then retry:

```powershell
copy .env.example .env
```


## Deploy (Vercel + managed Postgres)
1. Create managed Postgres (Neon/Supabase/Vercel Postgres).
2. In Vercel project settings, add env vars from `.env.example` (set `DATABASE_PROVIDER=postgresql`).
3. Set `NEXTAUTH_URL` to your production domain and strong `NEXTAUTH_SECRET`.
4. Connect Git repo to Vercel and deploy.
5. Run Prisma migration in deploy command or CI step:
   ```bash
   npx prisma migrate deploy
   ```
6. Optionally run seed once:
   ```bash
   npm run prisma:seed
   ```

## MVP features included
- Home page with key CTAs and safety banner.
- Events listing with search/filter and recurrence display.
- RSVP without account (name/email optional), spam honeypot, rate limit, waitlist.
- Member application form without login.
- Admin pages for pending applications, events, and chat settings metrics.
- Volunteer console placeholder (authz-gated).
- Anonymous chat widget with online/offline schedule and self-harm prompt.
- Privacy & boundaries page and About page.
- Basic tests for auth role checks, event validation, RSVP capacity behavior.

## Phase 2 (recommended)
- Real-time chat transport (WebSocket/Pusher/Supabase Realtime) and volunteer queueing.
- Full admin actions UI (approve/deny members/events, assign roles, notes, audit timeline).
- Calendar month view component and ICS export.
- Durable distributed rate limiting (Upstash Redis) instead of in-memory.
- Email notifications for approvals and RSVP status updates.
- Optional transcript retention policies with automatic deletion windows.
