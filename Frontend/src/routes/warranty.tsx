import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { ModuleBadge, StatusPill } from "@/components/ModuleBadge";
import { useFetchWarranties } from "@/hooks/useWarranties";
import { MODULES } from "@/lib/modules";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/warranty")({
  head: () => ({ meta: [{ title: "Warranty — Vin Technology" }] }),
  component: WarrantyPage,
});

function WarrantyPage() {
  const { data: w = [], isLoading } = useFetchWarranties();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <AppShell>
      <PageHeader
        eyebrow="After-Sales"
        title="Warranty Registry"
        description="Track product warranties, claims and expiry across every install."
      />

      <div className="overflow-hidden rounded-xl border border-border bg-surface/80">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-2 font-medium">Product</th>
              <th className="py-2 font-medium">Serial</th>
              <th className="py-2 font-medium">Customer</th>
              <th className="py-2 font-medium">Period</th>
              <th className="px-4 py-2 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {isLoading ? (
              <tr><td colSpan={5} className="py-8 text-center text-sm text-muted-foreground">Loading warranties...</td></tr>
            ) : w.map((x) => {
              const expired = x.endDate < today;
              const days = (new Date(x.endDate).getTime() - new Date(today).getTime()) / 86400000;
              const expiringSoon = !expired && days <= 60;
              return (
                <tr key={x.id} className={cn("hover:bg-secondary/40", MODULES[x.module as keyof typeof MODULES]?.stripClass)}>
                  <td className="px-4 py-2.5">
                    <div>{x.productName}</div>
                    <div className="mt-0.5"><ModuleBadge module={x.module} /></div>
                  </td>
                  <td className="py-2.5 font-mono text-xs">{x.serial}</td>
                  <td className="py-2.5">{x.customerName}</td>
                  <td className="py-2.5 font-mono text-xs">
                    <div>{x.startDate}</div>
                    <div className="text-muted-foreground">→ {x.endDate}</div>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <StatusPill tone={expired ? "danger" : expiringSoon ? "warning" : "success"}>
                      {expired ? "Expired" : expiringSoon ? "Expiring" : "Active"}
                    </StatusPill>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
