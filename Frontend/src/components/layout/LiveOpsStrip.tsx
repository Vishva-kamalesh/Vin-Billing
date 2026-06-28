import { useFetchPulses } from "@/hooks/useNotifications";
import { MODULES } from "@/lib/modules";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";

export function LiveOpsStrip() {
  const { data: pulses = [] } = useFetchPulses();
  const repeated = [...pulses, ...pulses];

  return (
    <div className="relative overflow-hidden border-y border-border bg-gradient-to-r from-surface via-background to-surface">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
      <div className="flex items-center">
        <div className="z-10 flex shrink-0 items-center gap-2 border-r border-border bg-background/80 px-4 py-2.5 backdrop-blur-xl">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-solar opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-solar" />
          </span>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Live Ops
          </span>
        </div>

        <div className="flex w-full overflow-hidden">
          <div className="flex shrink-0 animate-ticker items-center gap-8 whitespace-nowrap py-2.5 pl-6 pr-6">
            {repeated.map((p, i) => {
              const m = MODULES[p.module as keyof typeof MODULES] || MODULES.neutral;
              const Icon =
                p.kind === "alert" ? AlertTriangle : p.kind === "success" ? CheckCircle2 : Info;
              return (
                <div key={`${p.id}-${i}`} className="flex items-center gap-2 text-sm">
                  <Icon
                    className="h-3.5 w-3.5 shrink-0"
                    style={{ color: m.color }}
                  />
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: m.color }}
                  />
                  <span className="text-foreground/90">{p.text}</span>
                  <span className="text-muted-foreground/40">·</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
