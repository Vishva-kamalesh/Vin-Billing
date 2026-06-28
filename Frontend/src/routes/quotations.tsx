import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { ModuleBadge, StatusPill } from "@/components/ModuleBadge";
import { useFetchQuotations, useCreateQuotation } from "@/hooks/useQuotations";
import { formatINR, MODULES } from "@/lib/modules";
import { ArrowRight, FileText, Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Route = createFileRoute("/quotations")({
  head: () => ({ meta: [{ title: "Quotations — Vin Technology" }] }),
  component: QuotationsPage,
});

function QuotationsPage() {
  const { data: q = [], isLoading } = useFetchQuotations();
  const { mutate: createQuotation, isPending: isCreating } = useCreateQuotation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newQuote, setNewQuote] = useState({ customerName: "", module: "solar", value: 0 });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createQuotation(newQuote as any, {
      onSuccess: () => {
        setIsDialogOpen(false);
        setNewQuote({ customerName: "", module: "solar", value: 0 });
      }
    });
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Pre-Sales"
        title="Quotations"
        description="Build, send and convert quotes into invoices."
        actions={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1.5"><Plus className="h-4 w-4" />New Quotation</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Quotation</DialogTitle>
                <DialogDescription>
                  Enter details to draft a new quotation.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="customerName" className="text-right">Customer</Label>
                    <Input id="customerName" value={newQuote.customerName} onChange={e => setNewQuote(prev => ({...prev, customerName: e.target.value}))} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="module" className="text-right">Module</Label>
                    <select id="module" value={newQuote.module} onChange={e => setNewQuote(prev => ({...prev, module: e.target.value}))} className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="security">Security / CCTV</option>
                      <option value="water">Water / RO</option>
                      <option value="power">Power / UPS</option>
                      <option value="solar">Solar</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="value" className="text-right">Value (₹)</Label>
                    <Input id="value" type="number" value={newQuote.value} onChange={e => setNewQuote(prev => ({...prev, value: Number(e.target.value)}))} className="col-span-3" required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isCreating}>{isCreating ? "Saving..." : "Save Draft"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="overflow-hidden rounded-xl border border-border bg-surface/80">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-2 font-medium">Quote No.</th>
              <th className="py-2 font-medium">Customer</th>
              <th className="py-2 font-medium">Date</th>
              <th className="py-2 text-right font-medium">Value</th>
              <th className="py-2 font-medium">Status</th>
              <th className="px-4 py-2 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {isLoading ? (
              <tr><td colSpan={6} className="py-8 text-center text-sm text-muted-foreground">Loading quotations...</td></tr>
            ) : q.map((x) => (
              <tr key={x.id} className={cn("hover:bg-secondary/40", MODULES[x.module as keyof typeof MODULES]?.stripClass)}>
                <td className="px-4 py-2.5 font-mono text-xs">{x.number}</td>
                <td className="py-2.5">
                  <div>{x.customerName}</div>
                  <div className="mt-0.5"><ModuleBadge module={x.module} /></div>
                </td>
                <td className="py-2.5 font-mono text-xs text-muted-foreground">{x.date}</td>
                <td className="py-2.5 text-right font-mono font-semibold">{formatINR(x.value)}</td>
                <td className="py-2.5">
                  <StatusPill
                    tone={x.status === "Accepted" ? "success" : x.status === "Rejected" ? "danger" : x.status === "Sent" ? "info" : "muted"}
                  >
                    {x.status}
                  </StatusPill>
                </td>
                <td className="px-4 py-2.5 text-right">
                  <div className="flex justify-end gap-1.5">
                    <Button size="sm" variant="ghost" className="h-7 gap-1 text-xs">
                      <Download className="h-3 w-3" /> PDF
                    </Button>
                    {x.status !== "Rejected" && (
                      <Button size="sm" className="h-7 gap-1 bg-solar text-background text-xs hover:bg-solar/90">
                        Convert <ArrowRight className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
