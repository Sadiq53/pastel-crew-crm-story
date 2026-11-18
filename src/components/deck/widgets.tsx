import type { ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  ArrowRightLeft,
  Bell,
  Building2,
  Check,
  Crown,
  Download,
  Eye,
  FileText,
  Lock,
  Mail,
  Package,
  PackageCheck,
  Pencil,
  Plus,
  RefreshCw,
  Send,
  ShoppingCart,
  Ticket,
  Trash2,
  Truck,
  Upload,
  User,
  UserCog,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { d } from "./ui";

function Head({ icon: Icon, title, right }: { icon: LucideIcon; title: string; right?: ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <div className="slide-kicker flex items-center gap-3 text-muted-foreground">
        <Icon className="h-6 w-6 text-ink" strokeWidth={2.4} />
        {title}
      </div>
      {right}
    </div>
  );
}

function Chip({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={cn("pill slide-chrome a-pop font-semibold", className)} style={d(delay)}>
      {children}
    </span>
  );
}

function Crud({ delay = 900 }: { delay?: number }) {
  return (
    <div className="flex gap-3">
      <Chip delay={delay} className="bg-lime">
        <Plus className="h-5 w-5" /> Create
      </Chip>
      <Chip delay={delay + 120} className="bg-paper">
        <Pencil className="h-5 w-5" /> Edit
      </Chip>
      <Chip delay={delay + 240} className="bg-blush">
        <Trash2 className="h-5 w-5" /> Delete
      </Chip>
    </div>
  );
}

function Pipeline({
  steps,
  tone,
}: {
  steps: { label: string; icon: LucideIcon }[];
  tone: string;
}) {
  return (
    <div className="relative px-4">
      <div className="absolute left-14 right-14 top-8 h-[6px] rounded-full bg-muted" />
      <div className="a-grow-x absolute left-14 right-14 top-8 h-[6px] rounded-full bg-ink" style={d(700)} />
      <div className="relative flex justify-between">
        {steps.map((s, i) => (
          <div key={s.label} className="a-pop flex w-[180px] flex-col items-center gap-3" style={d(650 + i * 380)}>
            <div
              className={cn(
                "grid h-[68px] w-[68px] place-items-center rounded-full border-[2.5px] border-ink",
                i === steps.length - 1 ? tone : "bg-paper",
              )}
            >
              <s.icon className="h-8 w-8" strokeWidth={2.2} />
            </div>
            <span className="slide-chrome font-semibold">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Module widgets ---------------- */

function ProductW() {
  const swatches = ["bg-tangerine", "bg-emerald", "bg-blush", "bg-lime"];
  return (
    <div className="flex h-full flex-col justify-between">
      <Head icon={Package} title="Product · Variants" right={<Crud />} />
      <div className="flex items-center gap-6">
        <div className="grid h-24 w-24 place-items-center rounded-3xl border-[2.5px] border-ink bg-tangerine text-paper">
          <Package className="h-11 w-11" strokeWidth={2} />
        </div>
        <div className="flex-1">
          <div className="w-heading">Steel Locker</div>
          <div className="slide-caption mt-1 text-muted-foreground">Base product · 4 variants</div>
        </div>
        <div className="flex items-center gap-3">
          {swatches.map((s, i) => (
            <span
              key={s}
              className={cn("a-pop h-14 w-14 rounded-full border-[2.5px] border-ink", s)}
              style={d(700 + i * 120)}
            />
          ))}
          <span className="a-pop grid h-14 w-14 place-items-center rounded-full border-[2.5px] border-dashed border-ink" style={d(1200)}>
            <Plus className="h-6 w-6" />
          </span>
        </div>
      </div>
    </div>
  );
}

function CustomerW() {
  return (
    <div className="flex h-full gap-6">
      <div className="flex flex-1 flex-col justify-between">
        <Head icon={User} title="Customer profile" />
        <div className="flex items-center gap-5">
          <div className="grid h-20 w-20 place-items-center rounded-full border-[2.5px] border-ink bg-blush font-display text-[32px] font-bold">
            RS
          </div>
          <div>
            <div className="w-heading">Rahul Steels</div>
            <div className="slide-caption text-muted-foreground">Wholesale customer</div>
          </div>
        </div>
        <div className="flex gap-3">
          <Chip delay={800} className="bg-lime">
            <Truck className="h-5 w-5" /> Order in transit
          </Chip>
          <Chip delay={950} className="bg-paper">
            <Mail className="h-5 w-5" /> Invoice mailed
          </Chip>
        </div>
      </div>
      <div className="a-pop flex w-[230px] flex-col justify-between rounded-[28px] border-[2.5px] border-dashed border-ink bg-tangerine p-6 text-paper" style={d(700)}>
        <Ticket className="h-9 w-9" strokeWidth={2.2} />
        <div>
          <div className="slide-chrome opacity-90">Coupon</div>
          <div className="font-display text-[44px] font-bold leading-none tracking-tight">SAVE10</div>
        </div>
      </div>
    </div>
  );
}

function SalesW() {
  return (
    <div className="flex h-full flex-col justify-between">
      <Head
        icon={Send}
        title="Sale · from wholesale portal"
        right={
          <Chip delay={1900} className="bg-blush">
            Stock deducted
          </Chip>
        }
      />
      <Pipeline
        tone="bg-lime"
        steps={[
          { label: "Ready", icon: Package },
          { label: "Dispatched", icon: Truck },
          { label: "Delivered", icon: PackageCheck },
        ]}
      />
      <div className="a-rise slide-caption flex items-center gap-3 font-semibold" style={d(1800)}>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald text-paper">
          <Check className="h-5 w-5" strokeWidth={3} />
        </span>
        Invoice auto-mailed to the customer
      </div>
    </div>
  );
}

function PurchaseW() {
  return (
    <div className="flex h-full flex-col justify-between">
      <Head
        icon={ShoppingCart}
        title="Purchase order"
        right={
          <Chip delay={1900} className="bg-lime">
            <Bell className="h-5 w-5" /> Owner notified
          </Chip>
        }
      />
      <Pipeline
        tone="bg-emerald text-paper"
        steps={[
          { label: "Ordered", icon: FileText },
          { label: "Expected date", icon: Truck },
          { label: "Received", icon: Warehouse },
        ]}
      />
      <div className="a-rise slide-caption flex items-center gap-3 font-semibold" style={d(1800)}>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-tangerine text-paper">
          <Plus className="h-5 w-5" strokeWidth={3} />
        </span>
        Stock added to inventory — in sync
      </div>
    </div>
  );
}

function VendorW() {
  const rows = [
    { name: "Mehta Metals", tag: "Sheets · Steel", tone: "bg-tangerine text-paper" },
    { name: "Shree Locks", tag: "Locks · Brass", tone: "bg-blush" },
  ];
  return (
    <div className="flex h-full gap-6">
      <div className="flex flex-1 flex-col justify-between">
        <Head icon={Building2} title="Vendors by category" />
        {rows.map((r, i) => (
          <div key={r.name} className="a-slide-l flex items-center justify-between border-b-2 border-ink/10 pb-3" style={d(600 + i * 200)}>
            <span className="w-heading">{r.name}</span>
            <span className={cn("pill slide-chrome font-semibold", r.tone)}>{r.tag}</span>
          </div>
        ))}
      </div>
      <div className="a-pop flex w-[220px] flex-col items-center justify-center gap-4 rounded-[28px] border-[2.5px] border-ink bg-emerald text-paper shadow-pop-sm" style={d(1000)}>
        <RefreshCw className="a-spin h-14 w-14" strokeWidth={2.4} />
        <span className="slide-caption font-semibold">Reorder last</span>
      </div>
    </div>
  );
}

function AnalyticsW() {
  const bars = [42, 64, 50, 78, 58, 88, 70, 96];
  return (
    <div className="flex h-full gap-8">
      <div className="flex flex-1 flex-col">
        <Head
          icon={Eye}
          title="Live view"
          right={
            <div className="flex overflow-hidden rounded-full border-[2.5px] border-ink">
              <span className="slide-chrome bg-ink px-4 py-1.5 font-semibold text-paper">Branch</span>
              <span className="slide-chrome px-4 py-1.5 font-semibold">All merged</span>
            </div>
          }
        />
        <div className="mt-5 flex flex-1 items-end gap-3 border-b-[2.5px] border-ink">
          {bars.map((h, i) => (
            <div
              key={i}
              className={cn(
                "a-grow-y flex-1 rounded-t-xl border-[2.5px] border-b-0 border-ink",
                i % 2 ? "bg-tangerine" : "bg-blush",
              )}
              style={{ height: `${h}%`, ...d(500 + i * 90) }}
            />
          ))}
        </div>
      </div>
      <div className="flex w-[200px] flex-col justify-center gap-3">
        <Chip delay={1300} className="justify-center bg-lime">Pending orders</Chip>
        <Chip delay={1450} className="justify-center bg-paper">Pending sales</Chip>
        <Chip delay={1600} className="justify-center bg-tangerine text-paper">
          <AlertTriangle className="h-5 w-5" /> Low stock
        </Chip>
      </div>
    </div>
  );
}

function CommunicationW() {
  return (
    <div className="flex h-full flex-col justify-between">
      <Head icon={Mail} title="Bulk email · New launch" right={<Chip delay={1500} className="bg-emerald text-paper">Sent</Chip>} />
      <div className="a-rise rounded-3xl border-[2.5px] border-ink bg-cream p-5" style={d(600)}>
        <div className="slide-chrome text-muted-foreground">To: All customers</div>
        <div className="w-heading mt-2">Introducing our new locker range</div>
        <div className="mt-3 h-3 w-4/5 rounded-full bg-ink/10" />
      </div>
      <div className="flex items-center gap-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="a-slide-r grid h-11 w-11 place-items-center rounded-xl border-[2.5px] border-ink bg-lime" style={d(900 + i * 120)}>
            <Mail className="h-5 w-5" />
          </span>
        ))}
        <span className="slide-caption a-fade ml-2 font-semibold" style={d(1600)}>+ invoices mailed automatically</span>
      </div>
    </div>
  );
}

function InvoiceW() {
  return (
    <div className="flex h-full items-center gap-8">
      <div className="a-pop flex flex-col items-center gap-3" style={d(500)}>
        <div className="grid h-24 w-24 place-items-center rounded-3xl border-[2.5px] border-ink bg-lime">
          <PackageCheck className="h-11 w-11" strokeWidth={2} />
        </div>
        <span className="slide-chrome font-semibold">Delivered</span>
      </div>
      <ArrowRight className="a-slide-l h-12 w-12" strokeWidth={2.4} style={d(800)} />
      <div className="a-rise flex-1 rounded-3xl border-[2.5px] border-ink bg-cream p-6" style={d(1000)}>
        <div className="flex items-center justify-between">
          <span className="w-heading">Invoice #INV-0428</span>
          <span className="pill slide-chrome bg-emerald font-semibold text-paper">Auto</span>
        </div>
        <div className="mt-4 space-y-3">
          <div className="a-grow-x h-3 w-full rounded-full bg-ink/15" style={d(1200)} />
          <div className="a-grow-x h-3 w-3/4 rounded-full bg-ink/15" style={d(1300)} />
          <div className="a-grow-x h-3 w-1/2 rounded-full bg-tangerine" style={d(1400)} />
        </div>
      </div>
    </div>
  );
}

function RbacW() {
  const roles = [
    { icon: Crown, name: "Admin", scope: "All branches", tone: "bg-tangerine text-paper" },
    { icon: UserCog, name: "Branch manager", scope: "Own branch", tone: "bg-blush" },
    { icon: User, name: "Salesperson", scope: "Basic rights", tone: "bg-lime" },
  ];
  return (
    <div className="flex h-full flex-col justify-between">
      <Head
        icon={Lock}
        title="Fixed roles"
        right={
          <Chip delay={1400} className="bg-paper">
            <Lock className="h-5 w-5" /> No custom roles
          </Chip>
        }
      />
      <div className="grid grid-cols-3 gap-4">
        {roles.map((r, i) => (
          <div key={r.name} className={cn("a-rise rounded-3xl border-[2.5px] border-ink p-5", r.tone)} style={d(600 + i * 180)}>
            <r.icon className="h-9 w-9" strokeWidth={2.2} />
            <div className="slide-caption mt-4 font-bold">{r.name}</div>
            <div className="slide-chrome mt-1 opacity-80">{r.scope}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InventoryW() {
  const stores = [
    { name: "Main warehouse", level: 82, tone: "bg-emerald" },
    { name: "City store", level: 18, tone: "bg-tangerine", low: true },
  ];
  return (
    <div className="flex h-full flex-col justify-between">
      <Head
        icon={Warehouse}
        title="Multiple inventories"
        right={
          <Chip delay={1500} className="bg-lime">
            <ArrowRightLeft className="h-5 w-5" /> Move stock
          </Chip>
        }
      />
      {stores.map((s, i) => (
        <div key={s.name} className="a-rise" style={d(600 + i * 200)}>
          <div className="flex items-center justify-between">
            <span className="slide-caption font-semibold">{s.name}</span>
            {s.low ? (
              <span className="slide-chrome flex items-center gap-2 font-semibold text-tangerine">
                <AlertTriangle className="h-5 w-5" /> Low stock
              </span>
            ) : (
              <span className="slide-chrome font-semibold text-emerald">Healthy</span>
            )}
          </div>
          <div className="mt-2 h-7 overflow-hidden rounded-full border-[2.5px] border-ink bg-cream">
            <div className={cn("a-grow-x h-full", s.tone)} style={{ width: `${s.level}%`, ...d(800 + i * 200) }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function BranchW() {
  const branches = ["North", "South", "East", "West"];
  return (
    <div className="flex h-full flex-col justify-between">
      <Head
        icon={Building2}
        title="Branch network"
        right={
          <Chip delay={1500} className="bg-paper">
            <Eye className="h-5 w-5" /> All-branch view · read-only
          </Chip>
        }
      />
      <div className="flex items-center gap-5">
        <div className="a-pop flex flex-col items-center gap-2" style={d(500)}>
          <div className="grid h-24 w-24 place-items-center rounded-3xl border-[2.5px] border-ink bg-lime">
            <Building2 className="h-11 w-11" strokeWidth={2} />
          </div>
          <span className="slide-chrome font-semibold">HQ</span>
        </div>
        <div className="a-grow-x h-[3px] w-12 bg-ink" style={d(700)} />
        <div className="grid flex-1 grid-cols-4 gap-3">
          {branches.map((b, i) => (
            <div key={b} className="a-pop rounded-2xl border-[2.5px] border-ink bg-cream p-3 text-center" style={d(800 + i * 150)}>
              <div className="slide-caption font-bold">{b}</div>
              <div className="slide-chrome mt-1 flex items-center justify-center gap-1 text-muted-foreground">
                <UserCog className="h-4 w-4" /> Manager
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReportsW() {
  return (
    <div className="flex h-full flex-col justify-between">
      <Head icon={Bell} title="Report reminders" />
      <div className="flex gap-3">
        {["Daily", "Weekly", "Monthly"].map((p, i) => (
          <Chip key={p} delay={600 + i * 120} className={i === 1 ? "bg-emerald text-paper" : "bg-paper"}>
            {i === 1 && <Check className="h-5 w-5" strokeWidth={3} />} {p}
          </Chip>
        ))}
        <Chip delay={1000} className="bg-lime">
          <Mail className="h-5 w-5" /> Auto-mail to admin
        </Chip>
      </div>
      <div className="flex gap-4">
        <div className="a-rise flex flex-1 items-center gap-4 rounded-3xl border-[2.5px] border-ink bg-tangerine p-5 text-paper" style={d(1200)}>
          <Upload className="h-9 w-9" strokeWidth={2.2} />
          <span className="slide-caption font-bold">Import .xlsx</span>
        </div>
        <div className="a-rise flex flex-1 items-center gap-4 rounded-3xl border-[2.5px] border-ink bg-blush p-5" style={d(1350)}>
          <Download className="h-9 w-9" strokeWidth={2.2} />
          <span className="slide-caption font-bold">Export .xlsx</span>
        </div>
      </div>
    </div>
  );
}

function CalendarW() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const events: Record<number, { label: string; tone: string; icon: LucideIcon }> = {
    0: { label: "Reminder", tone: "bg-lime", icon: Bell },
    2: { label: "Order", tone: "bg-tangerine text-paper", icon: Truck },
    4: { label: "Purchase", tone: "bg-emerald text-paper", icon: ShoppingCart },
  };
  return (
    <div className="flex h-full flex-col justify-between">
      <Head icon={Bell} title="This week" />
      <div className="grid grid-cols-5 gap-3">
        {days.map((day, i) => {
          const e = events[i];
          return (
            <div key={day} className="a-rise flex h-[150px] flex-col rounded-2xl border-[2.5px] border-ink bg-cream p-3" style={d(500 + i * 90)}>
              <span className="slide-chrome font-semibold text-muted-foreground">{day}</span>
              {e && (
                <div className={cn("a-pop mt-auto flex flex-col gap-1 rounded-xl border-2 border-ink p-2", e.tone)} style={d(1100 + i * 150)}>
                  <e.icon className="h-5 w-5" />
                  <span className="slide-chrome font-semibold">{e.label}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const widgets: Record<string, () => ReactNode> = {
  product: ProductW,
  customer: CustomerW,
  sales: SalesW,
  purchase: PurchaseW,
  vendor: VendorW,
  analytics: AnalyticsW,
  communication: CommunicationW,
  invoice: InvoiceW,
  rbac: RbacW,
  inventory: InventoryW,
  branch: BranchW,
  reports: ReportsW,
  calendar: CalendarW,
};

export function ModuleWidget({ id }: { id: string }) {
  const W = widgets[id];
  return W ? <W /> : null;
}
