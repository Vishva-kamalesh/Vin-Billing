export type ModuleKey = "security" | "water" | "power" | "solar" | "neutral";

export const MODULES: Record<
  ModuleKey,
  { label: string; color: string; stripClass: string; bgSoft: string; text: string }
> = {
  security: {
    label: "CCTV / Security",
    color: "#3B82F6",
    stripClass: "module-strip-security",
    bgSoft: "bg-security/10",
    text: "text-security",
  },
  water: {
    label: "RO / Water",
    color: "#06B6D4",
    stripClass: "module-strip-water",
    bgSoft: "bg-water/10",
    text: "text-water",
  },
  power: {
    label: "Inverter / Battery",
    color: "#F5A623",
    stripClass: "module-strip-power",
    bgSoft: "bg-power/10",
    text: "text-power",
  },
  solar: {
    label: "Solar",
    color: "#34D399",
    stripClass: "module-strip-solar",
    bgSoft: "bg-solar/10",
    text: "text-solar",
  },
  neutral: {
    label: "General",
    color: "#3B82F6",
    stripClass: "module-strip-neutral",
    bgSoft: "bg-primary/10",
    text: "text-primary",
  },
};

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export const formatNumber = (n: number) =>
  new Intl.NumberFormat("en-IN").format(n);
