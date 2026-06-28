import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { ModuleBadge } from "@/components/ModuleBadge";
import { useFetchCustomers, useCreateCustomer, useUpdateCustomer, useDeleteCustomer } from "@/hooks/useCustomers";
import { MODULES } from "@/lib/modules";
import { Phone, Mail, MapPin, Plus, Search, Pencil, Building2, CreditCard, Calendar, Globe, Clock, Hash, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/crm")({
  head: () => ({ meta: [{ title: "CRM — Vin Technology" }] }),
  component: CRM,
});

function CRM() {
  const { data: customers = [], isLoading } = useFetchCustomers();
  const { mutate: deleteCustomer, isPending: isDeleting } = useDeleteCustomer();
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  
  // Auto-select first customer if none selected and data loaded
  if (!selectedId && customers.length > 0) {
    setSelectedId(customers[0].id);
  }

  const selected = customers.find((c) => c.id === selectedId);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(q.toLowerCase()) ||
      c.phone.includes(q) ||
      (c.city || "").toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <AppShell>
      <PageHeader
        eyebrow="CRM"
        title="Customers"
        description="Profiles, installed equipment, AMC and service history — one place."
        actions={
          <Button asChild className="gap-1.5 rounded-full px-6 shadow-sm hover:shadow-md transition-all">
            <Link to="/crm/new">
              <Plus className="h-4 w-4" /> New Customer
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-5 lg:col-span-4">
          <div className="overflow-hidden rounded-[24px] border border-border bg-surface shadow-sm">
            <div className="relative border-b border-border p-3">
              <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search customers…"
                className="pl-11 h-12 rounded-full bg-secondary/50 border-transparent focus-visible:ring-primary/20"
              />
            </div>
            <div className="max-h-[70vh] overflow-y-auto p-2 space-y-1">
              {isLoading ? (
                <div className="p-4 text-center text-sm text-muted-foreground">Loading CRM data...</div>
              ) : filtered.map((c) => {
                const primaryMod = c.installed?.[0]?.module ?? "neutral";
                const active = c.id === selectedId;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedId(c.id)}
                    className={cn(
                      "block w-full rounded-2xl px-4 py-3.5 text-left transition-all hover:bg-secondary/70",
                      MODULES[primaryMod].stripClass,
                      active && "bg-secondary shadow-sm",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="truncate text-sm font-medium">{c.name}</div>
                      <span className="font-mono text-[10px] text-muted-foreground">{c.city}</span>
                    </div>
                    <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">{c.phone}</div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {c.installed?.map((i: any, idx: number) => (
                        <span
                          key={idx}
                          className="inline-block h-1.5 w-6 rounded-full"
                          style={{ background: MODULES[i.module].color }}
                          title={i.product}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-7 lg:col-span-8">
          {selected ? (
            <div className="space-y-4">
              <div className="rounded-[28px] border-0 bg-surface shadow-md p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="font-display text-2xl font-bold">{selected.name}</h2>
                      <span className="bg-primary/10 text-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full">
                        {selected.type || "INDIVIDUAL"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                      <span>{selected.source?.replace('_', ' ') || "WALK IN"}</span>
                      <span>•</span>
                      <span>Customer since {selected.createdAt || "N/A"}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild className="h-9 gap-1.5 rounded-full px-4 hover:bg-secondary/80">
                      <Link to={"/crm/" + selected.id + "/edit"}>
                        <Pencil className="h-4 w-4" /> Edit Profile
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9 w-9 rounded-full p-0 text-destructive hover:bg-destructive/10 hover:text-destructive border-transparent">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the customer profile for <strong>{selected.name}</strong> and remove their data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={(e) => {
                              e.preventDefault();
                              deleteCustomer(selected.id, {
                                onSuccess: () => {
                                  toast.success("Customer deleted successfully.");
                                  setSelectedId(undefined);
                                },
                                onError: (err: any) => {
                                  toast.error(err?.response?.data?.message || "Failed to delete customer.");
                                }
                              });
                            }}
                          >
                            {isDeleting ? "Deleting..." : "Delete Customer"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {/* Contact Info */}
                  <div className="space-y-3">
                    <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground border-b border-border/60 pb-2">Contact Info</h3>
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3 text-sm text-foreground/90"><Phone className="h-4 w-4 text-muted-foreground shrink-0" /> {selected.phone}</div>
                      {selected.phoneAlt && <div className="flex items-center gap-3 text-sm text-foreground/90"><Phone className="h-4 w-4 text-muted-foreground shrink-0" /> {selected.phoneAlt} <span className="text-[10px] text-muted-foreground bg-muted px-1.5 rounded">ALT</span></div>}
                      {selected.email && <div className="flex items-center gap-3 text-sm text-foreground/90"><Mail className="h-4 w-4 text-muted-foreground shrink-0" /> {selected.email}</div>}
                    </div>
                  </div>
                  
                  {/* Location Info */}
                  <div className="space-y-3">
                    <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground border-b border-border/60 pb-2">Location</h3>
                    <div className="space-y-2.5">
                      <div className="flex items-start gap-3 text-sm text-foreground/90"><MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" /> <span className="leading-relaxed">{[selected.address, selected.area, selected.city, selected.pincode].filter(Boolean).join(", ")}</span></div>
                      {selected.serviceArea && <div className="flex items-center gap-3 text-sm text-foreground/90"><Globe className="h-4 w-4 text-muted-foreground shrink-0" /> Zone: {selected.serviceArea}</div>}
                    </div>
                  </div>

                  {/* Business & Tax */}
                  {(selected.businessName || selected.gst || selected.pan) && (
                    <div className="space-y-3">
                      <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground border-b border-border/60 pb-2">Business Details</h3>
                      <div className="space-y-2.5">
                        {selected.businessName && <div className="flex items-center gap-3 text-sm text-foreground/90"><Building2 className="h-4 w-4 text-muted-foreground shrink-0" /> {selected.businessName}</div>}
                        {selected.gst && <div className="flex items-center gap-3 text-sm text-foreground/90"><Hash className="h-4 w-4 text-muted-foreground shrink-0" /> GST: <span className="font-mono">{selected.gst}</span></div>}
                        {selected.pan && <div className="flex items-center gap-3 text-sm text-foreground/90"><CreditCard className="h-4 w-4 text-muted-foreground shrink-0" /> PAN: <span className="font-mono">{selected.pan}</span></div>}
                      </div>
                    </div>
                  )}

                  {/* Dates & Preferences */}
                  {(selected.dob || selected.anniversary || selected.preferredTime) && (
                    <div className="space-y-3">
                      <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground border-b border-border/60 pb-2">Preferences & Dates</h3>
                      <div className="space-y-2.5">
                        {selected.dob && <div className="flex items-center gap-3 text-sm text-foreground/90"><Calendar className="h-4 w-4 text-muted-foreground shrink-0" /> DOB: {selected.dob}</div>}
                        {selected.anniversary && <div className="flex items-center gap-3 text-sm text-foreground/90"><Calendar className="h-4 w-4 text-muted-foreground shrink-0" /> Anniv: {selected.anniversary}</div>}
                        {selected.preferredTime && <div className="flex items-center gap-3 text-sm text-foreground/90"><Clock className="h-4 w-4 text-muted-foreground shrink-0" /> Time: {selected.preferredTime}</div>}
                      </div>
                    </div>
                  )}

                  {/* Services / Interests */}
                  {selected.interests && selected.interests.length > 0 && (
                    <div className="space-y-3 md:col-span-2">
                      <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground border-b border-border/60 pb-2">Interested In</h3>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {selected.interests.map((interest: string) => (
                          <span key={interest} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold capitalize tracking-wide border-0 shadow-sm">
                            {interest.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-[24px] border-0 bg-surface shadow-md overflow-hidden">
                <div className="border-b border-border/40 px-6 py-4 bg-secondary/20">
                  <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Equipment Registry
                  </h3>
                </div>
                <div className="divide-y divide-border/40">
                  {selected.installed?.map((i: any, idx: number) => (
                    <div key={idx} className={cn("flex items-center gap-4 px-5 py-3", MODULES[i.module]?.stripClass)}>
                      <ModuleBadge module={i.module} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">{i.product}</div>
                        <div className="font-mono text-[11px] text-muted-foreground">SN · {i.serial}</div>
                      </div>
                      <div className="font-mono text-[11px] text-muted-foreground">Installed {i.installedOn}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border-0 bg-surface shadow-md p-6">
                <h3 className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Notes
                </h3>
                <p className="text-sm text-foreground/90">{selected.notes}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </AppShell>
  );
}

function Info({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-border bg-background/40 px-3 py-2 text-sm">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="truncate">{label}</span>
    </div>
  );
}
