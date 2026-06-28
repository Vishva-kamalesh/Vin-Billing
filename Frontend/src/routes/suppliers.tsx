import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { ModuleBadge } from "@/components/ModuleBadge";
import { useFetchSuppliers, useCreateSupplier } from "@/hooks/useSuppliers";
import { formatINR, MODULES } from "@/lib/modules";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Route = createFileRoute("/suppliers")({
  head: () => ({ meta: [{ title: "Suppliers — Vin Technology" }] }),
  component: SupplierPage,
});

function SupplierPage() {
  const { data: list = [], isLoading } = useFetchSuppliers();
  const { mutate: createSupplier, isPending: isCreating } = useCreateSupplier();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSupplier, setNewSupplier] = useState({ name: "", contact: "", modules: ["solar"] });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createSupplier(newSupplier as any, {
      onSuccess: () => {
        setIsDialogOpen(false);
        setNewSupplier({ name: "", contact: "", modules: ["solar"] });
      }
    });
  };
  return (
    <AppShell>
      <PageHeader
        eyebrow="Supply Chain"
        title="Suppliers"
        description="Vendors, outstanding balances and purchase orders."
        actions={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1.5"><Plus className="h-4 w-4" />New Supplier</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Supplier</DialogTitle>
                <DialogDescription>
                  Enter details for a new vendor or supplier.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" value={newSupplier.name} onChange={e => setNewSupplier(prev => ({...prev, name: e.target.value}))} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="contact" className="text-right">Contact</Label>
                    <Input id="contact" value={newSupplier.contact} onChange={e => setNewSupplier(prev => ({...prev, contact: e.target.value}))} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="modules" className="text-right">Modules</Label>
                    <select id="modules" value={newSupplier.modules[0]} onChange={e => setNewSupplier(prev => ({...prev, modules: [e.target.value]}))} className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="security">Security / CCTV</option>
                      <option value="water">Water / RO</option>
                      <option value="power">Power / UPS</option>
                      <option value="solar">Solar</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isCreating}>{isCreating ? "Saving..." : "Save Supplier"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full py-8 text-center text-sm text-muted-foreground">Loading suppliers...</div>
        ) : list.map((s) => {
          const primary = s.modules?.[0] ?? "neutral";
          return (
            <div
              key={s.id}
              className={cn(
                "hover-lift rounded-xl border border-border bg-surface/80 p-5",
                MODULES[primary].stripClass,
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-display text-base font-bold">{s.name}</div>
                  <div className="font-mono text-xs text-muted-foreground">{s.contact}</div>
                </div>
                <div className="flex gap-1">
                  {s.modules.map((m) => <ModuleBadge key={m} module={m} />)}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Outstanding</div>
                  <div className={cn("mt-0.5 font-mono text-lg font-bold", s.outstanding > 0 ? "text-power" : "text-solar")}>
                    {formatINR(s.outstanding)}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Orders</div>
                  <div className="mt-0.5 font-mono text-lg font-bold">{s.ordersCount}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
