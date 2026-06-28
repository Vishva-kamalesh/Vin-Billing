import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { p as ShieldCheck, x as Plus } from "../_libs/lucide-react.mjs";
import { c as useCreateAMC, f as useFetchAMCs, i as PageHeader, n as Button, o as cn, r as MODULES, s as formatINR, t as AppShell } from "./AppShell-B6wpEuru.mjs";
import { n as StatusPill, t as ModuleBadge } from "./ModuleBadge-BASdGuui.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog } from "./dialog-DGnONlud.mjs";
import { t as Label } from "./label-BZSFu2Gp.mjs";
import { t as Input } from "./input-8rRBZxpD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/amc-BdP37d2H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AMCPage() {
	const { data: amcs = [], isLoading } = useFetchAMCs();
	const { mutate: createAMC, isPending: isCreating } = useCreateAMC();
	const [isDialogOpen, setIsDialogOpen] = (0, import_react.useState)(false);
	const [newAMC, setNewAMC] = (0, import_react.useState)({
		customerName: "",
		product: "",
		module: "solar",
		value: 0
	});
	const handleCreate = (e) => {
		e.preventDefault();
		createAMC(newAMC, { onSuccess: () => {
			setIsDialogOpen(false);
			setNewAMC({
				customerName: "",
				product: "",
				module: "solar",
				value: 0
			});
		} });
	};
	const expiring = amcs.filter((a) => a.status === "Expiring");
	const sorted = [...amcs].sort((a, b) => {
		if (a.status === "Expiring" && b.status !== "Expiring") return -1;
		if (b.status === "Expiring" && a.status !== "Expiring") return 1;
		return a.endDate.localeCompare(b.endDate);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Annual Maintenance Contracts",
			title: "AMC",
			description: "Track contracts, visits and renewal windows across every line.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				open: isDialogOpen,
				onOpenChange: setIsDialogOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "New AMC"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-[425px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Create AMC" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Enter details for a new Annual Maintenance Contract." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleCreate,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-4 items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "customerName",
										className: "text-right",
										children: "Customer"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "customerName",
										value: newAMC.customerName,
										onChange: (e) => setNewAMC((prev) => ({
											...prev,
											customerName: e.target.value
										})),
										className: "col-span-3",
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-4 items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "product",
										className: "text-right",
										children: "Product"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "product",
										value: newAMC.product,
										onChange: (e) => setNewAMC((prev) => ({
											...prev,
											product: e.target.value
										})),
										className: "col-span-3",
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-4 items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "module",
										className: "text-right",
										children: "Module"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: "module",
										value: newAMC.module,
										onChange: (e) => setNewAMC((prev) => ({
											...prev,
											module: e.target.value
										})),
										className: "col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "security",
												children: "Security / CCTV"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "water",
												children: "Water / RO"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "power",
												children: "Power / UPS"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "solar",
												children: "Solar"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-4 items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "value",
										className: "text-right",
										children: "Value (₹)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "value",
										type: "number",
										value: newAMC.value,
										onChange: (e) => setNewAMC((prev) => ({
											...prev,
											value: Number(e.target.value)
										})),
										className: "col-span-3",
										required: true
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: isCreating,
							children: isCreating ? "Saving..." : "Save AMC"
						}) })]
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 grid grid-cols-2 gap-3 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					label: "Active",
					value: amcs.filter((a) => a.status === "Active").length,
					accent: "solar"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					label: "Expiring · 30 days",
					value: expiring.length,
					accent: "power"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					label: "Expired",
					value: amcs.filter((a) => a.status === "Expired").length,
					accent: "danger"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					label: "AMC Value",
					value: formatINR(amcs.reduce((s, a) => s + a.value, 0)),
					accent: "primary"
				})
			]
		}),
		expiring.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 rounded-xl border border-power/30 bg-power/5 p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-power" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display font-semibold",
						children: "Renewal-focus queue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-xs text-muted-foreground",
						children: [expiring.length, " expiring within 30 days"]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-xl border border-border bg-surface/80",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border/60 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2 font-medium",
							children: "AMC No."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 font-medium",
							children: "Customer"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 font-medium",
							children: "Product"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 font-medium",
							children: "Period"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 font-medium",
							children: "Visits"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2 text-right font-medium",
							children: "Status"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					className: "divide-y divide-border/40",
					children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 6,
						className: "py-8 text-center text-sm text-muted-foreground",
						children: "Loading AMCs..."
					}) }) : sorted.map((a) => {
						const pct = a.visitsUsed / a.visitsTotal * 100;
						const tone = a.status === "Active" ? "success" : a.status === "Expiring" ? "warning" : "danger";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: cn("hover:bg-secondary/40", MODULES[a.module]?.stripClass),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2.5 font-mono text-xs",
									children: a.number
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: a.customerName }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-0.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleBadge, { module: a.module })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 text-muted-foreground",
									children: a.product
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-2.5 font-mono text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: a.startDate }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-muted-foreground",
										children: ["→ ", a.endDate]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-1.5 w-20 overflow-hidden rounded-full bg-secondary",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full rounded-full",
												style: {
													width: `${pct}%`,
													background: MODULES[a.module].color
												}
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono text-xs",
											children: [
												a.visitsUsed,
												"/",
												a.visitsTotal
											]
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2.5 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
										tone,
										children: a.status
									})
								})
							]
						}, a.id);
					})
				})]
			})
		})
	] });
}
function Tile({ label, value, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface/80 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 font-mono text-xl font-bold",
			style: { color: {
				solar: "#34D399",
				power: "#F5A623",
				danger: "#EF4444",
				primary: "#3B82F6"
			}[accent] },
			children: value
		})]
	});
}
//#endregion
export { AMCPage as component };
