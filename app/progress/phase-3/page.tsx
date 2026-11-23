import { ProgressPage } from "@/components/shared/ProgressPage";

export default function PhaseThreePage() {
  return <ProgressPage
    phase="03 / 03"
    eyebrow="Verification"
    headline="Make it dependable."
    mutedHeadline="Prove it end to end."
    intro="The final stage focuses on payment lifecycle safeguards, runtime reliability and end-to-end validation. Core implementation exists, but live payment and database verification remain open."
    stats={[["01","Stripe integration"],["02","Webhook event paths"],["01","Recovery flow"],["04","Checks remaining"]]}
    sectionEyebrow="Phase 03 · Final validation"
    sectionTitle="Implemented safeguards and open checks"
    items={[
      {title:"Stripe checkout sessions",description:"When configured, the server creates hosted checkout sessions using trusted database prices.",status:"complete"},
      {title:"Webhook signature verification",description:"Incoming Stripe events are verified before the application processes them.",status:"complete"},
      {title:"Payment-state handling",description:"Successful payment events can update matching pending orders; expired sessions can cancel orders and restore inventory.",status:"complete"},
      {title:"Failure compensation",description:"Checkout includes recovery logic to cancel pending orders and restore inventory if Stripe session creation or persistence fails.",status:"complete"},
      {title:"Neon connection stability",description:"A Prisma P1001 connection failure is blocking repeatable live database verification.",status:"pending"},
      {title:"Stripe test-mode verification",description:"A real test checkout and signed webhook delivery still need to be verified.",status:"pending"},
      {title:"End-to-end regression",description:"Re-run product, booking, contact, dashboard and checkout tests after database connectivity is stable.",status:"pending"},
      {title:"Production sign-off",description:"Verify environment variables, deployment logs and production behaviour before calling the project production-ready.",status:"pending"}
    ]}
    panelTitle="Implementation is not the finish line"
    panelDescription="The final stage is complete only when critical workflows are proven in the running environment."
    flow={["Database connectivity","Stripe test checkout","Signed webhook updates","Regression tests","Deployment checks"]}
    note="Core features are implemented and the production build passes. Database runtime and Stripe test-payment verification are not yet complete."
    previous="/progress/phase-2"
  />;
}