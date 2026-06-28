import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { ModuleBadge, StatusPill } from "@/components/ModuleBadge";
import { useFetchAMCs } from "@/hooks/useAMCs";
import { useFetchInvoices } from "@/hooks/useInvoices";
import { useFetchProducts } from "@/hooks/useProducts";
import { useFetchTechnicians } from "@/hooks/useTechnicians";
import { useFetchTickets } from "@/hooks/useTickets";
import { MODULES } from "@/lib/modules";
import { formatINR, formatNumber } from "@/lib/modules";
import { TrendingUp, ShieldCheck, Wrench, AlertTriangle, ArrowUpRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Vin Technology Ops" },
      { name: "description", content: "Real-time operations overview: revenue, AMC, service tickets, stock and technicians." },
    ],
  }),
  component: Dashboard,
});

const revenueSeries = [
  { m: "Jun", v: 412000 },
  { m: "Jul", v: 528000 },
  { m: "Aug", v: 471000 },
  { m: "Sep", v: 612000 },
  { m: "Oct", v: 698000 },
  { m: "Nov", v: 754000 },
  { m: "Dec", v: 822000 },
  { m: "Jan", v: 791000 },
  { m: "Feb", v: 905000 },
  { m: "Mar", v: 1014000 },
];

function Card({
  children,
  module = "neutral",
  className,
}: {
  children: React.ReactNode;
  module?: keyof typeof MODULES;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "hover-lift relative overflow-hidden rounded-xl border border-border bg-surface/80 backdrop-blur-sm",
        MODULES[module].stripClass,
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

function CardHeader({
  label,
  module,
  action,
}: {
  label: string;
  module?: keyof typeof MODULES;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 px-5 py-3">
      <div className="flex items-center gap-2">
        {module && (
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: MODULES[module].color }}
          />
        )}
        <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </h3>
      </div>
      {action}
    </div>
  );
}

function Dashboard() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const { data: invoices = [] } = useFetchInvoices();
  const { data: amcs = [] } = useFetchAMCs();
  const { data: tickets = [] } = useFetchTickets();
  const { data: products = [] } = useFetchProducts();
  const { data: techs = [] } = useFetchTechnicians();

  const todaySales = invoices.length >= 2 ? invoices
    .filter((i) => i.date === invoices[invoices.length - 1].date || i.date === invoices[invoices.length - 2].date)
    .reduce((sum, i) => sum + i.total, 0) : 0;
  const monthRevenue = revenueSeries.reduce((s, r) => s + r.v, 0);
  const activeAmc = amcs.filter((a) => a.status === "Active").length;
  const expiringAmc = amcs.filter((a) => a.status === "Expiring").length;
  const pendingServices = tickets.filter((t) => t.status !== "Completed").length;
  const lowStock = products.filter((p) => p.stock <= p.minStock);

  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <AppShell showLiveOps>
      <PageHeader
        eyebrow="Operations · Chennai HQ"
        title={`${greeting}, Selvin!`}
        description="Here's what's happening across CCTV, RO, Power and Solar today."
        actions={
          <div className="hidden items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground sm:flex">
            <Calendar className="h-3.5 w-3.5" />
            <span className="font-mono">
              {now.toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </div>
        }
      />

      <div className="grid grid-cols-12 gap-4">
        {/* Today's sales */}
        <Card module="neutral" className="col-span-12 md:col-span-4">
          <CardHeader label="Today's Sales" module="neutral" />
          <div className="px-5 py-5">
            <div className="font-mono text-3xl font-bold tracking-tight">
              {formatINR(todaySales)}
            </div>
            <div className="mt-1.5 flex items-center gap-1 text-xs text-solar">
              <TrendingUp className="h-3 w-3" /> +18.4% vs yesterday
            </div>
            <div className="mt-4 grid grid-cols-4 gap-1.5">
              {(["security", "water", "power", "solar"] as const).map((k) => (
                <div key={k} className="space-y-1">
                  <div 
                    className="h-1.5 w-1.5 rounded-full shrink-0" 
                    style={{ background: (MODULES[k] || MODULES.neutral).color }}
                  />
                  <div className="font-mono text-[10px] uppercase text-muted-foreground">
                    {k}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Monthly revenue chart */}
        <Card module="neutral" className="col-span-12 md:col-span-8">
          <CardHeader
            label="Revenue · Last 10 months"
            module="neutral"
            action={
              <div className="font-mono text-sm font-semibold">
                {formatINR(monthRevenue)}
              </div>
            }
          />
          <div className="h-[180px] px-2 pb-2 pt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueSeries}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#34D399" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="m"
                  tick={{ fill: "#8A93A8", fontSize: 10, fontFamily: "JetBrains Mono" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#8A93A8", fontSize: 10, fontFamily: "JetBrains Mono" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 100000).toFixed(0)}L`}
                />
                <Tooltip
                  contentStyle={{
                    background: "#131A2B",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    fontFamily: "JetBrains Mono",
                    fontSize: 12,
                  }}
                  formatter={(v: number) => formatINR(v)}
                />
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke="url(#rev)"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 4, fill: "#34D399" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* AMC health */}
        <Card module="water" className="col-span-6 md:col-span-3">
          <CardHeader label="Active AMC Contracts" module="water" />
          <div className="flex items-center gap-4 px-5 py-5">
            <div className="relative grid h-20 w-20 place-items-center">
              <svg viewBox="0 0 36 36" className="h-20 w-20 -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="#06B6D4"
                  strokeWidth="3"
                  strokeDasharray={`${(activeAmc / amcs.length) * 100} 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-mono text-lg font-bold">{activeAmc}</span>
              </div>
            </div>
            <div className="text-sm">
              <div className="text-foreground">of {amcs.length} contracts</div>
              <div className="mt-1 flex items-center gap-1 text-xs text-power">
                <AlertTriangle className="h-3 w-3" />
                {expiringAmc} expiring soon
              </div>
            </div>
          </div>
        </Card>

        <Card module="security" className="col-span-6 md:col-span-3">
          <CardHeader label="Pending Services" module="security" />
          <div className="px-5 py-5">
            <div className="flex items-end gap-2">
              <div className="font-mono text-3xl font-bold">{pendingServices}</div>
              <div className="mb-1 text-xs text-muted-foreground">open tickets</div>
            </div>
            <div className="mt-3 space-y-1.5">
              {(["Open", "Assigned", "In Progress"] as const).map((s) => {
                const c = tickets.filter((t) => t.status === s).length;
                return (
                  <div key={s} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{s}</span>
                    <span className="font-mono">{c}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        <Card module="power" className="col-span-12 md:col-span-6">
          <CardHeader
            label="Low Stock Alerts"
            module="power"
            action={
              <span className="font-mono text-[10px] text-power">{lowStock.length} items</span>
            }
          />
          <div className="divide-y divide-border/60">
            {lowStock.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center gap-3 px-5 py-2.5">
                <span
                  className="h-2 w-2 shrink-0 animate-pulse-soft rounded-full"
                  style={{ background: (MODULES[p.module as ModuleKey] || MODULES.neutral).color }}
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm">{p.brand} {p.model}</div>
                  <div className="font-mono text-[10px] text-muted-foreground">{p.barcode}</div>
                </div>
                <div className="font-mono text-sm font-semibold text-power">{p.stock}</div>
                <div className="font-mono text-[10px] text-muted-foreground">/ {p.minStock} min</div>
              </div>
            ))}
            {lowStock.length === 0 && (
              <div className="px-5 py-6 text-center text-sm text-muted-foreground">
                Stock looks healthy across all lines.
              </div>
            )}
          </div>
        </Card>

        {/* Upcoming renewals */}
        <Card module="water" className="col-span-12 md:col-span-6">
          <CardHeader label="Upcoming AMC Renewals" module="water" />
          <div className="divide-y divide-border/60">
            {amcs
              .filter((a) => a.status !== "Expired")
              .sort((a, b) => a.endDate.localeCompare(b.endDate))
              .slice(0, 4)
              .map((a) => (
                <div key={a.id} className="flex items-center gap-3 px-5 py-2.5">
                  <ModuleBadge module={a.module} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm">{a.customerName}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">
                      {a.number}
                    </div>
                  </div>
                  <div className="text-right text-xs">
                    <div className="font-mono">{a.endDate}</div>
                    <div className="text-muted-foreground">{a.visitsTotal - a.visitsUsed} visits left</div>
                  </div>
                </div>
              ))}
          </div>
        </Card>

        {/* Recent invoices */}
        <Card module="neutral" className="col-span-12 md:col-span-8">
          <CardHeader
            label="Recent Invoices"
            module="neutral"
            action={
              <a className="flex items-center gap-1 font-mono text-[10px] text-primary" href="/billing">
                View all <ArrowUpRight className="h-3 w-3" />
              </a>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-2 font-medium">Invoice</th>
                  <th className="py-2 font-medium">Customer</th>
                  <th className="py-2 font-medium">Line</th>
                  <th className="py-2 text-right font-medium">Total</th>
                  <th className="px-5 py-2 text-right font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {invoices.slice(0, 5).map((i) => (
                  <tr key={i.id} className={cn("hover:bg-secondary/40", MODULES[i.module].stripClass)}>
                    <td className="px-5 py-2.5 font-mono text-xs">{i.number}</td>
                    <td className="py-2.5">{i.customerName}</td>
                    <td className="py-2.5 text-muted-foreground">{i.lines?.[0]?.name ?? "Multiple items"}</td>
                    <td className="py-2.5 text-right font-mono">{formatINR(i.total)}</td>
                    <td className="px-5 py-2.5 text-right">
                      <StatusPill
                        tone={i.status === "Paid" ? "success" : i.status === "Partial" ? "warning" : "danger"}
                      >
                        {i.status}
                      </StatusPill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Technician status */}
        <Card module="neutral" className="col-span-12 md:col-span-4">
          <CardHeader label="Technician Status" module="neutral" />
          <div className="space-y-1 px-3 py-3">
            {techs.map((t) => (
              <div key={t.id} className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-secondary/50">
                <div className="relative">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-security/50 to-solar/50 font-mono text-xs font-bold">
                    {t.initials}
                  </div>
                  <span
                    className={cn(
                      "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface",
                      t.status === "available" && "bg-solar",
                      t.status === "on-job" && "bg-power animate-pulse-soft",
                      t.status === "offline" && "bg-muted-foreground/50",
                    )}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.activeJobs} active · ⭐ {t.rating}
                  </div>
                </div>
                <div className="flex gap-1">
                  {t.modules.map((m) => (
                    <span
                      key={m}
                      className="h-2 w-2 rounded-full"
                      style={{ background: MODULES[m].color }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
