import type { ComponentType } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  FileText,
  Mail,
  PackageCheck,
  Send,
  Truck,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND, modules, toneBg, toneFg, totalFeatures, type CrmModule } from "./modules";
import { coverImage, moduleImages } from "./images";
import { BrandMark, Chrome, Sticker, d, iconFor, pad } from "./ui";
import { ModuleWidget } from "./widgets";

export interface SlideProps {
  page: number;
  total: number;
}

/* ---------------- 1. Cover ---------------- */
function CoverSlide({ page, total }: SlideProps) {
  return (
    <div className="slide-content">
      <div className="dot-grid absolute inset-0 opacity-70" />
      <Chrome label="Product Deck · 2026" page={page} total={total} />

      <div className="absolute left-24 top-[250px] w-[900px]">
        <span className="a-rise pill slide-kicker bg-lime" style={d(100)}>
          CRM Suite
        </span>
        <h1 className="slide-title-lg mt-10">
          <span className="a-rise block" style={d(200)}>
            Pastel <span className="text-tangerine">X</span>
          </span>
          <span className="a-rise block" style={d(320)}>
            Crewvia
          </span>
        </h1>
        <p className="a-rise slide-body-lg mt-10 max-w-[760px] text-muted-foreground" style={d(450)}>
          One calm, connected workspace for your cosmetics shop — products, customers, sales, stock and every branch.
        </p>
        <div className="mt-12 flex gap-4">
          {[`${modules.length} modules`, `${totalFeatures} features`, "Multi-branch"].map((t, i) => (
            <span
              key={t}
              className={cn(
                "a-pop pill slide-caption font-semibold",
                ["bg-tangerine text-paper", "bg-blush", "bg-paper"][i],
              )}
              style={d(650 + i * 120)}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Visual */}
      <div className="absolute right-24 top-[230px] h-[620px] w-[860px]">
        <div className="a-pop absolute -right-10 -top-6 h-48 w-48 rounded-full border-[2.5px] border-ink bg-blush" style={d(300)} />
        <div className="a-pop absolute -bottom-6 -left-14 h-40 w-80 rounded-t-full border-[2.5px] border-ink bg-lime" style={d(450)} />
        <div className="a-spin absolute -left-24 top-10 h-44 w-44 rounded-full border-[3px] border-dashed border-ink" />
        <div className="a-reveal bento shadow-pop absolute inset-0 bg-tangerine p-8" style={d(150)}>
          <div className="h-full overflow-hidden rounded-[28px] border-[2.5px] border-ink bg-cream">
            <img src={coverImage} alt="Connected CRM modules" className="a-ken h-full w-full object-cover" />
          </div>
        </div>
        <Sticker className="-left-20 top-[420px]" delay={1100}>
          <Check className="h-5 w-5 text-emerald" strokeWidth={3} /> Stock synced
        </Sticker>
        <Sticker className="right-10 -bottom-8" delay={1300}>
          <Mail className="h-5 w-5 text-tangerine" /> Invoice sent
        </Sticker>
      </div>
    </div>
  );
}

/* ---------------- 2. Overview ---------------- */
function OverviewSlide({ page, total }: SlideProps) {
  return (
    <div className="slide-content">
      <Chrome label="The Suite" page={page} total={total} />
      <div className="absolute left-24 right-24 top-[150px] flex items-end justify-between">
        <h2 className="slide-title">
          <span className="a-rise block" style={d(100)}>
            {modules.length} modules.
          </span>
          <span className="a-rise block text-tangerine" style={d(220)}>
            One source of truth.
          </span>
        </h2>
        <p className="a-rise slide-body max-w-[560px] pb-3 text-muted-foreground" style={d(350)}>
          Every part of the business talks to every other part — so nothing is typed twice and nothing falls out of sync.
        </p>
      </div>

      <div className="absolute bottom-[110px] left-24 right-24 top-[420px] grid grid-cols-5 grid-rows-3 gap-5">
        <div className="a-pop bento col-span-2 flex flex-col justify-between bg-tangerine p-6 text-paper shadow-pop" style={d(400)}>
          <div className="flex items-center justify-between">
            <BrandMark size={48} />
            <span className="pill slide-chrome border-paper font-semibold">Core</span>
          </div>
          <div>
            <div className="slide-subtitle">CRM</div>
            <div className="slide-caption opacity-90">
              {totalFeatures} features working together
            </div>
          </div>
        </div>
        {modules.map((m, i) => {
          const Icon = iconFor(m.id);
          return (
            <div key={m.id} className="a-pop bento flex flex-col justify-between p-5" style={d(480 + i * 60)}>
              <div className="flex items-start justify-between">
                <span
                  className={cn(
                    "grid h-12 w-12 place-items-center rounded-2xl border-[2.5px] border-ink",
                    toneBg[m.tone],
                    toneFg[m.tone],
                  )}
                >
                  <Icon className="h-7 w-7" strokeWidth={2.3} />
                </span>
                <span className="slide-chrome font-semibold text-muted-foreground">{pad(m.no)}</span>
              </div>
              <div>
                <div className="slide-caption font-bold leading-[1.1]">{m.name}</div>
                <div className="slide-chrome mt-1.5 text-muted-foreground">
                  {m.features.length} {m.features.length === 1 ? "feature" : "features"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- 3. Core loop ---------------- */
const loop: { icon: LucideIcon; title: string; note: string; tone: string }[] = [
  { icon: Truck, title: "Purchase received", note: "Stock goes up", tone: "bg-emerald text-paper" },
  { icon: Warehouse, title: "Inventory", note: "Live across stores", tone: "bg-blush" },
  { icon: Send, title: "Sale dispatched", note: "Stock goes down", tone: "bg-lime" },
  { icon: PackageCheck, title: "Delivered", note: "Order complete", tone: "bg-tangerine text-paper" },
  { icon: FileText, title: "Invoice", note: "Auto-generated", tone: "bg-emerald text-paper" },
  { icon: Mail, title: "Email", note: "Auto-sent to customer", tone: "bg-blush" },
];

function LoopSlide({ page, total }: SlideProps) {
  return (
    <div className="slide-content">
      <div className="dot-grid absolute inset-0 opacity-60" />
      <Chrome label="How it flows" page={page} total={total} />
      <div className="absolute left-24 top-[150px] w-[1200px]">
        <span className="a-rise slide-kicker text-muted-foreground" style={d(100)}>
          Always in sync
        </span>
        <h2 className="slide-title mt-5">
          <span className="a-rise block" style={d(200)}>
            One action.
          </span>
          <span className="a-rise block" style={d(320)}>
            Everything <span className="text-tangerine">updates.</span>
          </span>
        </h2>
      </div>

      <div className="absolute left-24 right-24 top-[520px]">
        <svg className="absolute left-0 top-[78px] h-6 w-full" viewBox="0 0 1728 24" preserveAspectRatio="none">
          <path
            d="M 80 12 L 1648 12"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeDasharray="10 12"
            fill="none"
            className="a-fade"
            style={d(500)}
          />
        </svg>
        <div className="relative grid grid-cols-6 gap-6">
          {loop.map((s, i) => (
            <div key={s.title} className="a-rise flex flex-col items-center text-center" style={d(500 + i * 220)}>
              <div className={cn("grid h-[170px] w-[170px] place-items-center rounded-[44px] border-[2.5px] border-ink shadow-pop", s.tone)}>
                <s.icon className="h-16 w-16" strokeWidth={2} />
              </div>
              <span className="slide-chrome mt-6 font-semibold text-muted-foreground">{pad(i + 1)}</span>
              <div className="slide-caption mt-1 font-bold">{s.title}</div>
              <div className="slide-chrome mt-1 text-muted-foreground">{s.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="a-rise bento absolute bottom-[110px] left-24 right-24 flex h-[96px] items-center justify-between bg-lime px-10" style={d(1900)}>
        <div className="slide-caption flex items-center gap-4 font-semibold">
          <BarChart3 className="h-8 w-8" strokeWidth={2.3} />
          Analytics, reports and low-stock alerts refresh with every step
        </div>
        <ArrowRight className="h-8 w-8" strokeWidth={2.4} />
      </div>
    </div>
  );
}

/* ---------------- Module slides ---------------- */
function FeatureList({ m }: { m: CrmModule }) {
  return (
    <ul className={m.features.length > 5 ? "mt-auto" : "mt-14"}>
      {m.features.map((f, i) => (
        <li
          key={f}
          className="a-slide-l flex items-center gap-5 border-t-2 border-ink/10 py-[13px]"
          style={d(450 + i * 90)}
        >
          <span
            className={cn(
              "slide-chrome grid h-11 w-11 shrink-0 place-items-center rounded-full border-[2.5px] border-ink font-bold",
              toneBg[m.tone],
              toneFg[m.tone],
            )}
          >
            {i + 1}
          </span>
          <span className="slide-feature font-medium">{f}</span>
        </li>
      ))}
    </ul>
  );
}

function FeatureCards({ m }: { m: CrmModule }) {
  return (
    <div className="mt-14 flex flex-col gap-5">
      {m.features.map((f, i) => (
        <div
          key={f}
          className="a-rise bento flex min-h-[132px] items-center gap-7 px-8 py-6 shadow-pop-sm"
          style={d(450 + i * 160)}
        >
          <span
            className={cn(
              "grid h-[72px] w-[72px] shrink-0 place-items-center rounded-3xl border-[2.5px] border-ink font-display text-[34px] font-bold",
              toneBg[m.tone],
              toneFg[m.tone],
            )}
          >
            {pad(i + 1)}
          </span>
          <span className="slide-body font-semibold">{f}</span>
        </div>
      ))}
      {m.flow && (
        <div className="a-rise bento mt-3 bg-ink p-7 text-cream" style={d(450 + m.features.length * 160 + 150)}>
          <div className="slide-kicker text-lime">How it works</div>
          <div className="mt-5 flex items-center gap-4">
            {m.flow.map((step, i) => (
              <div key={step} className="flex flex-1 items-center gap-4">
                <div className="a-pop flex flex-1 items-center gap-3" style={d(900 + i * 220)}>
                  <span
                    className={cn(
                      "slide-chrome grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-cream font-bold",
                      i === m.flow!.length - 1 ? "bg-lime text-ink" : "",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="slide-caption font-semibold leading-tight">{step}</span>
                </div>
                {i < m.flow!.length - 1 && <ArrowRight className="h-6 w-6 shrink-0 text-lime" strokeWidth={2.4} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ModuleSlide({ m, page, total }: SlideProps & { m: CrmModule }) {
  const flip = m.no % 2 === 0;
  const Icon = iconFor(m.id);
  return (
    <div className="slide-content">
      <div className="dot-grid absolute inset-0 opacity-50" />
      <Chrome label={`Module ${pad(m.no)} / ${pad(modules.length)}`} page={page} total={total} />

      <div className={cn("absolute bottom-[100px] left-24 right-24 top-[140px] flex gap-16", flip && "flex-row-reverse")}>
        {/* Text column */}
        <div className="flex w-[840px] shrink-0 flex-col">
          <div className="a-rise flex items-center gap-4" style={d(100)}>
            <span
              className={cn(
                "grid h-16 w-16 place-items-center rounded-2xl border-[2.5px] border-ink shadow-pop-sm",
                toneBg[m.tone],
                toneFg[m.tone],
              )}
            >
              <Icon className="h-8 w-8" strokeWidth={2.4} />
            </span>
            <span className="slide-kicker">{m.name}</span>
          </div>
          <h2 className="a-rise slide-title mt-7" style={d(200)}>
            {m.title}
            <span className="text-tangerine">.</span>
          </h2>
          <p className="a-rise slide-body-lg mt-4 max-w-[800px] text-muted-foreground" style={d(300)}>
            {m.tagline}
          </p>
          {m.features.length > 3 ? <FeatureList m={m} /> : <FeatureCards m={m} />}
        </div>

        {/* Visual column */}
        <div className="relative flex min-w-0 flex-1 flex-col gap-6">
          <div
            className={cn(
              "a-pop absolute -top-6 h-28 w-28 rounded-full border-[2.5px] border-ink",
              flip ? "-left-8" : "-right-8",
              m.tone === "blush" ? "bg-lime" : "bg-blush",
            )}
            style={d(500)}
          />
          <div className={cn("a-reveal bento shadow-pop relative flex-1 p-6", toneBg[m.tone])} style={d(200)}>
            <div className="h-full overflow-hidden rounded-[24px] border-[2.5px] border-ink bg-cream">
              <img
                src={moduleImages[m.id]}
                alt={`${m.name} illustration`}
                className="a-ken h-full w-full object-cover"
                width={1536}
                height={1024}
              />
            </div>
          </div>
          <div className="a-rise bento shadow-pop h-[290px] shrink-0 p-7" style={d(450)}>
            <ModuleWidget id={m.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Closing ---------------- */
function ClosingSlide({ page, total }: SlideProps) {
  const names = modules.map((m) => m.name);
  return (
    <div className="slide-content bg-tangerine">
      <Chrome label="Thank you" page={page} total={total} inverted />
      <div className="a-pop absolute -left-24 bottom-24 h-[360px] w-[360px] rounded-full border-[2.5px] border-ink bg-lime" style={d(200)} />
      <div className="a-pop absolute -right-16 top-24 h-[260px] w-[260px] rounded-full border-[2.5px] border-ink bg-blush" style={d(350)} />
      <div className="a-pop absolute bottom-[200px] right-[260px] h-[160px] w-[160px] rounded-tl-full border-[2.5px] border-ink bg-emerald" style={d(500)} />
      <div className="a-spin absolute left-[300px] top-[160px] h-40 w-40 rounded-full border-[3px] border-dashed border-ink" />

      <div className="absolute inset-x-0 top-[250px] flex flex-col items-center text-center text-paper">
        <span className="a-rise pill slide-kicker border-paper" style={d(150)}>
          {modules.length} modules · {totalFeatures} features · 3 roles · multi-branch
        </span>
        <h2 className="slide-mega mt-12">
          <span className="a-rise block" style={d(300)}>
            Pastel X
          </span>
          <span className="a-rise block text-ink" style={d(430)}>
            Crewvia
          </span>
        </h2>
        <p className="a-rise slide-body-lg mt-10 max-w-[900px]" style={d(600)}>
          Every lipstick, order, branch and person — in one premium, simple workspace.
        </p>
      </div>

      <div className="a-fade absolute bottom-[96px] left-0 right-0 overflow-hidden border-y-[2.5px] border-ink bg-ink py-5" style={d(800)}>
        <div className="a-marquee flex w-max gap-12">
          {[...names, ...names].map((n, i) => (
            <span key={i} className="slide-caption flex items-center gap-12 font-semibold text-cream">
              {n}
              <span className="h-3 w-3 rounded-full bg-lime" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export interface SlideDef {
  id: string;
  title: string;
  Component: ComponentType<SlideProps>;
}

export const slides: SlideDef[] = [
  { id: "cover", title: BRAND, Component: CoverSlide },
  { id: "overview", title: "The Suite", Component: OverviewSlide },
  { id: "flow", title: "How it flows", Component: LoopSlide },
  ...modules.map<SlideDef>((m) => ({
    id: m.id,
    title: m.name,
    Component: (p: SlideProps) => <ModuleSlide m={m} {...p} />,
  })),
  { id: "closing", title: "Thank you", Component: ClosingSlide },
];
