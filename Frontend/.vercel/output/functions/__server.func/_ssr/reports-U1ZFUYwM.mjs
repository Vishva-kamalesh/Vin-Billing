import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { g as useFetchTickets, h as useFetchInvoices, i as PageHeader, r as MODULES, s as formatINR, t as AppShell } from "./AppShell-B6wpEuru.mjs";
import { a as useFetchProducts } from "./useProducts-CpMJTZff.mjs";
import { t as useFetchTechnicians } from "./useTechnicians-Big5sQ9T.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DzHzPSrq.mjs";
import { c as Cell, d as Legend, i as XAxis, l as ResponsiveContainer, o as CartesianGrid, r as YAxis, s as Bar, t as BarChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-U1ZFUYwM.js
var import_jsx_runtime = require_jsx_runtime();
var salesByModule = [
	{
		name: "Jan",
		security: 24e4,
		water: 145e3,
		power: 18e4,
		solar: 226e3
	},
	{
		name: "Feb",
		security: 28e4,
		water: 155e3,
		power: 2e5,
		solar: 27e4
	},
	{
		name: "Mar",
		security: 31e4,
		water: 188e3,
		power: 234e3,
		solar: 282e3
	},
	{
		name: "Apr",
		security: 27e4,
		water: 22e4,
		power: 198e3,
		solar: 31e4
	},
	{
		name: "May",
		security: 34e4,
		water: 24e4,
		power: 25e4,
		solar: 36e4
	},
	{
		name: "Jun",
		security: 38e4,
		water: 26e4,
		power: 28e4,
		solar: 41e4
	}
];
function ReportsPage() {
	const { data: products = [], isLoading: loadingProducts } = useFetchProducts();
	const { data: tickets = [], isLoading: loadingTickets } = useFetchTickets();
	const { data: techs = [], isLoading: loadingTechs } = useFetchTechnicians();
	const { data: invoices = [], isLoading: loadingInvoices } = useFetchInvoices();
	const ranked = [...products].sort((a, b) => b.stock - a.stock).slice(0, 8);
	const techPerf = techs.map((t) => ({
		name: t.name.split(" ")[0],
		completed: tickets.filter((x) => x.technicianId === t.id && x.status === "Completed").length + Math.floor(Math.random() * 10) + 4
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Analytics",
		title: "Reports",
		description: "Sales, inventory and service performance — at a glance."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "sales",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "sales",
					children: "Sales"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "inventory",
					children: "Inventory"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "service",
					children: "Service"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "sales",
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-surface/80 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground",
						children: "Revenue by service line · last 6 months"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-[320px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: salesByModule,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "2 4",
										stroke: "rgba(255,255,255,0.05)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "name",
										tick: {
											fill: "#8A93A8",
											fontSize: 11,
											fontFamily: "JetBrains Mono"
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tick: {
											fill: "#8A93A8",
											fontSize: 11,
											fontFamily: "JetBrains Mono"
										},
										axisLine: false,
										tickLine: false,
										tickFormatter: (v) => `${v / 1e5}L`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: {
											background: "#131A2B",
											border: "1px solid rgba(255,255,255,0.1)",
											borderRadius: 8,
											fontFamily: "JetBrains Mono",
											fontSize: 12
										},
										formatter: (v) => formatINR(v)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: {
										fontSize: 11,
										fontFamily: "Inter"
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "security",
										stackId: "a",
										fill: MODULES.security.color,
										radius: [
											0,
											0,
											0,
											0
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "water",
										stackId: "a",
										fill: MODULES.water.color
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "power",
										stackId: "a",
										fill: MODULES.power.color
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "solar",
										stackId: "a",
										fill: MODULES.solar.color,
										radius: [
											6,
											6,
											0,
											0
										]
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPI, {
							label: "Invoices · this month",
							value: invoices.length * 14
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPI, {
							label: "Avg ticket size",
							value: formatINR(28400)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPI, {
							label: "Collection rate",
							value: "92%"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "inventory",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-surface/80 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground",
						children: "Fast-moving vs dead stock"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-[320px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: ranked,
								layout: "vertical",
								margin: { left: 80 },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "2 4",
										stroke: "rgba(255,255,255,0.05)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										type: "number",
										tick: {
											fill: "#8A93A8",
											fontSize: 11,
											fontFamily: "JetBrains Mono"
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										type: "category",
										dataKey: "model",
										tick: {
											fill: "#8A93A8",
											fontSize: 11
										},
										axisLine: false,
										tickLine: false,
										width: 140
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										background: "#131A2B",
										border: "1px solid rgba(255,255,255,0.1)",
										borderRadius: 8,
										fontSize: 12
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "stock",
										radius: [
											0,
											4,
											4,
											0
										],
										children: loadingProducts ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: "#333" }) : ranked.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: MODULES[p.module]?.color ?? "#333" }, p.id))
									})
								]
							})
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "service",
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-surface/80 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground",
						children: "Technician performance · tickets completed"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-[280px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: techPerf,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "2 4",
										stroke: "rgba(255,255,255,0.05)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "name",
										tick: {
											fill: "#8A93A8",
											fontSize: 11,
											fontFamily: "JetBrains Mono"
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tick: {
											fill: "#8A93A8",
											fontSize: 11,
											fontFamily: "JetBrains Mono"
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										background: "#131A2B",
										border: "1px solid rgba(255,255,255,0.1)",
										borderRadius: 8,
										fontSize: 12
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "completed",
										fill: MODULES.security.color,
										radius: [
											6,
											6,
											0,
											0
										]
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPI, {
							label: "Completed · this week",
							value: String(28)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPI, {
							label: "Avg resolution",
							value: "3h 12m"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPI, {
							label: "First-visit fix rate",
							value: "86%"
						})
					]
				})]
			})
		]
	})] });
}
function KPI({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface/80 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 font-mono text-2xl font-bold",
			children: value
		})]
	});
}
//#endregion
export { ReportsPage as component };
