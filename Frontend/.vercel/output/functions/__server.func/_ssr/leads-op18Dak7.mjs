import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as apiClient, t as API_ENDPOINTS } from "./api-client-D0rzRozx.mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { O as MessageCircle, R as Globe, g as Search, i as Users, k as MapPin, x as Plus } from "../_libs/lucide-react.mjs";
import { i as PageHeader, n as Button, o as cn, r as MODULES, s as formatINR, t as AppShell } from "./AppShell-B6wpEuru.mjs";
import { t as ModuleBadge } from "./ModuleBadge-BASdGuui.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog } from "./dialog-DGnONlud.mjs";
import { t as Label } from "./label-BZSFu2Gp.mjs";
import { t as Input } from "./input-8rRBZxpD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leads-op18Dak7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var leadsService = {
	getAll: async () => {
		return (await apiClient.get(API_ENDPOINTS.LEADS.GET_ALL)).data;
	},
	create: async (data) => {
		return (await apiClient.post(API_ENDPOINTS.LEADS.CREATE, data)).data;
	},
	getById: async (id) => {
		return (await apiClient.get(API_ENDPOINTS.LEADS.GET_BY_ID(id))).data;
	},
	update: async (id, data) => {
		return (await apiClient.patch(API_ENDPOINTS.LEADS.UPDATE(id), data)).data;
	},
	addFollowup: async (id, data) => {
		return (await apiClient.post(API_ENDPOINTS.LEADS.ADD_FOLLOWUP(id), data)).data;
	},
	convert: async (id) => {
		await apiClient.post(API_ENDPOINTS.LEADS.CONVERT(id));
	}
};
function useFetchLeads() {
	return useQuery({
		queryKey: ["leads"],
		queryFn: leadsService.getAll
	});
}
function useCreateLead() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: leadsService.create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["leads"] });
		}
	});
}
function useUpdateLead() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }) => leadsService.update(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["leads"] });
		}
	});
}
var STATUSES = [
	"New",
	"Contacted",
	"Quoted",
	"Won",
	"Lost"
];
var SOURCE_ICON = {
	"Google Ads": Search,
	Website: Globe,
	WhatsApp: MessageCircle,
	Reference: Users,
	"Walk-In": MapPin
};
function LeadsPage() {
	const { data: leads = [], isLoading } = useFetchLeads();
	const { mutate: updateLead } = useUpdateLead();
	const { mutate: createLead, isPending: isCreating } = useCreateLead();
	const [isDialogOpen, setIsDialogOpen] = (0, import_react.useState)(false);
	const [newLead, setNewLead] = (0, import_react.useState)({
		name: "",
		phone: "",
		interest: "",
		module: "security",
		source: "Website",
		value: 0
	});
	const handleCreate = (e) => {
		e.preventDefault();
		createLead(newLead, { onSuccess: () => {
			setIsDialogOpen(false);
			setNewLead({
				name: "",
				phone: "",
				interest: "",
				module: "security",
				source: "Website",
				value: 0
			});
		} });
	};
	const onDrop = (e, status) => {
		e.preventDefault();
		const id = e.dataTransfer.getData("text/plain");
		if (id) updateLead({
			id,
			data: { status }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Sales Pipeline",
		title: "Leads",
		description: "Drag cards to update status. Color-coded by product line.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
			open: isDialogOpen,
			onOpenChange: setIsDialogOpen,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New Lead"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "sm:max-w-[425px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Create Lead" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Enter the lead details. They will enter the pipeline as 'New'." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleCreate,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-4 items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "name",
									className: "text-right",
									children: "Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "name",
									value: newLead.name,
									onChange: (e) => setNewLead((prev) => ({
										...prev,
										name: e.target.value
									})),
									className: "col-span-3",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-4 items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "phone",
									className: "text-right",
									children: "Phone"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "phone",
									value: newLead.phone,
									onChange: (e) => setNewLead((prev) => ({
										...prev,
										phone: e.target.value
									})),
									className: "col-span-3",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-4 items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "interest",
									className: "text-right",
									children: "Interest"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "interest",
									value: newLead.interest,
									onChange: (e) => setNewLead((prev) => ({
										...prev,
										interest: e.target.value
									})),
									className: "col-span-3",
									required: true
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
									value: newLead.value,
									onChange: (e) => setNewLead((prev) => ({
										...prev,
										value: Number(e.target.value)
									})),
									className: "col-span-3"
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: isCreating,
						children: isCreating ? "Saving..." : "Save Lead"
					}) })]
				})]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-5",
		children: STATUSES.map((status) => {
			const items = leads.filter((l) => l.status === status);
			const total = items.reduce((s, l) => s + l.value, 0);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				onDragOver: (e) => e.preventDefault(),
				onDrop: (e) => onDrop(e, status),
				className: "flex flex-col rounded-xl border border-border bg-surface/60 backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border/60 px-3 py-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground",
						children: status
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-mono text-xs",
						children: [
							items.length,
							" · ",
							formatINR(total)
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-2 w-2 rounded-full", status === "New" && "bg-security", status === "Contacted" && "bg-water", status === "Quoted" && "bg-power", status === "Won" && "bg-solar", status === "Lost" && "bg-destructive") })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-2 p-2 min-h-[200px]",
					children: [
						items.map((l) => {
							const Icon = SOURCE_ICON[l.source];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								draggable: true,
								onDragStart: (e) => e.dataTransfer.setData("text/plain", l.id),
								className: cn("cursor-grab rounded-lg border border-border bg-background/60 p-3 active:cursor-grabbing hover:border-foreground/20", MODULES[l.module]?.stripClass),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "truncate text-sm font-medium",
												children: l.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-mono text-[11px] text-muted-foreground",
												children: l.phone
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 text-xs text-muted-foreground line-clamp-2",
										children: l.interest
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleBadge, { module: l.module }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-xs font-semibold",
											children: formatINR(l.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 font-mono text-[10px] text-muted-foreground",
										children: ["Next: ", l.nextFollowUp]
									})
								]
							}, l.id);
						}),
						isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-4 text-center text-xs text-muted-foreground",
							children: "Loading..."
						}),
						!isLoading && items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-md border border-dashed border-border/60 px-3 py-6 text-center text-xs text-muted-foreground",
							children: "Drop leads here."
						})
					]
				})]
			}, status);
		})
	})] });
}
//#endregion
export { LeadsPage as component };
