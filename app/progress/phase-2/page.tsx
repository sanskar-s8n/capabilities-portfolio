import { ProgressPage } from "@/components/shared/ProgressPage";

export default function PhaseTwoPage() {
  return <ProgressPage
    phase="02 / 03"
    eyebrow="Commerce"
    headline="Connect the experience."
    mutedHeadline="Turn features into workflows."
    intro="The second stage connected the playground interface to real product records and implemented a server-controlled checkout flow with stock validation and order persistence."
    stats={[["03","Seeded products"],["01","Live catalogue API"],["01","Checkout pipeline"],["DB","Persistent orders"]]}
    sectionEyebrow="Phase 02 · Delivered"
    sectionTitle="Commerce and frontend integration"
    items={[
      {title:"Database-backed catalogue",description:"The products API reads available products from PostgreSQL and excludes products with no inventory.",status:"complete"},
      {title:"Seed data",description:"An idempotent Prisma seed creates Starter Kit, Pro Kit and Growth Pack records.",status:"complete"},
      {title:"Interactive cart",description:"The playground fetches product data, displays prices and stock, and supports cart quantities.",status:"complete"},
      {title:"Server-side checkout",description:"Checkout validates product IDs and quantities, calculates trusted database prices and checks stock.",status:"complete"},
      {title:"Order persistence",description:"A database transaction decrements inventory and creates a pending order with its order items.",status:"complete"}
    ]}
    panelTitle="A connected commerce experience"
    panelDescription="The client selects products, while the server remains responsible for prices, inventory and order creation."
    flow={["Product catalogue","Cart + quantities","Checkout validation","Inventory transaction","Pending order"]}
    note="A demo checkout was tested: an order was created and inventory decreased. Demo mode does not collect payment."
    previous="/progress/phase-1"
    next="/progress/phase-3"
    nextLabel="Continue to Phase 03"
  />;
}