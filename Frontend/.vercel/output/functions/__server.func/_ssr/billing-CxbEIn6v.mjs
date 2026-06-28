import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { D as MonitorPlay, V as Droplets, Z as Camera, _ as ScanLine, b as Printer, d as Sun, g as Search, h as Send, l as Trash2, o as UserPlus, rt as Battery, t as Zap, tt as Box, u as Tag } from "../_libs/lucide-react.mjs";
import { h as useFetchInvoices, i as PageHeader, l as useCreateCustomer, m as useFetchCustomers, n as Button, o as cn, r as MODULES, s as formatINR, t as AppShell } from "./AppShell-B6wpEuru.mjs";
import { n as StatusPill } from "./ModuleBadge-BASdGuui.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-DGnONlud.mjs";
import { t as Input } from "./input-8rRBZxpD.mjs";
import { a as useFetchProducts } from "./useProducts-CpMJTZff.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/billing-CxbEIn6v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = [
	{
		id: "all",
		label: "All",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { className: "w-5 h-5 mb-2" })
	},
	{
		id: "security",
		label: "CCTV",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-5 h-5 mb-2" })
	},
	{
		id: "dvr",
		label: "DVR / NVR",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorPlay, { className: "w-5 h-5 mb-2" })
	},
	{
		id: "solar",
		label: "Solar",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "w-5 h-5 mb-2" })
	},
	{
		id: "inverter",
		label: "Inverter",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-5 h-5 mb-2" })
	},
	{
		id: "power",
		label: "Battery",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Battery, { className: "w-5 h-5 mb-2" })
	},
	{
		id: "water",
		label: "Water Purifier",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "w-5 h-5 mb-2" })
	},
	{
		id: "accessories",
		label: "Accessories",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanLine, { className: "w-5 h-5 mb-2" })
	}
];
function BillingPage() {
	const { data: products = [] } = useFetchProducts();
	const { data: invoices = [], isLoading: loadingInvoices } = useFetchInvoices();
	const { data: customers = [] } = useFetchCustomers();
	const createCustomer = useCreateCustomer();
	const [query, setQuery] = (0, import_react.useState)("");
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("all");
	const [customer, setCustomer] = (0, import_react.useState)(null);
	const [isCustomerDialogOpen, setIsCustomerDialogOpen] = (0, import_react.useState)(false);
	const [customerSearch, setCustomerSearch] = (0, import_react.useState)("");
	const [isCreatingNew, setIsCreatingNew] = (0, import_react.useState)(false);
	const [newCustomerName, setNewCustomerName] = (0, import_react.useState)("");
	const [newCustomerPhone, setNewCustomerPhone] = (0, import_react.useState)("");
	const [cart, setCart] = (0, import_react.useState)([{
		id: "p1",
		name: "Hikvision 8CH DVR",
		sku: "DS-7208HQHI-K1",
		module: "security",
		rate: 12500,
		qty: 1
	}, {
		id: "p2",
		name: "CP Plus 2MP Dome Camera",
		sku: "CP-UNC-TA21PL3",
		module: "security",
		rate: 1800,
		qty: 4
	}]);
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			if (e.key === "F2") {
				e.preventDefault();
				handleAddCustomer();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);
	const results = (0, import_react.useMemo)(() => {
		if (!query) return [];
		return products.filter((p) => p.model.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase()) || p.barcode.includes(query)).slice(0, 6);
	}, [query, products]);
	const popularProducts = (0, import_react.useMemo)(() => {
		let filtered = products;
		if (activeCategory !== "all") filtered = products.filter((p) => p.module === activeCategory || p.name.toLowerCase().includes(activeCategory));
		return filtered.slice(0, 6);
	}, [products, activeCategory]);
	const add = (id) => {
		const p = products.find((x) => x.id === id);
		if (!p) return;
		setCart((c) => {
			if (c.find((l) => l.id === id)) return c.map((l) => l.id === id ? {
				...l,
				qty: l.qty + 1
			} : l);
			return [...c, {
				id: p.id,
				name: `${p.brand} ${p.model}`,
				sku: p.sku || "SKU-UNKNOWN",
				module: p.module,
				rate: p.price,
				qty: 1
			}];
		});
		setQuery("");
	};
	const subTotal = cart.reduce((s, l) => s + l.rate * l.qty, 0);
	const gst = Math.round(subTotal * .18);
	const total = subTotal + gst;
	const handleAddCustomer = () => {
		setIsCustomerDialogOpen(true);
	};
	const handlePrint = () => {
		if (cart.length === 0) return toast.warning("Cart is empty.");
		window.print();
	};
	const handleWhatsApp = () => {
		if (cart.length === 0) return toast.warning("Cart is empty.");
		if (!customer?.phone) return toast.warning("Please attach a customer with a phone number first.");
		const text = `Invoice from Vin Technology%0A--------------------%0ATotal: ${formatINR(total)}%0AItems: ${cart.length}%0AThank you for your business!`;
		window.open(`https://wa.me/91${customer.phone}?text=${text}`, "_blank");
	};
	const getProductIcon = (module) => {
		switch (module) {
			case "security": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-8 h-8 text-security" });
			case "solar": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "w-8 h-8 text-solar" });
			case "power": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Battery, { className: "w-8 h-8 text-power" });
			case "water": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "w-8 h-8 text-water" });
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { className: "w-8 h-8 text-muted-foreground" });
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Point of Sale",
			title: "Billing",
			description: "Scan, add items and generate invoice quickly."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-12 gap-6 pb-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "col-span-12 lg:col-span-8 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 rounded-2xl border border-border bg-surface p-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanLine, { className: "h-6 w-6 text-primary ml-3" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: query,
								onChange: (e) => setQuery(e.target.value),
								onKeyDown: (e) => {
									if (e.key === "Enter" && query.trim()) {
										e.preventDefault();
										const exactMatch = products.find((p) => p.barcode === query.trim());
										if (exactMatch) add(exactMatch.id);
										else if (results.length > 0) add(results[0].id);
										else toast.error("No product found with this barcode or name.");
									}
								},
								placeholder: "Scan barcode or search product...",
								className: "border-0 bg-transparent text-base h-12 focus-visible:ring-0",
								autoFocus: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pr-4 flex flex-col items-end shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] text-muted-foreground uppercase",
									children: "F2 - Customer"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] text-muted-foreground uppercase",
									children: "ENTER - Add"
								})]
							}),
							results.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-full left-0 right-0 mt-2 z-50 overflow-hidden rounded-xl border border-border bg-surface shadow-xl",
								children: results.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => add(p.id),
									className: cn("flex w-full items-center gap-4 px-4 py-3 text-left hover:bg-secondary/60 border-b border-border/40 last:border-0 transition-colors", (MODULES[p.module] || MODULES.neutral).stripClass),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-10 h-10 rounded-md bg-background flex items-center justify-center shrink-0 border border-border",
											children: getProductIcon(p.module)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "truncate font-semibold",
												children: [
													p.brand,
													" ",
													p.model
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-mono text-[10px] text-muted-foreground",
												children: p.sku
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono text-xs text-muted-foreground",
											children: ["Stk: ", p.stock]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-bold text-base",
											children: formatINR(p.price)
										})
									]
								}, p.id))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm",
							children: "Categories"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "link",
							className: "h-auto p-0 text-primary text-sm font-semibold",
							children: "View All"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x",
						children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveCategory(c.id),
							className: cn("flex flex-col items-center justify-center w-[100px] h-[90px] rounded-2xl border transition-all shrink-0 snap-start", activeCategory === c.id ? "border-primary bg-primary/5 text-primary shadow-sm" : "border-border bg-surface text-muted-foreground hover:bg-secondary/50 hover:border-primary/30"),
							children: [c.icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-semibold tracking-wide text-center leading-tight px-1",
								children: c.label
							})]
						}, c.id))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-sm mb-3",
						children: "Popular Products"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
						children: [popularProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => add(p.id),
							className: "bg-surface border border-border rounded-2xl p-4 flex items-center gap-4 hover:shadow-md hover:border-primary/40 transition-all text-left group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-16 h-16 rounded-xl bg-secondary flex flex-col items-center justify-center shrink-0 border border-border/50 group-hover:scale-105 transition-transform duration-300",
								children: getProductIcon(p.module)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-semibold text-sm truncate leading-tight mb-1",
										children: [
											p.brand,
											" ",
											p.model
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-[10px] text-muted-foreground mb-2 truncate",
										children: p.sku || p.barcode || "NO-SKU"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-mono font-bold text-sm",
											children: formatINR(p.price)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: cn("text-[10px] font-medium font-mono", p.stock > 0 ? "text-success" : "text-danger"),
											children: ["In Stock: ", p.stock]
										})]
									})
								]
							})]
						}, p.id)), popularProducts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-full py-10 text-center border border-dashed border-border rounded-2xl text-muted-foreground",
							children: "No popular products found in this category."
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-sm",
								children: "Recent Invoices"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "link",
								className: "h-auto p-0 text-primary text-sm font-semibold",
								children: "View All"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-2xl border border-border bg-surface overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-border/60 text-left text-xs font-semibold text-muted-foreground bg-secondary/30",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 font-medium",
											children: "Invoice No."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3 font-medium",
											children: "Customer"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3 font-medium text-right",
											children: "Amount"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3 font-medium",
											children: "Date"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 font-medium text-right",
											children: "Status"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-border/40",
									children: loadingInvoices ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										colSpan: 5,
										className: "py-8 text-center text-sm text-muted-foreground",
										children: "Loading invoices..."
									}) }) : invoices.slice(0, 4).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: cn("hover:bg-secondary/40", (MODULES[i.module] || MODULES.neutral).stripClass),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-5 py-3 font-mono text-xs text-primary",
												children: i.number
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 font-medium",
												children: i.customerName
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 text-right font-mono font-semibold",
												children: formatINR(i.total)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 font-mono text-xs text-muted-foreground pl-4",
												children: i.date
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-5 py-3 text-right",
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
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "col-span-12 lg:col-span-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sticky top-[100px] rounded-2xl border border-border bg-surface shadow-sm flex flex-col h-[calc(100vh-140px)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border px-5 py-4 shrink-0 bg-background/50 rounded-t-2xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "font-bold text-base",
									children: ["Cart ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground font-normal",
										children: [
											"(",
											cart.length,
											" Items)"
										]
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setCart([]),
								className: "flex items-center gap-1.5 text-xs text-danger hover:text-danger/80 font-semibold transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Clear Cart"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 overflow-y-auto divide-y divide-border/40 p-2",
							children: [cart.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 hover:bg-secondary/20 rounded-xl transition-colors group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2 mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 pr-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold text-sm leading-tight mb-1",
											children: l.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-mono text-[10px] text-muted-foreground",
											children: l.sku
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setCart((c) => c.filter((x) => x.id !== l.id)),
										className: "text-muted-foreground hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-sm font-bold",
										children: formatINR(l.rate)
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1 bg-secondary rounded-lg p-0.5 border border-border",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setCart((c) => c.map((x) => x.id === l.id ? {
														...x,
														qty: Math.max(1, x.qty - 1)
													} : x)),
													className: "grid h-7 w-7 place-items-center rounded-md bg-background border border-border/50 text-sm hover:bg-surface shadow-sm",
													children: "−"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "w-8 text-center font-mono text-sm font-semibold",
													children: l.qty
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setCart((c) => c.map((x) => x.id === l.id ? {
														...x,
														qty: x.qty + 1
													} : x)),
													className: "grid h-7 w-7 place-items-center rounded-md bg-background border border-border/50 text-sm hover:bg-surface shadow-sm",
													children: "+"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-mono text-sm font-bold min-w-[70px] text-right",
											children: formatINR(l.rate * l.qty)
										})]
									})]
								})]
							}, l.id)), cart.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 border border-border",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanLine, { className: "w-8 h-8 opacity-50" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-foreground mb-1",
										children: "Cart is empty"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm",
										children: "Scan a barcode or click a product to add it."
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-5 py-3 border-t border-border bg-background/50 shrink-0 space-y-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "flex items-center gap-2 text-sm text-primary font-semibold hover:underline",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "w-4 h-4" }), " Add Discount"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 border-t border-border px-5 py-4 shrink-0 bg-background/80",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Subtotal",
									value: formatINR(subTotal)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "GST (18%)",
									value: formatINR(gst)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Round Off",
									value: formatINR(0)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-2 mt-2 border-t border-border border-dashed flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-base font-bold",
										children: "Total"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-3xl font-black tracking-tight",
										children: formatINR(total)
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-5 pb-5 pt-2 shrink-0 bg-background/80 rounded-b-2xl space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									onClick: handleAddCustomer,
									className: "w-full justify-between h-12 rounded-xl text-primary font-semibold border-primary/20 hover:bg-primary/5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "w-4 h-4" }),
											" ",
											customer ? customer.name : "Add Customer"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground font-mono text-[10px]",
										children: customer ? customer.phone || "No Phone" : "[F2]"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs text-muted-foreground absolute -top-2 left-3 bg-surface px-1",
										children: "Notes (Optional)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										placeholder: "Add note here...",
										className: "w-full h-20 rounded-xl border border-border bg-surface p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										onClick: handlePrint,
										variant: "outline",
										className: "gap-2 h-12 rounded-xl font-bold shadow-sm text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4 text-primary" }), " Print / Save"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										onClick: handleWhatsApp,
										className: "gap-2 h-12 rounded-xl font-bold shadow-md bg-[#25D366] hover:bg-[#20bd5a] text-white",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" }), " WhatsApp / Share"]
									})]
								})
							]
						})
					]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: isCustomerDialogOpen,
			onOpenChange: setIsCustomerDialogOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "sm:max-w-[425px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Attach Customer" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: customerSearch,
								onChange: (e) => setCustomerSearch(e.target.value),
								placeholder: "Search Customer...",
								className: "pl-9 bg-secondary/30 h-10 rounded-xl",
								autoFocus: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2 max-h-[300px] overflow-y-auto pr-2",
							children: !isCreatingNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [customers.filter((c) => c.name.toLowerCase().includes(customerSearch.toLowerCase()) || c.phone && c.phone.includes(customerSearch)).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setCustomer({
										name: c.name,
										phone: c.phone || ""
									});
									setIsCustomerDialogOpen(false);
									setCustomerSearch("");
								},
								className: "w-full flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-border hover:bg-secondary/40 transition-colors text-left group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold text-sm",
									children: c.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground font-mono mt-0.5",
									children: c.phone || "No phone"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity",
									children: "Select"
								})]
							}, c.id)), customers.filter((c) => c.name.toLowerCase().includes(customerSearch.toLowerCase()) || c.phone && c.phone.includes(customerSearch)).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-center py-6 text-sm text-muted-foreground",
								children: "No customers found."
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3 p-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-medium mb-1 block",
										children: "Full Name *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: newCustomerName,
										onChange: (e) => setNewCustomerName(e.target.value),
										placeholder: "e.g. Ramesh Kumar",
										className: "h-10 rounded-xl",
										autoFocus: true
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-medium mb-1 block",
										children: "Phone Number (Optional)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: newCustomerPhone,
										onChange: (e) => setNewCustomerPhone(e.target.value),
										placeholder: "e.g. 9876543210",
										className: "h-10 rounded-xl font-mono"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-2 flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											className: "flex-1 rounded-xl",
											onClick: () => setIsCreatingNew(false),
											children: "Cancel"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											className: "flex-1 rounded-xl",
											disabled: createCustomer.isPending,
											onClick: () => {
												if (!newCustomerName) return toast.error("Name is required");
												if (!newCustomerPhone) return toast.error("Phone number is required to save customer");
												createCustomer.mutate({
													name: newCustomerName,
													phone: newCustomerPhone,
													type: "INDIVIDUAL",
													city: "",
													address: ""
												}, {
													onSuccess: () => {
														toast.success("Customer saved to CRM!");
														setCustomer({
															name: newCustomerName,
															phone: newCustomerPhone
														});
														setIsCreatingNew(false);
														setIsCustomerDialogOpen(false);
														setNewCustomerName("");
														setNewCustomerPhone("");
													},
													onError: () => toast.error("Failed to save customer")
												});
											},
											children: createCustomer.isPending ? "Saving..." : "Save & Attach"
										})]
									})
								]
							})
						}),
						!isCreatingNew && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 pt-4 border-t border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "w-full gap-2 rounded-xl",
								variant: "secondary",
								onClick: () => setIsCreatingNew(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "w-4 h-4" }), " New Customer"]
							})
						})
					]
				})]
			})
		})
	] });
}
function Label({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className,
		children
	});
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground font-medium",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono font-semibold",
			children: value
		})]
	});
}
//#endregion
export { BillingPage as component };
