import type { CSSProperties, ReactNode } from "react";
import {
  BarChart3,
  Building2,
  CalendarDays,
  FileText,
  Mail,
  Package,
  ShieldCheck,
  ShoppingCart,
  Store,
  TrendingUp,
  Users,
  Warehouse,
  FileSpreadsheet,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND } from "./modules";

/** Animation delay helper: feeds the --d custom property used by .a-* classes. */
export const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export const pad = (n: number) => String(n).padStart(2, "0");

export const moduleIcons: Record<string, LucideIcon> = {
  product: Package,
  customer: Users,
  sales: TrendingUp,
  purchase: ShoppingCart,
  vendor: Store,
  analytics: BarChart3,
  communication: Mail,
  invoice: FileText,
  rbac: ShieldCheck,
  inventory: Warehouse,
  branch: Building2,
  reports: FileSpreadsheet,
  calendar: CalendarDays,
};

export const iconFor = (id: string): LucideIcon => moduleIcons[id] ?? Package;

export function BrandMark({ size = 56 }: { size?: number }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-[30%] border-[2.5px] border-ink bg-tangerine" />
      <div className="absolute left-[16%] top-[16%] h-[40%] w-[40%] rounded-full border-[2.5px] border-ink bg-lime" />
      <div className="absolute bottom-[12%] right-[12%] h-[42%] w-[42%] rounded-tl-full border-[2.5px] border-ink bg-emerald" />
    </div>
  );
}

export function Chrome({
  label,
  page,
  total,
  inverted = false,
}: {
  label: string;
  page: number;
  total: number;
  inverted?: boolean;
}) {
  return (
    <>
      <div className="a-fade absolute left-24 right-24 top-12 z-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BrandMark size={44} />
          <span className={cn("slide-brand", inverted && "text-paper")}>{BRAND}</span>
        </div>
        <span className="pill slide-chrome bg-paper font-semibold text-ink">{label}</span>
      </div>
      <div
        className={cn(
          "a-fade slide-chrome absolute bottom-10 left-24 right-24 z-20 flex items-center justify-between",
          inverted ? "text-paper" : "text-muted-foreground",
        )}
      >
        <span>CRM Suite — Product Deck</span>
        <span className={cn("font-semibold", inverted ? "text-paper" : "text-ink")}>
          {pad(page)} / {pad(total)}
        </span>
      </div>
    </>
  );
}

export function Sticker({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={cn("absolute z-10 a-pop", className)} style={d(delay)}>
      <div className="a-float pill slide-chrome bg-paper font-semibold shadow-pop-sm" style={d(delay)}>
        {children}
      </div>
    </div>
  );
}
