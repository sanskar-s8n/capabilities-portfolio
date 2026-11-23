import { ProgressPage } from "@/components/shared/ProgressPage";

export default function PhaseOnePage() {
  return <ProgressPage
    phase="01 / 03"
    eyebrow="Foundation"
    headline="Build the engine."
    mutedHeadline="Establish the foundation."
    intro="The first stage established the application architecture, persistent database layer and core backend workflows that support the portfolio's interactive demonstrations."
    stats={[["01","Application architecture"],["01","PostgreSQL data layer"],["04","Core API workflows"],["25","Pages build-generated"]]}
    sectionEyebrow="Phase 01 · Delivered"
    sectionTitle="Core systems established"
    items={[
      {title:"Application foundation",description:"Next.js 15 App Router, React 19, Tailwind CSS v4 and shared application layout.",status:"complete"},
      {title:"Database layer",description:"PostgreSQL on Neon with Prisma models for products, orders, bookings and contact leads.",status:"complete"},
      {title:"Booking workflow",description:"Booking creation, cancellation and unique slot protection to prevent duplicate reservations.",status:"complete"},
      {title:"Backend APIs",description:"Persistent routes for bookings, contact leads, product data and dashboard metrics.",status:"complete"},
      {title:"Build verification",description:"Production build completed with TypeScript checks and static page generation.",status:"complete"}
    ]}
    panelTitle="A production-minded foundation"
    panelDescription="The application separates the interface, API layer, data access and persistent storage."
    flow={["Next.js application","API routes + validation","Prisma ORM","PostgreSQL database"]}
    note="The production build passed. A later Neon P1001 connection failure is being investigated separately; build success does not prove current database availability."
    next="/progress/phase-2"
    nextLabel="Continue to Phase 02"
  />;
}