import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { ModuleBadge } from "@/components/ModuleBadge";
import { useFetchLeads, useUpdateLead, useCreateLead } from "@/hooks/useLeads";
import { formatINR, MODULES } from "@/lib/modules";
import { Globe, MessageCircle, Users, Search as SearchIcon, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Route = createFileRoute("/leads")({
  head: () => ({ meta: [{ title: "Leads — Vin Technology" }] }),
  component: LeadsPage,
});

const STATUSES = ["New", "Contacted", "Quoted", "Won", "Lost"] as const;

const SOURCE_ICON: Record<string, any> = {
  "Google Ads": SearchIcon,
  Website: Globe,
  WhatsApp: MessageCircle,
  Reference: Users,
  "Walk-In": MapPin,
};

function LeadsPage() {
  const { data: leads = [], isLoading } = useFetchLeads();
  const { mutate: updateLead } = useUpdateLead();
  const { mutate: createLead, isPending: isCreating } = useCreateLead();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newLead, setNewLead] = useState({ name: "", phone: "", interest: "", module: "security", source: "Website", value: 0 });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createLead(newLead as any, {
      onSuccess: () => {
        setIsDialogOpen(false);
        setNewLead({ name: "", phone: "", interest: "", module: "security", source: "Website", value: 0 });
      }
    });
  };

  const onDrop = (e: React.DragEvent, status: typeof STATUSES[number]) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (id) {
      updateLead({ id, data: { status } });
    }
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Sales Pipeline"
        title="Leads"
        description="Drag cards to update status. Color-coded by product line."
        actions={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1.5">
                <Plus className="h-4 w-4" /> New Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Lead</DialogTitle>
                <DialogDescription>
                  Enter the lead details. They will enter the pipeline as 'New'.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" value={newLead.name} onChange={e => setNewLead(prev => ({...prev, name: e.target.value}))} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">Phone</Label>
                    <Input id="phone" value={newLead.phone} onChange={e => setNewLead(prev => ({...prev, phone: e.target.value}))} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="interest" className="text-right">Interest</Label>
                    <Input id="interest" value={newLead.interest} onChange={e => setNewLead(prev => ({...prev, interest: e.target.value}))} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="value" className="text-right">Value (₹)</Label>
                    <Input id="value" type="number" value={newLead.value} onChange={e => setNewLead(prev => ({...prev, value: Number(e.target.value)}))} className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isCreating}>{isCreating ? "Saving..." : "Save Lead"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {STATUSES.map((status) => {
          const items = leads.filter((l) => l.status === status);
          const total = items.reduce((s, l) => s + l.value, 0);
          return (
            <div
              key={status}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(e, status)}
              className="flex flex-col rounded-xl border border-border bg-surface/60 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between border-b border-border/60 px-3 py-2.5">
                <div>
                  <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {status}
                  </div>
                  <div className="font-mono text-xs">{items.length} · {formatINR(total)}</div>
                </div>
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    status === "New" && "bg-security",
                    status === "Contacted" && "bg-water",
                    status === "Quoted" && "bg-power",
                    status === "Won" && "bg-solar",
                    status === "Lost" && "bg-destructive",
                  )}
                />
              </div>
              <div className="flex-1 space-y-2 p-2 min-h-[200px]">
                {items.map((l) => {
                  const Icon = SOURCE_ICON[l.source];
                  return (
                    <div
                      key={l.id}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData("text/plain", l.id)}
                      className={cn(
                        "cursor-grab rounded-lg border border-border bg-background/60 p-3 active:cursor-grabbing hover:border-foreground/20",
                        MODULES[l.module as keyof typeof MODULES]?.stripClass,
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium">{l.name}</div>
                          <div className="font-mono text-[11px] text-muted-foreground">{l.phone}</div>
                        </div>
                        <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground line-clamp-2">{l.interest}</div>
                      <div className="mt-2 flex items-center justify-between">
                        <ModuleBadge module={l.module} />
                        <span className="font-mono text-xs font-semibold">{formatINR(l.value)}</span>
                      </div>
                      <div className="mt-2 font-mono text-[10px] text-muted-foreground">
                        Next: {l.nextFollowUp}
                      </div>
                    </div>
                  );
                })}
                {isLoading && <div className="p-4 text-center text-xs text-muted-foreground">Loading...</div>}
                {!isLoading && items.length === 0 && (
                  <div className="rounded-md border border-dashed border-border/60 px-3 py-6 text-center text-xs text-muted-foreground">
                    Drop leads here.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
