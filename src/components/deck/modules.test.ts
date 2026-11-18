import { describe, expect, it } from "vitest";
import { modules, totalFeatures } from "./modules";

// The deck must cover every module and every feature from the user's CRM feature map.
describe("CRM feature coverage", () => {
  it("includes all 13 modules from the feature map", () => {
    expect(modules.map((m) => m.name)).toEqual([
      "Product Management",
      "Customer Management",
      "Sales Management",
      "Purchase Management",
      "Vendor Management",
      "Analytics",
      "Communication (Emails)",
      "Invoice Generation",
      "Role Access Management",
      "Inventory Management",
      "Branch Management",
      "Reports",
      "Calendar",
    ]);
  });

  it("keeps the exact feature count of each module", () => {
    expect(modules.map((m) => m.features.length)).toEqual([4, 6, 7, 6, 6, 5, 2, 1, 7, 6, 6, 3, 2]);
  });

  it("covers 61 features in total", () => {
    expect(totalFeatures).toBe(61);
  });
});
