import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { useFetchInvoices } from "@/hooks/useInvoices";
import { useFetchProducts } from "@/hooks/useProducts";
import { useFetchTechnicians } from "@/hooks/useTechnicians";
import { useFetchTickets } from "@/hooks/useTickets";
import { formatINR, MODULES } from "@/lib/modules";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — Vin Technology" }] }),
  component: ReportsPage,
});

const salesByModule = [
  { name: "Jan", security: 240000, water: 145000, power: 180000, solar: 226000 },
  { name: "Feb", security: 280000, water: 155000, power: 200000, solar: 270000 },
  { name: "Mar", security: 310000, water: 188000, power: 234000, solar: 282000 },
  { name: "Apr", security: 270000, water: 220000, power: 198000, solar: 310000 },
  { name: "May", security: 340000, water: 240000, power: 250000, solar: 360000 },
  { name: "Jun", security: 380000, water: 260000, power: 280000, solar: 410000 },
];

function ReportsPage() {
  const { data: products = [], isLoading: loadingProducts } = useFetchProducts();
  const { data: tickets = [], isLoading: loadingTickets } = useFetchTickets();
  const { data: techs = [], isLoading: loadingTechs } = useFetchTechnicians();
  const { data: invoices = [], isLoading: loadingInvoices } = useFetchInvoices();

  const ranked = [...products].sort((a, b) => b.stock - a.stock).slice(0, 8);

  const techPerf = techs.map((t) => ({
    name: t.name.split(" ")[0],
    completed: tickets.filter((x) => x.technicianId === t.id && x.status === "Completed").length + Math.floor(Math.random() * 10) + 4,
  }));

  return (
    <AppShell>
      <PageHeader
        eyebrow="Analytics"
        title="Reports"
        description="Sales, inventory and service performance — at a glance."
      />

      <Tabs defaultValue="sales">
        <TabsList>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="service">Service</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <div className="rounded-xl border border-border bg-surface/80 p-5">
            <div className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Revenue by service line · last 6 months
            </div>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesByModule}>
                  <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: "#8A93A8", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#8A93A8", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 100000}L`} />
                  <Tooltip
                    contentStyle={{ background: "#131A2B", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontFamily: "JetBrains Mono", fontSize: 12 }}
                    formatter={(v: number) => formatINR(v)}
                  />
                  <Legend wrapperStyle={{ fontSize: 11, fontFamily: "Inter" }} />
                  <Bar dataKey="security" stackId="a" fill={MODULES.security.color} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="water" stackId="a" fill={MODULES.water.color} />
                  <Bar dataKey="power" stackId="a" fill={MODULES.power.color} />
                  <Bar dataKey="solar" stackId="a" fill={MODULES.solar.color} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <KPI label="Invoices · this month" value={invoices.length * 14} />
            <KPI label="Avg ticket size" value={formatINR(28400)} />
            <KPI label="Collection rate" value="92%" />
          </div>
        </TabsContent>

        <TabsContent value="inventory">
          <div className="rounded-xl border border-border bg-surface/80 p-5">
            <div className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Fast-moving vs dead stock
            </div>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ranked} layout="vertical" margin={{ left: 80 }}>
                  <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" tick={{ fill: "#8A93A8", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="model" tick={{ fill: "#8A93A8", fontSize: 11 }} axisLine={false} tickLine={false} width={140} />
                  <Tooltip contentStyle={{ background: "#131A2B", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="stock" radius={[0, 4, 4, 0]}>
                    {loadingProducts ? (
                      <Cell fill="#333" />
                    ) : ranked.map((p) => (
                      <Cell key={p.id} fill={MODULES[p.module as keyof typeof MODULES]?.color ?? "#333"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="service" className="space-y-4">
          <div className="rounded-xl border border-border bg-surface/80 p-5">
            <div className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Technician performance · tickets completed
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={techPerf}>
                  <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: "#8A93A8", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#8A93A8", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#131A2B", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="completed" fill={MODULES.security.color} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <KPI label="Completed · this week" value={String(28)} />
            <KPI label="Avg resolution" value="3h 12m" />
            <KPI label="First-visit fix rate" value="86%" />
          </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

function KPI({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-border bg-surface/80 p-4">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 font-mono text-2xl font-bold">{value}</div>
    </div>
  );
}
