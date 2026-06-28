import { n as apiClient, t as API_ENDPOINTS } from "./api-client-D0rzRozx.mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { i as PageHeader, o as cn, r as MODULES, t as AppShell } from "./AppShell-B6wpEuru.mjs";
import { n as StatusPill, t as ModuleBadge } from "./ModuleBadge-BASdGuui.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/warranty-DlrVnZcO.js
var import_jsx_runtime = require_jsx_runtime();
var warrantiesService = {
	getAll: async () => {
		return (await apiClient.get(API_ENDPOINTS.WARRANTIES.GET_ALL)).data;
	},
	getClaims: async () => {
		return (await apiClient.get(API_ENDPOINTS.WARRANTIES.GET_ALL_CLAIMS)).data;
	}
};
function useFetchWarranties() {
	return useQuery({
		queryKey: ["warranties"],
		queryFn: warrantiesService.getAll
	});
}
function WarrantyPage() {
	const { data: w = [], isLoading } = useFetchWarranties();
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "After-Sales",
		title: "Warranty Registry",
		description: "Track product warranties, claims and expiry across every install."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-xl border border-border bg-surface/80",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-border/60 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-2 font-medium",
						children: "Product"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2 font-medium",
						children: "Serial"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2 font-medium",
						children: "Customer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2 font-medium",
						children: "Period"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-2 text-right font-medium",
						children: "Status"
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
				className: "divide-y divide-border/40",
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 5,
					className: "py-8 text-center text-sm text-muted-foreground",
					children: "Loading warranties..."
				}) }) : w.map((x) => {
					const expired = x.endDate < today;
					const days = (new Date(x.endDate).getTime() - new Date(today).getTime()) / 864e5;
					const expiringSoon = !expired && days <= 60;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: cn("hover:bg-secondary/40", MODULES[x.module]?.stripClass),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: x.productName }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-0.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleBadge, { module: x.module })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5 font-mono text-xs",
								children: x.serial
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5",
								children: x.customerName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-2.5 font-mono text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: x.startDate }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-muted-foreground",
									children: ["→ ", x.endDate]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2.5 text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
									tone: expired ? "danger" : expiringSoon ? "warning" : "success",
									children: expired ? "Expired" : expiringSoon ? "Expiring" : "Active"
								})
							})
						]
					}, x.id);
				})
			})]
		})
	})] });
}
//#endregion
export { WarrantyPage as component };
