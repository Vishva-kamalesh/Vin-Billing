import { useNavigate } from "@tanstack/react-router";
import { Command } from "cmdk";
import { useAppDispatch, useAppSelector, uiActions } from "@/store";
import { useFetchCustomers } from "@/hooks/useCustomers";
import { useFetchInvoices } from "@/hooks/useInvoices";
import { useFetchTickets } from "@/hooks/useTickets";
import { useFetchAMCs } from "@/hooks/useAMCs";
import { Receipt, ShieldCheck, Users, Wrench, Search } from "lucide-react";
import { useEffect } from "react";

export function CommandPalette() {
  const open = useAppSelector((s) => s.ui.paletteOpen);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: customers = [] } = useFetchCustomers();
  const { data: invoices = [] } = useFetchInvoices();
  const { data: tickets = [] } = useFetchTickets();
  const { data: amcs = [] } = useFetchAMCs();

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch(uiActions.setPaletteOpen(false));
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, dispatch]);

  if (!open) return null;

  const go = (path: string) => {
    dispatch(uiActions.setPaletteOpen(false));
    navigate({ to: path });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/70 px-4 pt-24 backdrop-blur-sm"
      onClick={() => dispatch(uiActions.setPaletteOpen(false))}
    >
      <Command
        className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-border px-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Command.Input
            autoFocus
            placeholder="Search anything…"
            className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>
        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-8 text-center text-sm text-muted-foreground">
            No matches. Try invoice number, customer, ticket ID…
          </Command.Empty>

          <Command.Group heading="Navigate" className="text-xs text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest">
            {[
              ["Dashboard", "/"],
              ["Billing / POS", "/billing"],
              ["Service Tickets", "/service"],
              ["AMC Contracts", "/amc"],
              ["Inventory", "/inventory"],
              ["Reports", "/reports"],
            ].map(([label, path]) => (
              <Command.Item
                key={path}
                onSelect={() => go(path)}
                className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm aria-selected:bg-secondary"
              >
                {label}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Customers" className="text-xs text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest">
            {customers.slice(0, 6).map((c) => (
              <Command.Item
                key={c.id}
                value={`customer ${c.name} ${c.phone}`}
                onSelect={() => go("/crm")}
                className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm aria-selected:bg-secondary"
              >
                <Users className="h-3.5 w-3.5 text-primary" />
                <span>{c.name}</span>
                <span className="ml-auto font-mono text-xs text-muted-foreground">{c.phone}</span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Invoices" className="text-xs text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest">
            {invoices.slice(0, 5).map((i) => (
              <Command.Item
                key={i.id}
                value={`invoice ${i.number} ${i.customerName}`}
                onSelect={() => go("/billing")}
                className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm aria-selected:bg-secondary"
              >
                <Receipt className="h-3.5 w-3.5 text-primary" />
                <span className="font-mono text-xs">{i.number}</span>
                <span className="text-muted-foreground">{i.customerName}</span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Tickets & AMC" className="text-xs text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest">
            {tickets.slice(0, 3).map((t) => (
              <Command.Item
                key={t.id}
                value={`ticket ${t.number} ${t.customerName}`}
                onSelect={() => go("/service")}
                className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm aria-selected:bg-secondary"
              >
                <Wrench className="h-3.5 w-3.5 text-security" />
                <span className="font-mono text-xs">{t.number}</span>
                <span className="text-muted-foreground">{t.customerName}</span>
              </Command.Item>
            ))}
            {amcs.slice(0, 3).map((a) => (
              <Command.Item
                key={a.id}
                value={`amc ${a.number} ${a.customerName}`}
                onSelect={() => go("/amc")}
                className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm aria-selected:bg-secondary"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-water" />
                <span className="font-mono text-xs">{a.number}</span>
                <span className="text-muted-foreground">{a.customerName}</span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
