import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { ModuleBadge, StatusPill } from "@/components/ModuleBadge";
import { useFetchAMCs, useCreateAMC } from "@/hooks/useAMCs";
import { formatINR, MODULES } from "@/lib/modules";
import { Button } from "@/components/ui/button";
import { Plus, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Route = createFileRoute("/amc")({
  head: () => ({ meta: [{ title: "AMC Management — Vin Technology" }] }),
  component: AMCPage,
});

function AMCPage() {
  const { data: amcs = [], isLoading } = useFetchAMCs();
  const { mutate: createAMC, isPending: isCreating } = useCreateAMC();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAMC, setNewAMC] = useState({ customerName: "", product: "", module: "solar", value: 0 });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createAMC(newAMC as any, {
      onSuccess: () => {
        setIsDialogOpen(false);
        setNewAMC({ customerName: "", product: "", module: "solar", value: 0 });
      }
    });
  };
  const expiring = amcs.filter((a) => a.status === "Expiring");
  const sorted = [...amcs].sort((a, b) => {
    if (a.status === "Expiring" && b.status !== "Expiring") return -1;
    if (b.status === "Expiring" && a.status !== "Expiring") return 1;
    return a.endDate.localeCompare(b.endDate);
  });

  return (
    <AppShell>
      <PageHeader
        eyebrow="Annual Maintenance Contracts"
        title="AMC"
        description="Track contracts, visits and renewal windows across every line."
        actions={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1.5"><Plus className="h-4 w-4" />New AMC</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create AMC</DialogTitle>
                <DialogDescription>
                  Enter details for a new Annual Maintenance Contract.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="customerName" className="text-right">Customer</Label>
                    <Input id="customerName" value={newAMC.customerName} onChange={e => setNewAMC(prev => ({...prev, customerName: e.target.value}))} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="product" className="text-right">Product</Label>
                    <Input id="product" value={newAMC.product} onChange={e => setNewAMC(prev => ({...prev, product: e.target.value}))} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="module" className="text-right">Module</Label>
                    <select id="module" value={newAMC.module} onChange={e => setNewAMC(prev => ({...prev, module: e.target.value}))} className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="security">Security / CCTV</option>
                      <option value="water">Water / RO</option>
                      <option value="power">Power / UPS</option>
                      <option value="solar">Solar</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="value" className="text-right">Value (₹)</Label>
                    <Input id="value" type="number" value={newAMC.value} onChange={e => setNewAMC(prev => ({...prev, value: Number(e.target.value)}))} className="col-span-3" required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isCreating}>{isCreating ? "Saving..." : "Save AMC"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Tile label="Active" value={amcs.filter((a) => a.status === "Active").length} accent="solar" />
        <Tile label="Expiring · 30 days" value={expiring.length} accent="power" />
        <Tile label="Expired" value={amcs.filter((a) => a.status === "Expired").length} accent="danger" />
        <Tile label="AMC Value" value={formatINR(amcs.reduce((s, a) => s + a.value, 0))} accent="primary" />
      </div>

      {expiring.length > 0 && (
        <div className="mb-4 rounded-xl border border-power/30 bg-power/5 p-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-power" />
            <div className="font-display font-semibold">Renewal-focus queue</div>
            <span className="font-mono text-xs text-muted-foreground">{expiring.length} expiring within 30 days</span>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-border bg-surface/80">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-2 font-medium">AMC No.</th>
              <th className="py-2 font-medium">Customer</th>
              <th className="py-2 font-medium">Product</th>
              <th className="py-2 font-medium">Period</th>
              <th className="py-2 font-medium">Visits</th>
              <th className="px-4 py-2 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {isLoading ? (
              <tr><td colSpan={6} className="py-8 text-center text-sm text-muted-foreground">Loading AMCs...</td></tr>
            ) : sorted.map((a) => {
              const pct = (a.visitsUsed / a.visitsTotal) * 100;
              const tone =
                a.status === "Active" ? "success" : a.status === "Expiring" ? "warning" : "danger";
              return (
                <tr key={a.id} className={cn("hover:bg-secondary/40", MODULES[a.module as keyof typeof MODULES]?.stripClass)}>
                  <td className="px-4 py-2.5 font-mono text-xs">{a.number}</td>
                  <td className="py-2.5">
                    <div>{a.customerName}</div>
                    <div className="mt-0.5"><ModuleBadge module={a.module} /></div>
                  </td>
                  <td className="py-2.5 text-muted-foreground">{a.product}</td>
                  <td className="py-2.5 font-mono text-xs">
                    <div>{a.startDate}</div>
                    <div className="text-muted-foreground">→ {a.endDate}</div>
                  </td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${pct}%`,
                            background: MODULES[a.module].color,
                          }}
                        />
                      </div>
                      <span className="font-mono text-xs">{a.visitsUsed}/{a.visitsTotal}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-right"><StatusPill tone={tone}>{a.status}</StatusPill></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}

function Tile({ label, value, accent }: { label: string; value: string | number; accent: string }) {
  const colors: any = { solar: "#34D399", power: "#F5A623", danger: "#EF4444", primary: "#3B82F6" };
  return (
    <div className="rounded-xl border border-border bg-surface/80 p-4">
      <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 font-mono text-xl font-bold" style={{ color: colors[accent] }}>{value}</div>
    </div>
  );
}
