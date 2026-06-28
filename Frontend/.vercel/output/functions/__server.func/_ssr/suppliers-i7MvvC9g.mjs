import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as apiClient, t as API_ENDPOINTS } from "./api-client-D0rzRozx.mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { x as Plus } from "../_libs/lucide-react.mjs";
import { i as PageHeader, n as Button, o as cn, r as MODULES, s as formatINR, t as AppShell } from "./AppShell-B6wpEuru.mjs";
import { t as ModuleBadge } from "./ModuleBadge-BASdGuui.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog } from "./dialog-DGnONlud.mjs";
import { t as Label } from "./label-BZSFu2Gp.mjs";
import { t as Input } from "./input-8rRBZxpD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/suppliers-i7MvvC9g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var suppliersService = {
	getAll: async () => {
		return (await apiClient.get(API_ENDPOINTS.SUPPLIERS.GET_ALL)).data;
	},
	create: async (data) => {
		return (await apiClient.post(API_ENDPOINTS.SUPPLIERS.CREATE, data)).data;
	},
	getById: async (id) => {
		return (await apiClient.get(API_ENDPOINTS.SUPPLIERS.GET_BY_ID(id))).data;
	},
	update: async (id, data) => {
		return (await apiClient.patch(API_ENDPOINTS.SUPPLIERS.UPDATE(id), data)).data;
	}
};
function useFetchSuppliers() {
	return useQuery({
		queryKey: ["suppliers"],
		queryFn: suppliersService.getAll
	});
}
function useCreateSupplier() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: suppliersService.create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["suppliers"] });
		}
	});
}
function SupplierPage() {
	const { data: list = [], isLoading } = useFetchSuppliers();
	const { mutate: createSupplier, isPending: isCreating } = useCreateSupplier();
	const [isDialogOpen, setIsDialogOpen] = (0, import_react.useState)(false);
	const [newSupplier, setNewSupplier] = (0, import_react.useState)({
		name: "",
		contact: "",
		modules: ["solar"]
	});
	const handleCreate = (e) => {
		e.preventDefault();
		createSupplier(newSupplier, { onSuccess: () => {
			setIsDialogOpen(false);
			setNewSupplier({
				name: "",
				contact: "",
				modules: ["solar"]
			});
		} });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Supply Chain",
		title: "Suppliers",
		description: "Vendors, outstanding balances and purchase orders.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
			open: isDialogOpen,
			onOpenChange: setIsDialogOpen,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "New Supplier"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "sm:max-w-[425px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Add Supplier" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Enter details for a new vendor or supplier." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
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
									value: newSupplier.name,
									onChange: (e) => setNewSupplier((prev) => ({
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
									htmlFor: "contact",
									className: "text-right",
									children: "Contact"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "contact",
									value: newSupplier.contact,
									onChange: (e) => setNewSupplier((prev) => ({
										...prev,
										contact: e.target.value
									})),
									className: "col-span-3",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-4 items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "modules",
									className: "text-right",
									children: "Modules"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "modules",
									value: newSupplier.modules[0],
									onChange: (e) => setNewSupplier((prev) => ({
										...prev,
										modules: [e.target.value]
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
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: isCreating,
						children: isCreating ? "Saving..." : "Save Supplier"
					}) })]
				})]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3",
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "col-span-full py-8 text-center text-sm text-muted-foreground",
			children: "Loading suppliers..."
		}) : list.map((s) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("hover-lift rounded-xl border border-border bg-surface/80 p-5", MODULES[s.modules?.[0] ?? "neutral"].stripClass),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-base font-bold",
						children: s.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-xs text-muted-foreground",
						children: s.contact
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1",
						children: s.modules.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleBadge, { module: m }, m))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
						children: "Outstanding"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("mt-0.5 font-mono text-lg font-bold", s.outstanding > 0 ? "text-power" : "text-solar"),
						children: formatINR(s.outstanding)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
						children: "Orders"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-0.5 font-mono text-lg font-bold",
						children: s.ordersCount
					})] })]
				})]
			}, s.id);
		})
	})] });
}
//#endregion
export { SupplierPage as component };
