import { useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Deck } from "@/components/deck/Deck";
import { slides } from "@/components/deck/slides";

type DeckSearch = { slide?: number };

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): DeckSearch => {
    const n = Number(search["slide"]);
    return Number.isInteger(n) && n >= 1 ? { slide: n } : {};
  },
  head: () => ({
    meta: [
      { title: "Pastel X Crewvia — CRM Suite Product Deck" },
      {
        name: "description",
        content:
          "A slide-by-slide tour of Pastel X Crewvia: products, customers, sales, purchases, vendors, analytics, emails, invoices, roles, inventory, branches, reports and calendar.",
      },
      { property: "og:title", content: "Pastel X Crewvia — CRM Suite Product Deck" },
      {
        property: "og:description",
        content: "13 modules and 61 features of the Pastel X Crewvia CRM, presented slide by slide.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { slide } = Route.useSearch();
  const navigate = Route.useNavigate();
  const index = Math.min(Math.max((slide ?? 1) - 1, 0), slides.length - 1);
  const onNavigate = useCallback(
    (i: number) => navigate({ search: { slide: i + 1 }, replace: true }),
    [navigate],
  );
  return <Deck index={index} onNavigate={onNavigate} />;
}
