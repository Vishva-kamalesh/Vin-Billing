import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as useAppDispatch, n as ticketsActions, o as useTechnicians } from "./store-B4lwvfKm.mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { G as Clock, Z as Camera, k as MapPin, x as Plus } from "../_libs/lucide-react.mjs";
import { g as useFetchTickets, i as PageHeader, n as Button, o as cn, r as MODULES, t as AppShell, u as useCreateTicket } from "./AppShell-B6wpEuru.mjs";
import { n as StatusPill, t as ModuleBadge } from "./ModuleBadge-BASdGuui.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog } from "./dialog-DGnONlud.mjs";
import { t as Label } from "./label-BZSFu2Gp.mjs";
import { t as Input } from "./input-8rRBZxpD.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DzHzPSrq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/service-CNP21tQ-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COLS = [
	"Open",
	"Assigned",
	"In Progress",
	"Completed"
];
function ServicePage() {
	const { data: tickets = [], isLoading } = useFetchTickets();
	const techs = useTechnicians();
	const dispatch = useAppDispatch();
	const { mutate: createTicket, isPending: isCreating } = useCreateTicket();
	const [isDialogOpen, setIsDialogOpen] = (0, import_react.useState)(false);
	const [newTicket, setNewTicket] = (0, import_react.useState)({
		customerName: "",
		issue: "",
		module: "security",
		priority: "Medium"
	});
	const handleCreate = (e) => {
		e.preventDefault();
		createTicket(newTicket, { onSuccess: () => {
			setIsDialogOpen(false);
			setNewTicket({
				customerName: "",
				issue: "",
				module: "security",
				priority: "Medium"
			});
		} });
	};
	const techName = (id) => techs.find((t) => t.id === id)?.name;
	const onDrop = (e, status) => {
		e.preventDefault();
		const id = e.dataTransfer.getData("text/plain");
		if (id) dispatch(ticketsActions.update({
			id,
			patch: { status }
		}));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Service Desk",
			title: "Tickets",
			description: "Complaint → Ticket → Assignment → Visit → Close. Color-coded by product line.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				open: isDialogOpen,
				onOpenChange: setIsDialogOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "New Ticket"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-[425px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Create Service Ticket" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Enter ticket details to dispatch a technician." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
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
										value: newTicket.customerName,
										onChange: (e) => setNewTicket((prev) => ({
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
										htmlFor: "issue",
										className: "text-right",
										children: "Issue"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "issue",
										value: newTicket.issue,
										onChange: (e) => setNewTicket((prev) => ({
											...prev,
											issue: e.target.value
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
										value: newTicket.module,
										onChange: (e) => setNewTicket((prev) => ({
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
										htmlFor: "priority",
										className: "text-right",
										children: "Priority"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: "priority",
										value: newTicket.priority,
										onChange: (e) => setNewTicket((prev) => ({
											...prev,
											priority: e.target.value
										})),
										className: "col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Low",
												children: "Low"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Medium",
												children: "Medium"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "High",
												children: "High"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Urgent",
												children: "Urgent"
											})
										]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: isCreating,
							children: isCreating ? "Saving..." : "Save Ticket"
						}) })]
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "board",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "board",
					children: "Board"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "table",
					children: "Table"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "board",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4",
						children: COLS.map((status) => {
							const items = tickets.filter((t) => t.status === status);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onDragOver: (e) => e.preventDefault(),
								onDrop: (e) => onDrop(e, status),
								className: "rounded-xl border border-border bg-surface/60 backdrop-blur-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-border/60 px-3 py-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground",
										children: status
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs",
										children: items.length
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2 p-2 min-h-[300px]",
									children: items.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										draggable: true,
										onDragStart: (e) => e.dataTransfer.setData("text/plain", t.id),
										className: cn("cursor-grab rounded-lg border border-border bg-background/60 p-3 active:cursor-grabbing hover:border-foreground/20", MODULES[t.module]?.stripClass),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-mono text-xs",
													children: t.number
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
													tone: t.priority === "High" ? "danger" : t.priority === "Medium" ? "warning" : "muted",
													children: t.priority
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-1.5 text-sm font-medium",
												children: t.customerName
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-0.5 text-xs text-muted-foreground line-clamp-2",
												children: t.issue
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2 flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleBadge, { module: t.module }), t.technicianId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-[11px] text-muted-foreground",
													children: techName(t.technicianId)
												})]
											})
										]
									}, t.id))
								})]
							}, status);
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "table",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-xl border border-border bg-surface/80",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border/60 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-2 font-medium",
										children: "Ticket"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Customer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Issue"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Technician"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Priority"
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
									children: "Loading tickets..."
								}) }) : tickets.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: cn("hover:bg-secondary/40", MODULES[t.module]?.stripClass),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-mono text-xs",
											children: t.number
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "py-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: t.customerName }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-0.5",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleBadge, { module: t.module })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2.5 max-w-[280px] truncate text-muted-foreground",
											children: t.issue
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2.5",
											children: techName(t.technicianId) ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "—"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2.5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
												tone: t.priority === "High" ? "danger" : t.priority === "Medium" ? "warning" : "muted",
												children: t.priority
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
												tone: t.status === "Completed" ? "success" : t.status === "In Progress" ? "info" : "muted",
												children: t.status
											})
										})
									]
								}, t.id))
							})]
						})
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid grid-cols-1 gap-3 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Snapshot, {
					icon: Camera,
					label: "Visit photos this week",
					value: "42"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Snapshot, {
					icon: MapPin,
					label: "Avg travel · per visit",
					value: "14 km"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Snapshot, {
					icon: Clock,
					label: "Avg resolution time",
					value: "3h 12m"
				})
			]
		})
	] });
}
function Snapshot({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-4 rounded-xl border border-border bg-surface/80 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-10 w-10 place-items-center rounded-lg bg-security/10 text-security",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-mono text-xl font-bold",
			children: value
		})] })]
	});
}
//#endregion
export { ServicePage as component };
