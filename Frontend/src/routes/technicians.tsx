import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { useFetchTechnicians } from "@/hooks/useTechnicians";
import { useTickets } from "@/store";
import { MODULES } from "@/lib/modules";
import { Phone, Navigation, Camera, IndianRupee, CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/technicians")({
  head: () => ({ meta: [{ title: "Technicians — Vin Technology" }] }),
  component: TechPage,
});

function TechPage() {
  const { data: list = [], isLoading } = useFetchTechnicians();
  const tickets = useTickets();
  const [selectedId, setSelectedId] = useState(list[0]?.id);
  
  useEffect(() => {
    if (!selectedId && list.length > 0) {
      setSelectedId(list[0].id);
    }
  }, [list, selectedId]);

  const selected = list.find((t) => t.id === selectedId);
  const jobs = tickets.filter((t) => t.technicianId === selectedId && t.status !== "Completed");

  return (
    <AppShell>
      <PageHeader
        eyebrow="Field Operations"
        title="Technicians"
        description="Team availability and the on-phone view your field staff uses."
      />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-7">
          <div className="overflow-hidden rounded-xl border border-border bg-surface/80">
            <div className="border-b border-border px-5 py-3">
              <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Team</h3>
            </div>
            <div className="divide-y divide-border/40">
              {list.map((t) => {
                const active = t.id === selectedId;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedId(t.id)}
                    className={cn(
                      "flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-secondary/40",
                      active && "bg-secondary/60",
                    )}
                  >
                    <div className="relative">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-security/40 to-solar/40 font-mono text-sm font-bold">
                        {t.initials}
                      </div>
                      <span className={cn(
                        "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface",
                        t.status === "available" && "bg-solar",
                        t.status === "on-job" && "bg-power animate-pulse-soft",
                        t.status === "offline" && "bg-muted-foreground/50",
                      )} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-medium">{t.name}</span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{t.status}</span>
                      </div>
                      <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">{t.phone}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm">{t.activeJobs} jobs</div>
                      <div className="flex items-center justify-end gap-1 text-xs text-power">
                        <Star className="h-3 w-3 fill-power" /> {t.rating}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {t.modules.map((m) => (
                        <span key={m} className="h-2 w-2 rounded-full" style={{ background: MODULES[m].color }} />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile-first detail */}
        <div className="col-span-12 md:col-span-5">
          {selected && (
            <div className="mx-auto max-w-sm rounded-[28px] border border-border bg-background p-4 shadow-2xl">
              <div className="mx-auto mb-2 h-1 w-12 rounded-full bg-border" />
              <div className="rounded-2xl bg-surface p-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-security to-solar font-mono text-base font-bold text-background">
                    {selected.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-display font-bold">{selected.name}</div>
                    <div className="font-mono text-[11px] text-muted-foreground">Field Technician</div>
                  </div>
                </div>

                <div className="mt-3 rounded-lg bg-background/60 p-2.5 text-center">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Today's jobs</div>
                  <div className="font-mono text-2xl font-bold">{jobs.length}</div>
                </div>

                <div className="mt-3 space-y-2">
                  {jobs.map((j) => (
                    <div key={j.id} className={cn("rounded-lg border border-border bg-background/60 p-3", MODULES[j.module].stripClass)}>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs">{j.number}</span>
                        <span className="font-mono text-[10px] text-muted-foreground">{j.scheduledFor ?? "Today"}</span>
                      </div>
                      <div className="mt-1 text-sm font-medium">{j.customerName}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2">{j.issue}</div>
                      <div className="mt-2 grid grid-cols-4 gap-1.5">
                        <ActionBtn icon={Phone} label="Call" />
                        <ActionBtn icon={Navigation} label="Nav" />
                        <ActionBtn icon={Camera} label="Photo" />
                        <ActionBtn icon={IndianRupee} label="Collect" />
                      </div>
                    </div>
                  ))}
                  {jobs.length === 0 && (
                    <div className="rounded-lg border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                      No open jobs assigned.
                    </div>
                  )}
                </div>

                <Button className="mt-3 w-full gap-1.5 bg-solar text-background hover:bg-solar/90">
                  <CheckCircle2 className="h-4 w-4" /> Close current visit
                </Button>
              </div>
              <div className="mt-2 text-center font-mono text-[10px] text-muted-foreground">
                Technician mobile view · live preview
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function ActionBtn({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <button className="flex flex-col items-center gap-1 rounded-md border border-border bg-surface/60 py-1.5 text-[10px] text-muted-foreground hover:bg-secondary hover:text-foreground">
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
