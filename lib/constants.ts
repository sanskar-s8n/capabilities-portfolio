export type Archetype = {
  id: "ecommerce" | "listing" | "content" | "saas" | "booking";
  title: string;
  icon: string;
  description: string;
  color: string;
  businessNeed: string;
  skills: Record<"frontend" | "backend" | "database" | "security", { name: string; feature: string; description: string; hasDemo: boolean }[]>;
};

export const archetypes: Archetype[] = [
  {
    id: "ecommerce", title: "E-Commerce Platform", icon: "ShoppingBag", color: "amber",
    description: "Secure storefront, cart, checkout and inventory flows.",
    businessNeed: "Online stores need secure checkout and inventory systems.",
    skills: {
      frontend: [{ name: "React + Zustand", feature: "Live Cart", description: "Fast client-side cart interactions.", hasDemo: true }],
      backend: [{ name: "Stripe Checkout", feature: "Sandbox Payment", description: "Hosted checkout session flow.", hasDemo: true }],
      database: [{ name: "PostgreSQL", feature: "Orders + Inventory", description: "Relational order integrity.", hasDemo: true }],
      security: [{ name: "Webhook Verification", feature: "Payment Security", description: "Verify signed payment events.", hasDemo: true }]
    }
  },
  {
    id: "listing", title: "Listing & Directory", icon: "MapPin", color: "emerald",
    description: "Search, filters, maps and geospatial discovery.",
    businessNeed: "Directories need powerful search and location-aware discovery.",
    skills: {
      frontend: [{ name: "Debounced Search", feature: "Instant Filters", description: "Responsive discovery UI.", hasDemo: true }],
      backend: [{ name: "Cursor Pagination", feature: "Search API", description: "Scalable result retrieval.", hasDemo: true }],
      database: [{ name: "MongoDB 2dsphere", feature: "Geo Queries", description: "Nearby listing discovery.", hasDemo: true }],
      security: [{ name: "Rate Limiting", feature: "Search Protection", description: "Control abusive requests.", hasDemo: true }]
    }
  },
  {
    id: "content", title: "Content & Media Hub", icon: "FileText", color: "blue",
    description: "CMS editing, previews, SEO and publishing workflows.",
    businessNeed: "Media teams need scalable content creation and publishing.",
    skills: {
      frontend: [{ name: "Portable Text", feature: "Live Preview", description: "Rich content rendering.", hasDemo: true }],
      backend: [{ name: "ISR / CDN", feature: "Fast Publishing", description: "Rapid page updates.", hasDemo: true }],
      database: [{ name: "Sanity + MongoDB", feature: "Content", description: "Flexible editorial data.", hasDemo: true }],
      security: [{ name: "Validation", feature: "Safe Content", description: "Validate published inputs.", hasDemo: true }]
    }
  },
  {
    id: "saas", title: "SaaS Dashboard", icon: "BarChart3", color: "violet",
    description: "Role-based analytics with charts and secure sessions.",
    businessNeed: "B2B products need secure role-aware data visualization.",
    skills: {
      frontend: [{ name: "Recharts", feature: "Interactive Metrics", description: "Decision-ready data views.", hasDemo: true }],
      backend: [{ name: "JWT + RBAC", feature: "Protected Routes", description: "Role-aware access control.", hasDemo: true }],
      database: [{ name: "PostgreSQL", feature: "Metrics", description: "Structured analytical data.", hasDemo: true }],
      security: [{ name: "httpOnly Sessions", feature: "Auth Security", description: "Reduce token exposure.", hasDemo: true }]
    }
  },
  {
    id: "booking", title: "Booking & Scheduling", icon: "CalendarDays", color: "rose",
    description: "Availability, conflict detection and confirmations.",
    businessNeed: "Service businesses need reliable reservation systems.",
    skills: {
      frontend: [{ name: "Calendar Grid", feature: "Availability", description: "Clear slot selection.", hasDemo: true }],
      backend: [{ name: "Conflict Detection", feature: "Validation", description: "Prevent overlapping bookings.", hasDemo: true }],
      database: [{ name: "PostgreSQL", feature: "Booking Records", description: "Consistent reservation state.", hasDemo: true }],
      security: [{ name: "Zod + Auth", feature: "Input Safety", description: "Validate booking requests.", hasDemo: true }]
    }
  }
];
