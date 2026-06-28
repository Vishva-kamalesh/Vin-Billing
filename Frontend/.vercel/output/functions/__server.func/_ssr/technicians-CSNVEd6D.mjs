import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as useTickets } from "./store-B4lwvfKm.mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { N as IndianRupee, S as Phone, T as Navigation, Z as Camera, f as Star, gt as CircleCheck } from "../_libs/lucide-react.mjs";
import { i as PageHeader, n as Button, o as cn, r as MODULES, t as AppShell } from "./AppShell-B6wpEuru.mjs";
import { t as useFetchTechnicians } from "./useTechnicians-Big5sQ9T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/technicians-CSNVEd6D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TechPage() {
	const { data: list = [], isLoading } = useFetchTechnicians();
	const tickets = useTickets();
	const [selectedId, setSelectedId] = (0, import_react.useState)(list[0]?.id);
	(0, import_react.useEffect)(() => {
		if (!selectedId && list.length > 0) setSelectedId(list[0].id);
	}, [list, selectedId]);
	const selected = list.find((t) => t.id === selectedId);
	const jobs = tickets.filter((t) => t.technicianId === selectedId && t.status !== "Completed");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Field Operations",
		title: "Technicians",
		description: "Team availability and the on-phone view your field staff uses."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-12 gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "col-span-12 md:col-span-7",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-xl border border-border bg-surface/80",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-border px-5 py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground",
						children: "Team"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-border/40",
					children: list.map((t) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setSelectedId(t.id),
							className: cn("flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-secondary/40", t.id === selectedId && "bg-secondary/60"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-security/40 to-solar/40 font-mono text-sm font-bold",
										children: t.initials
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface", t.status === "available" && "bg-solar", t.status === "on-job" && "bg-power animate-pulse-soft", t.status === "offline" && "bg-muted-foreground/50") })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate font-medium",
											children: t.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
											children: t.status
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-0.5 font-mono text-[11px] text-muted-foreground",
										children: t.phone
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-mono text-sm",
										children: [t.activeJobs, " jobs"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-end gap-1 text-xs text-power",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-power" }),
											" ",
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
						}, t.id);
					})
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "col-span-12 md:col-span-5",
			children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-sm rounded-[28px] border border-border bg-background p-4 shadow-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mb-2 h-1 w-12 rounded-full bg-border" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-security to-solar font-mono text-base font-bold text-background",
									children: selected.initials
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-display font-bold",
										children: selected.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-[11px] text-muted-foreground",
										children: "Field Technician"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 rounded-lg bg-background/60 p-2.5 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
									children: "Today's jobs"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-2xl font-bold",
									children: jobs.length
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 space-y-2",
								children: [jobs.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: cn("rounded-lg border border-border bg-background/60 p-3", MODULES[j.module].stripClass),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-xs",
												children: j.number
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-[10px] text-muted-foreground",
												children: j.scheduledFor ?? "Today"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1 text-sm font-medium",
											children: j.customerName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-muted-foreground line-clamp-2",
											children: j.issue
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 grid grid-cols-4 gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionBtn, {
													icon: Phone,
													label: "Call"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionBtn, {
													icon: Navigation,
													label: "Nav"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionBtn, {
													icon: Camera,
													label: "Photo"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionBtn, {
													icon: IndianRupee,
													label: "Collect"
												})
											]
										})
									]
								}, j.id)), jobs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg border border-dashed border-border p-6 text-center text-xs text-muted-foreground",
									children: "No open jobs assigned."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "mt-3 w-full gap-1.5 bg-solar text-background hover:bg-solar/90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), " Close current visit"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-center font-mono text-[10px] text-muted-foreground",
						children: "Technician mobile view · live preview"
					})
				]
			})
		})]
	})] });
}
function ActionBtn({ icon: Icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: "flex flex-col items-center gap-1 rounded-md border border-border bg-surface/60 py-1.5 text-[10px] text-muted-foreground hover:bg-secondary hover:text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }), label]
	});
}
//#endregion
export { TechPage as component };
