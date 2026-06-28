import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { B as FileDown, D as MonitorPlay, F as History, V as Droplets, Z as Camera, _ as ScanLine, _t as CircleAlert, c as TrendingUp, d as Sun, g as Search, k as MapPin, lt as Activity, rt as Battery, st as ArrowRightLeft, t as Zap, tt as Box, w as Package, x as Plus } from "../_libs/lucide-react.mjs";
import { i as PageHeader, n as Button, o as cn, r as MODULES, s as formatINR, t as AppShell } from "./AppShell-B6wpEuru.mjs";
import { n as StatusPill } from "./ModuleBadge-BASdGuui.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-DGnONlud.mjs";
import { t as Input } from "./input-8rRBZxpD.mjs";
import { a as useFetchProducts, o as useUpdateProduct } from "./useProducts-CpMJTZff.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as SheetTitle, n as SheetContent, r as SheetDescription, t as Sheet } from "./sheet-Bcqn7qJX.mjs";
import { t as Html5QrcodeScanner } from "../_libs/html5-qrcode.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory-CNXu0R-e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = [
	{
		id: "all",
		label: "All",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { className: "w-4 h-4" })
	},
	{
		id: "solar",
		label: "Solar",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "w-4 h-4" })
	},
	{
		id: "security",
		label: "CCTV",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-4 h-4" })
	},
	{
		id: "dvr",
		label: "DVR/NVR",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorPlay, { className: "w-4 h-4" })
	},
	{
		id: "power",
		label: "Battery",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Battery, { className: "w-4 h-4" })
	},
	{
		id: "inverter",
		label: "Inverter",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-4 h-4" })
	},
	{
		id: "water",
		label: "Water Purifier",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "w-4 h-4" })
	},
	{
		id: "accessories",
		label: "Accessories",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanLine, { className: "w-4 h-4" })
	}
];
function InventoryPage() {
	const navigate = useNavigate();
	const { data: products = [] } = useFetchProducts();
	const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("all");
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedProductId, setSelectedProductId] = (0, import_react.useState)(null);
	const [isScannerOpen, setIsScannerOpen] = (0, import_react.useState)(false);
	const [isStockEntryOpen, setIsStockEntryOpen] = (0, import_react.useState)(false);
	const [isPurchaseEntryOpen, setIsPurchaseEntryOpen] = (0, import_react.useState)(false);
	const [entryProductId, setEntryProductId] = (0, import_react.useState)("");
	const [entryQty, setEntryQty] = (0, import_react.useState)(0);
	const [entryPrice, setEntryPrice] = (0, import_react.useState)(0);
	const lowStock = products.filter((p) => p.stock > 0 && p.stock <= p.minStock);
	const outOfStock = products.filter((p) => p.stock === 0);
	const totalValue = products.reduce((s, p) => s + p.stock * p.price, 0);
	const filteredProducts = (0, import_react.useMemo)(() => {
		return products.filter((p) => {
			const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.model.toLowerCase().includes(search.toLowerCase()) || p.sku?.toLowerCase().includes(search.toLowerCase());
			const matchCat = activeCategory === "all" || p.module === activeCategory;
			return matchSearch && matchCat;
		});
	}, [
		products,
		search,
		activeCategory
	]);
	const selectedProduct = (0, import_react.useMemo)(() => products.find((p) => p.id === selectedProductId), [products, selectedProductId]);
	const getProductIcon = (module) => {
		switch (module) {
			case "security": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-5 h-5 text-security" });
			case "solar": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "w-5 h-5 text-solar" });
			case "power": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Battery, { className: "w-5 h-5 text-power" });
			case "water": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "w-5 h-5 text-water" });
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { className: "w-5 h-5 text-muted-foreground" });
		}
	};
	const handleStockEntry = () => {
		if (!entryProductId) return toast.error("Please select a product");
		const p = products.find((x) => x.id === entryProductId);
		if (!p) return;
		updateProduct({
			id: p.id,
			data: { stock: p.stock + entryQty }
		}, {
			onSuccess: () => {
				toast.success(`Added ${entryQty} units to ${p.brand} ${p.model}`);
				setIsStockEntryOpen(false);
				setEntryProductId("");
				setEntryQty(0);
			},
			onError: () => toast.error("Failed to update stock")
		});
	};
	const handlePurchaseEntry = () => {
		if (!entryProductId) return toast.error("Please select a product");
		const p = products.find((x) => x.id === entryProductId);
		if (!p) return;
		updateProduct({
			id: p.id,
			data: {
				stock: p.stock + entryQty,
				purchasePrice: entryPrice
			}
		}, {
			onSuccess: () => {
				toast.success(`Purchase logged: ${entryQty} units of ${p.brand} ${p.model}`);
				setIsPurchaseEntryOpen(false);
				setEntryProductId("");
				setEntryQty(0);
				setEntryPrice(0);
			},
			onError: () => toast.error("Failed to log purchase")
		});
	};
	const exportCSV = () => {
		if (filteredProducts.length === 0) return toast.warning("No data to export");
		const headers = [
			"Product",
			"SKU",
			"Category",
			"Stock",
			"Purchase Price",
			"Selling Price"
		];
		const rows = filteredProducts.map((p) => [
			p.brand + " " + p.model,
			p.sku || "",
			p.module,
			p.stock,
			p.purchasePrice || 0,
			p.price
		].join(","));
		const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.join("\n");
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "vin_inventory_export.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		toast.success("Inventory exported successfully!");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Warehouse Dashboard",
			title: "Inventory",
			description: "Track stock, serial numbers, purchases and movements."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-surface border border-border rounded-2xl p-5 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2",
						children: "Total SKUs"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-3xl font-bold",
						children: products.length.toLocaleString()
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-surface border border-border rounded-2xl p-5 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2",
						children: "Stock Value"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-3xl font-bold font-mono text-primary",
						children: formatINR(totalValue)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-warning/10 border border-warning/20 rounded-2xl p-5 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-warning-foreground text-xs font-semibold uppercase tracking-wider mb-2",
						children: "Low Stock"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-3xl font-bold text-warning",
						children: lowStock.length
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-danger/10 border border-danger/20 rounded-2xl p-5 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-danger-foreground text-xs font-semibold uppercase tracking-wider mb-2",
						children: "Out of Stock"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-3xl font-bold text-danger",
						children: outOfStock.length
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 z-10 bg-background/95 backdrop-blur py-4 mb-2 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border/40",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full md:w-96",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: search,
					onChange: (e) => setSearch(e.target.value),
					placeholder: "Search products by name, SKU...",
					className: "pl-9 h-10 rounded-xl bg-surface border-border shadow-sm"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 w-full md:w-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "h-10 rounded-xl gap-2 font-semibold",
						onClick: () => setIsScannerOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanLine, { className: "w-4 h-4 text-primary" }), " Scan Barcode"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "h-10 rounded-xl gap-2 font-semibold",
						onClick: () => setIsStockEntryOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), " Stock Entry"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "h-10 rounded-xl gap-2 font-semibold hidden lg:flex",
						onClick: () => setIsPurchaseEntryOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRightLeft, { className: "w-4 h-4" }), " Purchase Entry"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "h-10 rounded-xl gap-2 font-semibold hidden lg:flex",
						onClick: exportCSV,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, { className: "w-4 h-4" }), " Export"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "h-10 rounded-xl gap-2 font-bold shadow-sm",
						onClick: () => navigate({ to: "/products" }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), " Add Product"]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-2",
			children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setActiveCategory(c.id),
				className: cn("flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-sm font-medium shrink-0 shadow-sm", activeCategory === c.id ? "bg-primary text-primary-foreground border-primary" : "bg-surface border-border text-foreground hover:bg-secondary"),
				children: [
					c.icon,
					" ",
					c.label
				]
			}, c.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-2xl border border-border bg-surface shadow-sm overflow-hidden mb-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm text-left whitespace-nowrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border bg-secondary/30 text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-semibold w-12",
								children: "Img"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-semibold",
								children: "Product"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-semibold",
								children: "SKU"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-semibold text-right",
								children: "Stock"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-semibold text-right",
								children: "Price"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-semibold text-right",
								children: "Value"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-semibold text-center",
								children: "Status"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
						className: "divide-y divide-border/50",
						children: [filteredProducts.map((p) => {
							const isOutOfStock = p.stock === 0;
							const isLowStock = p.stock > 0 && p.stock <= p.minStock;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								onClick: () => setSelectedProductId(p.id),
								className: cn("hover:bg-secondary/40 cursor-pointer transition-colors group", (MODULES[p.module] || MODULES.neutral).stripClass),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-10 h-10 rounded-xl bg-background border border-border/60 flex items-center justify-center shadow-sm",
											children: getProductIcon(p.module)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-6 py-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-semibold",
											children: [
												p.brand,
												" ",
												p.model
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-muted-foreground",
											children: p.name
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-3 font-mono text-xs",
										children: p.sku || p.barcode || "NO-SKU"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-3 text-right font-mono font-bold",
										children: p.stock
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-3 text-right font-mono text-muted-foreground",
										children: formatINR(p.price)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-3 text-right font-mono font-semibold",
										children: formatINR(p.stock * p.price)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-3 text-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex justify-center",
											children: isOutOfStock ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5 text-danger font-medium text-xs px-2 py-1 rounded-full bg-danger/10 border border-danger/20",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1.5 h-1.5 rounded-full bg-danger animate-pulse" }), " Out of Stock"]
											}) : isLowStock ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5 text-warning-foreground font-medium text-xs px-2 py-1 rounded-full bg-warning/20 border border-warning/30",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1.5 h-1.5 rounded-full bg-warning" }), " Low Stock"]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5 text-success font-medium text-xs px-2 py-1 rounded-full bg-success/10 border border-success/20",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1.5 h-1.5 rounded-full bg-success" }), " In Stock"]
											})
										})
									})
								]
							}, p.id);
						}), filteredProducts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							colSpan: 7,
							className: "px-6 py-12 text-center text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "w-12 h-12 mx-auto mb-4 opacity-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No products found matching your search." })]
						}) })]
					})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
			className: "font-bold text-lg mb-4 flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-5 h-5 text-primary" }), " Inventory Analytics"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 md:grid-cols-3 gap-4 pb-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-surface border border-border rounded-2xl p-5 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "font-semibold text-sm mb-4 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-4 h-4 text-success" }), " Top Selling"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: products.slice(0, 3).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "truncate pr-4",
								children: [
									p.brand,
									" ",
									p.model
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-muted-foreground font-semibold",
								children: formatINR(p.price)
							})]
						}, `ts-${p.id}`))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-surface border border-border rounded-2xl p-5 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "font-semibold text-sm mb-4 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-4 h-4 text-warning" }), " Fast Moving"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: products.slice(3, 6).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "truncate pr-4",
								children: [
									p.brand,
									" ",
									p.model
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs px-2 py-0.5 rounded bg-secondary",
								children: "High Demand"
							})]
						}, `fm-${p.id}`))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-surface border border-border rounded-2xl p-5 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "font-semibold text-sm mb-4 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-4 h-4 text-danger" }), " Dead Stock"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3 text-sm text-muted-foreground text-center pt-2",
						children: "No dead stock reported in the last 90 days."
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			open: !!selectedProductId,
			onOpenChange: (open) => !open && setSelectedProductId(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
				side: "right",
				className: "sm:max-w-[500px] w-[90vw] p-0 flex flex-col bg-background overflow-hidden border-l border-border",
				children: selectedProduct && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-6 border-b border-border bg-secondary/20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center shrink-0 shadow-sm",
							children: getProductIcon(selectedProduct.module)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
								className: "text-xl mb-1",
								children: [
									selectedProduct.brand,
									" ",
									selectedProduct.model
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: selectedProduct.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
									tone: selectedProduct.stock > 0 ? "success" : "danger",
									children: selectedProduct.stock > 0 ? "In Stock" : "Out of Stock"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
									tone: "default",
									children: selectedProduct.sku
								})]
							})
						] })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-y-auto p-6 space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-surface border border-border rounded-xl p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1",
										children: "Current Stock"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-mono text-xl font-bold",
										children: [
											selectedProduct.stock,
											" ",
											selectedProduct.unit
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-surface border border-border rounded-xl p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1",
										children: "Min Stock Alert"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-mono text-xl font-bold text-muted-foreground",
										children: [
											selectedProduct.minStock,
											" ",
											selectedProduct.unit
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-surface border border-border rounded-xl p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1",
										children: "Selling Price"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-xl font-bold text-primary",
										children: formatINR(selectedProduct.price)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-surface border border-border rounded-xl p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1",
										children: "Purchase Price"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-lg font-semibold text-muted-foreground",
										children: formatINR(selectedProduct.purchasePrice || 0)
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-sm py-2 border-b border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Barcode"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono font-semibold",
										children: selectedProduct.barcode || "N/A"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-sm py-2 border-b border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Warranty"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-semibold",
										children: [selectedProduct.warrantyMonths, " Months"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-sm py-2 border-b border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Supplier"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "ABC Electronics (Primary)"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "font-bold text-sm mb-3 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-4 h-4 text-primary" }), " Warehouse Distribution"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-surface border border-border rounded-xl divide-y divide-border/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between p-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Main Store (HO)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono font-bold",
										children: Math.floor(selectedProduct.stock * .7)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between p-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Service Center" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono font-bold",
										children: Math.floor(selectedProduct.stock * .2)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between p-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Vehicle Stock (Van 1)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono font-bold",
										children: Math.floor(selectedProduct.stock * .1)
									})]
								})
							]
						})] }),
						selectedProduct.trackSerial === "Yes" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "font-bold text-sm mb-3 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanLine, { className: "w-4 h-4 text-primary" }), " Tracked Serial Numbers"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-surface border border-border rounded-xl p-3 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center bg-secondary/50 px-3 py-1.5 rounded-lg border border-border text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono",
										children: "SN-892347101"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "success",
										children: "In Stock"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center bg-secondary/50 px-3 py-1.5 rounded-lg border border-border text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono",
										children: "SN-892347102"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "success",
										children: "In Stock"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center text-xs text-primary font-medium cursor-pointer pt-2 hover:underline",
									children: [
										"View all ",
										selectedProduct.stock,
										" serial numbers"
									]
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "font-bold text-sm mb-3 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "w-4 h-4 text-primary" }), " Recent Movements"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative pl-4 border-l-2 border-border/50 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-danger ring-4 ring-background" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-medium",
											children: "Invoice INV-0042"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs text-muted-foreground flex justify-between mt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-danger",
												children: "-2 Units"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Today, 10:45 AM" })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-success ring-4 ring-background" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-medium",
											children: "Purchase Order PO-902"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs text-muted-foreground flex justify-between mt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-success",
												children: "+15 Units"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Yesterday, 4:20 PM" })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-warning ring-4 ring-background" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-medium",
											children: "Warranty Replacement (TK-105)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs text-muted-foreground flex justify-between mt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-warning",
												children: "-1 Unit"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "May 22, 2:15 PM" })]
										})
									]
								})
							]
						})] })
					]
				})] })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: isStockEntryOpen,
			onOpenChange: setIsStockEntryOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "sm:max-w-[425px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Stock Entry" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Add inventory counts directly to your warehouse." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-4 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold text-muted-foreground",
								children: "Select Product"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: entryProductId,
								onChange: (e) => setEntryProductId(e.target.value),
								className: "flex h-10 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "-- Choose a product --"
								}), products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: p.id,
									children: [
										p.brand,
										" ",
										p.model,
										" (",
										p.sku || p.barcode,
										")"
									]
								}, p.id))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold text-muted-foreground",
								children: "Quantity to Add"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: entryQty || "",
								onChange: (e) => setEntryQty(Number(e.target.value)),
								className: "h-10 rounded-xl font-mono",
								placeholder: "e.g. 50"
							})]
						}),
						entryProductId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground pt-2",
							children: [
								"Current Stock: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono font-bold text-foreground",
									children: products.find((x) => x.id === entryProductId)?.stock
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"New Stock will be: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono font-bold text-success",
									children: products.find((x) => x.id === entryProductId).stock + (entryQty || 0)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full h-10 rounded-xl mt-4",
							disabled: isUpdating || !entryProductId || !entryQty,
							onClick: handleStockEntry,
							children: isUpdating ? "Updating..." : "Update Stock"
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: isPurchaseEntryOpen,
			onOpenChange: setIsPurchaseEntryOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "sm:max-w-[425px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Purchase Entry" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Log a new purchase to update stock and cost price." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-4 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold text-muted-foreground",
								children: "Select Product"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: entryProductId,
								onChange: (e) => {
									setEntryProductId(e.target.value);
									const p = products.find((x) => x.id === e.target.value);
									if (p) setEntryPrice(p.purchasePrice || 0);
								},
								className: "flex h-10 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "-- Choose a product --"
								}), products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: p.id,
									children: [
										p.brand,
										" ",
										p.model
									]
								}, p.id))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-muted-foreground",
									children: "Quantity Received"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: entryQty || "",
									onChange: (e) => setEntryQty(Number(e.target.value)),
									className: "h-10 rounded-xl font-mono",
									placeholder: "Qty"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-muted-foreground",
									children: "Unit Cost (₹)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: entryPrice || "",
									onChange: (e) => setEntryPrice(Number(e.target.value)),
									className: "h-10 rounded-xl font-mono",
									placeholder: "Cost"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full h-10 rounded-xl mt-4",
							disabled: isUpdating || !entryProductId || !entryQty || !entryPrice,
							onClick: handlePurchaseEntry,
							children: isUpdating ? "Logging..." : "Log Purchase"
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: isScannerOpen,
			onOpenChange: setIsScannerOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "sm:max-w-[425px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Scan Barcode" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Use your device camera to scan a product barcode." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarcodeScanner, { onResult: (res) => {
						setSearch(res);
						setIsScannerOpen(false);
						toast.success(`Scanned: ${res}`);
					} })
				})]
			})
		})
	] });
}
function BarcodeScanner({ onResult }) {
	(0, import_react.useEffect)(() => {
		const scanner = new Html5QrcodeScanner("reader", {
			fps: 10,
			qrbox: {
				width: 250,
				height: 150
			}
		}, false);
		scanner.render((text) => {
			scanner.clear();
			onResult(text);
		}, (err) => {});
		return () => {
			scanner.clear().catch(console.error);
		};
	}, [onResult]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		id: "reader",
		className: "w-full rounded-xl overflow-hidden"
	});
}
function Badge({ children, tone = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider", tone === "default" && "bg-secondary text-muted-foreground", tone === "success" && "bg-success/10 text-success", tone === "warning" && "bg-warning/10 text-warning-foreground", tone === "danger" && "bg-danger/10 text-danger"),
		children
	});
}
//#endregion
export { InventoryPage as component };
