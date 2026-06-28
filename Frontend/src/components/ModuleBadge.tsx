import { MODULES, type ModuleKey } from "@/lib/modules";
import { cn } from "@/lib/utils";

export function ModuleBadge({ module, className }: { module: string; className?: string }) {
  const m = MODULES[module as ModuleKey] || {
    label: module.replace(/_/g, ' '),
    color: "#64748B",
    stripClass: "module-strip-neutral",
    bgSoft: "bg-secondary",
    text: "text-muted-foreground",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider",
        className,
      )}
      style={{
        borderColor: `${m.color}40`,
        background: `${m.color}14`,
        color: m.color,
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: m.color }} />
      {m.label}
    </span>
  );
}

export function StatusPill({
  tone,
  children,
}: {
  tone: "success" | "warning" | "danger" | "info" | "muted";
  children: React.ReactNode;
}) {
  const tones: Record<string, string> = {
    success: "bg-solar/12 text-solar border-solar/30",
    warning: "bg-power/12 text-power border-power/30",
    danger: "bg-destructive/12 text-destructive border-destructive/30",
    info: "bg-security/12 text-security border-security/30",
    muted: "bg-muted text-muted-foreground border-border",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
