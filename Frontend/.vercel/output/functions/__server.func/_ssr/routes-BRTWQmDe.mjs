import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { Q as Calendar, at as ArrowUpRight, c as TrendingUp, dt as TriangleAlert } from "../_libs/lucide-react.mjs";
import { f as useFetchAMCs, g as useFetchTickets, h as useFetchInvoices, i as PageHeader, o as cn, r as MODULES, s as formatINR, t as AppShell } from "./AppShell-B6wpEuru.mjs";
import { n as StatusPill, t as ModuleBadge } from "./ModuleBadge-BASdGuui.mjs";
import { a as useFetchProducts } from "./useProducts-CpMJTZff.mjs";
import { t as useFetchTechnicians } from "./useTechnicians-Big5sQ9T.mjs";
import { a as Line, i as XAxis, l as ResponsiveContainer, n as LineChart, o as CartesianGrid, r as YAxis, u as Tooltip } from "../_libs/recharts+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BRTWQmDe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var revenueSeries = [
	{
		m: "Jun",
		v: 412e3
	},
	{
		m: "Jul",
		v: 528e3
	},
	{
		m: "Aug",
		v: 471e3
	},
	{
		m: "Sep",
		v: 612e3
	},
	{
		m: "Oct",
		v: 698e3
	},
	{
		m: "Nov",
		v: 754e3
	},
	{
		m: "Dec",
		v: 822e3
	},
	{
		m: "Jan",
		v: 791e3
	},
	{
		m: "Feb",
		v: 905e3
	},
	{
		m: "Mar",
		v: 1014e3
	}
];
function Card({ children, module = "neutral", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 8
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: { duration: .25 },
		className: cn("hover-lift relative overflow-hidden rounded-xl border border-border bg-surface/80 backdrop-blur-sm", MODULES[module].stripClass, className),
		children
	});
}
function CardHeader({ label, module, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between border-b border-border/60 px-5 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [module && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "h-1.5 w-1.5 rounded-full",
				style: { background: MODULES[module].color }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground",
				children: label
			})]
		}), action]
	});
}
function Dashboard() {
	const [now, setNow] = (0, import_react.useState)(/* @__PURE__ */ new Date());
	(0, import_react.useEffect)(() => {
		const timer = setInterval(() => setNow(/* @__PURE__ */ new Date()), 6e4);
		return () => clearInterval(timer);
	}, []);
	const { data: invoices = [] } = useFetchInvoices();
	const { data: amcs = [] } = useFetchAMCs();
	const { data: tickets = [] } = useFetchTickets();
	const { data: products = [] } = useFetchProducts();
	const { data: techs = [] } = useFetchTechnicians();
	const todaySales = invoices.length >= 2 ? invoices.filter((i) => i.date === invoices[invoices.length - 1].date || i.date === invoices[invoices.length - 2].date).reduce((sum, i) => sum + i.total, 0) : 0;
	const monthRevenue = revenueSeries.reduce((s, r) => s + r.v, 0);
	const activeAmc = amcs.filter((a) => a.status === "Active").length;
	const expiringAmc = amcs.filter((a) => a.status === "Expiring").length;
	const pendingServices = tickets.filter((t) => t.status !== "Completed").length;
	const lowStock = products.filter((p) => p.stock <= p.minStock);
	const hour = now.getHours();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		showLiveOps: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Operations · Chennai HQ",
			title: `${hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"}, Selvin!`,
			description: "Here's what's happening across CCTV, RO, Power and Solar today.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground sm:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono",
					children: now.toLocaleString("en-IN", {
						day: "numeric",
						month: "short",
						year: "numeric",
						hour: "numeric",
						minute: "2-digit",
						hour12: true
					})
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-12 gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					module: "neutral",
					className: "col-span-12 md:col-span-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						label: "Today's Sales",
						module: "neutral"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-5 py-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-3xl font-bold tracking-tight",
								children: formatINR(todaySales)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1.5 flex items-center gap-1 text-xs text-solar",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3" }), " +18.4% vs yesterday"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 grid grid-cols-4 gap-1.5",
								children: [
									"security",
									"water",
									"power",
									"solar"
								].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-1.5 w-1.5 rounded-full shrink-0",
										style: { background: (MODULES[k] || MODULES.neutral).color }
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-[10px] uppercase text-muted-foreground",
										children: k
									})]
								}, k))
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					module: "neutral",
					className: "col-span-12 md:col-span-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						label: "Revenue · Last 10 months",
						module: "neutral",
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-sm font-semibold",
							children: formatINR(monthRevenue)
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-[180px] px-2 pb-2 pt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
								data: revenueSeries,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "rev",
										x1: "0",
										y1: "0",
										x2: "1",
										y2: "0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "0%",
												stopColor: "#3B82F6"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "50%",
												stopColor: "#06B6D4"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "100%",
												stopColor: "#34D399"
											})
										]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "2 4",
										stroke: "rgba(255,255,255,0.05)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "m",
										tick: {
											fill: "#8A93A8",
											fontSize: 10,
											fontFamily: "JetBrains Mono"
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tick: {
											fill: "#8A93A8",
											fontSize: 10,
											fontFamily: "JetBrains Mono"
										},
										axisLine: false,
										tickLine: false,
										tickFormatter: (v) => `${(v / 1e5).toFixed(0)}L`
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
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "v",
										stroke: "url(#rev)",
										strokeWidth: 2.5,
										dot: false,
										activeDot: {
											r: 4,
											fill: "#34D399"
										}
									})
								]
							})
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					module: "water",
					className: "col-span-6 md:col-span-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						label: "Active AMC Contracts",
						module: "water"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 px-5 py-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative grid h-20 w-20 place-items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								viewBox: "0 0 36 36",
								className: "h-20 w-20 -rotate-90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "18",
									cy: "18",
									r: "15.9",
									fill: "none",
									stroke: "rgba(255,255,255,0.08)",
									strokeWidth: "3"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "18",
									cy: "18",
									r: "15.9",
									fill: "none",
									stroke: "#06B6D4",
									strokeWidth: "3",
									strokeDasharray: `${activeAmc / amcs.length * 100} 100`,
									strokeLinecap: "round"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 grid place-items-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-lg font-bold",
									children: activeAmc
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-foreground",
								children: [
									"of ",
									amcs.length,
									" contracts"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex items-center gap-1 text-xs text-power",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3 w-3" }),
									expiringAmc,
									" expiring soon"
								]
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					module: "security",
					className: "col-span-6 md:col-span-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						label: "Pending Services",
						module: "security"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-5 py-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-3xl font-bold",
								children: pendingServices
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-1 text-xs text-muted-foreground",
								children: "open tickets"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 space-y-1.5",
							children: [
								"Open",
								"Assigned",
								"In Progress"
							].map((s) => {
								const c = tickets.filter((t) => t.status === s).length;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: s
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono",
										children: c
									})]
								}, s);
							})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					module: "power",
					className: "col-span-12 md:col-span-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						label: "Low Stock Alerts",
						module: "power",
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[10px] text-power",
							children: [lowStock.length, " items"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "divide-y divide-border/60",
						children: [lowStock.slice(0, 4).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 px-5 py-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-2 w-2 shrink-0 animate-pulse-soft rounded-full",
									style: { background: (MODULES[p.module] || MODULES.neutral).color }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "truncate text-sm",
										children: [
											p.brand,
											" ",
											p.model
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-[10px] text-muted-foreground",
										children: p.barcode
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-sm font-semibold text-power",
									children: p.stock
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-mono text-[10px] text-muted-foreground",
									children: [
										"/ ",
										p.minStock,
										" min"
									]
								})
							]
						}, p.id)), lowStock.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-5 py-6 text-center text-sm text-muted-foreground",
							children: "Stock looks healthy across all lines."
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					module: "water",
					className: "col-span-12 md:col-span-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						label: "Upcoming AMC Renewals",
						module: "water"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-border/60",
						children: amcs.filter((a) => a.status !== "Expired").sort((a, b) => a.endDate.localeCompare(b.endDate)).slice(0, 4).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 px-5 py-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleBadge, { module: a.module }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-sm",
										children: a.customerName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-[10px] text-muted-foreground",
										children: a.number
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono",
										children: a.endDate
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-muted-foreground",
										children: [a.visitsTotal - a.visitsUsed, " visits left"]
									})]
								})
							]
						}, a.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					module: "neutral",
					className: "col-span-12 md:col-span-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						label: "Recent Invoices",
						module: "neutral",
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							className: "flex items-center gap-1 font-mono text-[10px] text-primary",
							href: "/billing",
							children: ["View all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3 w-3" })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border/60 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-2 font-medium",
										children: "Invoice"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Customer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Line"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 text-right font-medium",
										children: "Total"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-2 text-right font-medium",
										children: "Status"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-border/40",
								children: invoices.slice(0, 5).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: cn("hover:bg-secondary/40", MODULES[i.module].stripClass),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-5 py-2.5 font-mono text-xs",
											children: i.number
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2.5",
											children: i.customerName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2.5 text-muted-foreground",
											children: i.lines?.[0]?.name ?? "Multiple items"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2.5 text-right font-mono",
											children: formatINR(i.total)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-5 py-2.5 text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
												tone: i.status === "Paid" ? "success" : i.status === "Partial" ? "warning" : "danger",
												children: i.status
											})
										})
									]
								}, i.id))
							})]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					module: "neutral",
					className: "col-span-12 md:col-span-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						label: "Technician Status",
						module: "neutral"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-1 px-3 py-3",
						children: techs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-md px-2 py-2 hover:bg-secondary/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-security/50 to-solar/50 font-mono text-xs font-bold",
										children: t.initials
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface", t.status === "available" && "bg-solar", t.status === "on-job" && "bg-power animate-pulse-soft", t.status === "offline" && "bg-muted-foreground/50") })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-sm",
										children: t.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground",
										children: [
											t.activeJobs,
											" active · ⭐ ",
											t.rating
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-1",
									children: t.modules.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-2 w-2 rounded-full",
										style: { background: MODULES[m].color }
									}, m))
								})
							]
						}, t.id))
					})]
				})
			]
		})]
	});
}
//#endregion
export { Dashboard as component };
