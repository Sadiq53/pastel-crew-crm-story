export type Tone = "tangerine" | "blush" | "lime" | "emerald";

export interface CrmModule {
  id: string;
  no: number;
  /** Name as written in the feature map */
  name: string;
  /** Short headline used on the slide */
  title: string;
  tagline: string;
  tone: Tone;
  features: string[];
  /** Optional "how it works" steps shown on modules with few features */
  flow?: string[];
}

export const BRAND = "Pastel X Crewvia";

export const modules: CrmModule[] = [
  {
    id: "product",
    no: 1,
    name: "Product Management",
    title: "Products",
    tagline: "The foundation of every order — the beauty catalogue your customers shop from.",
    tone: "tangerine",
    features: ["Create new products", "Edit product details", "Delete products", "Manage product variants"],
  },
  {
    id: "customer",
    no: 2,
    name: "Customer Management",
    title: "Customers",
    tagline: "Every customer, order, invoice and coupon in one clean profile.",
    tone: "blush",
    features: [
      "Create customers",
      "Edit customer profiles",
      "Delete customers",
      "See and track every order",
      "Manage invoices and send them by mail",
      "Generate discount coupons",
    ],
  },
  {
    id: "sales",
    no: 3,
    name: "Sales Management",
    title: "Sales",
    tagline: "From wholesale order to doorstep — tracked, synced and invoiced.",
    tone: "lime",
    features: [
      "Create sales",
      "Edit sales",
      "Delete sales",
      "Auto-create sale records from the wholesale portal",
      "Track status: Ready → Dispatched → Delivered",
      "Deduct stock on dispatch — always in sync",
      "Auto-mail the invoice once delivered",
    ],
  },
  {
    id: "purchase",
    no: 4,
    name: "Purchase Management",
    title: "Purchases",
    tagline: "Every purchase order tracked until the stock lands on your shelf.",
    tone: "emerald",
    features: [
      "Create purchases",
      "Edit purchases",
      "Delete purchases",
      "Track status: Ordered → Expected date → Received",
      "Add stock on receipt — always in sync",
      "Notify the owner automatically",
    ],
  },
  {
    id: "vendor",
    no: 5,
    name: "Vendor Management",
    title: "Vendors",
    tagline: "Know who supplies what — and reorder in a single tap.",
    tone: "tangerine",
    features: [
      "Create vendors",
      "Edit vendors",
      "Delete vendors",
      "See and track purchases per vendor",
      "Group vendors by product type and variant",
      "One-tap reorder to repeat the last order",
    ],
  },
  {
    id: "analytics",
    no: 6,
    name: "Analytics",
    title: "Analytics",
    tagline: "Live numbers for every branch — or all of them together.",
    tone: "blush",
    features: [
      "Orders analytics",
      "Purchase analytics",
      "Pending orders and pending sales at a glance",
      "Branch view and all-branch merged view",
      "Inventory insights and low-stock alerts",
    ],
  },
  {
    id: "communication",
    no: 7,
    name: "Communication (Emails)",
    title: "Emails",
    tagline: "Reach every customer by email — launches and invoices, automatically.",
    tone: "lime",
    features: ["Bulk email for new product launches", "Automatic invoice mailing"],
    flow: ["New product", "Bulk email", "Every inbox"],
  },
  {
    id: "invoice",
    no: 8,
    name: "Invoice Generation",
    title: "Invoices",
    tagline: "Zero manual billing. Delivered means invoiced.",
    tone: "emerald",
    features: ["Invoice auto-generated the moment an order is delivered"],
    flow: ["Order delivered", "Invoice created", "Mailed to customer"],
  },
  {
    id: "rbac",
    no: 9,
    name: "Role Access Management",
    title: "Roles & Access",
    tagline: "The right access for every person, at every branch.",
    tone: "tangerine",
    features: [
      "Create roles",
      "Edit roles",
      "Delete roles",
      "Fixed roles only — no custom roles",
      "Admin — access to all branches",
      "Branch manager — manages their own branch",
      "Salesperson — basic rights",
    ],
  },
  {
    id: "inventory",
    no: 10,
    name: "Inventory Management",
    title: "Inventory",
    tagline: "Multiple stockrooms, one live count of every lipstick and serum.",
    tone: "blush",
    features: [
      "Create inventories",
      "Edit inventories",
      "Delete inventories",
      "Run multiple inventories",
      "Move stock between inventories",
      "Low-stock alerts",
    ],
  },
  {
    id: "branch",
    no: 11,
    name: "Branch Management",
    title: "Branches",
    tagline: "Grow to many locations without losing sight of any.",
    tone: "lime",
    features: [
      "Create branches",
      "Edit branches",
      "Delete branches",
      "Run multiple branches",
      "Assign a branch manager",
      "All-branch view — read-only analytics tracking",
    ],
  },
  {
    id: "reports",
    no: 12,
    name: "Reports",
    title: "Reports",
    tagline: "Progress reports that arrive on time — without anyone asking.",
    tone: "emerald",
    features: [
      "Auto reminders for daily, weekly or monthly reports",
      "Auto-send to admin or a registered email",
      "Bulk import and export with XLSX files",
    ],
  },
  {
    id: "calendar",
    no: 13,
    name: "Calendar",
    title: "Calendar",
    tagline: "Plan ahead — reminders, orders and purchases on one calendar.",
    tone: "tangerine",
    features: ["Create reminders", "Schedule orders and purchases"],
    flow: ["Pick a date", "Schedule it", "Get reminded"],
  },
];

export const totalFeatures = modules.reduce((n, m) => n + m.features.length, 0);

export const toneBg: Record<Tone, string> = {
  tangerine: "bg-tangerine",
  blush: "bg-blush",
  lime: "bg-lime",
  emerald: "bg-emerald",
};

export const toneFg: Record<Tone, string> = {
  tangerine: "text-paper",
  blush: "text-ink",
  lime: "text-ink",
  emerald: "text-paper",
};
