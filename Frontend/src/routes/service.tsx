import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { ModuleBadge, StatusPill } from "@/components/ModuleBadge";
import { useAppDispatch, useTechnicians, ticketsActions } from "@/store";
import { useFetchTickets, useCreateTicket } from "@/hooks/useTickets";
import { MODULES } from "@/lib/modules";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Camera, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Route = createFileRoute("/service")({
  head: () => ({ meta: [{ title: "Service Tickets — Vin Technology" }] }),
  component: ServicePage,
});

const COLS = ["Open", "Assigned", "In Progress", "Completed"] as const;

function ServicePage() {
  const { data: tickets = [], isLoading } = useFetchTickets();
  const techs = useTechnicians();
  const dispatch = useAppDispatch();
  const { mutate: createTicket, isPending: isCreating } = useCreateTicket();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({ customerName: "", issue: "", module: "security", priority: "Medium" });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createTicket(newTicket as any, {
      onSuccess: () => {
        setIsDialogOpen(false);
        setNewTicket({ customerName: "", issue: "", module: "security", priority: "Medium" });
      }
    });
  };

  const techName = (id?: string) => techs.find((t) => t.id === id)?.name;

  const onDrop = (e: React.DragEvent, status: typeof COLS[number]) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (id) dispatch(ticketsActions.update({ id, patch: { status } }));
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Service Desk"
        title="Tickets"
        description="Complaint → Ticket → Assignment → Visit → Close. Color-coded by product line."
        actions={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1.5"><Plus className="h-4 w-4" />New Ticket</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Service Ticket</DialogTitle>
                <DialogDescription>
                  Enter ticket details to dispatch a technician.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="customerName" className="text-right">Customer</Label>
                    <Input id="customerName" value={newTicket.customerName} onChange={e => setNewTicket(prev => ({...prev, customerName: e.target.value}))} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="issue" className="text-right">Issue</Label>
                    <Input id="issue" value={newTicket.issue} onChange={e => setNewTicket(prev => ({...prev, issue: e.target.value}))} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="module" className="text-right">Module</Label>
                    <select id="module" value={newTicket.module} onChange={e => setNewTicket(prev => ({...prev, module: e.target.value}))} className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="security">Security / CCTV</option>
                      <option value="water">Water / RO</option>
                      <option value="power">Power / UPS</option>
                      <option value="solar">Solar</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="priority" className="text-right">Priority</Label>
                    <select id="priority" value={newTicket.priority} onChange={e => setNewTicket(prev => ({...prev, priority: e.target.value}))} className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isCreating}>{isCreating ? "Saving..." : "Save Ticket"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <Tabs defaultValue="board">
        <TabsList>
          <TabsTrigger value="board">Board</TabsTrigger>
          <TabsTrigger value="table">Table</TabsTrigger>
        </TabsList>

        <TabsContent value="board">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {COLS.map((status) => {
              const items = tickets.filter((t) => t.status === status);
              return (
                <div
                  key={status}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => onDrop(e, status)}
                  className="rounded-xl border border-border bg-surface/60 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between border-b border-border/60 px-3 py-2.5">
                    <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{status}</div>
                    <span className="font-mono text-xs">{items.length}</span>
                  </div>
                  <div className="space-y-2 p-2 min-h-[300px]">
                    {items.map((t) => (
                      <div
                        key={t.id}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData("text/plain", t.id)}
                        className={cn(
                          "cursor-grab rounded-lg border border-border bg-background/60 p-3 active:cursor-grabbing hover:border-foreground/20",
                          MODULES[t.module as keyof typeof MODULES]?.stripClass,
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="font-mono text-xs">{t.number}</div>
                          <StatusPill tone={t.priority === "High" ? "danger" : t.priority === "Medium" ? "warning" : "muted"}>
                            {t.priority}
                          </StatusPill>
                        </div>
                        <div className="mt-1.5 text-sm font-medium">{t.customerName}</div>
                        <div className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{t.issue}</div>
                        <div className="mt-2 flex items-center justify-between">
                          <ModuleBadge module={t.module} />
                          {t.technicianId && (
                            <span className="font-mono text-[11px] text-muted-foreground">
                              {techName(t.technicianId)}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="table">
          <div className="overflow-hidden rounded-xl border border-border bg-surface/80">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-2 font-medium">Ticket</th>
                  <th className="py-2 font-medium">Customer</th>
                  <th className="py-2 font-medium">Issue</th>
                  <th className="py-2 font-medium">Technician</th>
                  <th className="py-2 font-medium">Priority</th>
                  <th className="px-4 py-2 text-right font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {isLoading ? (
                  <tr><td colSpan={6} className="py-8 text-center text-sm text-muted-foreground">Loading tickets...</td></tr>
                ) : tickets.map((t) => (
                  <tr key={t.id} className={cn("hover:bg-secondary/40", MODULES[t.module as keyof typeof MODULES]?.stripClass)}>
                    <td className="px-4 py-2.5 font-mono text-xs">{t.number}</td>
                    <td className="py-2.5">
                      <div>{t.customerName}</div>
                      <div className="mt-0.5"><ModuleBadge module={t.module} /></div>
                    </td>
                    <td className="py-2.5 max-w-[280px] truncate text-muted-foreground">{t.issue}</td>
                    <td className="py-2.5">{techName(t.technicianId) ?? <span className="text-muted-foreground">—</span>}</td>
                    <td className="py-2.5">
                      <StatusPill tone={t.priority === "High" ? "danger" : t.priority === "Medium" ? "warning" : "muted"}>
                        {t.priority}
                      </StatusPill>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <StatusPill tone={t.status === "Completed" ? "success" : t.status === "In Progress" ? "info" : "muted"}>
                        {t.status}
                      </StatusPill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        <Snapshot icon={Camera} label="Visit photos this week" value="42" />
        <Snapshot icon={MapPin} label="Avg travel · per visit" value="14 km" />
        <Snapshot icon={Clock} label="Avg resolution time" value="3h 12m" />
      </div>
    </AppShell>
  );
}

function Snapshot({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-surface/80 p-4">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-security/10 text-security">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="font-mono text-xl font-bold">{value}</div>
      </div>
    </div>
  );
}
