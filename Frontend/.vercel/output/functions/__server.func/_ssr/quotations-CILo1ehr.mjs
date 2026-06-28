import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as apiClient, t as API_ENDPOINTS } from "./api-client-D0rzRozx.mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { H as Download, ot as ArrowRight, x as Plus } from "../_libs/lucide-react.mjs";
import { i as PageHeader, n as Button, o as cn, r as MODULES, s as formatINR, t as AppShell } from "./AppShell-B6wpEuru.mjs";
import { n as StatusPill, t as ModuleBadge } from "./ModuleBadge-BASdGuui.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog } from "./dialog-DGnONlud.mjs";
import { t as Label } from "./label-BZSFu2Gp.mjs";
import { t as Input } from "./input-8rRBZxpD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quotations-CILo1ehr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var quotationsService = {
	getAll: async () => {
		return (await apiClient.get(API_ENDPOINTS.QUOTATIONS.GET_ALL)).data;
	},
	create: async (data) => {
		return (await apiClient.post(API_ENDPOINTS.QUOTATIONS.CREATE, data)).data;
	},
	getById: async (id) => {
		return (await apiClient.get(API_ENDPOINTS.QUOTATIONS.GET_BY_ID(id))).data;
	},
	update: async (id, data) => {
		return (await apiClient.patch(API_ENDPOINTS.QUOTATIONS.UPDATE(id), data)).data;
	},
	convert: async (id) => {
		await apiClient.post(API_ENDPOINTS.QUOTATIONS.CONVERT(id));
	}
};
function useFetchQuotations() {
	return useQuery({
		queryKey: ["quotations"],
		queryFn: quotationsService.getAll
	});
}
function useCreateQuotation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: quotationsService.create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["quotations"] });
		}
	});
}
function QuotationsPage() {
	const { data: q = [], isLoading } = useFetchQuotations();
	const { mutate: createQuotation, isPending: isCreating } = useCreateQuotation();
	const [isDialogOpen, setIsDialogOpen] = (0, import_react.useState)(false);
	const [newQuote, setNewQuote] = (0, import_react.useState)({
		customerName: "",
		module: "solar",
		value: 0
	});
	const handleCreate = (e) => {
		e.preventDefault();
		createQuotation(newQuote, { onSuccess: () => {
			setIsDialogOpen(false);
			setNewQuote({
				customerName: "",
				module: "solar",
				value: 0
			});
		} });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Pre-Sales",
		title: "Quotations",
		description: "Build, send and convert quotes into invoices.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
			open: isDialogOpen,
			onOpenChange: setIsDialogOpen,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "New Quotation"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "sm:max-w-[425px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Create Quotation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Enter details to draft a new quotation." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
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
									value: newQuote.customerName,
									onChange: (e) => setNewQuote((prev) => ({
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
									htmlFor: "module",
									className: "text-right",
									children: "Module"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "module",
									value: newQuote.module,
									onChange: (e) => setNewQuote((prev) => ({
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
									value: newQuote.value,
									onChange: (e) => setNewQuote((prev) => ({
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
						children: isCreating ? "Saving..." : "Save Draft"
					}) })]
				})]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-xl border border-border bg-surface/80",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-border/60 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-2 font-medium",
						children: "Quote No."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2 font-medium",
						children: "Customer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2 font-medium",
						children: "Date"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2 text-right font-medium",
						children: "Value"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2 font-medium",
						children: "Status"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-2 text-right font-medium",
						children: "Action"
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
				className: "divide-y divide-border/40",
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 6,
					className: "py-8 text-center text-sm text-muted-foreground",
					children: "Loading quotations..."
				}) }) : q.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: cn("hover:bg-secondary/40", MODULES[x.module]?.stripClass),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-2.5 font-mono text-xs",
							children: x.number
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: x.customerName }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleBadge, { module: x.module })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2.5 font-mono text-xs text-muted-foreground",
							children: x.date
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2.5 text-right font-mono font-semibold",
							children: formatINR(x.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
								tone: x.status === "Accepted" ? "success" : x.status === "Rejected" ? "danger" : x.status === "Sent" ? "info" : "muted",
								children: x.status
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-2.5 text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "ghost",
									className: "h-7 gap-1 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3 w-3" }), " PDF"]
								}), x.status !== "Rejected" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									className: "h-7 gap-1 bg-solar text-background text-xs hover:bg-solar/90",
									children: ["Convert ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
								})]
							})
						})
					]
				}, x.id))
			})]
		})
	})] });
}
//#endregion
export { QuotationsPage as component };
