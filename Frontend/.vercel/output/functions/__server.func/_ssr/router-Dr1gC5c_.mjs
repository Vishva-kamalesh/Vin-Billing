import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as Provider_default } from "../_libs/react-redux+[...].mjs";
import { t as store } from "./store-B4lwvfKm.mjs";
import { P as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$17 } from "./crm_._id.edit-Cu7asPCC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Dr1gC5c_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-TW7y6Qk0.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-surface group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-md group-[.toaster]:rounded-[16px] group-[.toaster]:px-6 group-[.toaster]:py-4",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$16 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Vin Technology — Ops Console" },
			{
				name: "description",
				content: "Service & sales operations ERP for Vin Technology: CCTV, RO, Power Backup and Solar."
			},
			{
				name: "author",
				content: "Vin Technology"
			},
			{
				property: "og:title",
				content: "Vin Technology — Ops Console"
			},
			{
				property: "og:description",
				content: "Billing, inventory, AMC and service operations for technical services."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:site",
				content: "@VinTech"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$16.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider_default, {
		store,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
			client: queryClient,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "bottom-right" })]
		})
	});
}
var $$splitComponentImporter$15 = () => import("./warranty-DlrVnZcO.mjs");
var Route$15 = createFileRoute("/warranty")({
	head: () => ({ meta: [{ title: "Warranty — Vin Technology" }] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./technicians-CSNVEd6D.mjs");
var Route$14 = createFileRoute("/technicians")({
	head: () => ({ meta: [{ title: "Technicians — Vin Technology" }] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./suppliers-i7MvvC9g.mjs");
var Route$13 = createFileRoute("/suppliers")({
	head: () => ({ meta: [{ title: "Suppliers — Vin Technology" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./settings-D92j2OgM.mjs");
var Route$12 = createFileRoute("/settings")({
	head: () => ({ meta: [{ title: "Settings — Vin Technology" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./service-CNP21tQ-.mjs");
var Route$11 = createFileRoute("/service")({
	head: () => ({ meta: [{ title: "Service Tickets — Vin Technology" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./reports-U1ZFUYwM.mjs");
var Route$10 = createFileRoute("/reports")({
	head: () => ({ meta: [{ title: "Reports — Vin Technology" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./quotations-CILo1ehr.mjs");
var Route$9 = createFileRoute("/quotations")({
	head: () => ({ meta: [{ title: "Quotations — Vin Technology" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./products-_lLQbfzO.mjs");
var Route$8 = createFileRoute("/products")({
	head: () => ({ meta: [{ title: "Products — Vin Technology" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./login-pdzl_xBc.mjs");
var Route$7 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./leads-op18Dak7.mjs");
var Route$6 = createFileRoute("/leads")({
	head: () => ({ meta: [{ title: "Leads — Vin Technology" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./inventory-CNXu0R-e.mjs");
var Route$5 = createFileRoute("/inventory")({
	head: () => ({ meta: [{ title: "Inventory — Vin Technology" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./crm-D3Ge1hVb.mjs");
var Route$4 = createFileRoute("/crm")({
	head: () => ({ meta: [{ title: "CRM — Vin Technology" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./billing-CxbEIn6v.mjs");
var Route$3 = createFileRoute("/billing")({
	head: () => ({ meta: [{ title: "Billing / POS — Vin Technology" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./amc-BdP37d2H.mjs");
var Route$2 = createFileRoute("/amc")({
	head: () => ({ meta: [{ title: "AMC Management — Vin Technology" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./routes-BRTWQmDe.mjs");
var Route$1 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Dashboard — Vin Technology Ops" }, {
		name: "description",
		content: "Real-time operations overview: revenue, AMC, service tickets, stock and technicians."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./crm_.new-80QNFrcY.mjs");
var Route = createFileRoute("/crm_/new")({
	head: () => ({ meta: [{ title: "New Customer — Vin Technology" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var WarrantyRoute = Route$15.update({
	id: "/warranty",
	path: "/warranty",
	getParentRoute: () => Route$16
});
var TechniciansRoute = Route$14.update({
	id: "/technicians",
	path: "/technicians",
	getParentRoute: () => Route$16
});
var SuppliersRoute = Route$13.update({
	id: "/suppliers",
	path: "/suppliers",
	getParentRoute: () => Route$16
});
var SettingsRoute = Route$12.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$16
});
var ServiceRoute = Route$11.update({
	id: "/service",
	path: "/service",
	getParentRoute: () => Route$16
});
var ReportsRoute = Route$10.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => Route$16
});
var QuotationsRoute = Route$9.update({
	id: "/quotations",
	path: "/quotations",
	getParentRoute: () => Route$16
});
var ProductsRoute = Route$8.update({
	id: "/products",
	path: "/products",
	getParentRoute: () => Route$16
});
var LoginRoute = Route$7.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$16
});
var LeadsRoute = Route$6.update({
	id: "/leads",
	path: "/leads",
	getParentRoute: () => Route$16
});
var InventoryRoute = Route$5.update({
	id: "/inventory",
	path: "/inventory",
	getParentRoute: () => Route$16
});
var CrmRoute = Route$4.update({
	id: "/crm",
	path: "/crm",
	getParentRoute: () => Route$16
});
var BillingRoute = Route$3.update({
	id: "/billing",
	path: "/billing",
	getParentRoute: () => Route$16
});
var AmcRoute = Route$2.update({
	id: "/amc",
	path: "/amc",
	getParentRoute: () => Route$16
});
var rootRouteChildren = {
	IndexRoute: Route$1.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$16
	}),
	AmcRoute,
	BillingRoute,
	CrmRoute,
	InventoryRoute,
	LeadsRoute,
	LoginRoute,
	ProductsRoute,
	QuotationsRoute,
	ReportsRoute,
	ServiceRoute,
	SettingsRoute,
	SuppliersRoute,
	TechniciansRoute,
	WarrantyRoute,
	CrmNewRoute: Route.update({
		id: "/crm_/new",
		path: "/crm/new",
		getParentRoute: () => Route$16
	}),
	CrmIdEditRoute: Route$17.update({
		id: "/crm_/$id/edit",
		path: "/crm/$id/edit",
		getParentRoute: () => Route$16
	})
};
var routeTree = Route$16._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
