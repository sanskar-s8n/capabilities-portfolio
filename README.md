# Capabilities Portfolio

Deployment-ready Next.js starter based on the supplied **Capabilities Portfolio — Full Web Development Specification**.

## Included

- Next.js App Router + React + TypeScript
- Tailwind CSS v4
- Five archetype pages
- Interactive proof playground
- Contact / proposal lead form
- REST API starter endpoints
- PostgreSQL Prisma schema
- MongoDB listing/content models
- Stripe sandbox checkout endpoint + webhook
- Booking conflict detection endpoint
- Demo mode when external credentials are not configured

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

For PostgreSQL:

```bash
npx prisma generate
npx prisma db push
```

## Vercel deployment

1. Push this folder to GitHub.
2. Import the repository into Vercel.
3. Add environment variables from `.env.example`.
4. Deploy.
5. If using PostgreSQL, run `npx prisma db push` against the production database.
6. Configure Stripe webhook URL:
   `https://YOUR_DOMAIN/api/webhooks/stripe`

## Important

The uploaded specification calls for additional production integrations such as NextAuth OAuth, Redis, Sanity, Resend, Twilio, Mapbox and Sentry. This package includes the core app and integration-ready structure, but those services require real credentials and provider configuration before their full production features are active.

The application intentionally runs in a credential-free demo mode for the interactive portfolio proof pages.
