import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as Trigger2, i as Root2, n as Header, r as Item, t as Content2, y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { P as Image, V as Droplets, Y as ChevronDown, Z as Camera, ct as ArrowLeft, d as Sun, gt as CircleCheck, ht as Grid3x3, it as Barcode, l as Trash2, ot as ArrowRight, pt as Rows3, rt as Battery, tt as Box, ut as WandSparkles, v as ScanBarcode, x as Plus } from "../_libs/lucide-react.mjs";
import { i as PageHeader, n as Button, o as cn, r as MODULES, s as formatINR, t as AppShell } from "./AppShell-B6wpEuru.mjs";
import { t as ModuleBadge } from "./ModuleBadge-BASdGuui.mjs";
import { t as Label } from "./label-BZSFu2Gp.mjs";
import { t as Input } from "./input-8rRBZxpD.mjs";
import { a as useFetchProducts, i as useFetchMetadata, n as useDeleteBrand, o as useUpdateProduct, r as useDeleteCategory, t as useCreateProduct } from "./useProducts-CpMJTZff.mjs";
import { a as SheetTitle, i as SheetHeader, n as SheetContent, o as SheetTrigger, r as SheetDescription, t as Sheet } from "./sheet-Bcqn7qJX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-_lLQbfzO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
var FILTERS = [
	{
		key: "all",
		label: "All"
	},
	{
		key: "security",
		label: "CCTV"
	},
	{
		key: "water",
		label: "RO"
	},
	{
		key: "power",
		label: "Battery / Inverter"
	},
	{
		key: "solar",
		label: "Solar"
	},
	{
		key: "other",
		label: "Other"
	}
];
var BRANDS_BY_MODULE = {
	security: [
		"Hikvision",
		"Dahua",
		"CP Plus",
		"Ezviz",
		"Other"
	],
	power: [
		"Exide",
		"Luminous",
		"Microtek",
		"Amaron",
		"Other"
	],
	solar: [
		"Adani",
		"Waaree",
		"Luminous",
		"Vikram",
		"Other"
	],
	water: [
		"Kent",
		"Livpure",
		"Aquaguard",
		"Havells",
		"Other"
	],
	other: ["Other"]
};
var SPEC_TEMPLATES = {
	security: [
		"Resolution",
		"Lens",
		"Night Vision",
		"IP Rating",
		"Storage Capacity"
	],
	power: [
		"Capacity",
		"Voltage",
		"Battery Type",
		"Backup Time"
	],
	solar: [
		"System Capacity",
		"Efficiency",
		"Cell Type",
		"Panel Output"
	],
	water: [
		"Filtration Stages",
		"RO Capacity",
		"Mount Type",
		"Tank Capacity"
	]
};
function ProductsPage() {
	const { data: products = [], isLoading } = useFetchProducts();
	const { data: metadata = [] } = useFetchMetadata();
	const { mutate: deleteCategory } = useDeleteCategory();
	const { mutate: deleteBrand } = useDeleteBrand();
	const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
	const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [view, setView] = (0, import_react.useState)("grid");
	const [isDialogOpen, setIsDialogOpen] = (0, import_react.useState)(false);
	const [editingProductId, setEditingProductId] = (0, import_react.useState)(null);
	const [currentStep, setCurrentStep] = (0, import_react.useState)(1);
	const [newProduct, setNewProduct] = (0, import_react.useState)({
		module: "",
		customModule: "",
		brand: "",
		name: "",
		model: "",
		sku: "",
		barcode: "",
		customBrand: "",
		purchasePrice: 0,
		price: 0,
		stock: 0,
		minStock: 10,
		unit: "Piece",
		warrantyType: "Manufacturer Warranty",
		warrantyMonths: 12,
		amcEligible: "Yes",
		trackSerial: "Yes",
		metadata: {}
	});
	const handleModuleChange = (newModule) => {
		const templates = SPEC_TEMPLATES[newModule] || [];
		const newMetadata = {};
		templates.forEach((t) => newMetadata[t] = "");
		setNewProduct((prev) => ({
			...prev,
			module: newModule,
			brand: "",
			metadata: newMetadata
		}));
	};
	const handleGenerateSKU = () => {
		const pfx1 = newProduct.module === "other" ? newProduct.customModule.substring(0, 3) || "CUS" : newProduct.module.substring(0, 3);
		const pfx2 = newProduct.brand === "Other" ? newProduct.customBrand.substring(0, 3) || "BRN" : newProduct.brand.substring(0, 3);
		const randomNum = Math.floor(1e3 + Math.random() * 9e3);
		setNewProduct((prev) => ({
			...prev,
			sku: `${pfx1.toUpperCase()}-${pfx2.toUpperCase()}-${randomNum}`
		}));
	};
	const handleMetaChange = (key, value) => {
		setNewProduct((prev) => ({
			...prev,
			metadata: {
				...prev.metadata,
				[key]: value
			}
		}));
	};
	const resetForm = () => {
		setCurrentStep(1);
		setEditingProductId(null);
		setNewProduct({
			module: "",
			customModule: "",
			brand: "",
			customBrand: "",
			name: "",
			model: "",
			sku: "",
			barcode: "",
			purchasePrice: 0,
			price: 0,
			stock: 0,
			minStock: 10,
			unit: "Piece",
			warrantyType: "Manufacturer Warranty",
			warrantyMonths: 12,
			amcEligible: "Yes",
			trackSerial: "Yes",
			metadata: {}
		});
	};
	const handleEditProduct = (p, step = 1) => {
		setEditingProductId(p.id);
		setNewProduct({
			module: p.module,
			customModule: "",
			brand: p.brand,
			customBrand: "",
			name: p.name,
			model: p.model,
			sku: p.sku,
			barcode: p.barcode,
			purchasePrice: p.purchasePrice,
			price: p.price,
			stock: p.stock,
			minStock: p.minStock,
			unit: p.unit,
			warrantyType: p.warrantyType,
			warrantyMonths: p.warrantyMonths,
			amcEligible: p.amcEligible,
			trackSerial: p.trackSerial,
			metadata: p.metadata || {}
		});
		setCurrentStep(step);
		setIsDialogOpen(true);
	};
	const handleCreate = (e, keepOpen = false) => {
		if (e) e.preventDefault();
		const payload = {
			...newProduct,
			module: newProduct.module === "other" ? newProduct.customModule : newProduct.module,
			brand: newProduct.brand === "Other" ? newProduct.customBrand : newProduct.brand,
			purchasePrice: Number(newProduct.purchasePrice) || 0,
			price: Number(newProduct.price) || 0,
			stock: Number(newProduct.stock) || 0,
			minStock: Number(newProduct.minStock) || 0,
			warrantyMonths: Number(newProduct.warrantyMonths) || 0
		};
		if (editingProductId) updateProduct({
			id: editingProductId,
			data: payload
		}, { onSuccess: () => {
			if (!keepOpen) setIsDialogOpen(false);
			resetForm();
		} });
		else createProduct(payload, { onSuccess: () => {
			if (!keepOpen) setIsDialogOpen(false);
			resetForm();
		} });
	};
	const getProductIcon = () => {
		switch (newProduct.module) {
			case "security": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-24 h-24 text-security" });
			case "solar": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "w-24 h-24 text-solar" });
			case "power": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Battery, { className: "w-24 h-24 text-power" });
			case "water": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "w-24 h-24 text-water" });
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { className: "w-24 h-24 text-muted-foreground" });
		}
	};
	const list = filter === "all" ? products : products.filter((p) => p.module === filter);
	const totalValue = products.reduce((acc, p) => acc + p.price * p.stock, 0);
	const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= p.minStock).length;
	const outOfStockCount = products.filter((p) => p.stock === 0).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Catalog",
			title: "Products",
			description: "Master catalog across all service lines.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex rounded-md border border-border p-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setView("grid"),
						className: cn("rounded p-1.5", view === "grid" ? "bg-secondary" : "text-muted-foreground"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid3x3, { className: "h-3.5 w-3.5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setView("table"),
						className: cn("rounded p-1.5", view === "table" ? "bg-secondary" : "text-muted-foreground"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rows3, { className: "h-3.5 w-3.5" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
					open: isDialogOpen,
					onOpenChange: (open) => {
						if (!open) resetForm();
						setIsDialogOpen(open);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "gap-1.5 rounded-full px-6 shadow-sm hover:shadow-md transition-all",
							onClick: () => resetForm(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add Product"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
						side: "right",
						className: "sm:max-w-[850px] w-[90vw] p-0 overflow-hidden flex bg-background shadow-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 flex flex-col h-full overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
									className: "p-6 pb-2 border-b border-border/40 shrink-0 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
										className: "text-xl",
										children: editingProductId ? "Edit Product" : "Smart Product Configuration"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: editingProductId ? "Update product details and inventory thresholds." : "Add a new product to the master catalog." })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "px-6 py-4 shrink-0 bg-secondary/20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-2 mb-2",
										children: [
											1,
											2,
											3,
											4
										].map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-1.5 flex-1 rounded-full transition-all", currentStep >= step ? "bg-primary" : "bg-primary/20") }, step))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-xs font-medium text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: currentStep === 1 ? "text-primary font-bold" : "",
												children: "1. Basic Info"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: currentStep === 2 ? "text-primary font-bold" : "",
												children: "2. Inventory"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: currentStep === 3 ? "text-primary font-bold" : "",
												children: "3. Warranty"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: currentStep === 4 ? "text-primary font-bold" : "",
												children: "4. Specifications"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 overflow-y-auto p-6",
									children: [
										currentStep === 1 && !newProduct.module && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "animate-in fade-in slide-in-from-right-4 duration-300 h-full flex flex-col justify-center pb-10",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-center mb-8",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "text-2xl font-bold mb-2",
													children: "Select Product Category"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-muted-foreground",
													children: "Choose a category to load the correct specifications template."
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid grid-cols-2 md:grid-cols-3 gap-4",
												children: [
													{
														id: "security",
														label: "CCTV & Security",
														icon: Camera,
														color: "text-blue-500",
														bg: "hover:bg-blue-500/10 hover:border-blue-500/50"
													},
													{
														id: "solar",
														label: "Solar Energy",
														icon: Sun,
														color: "text-orange-500",
														bg: "hover:bg-orange-500/10 hover:border-orange-500/50"
													},
													{
														id: "power",
														label: "Battery & Inverter",
														icon: Battery,
														color: "text-green-500",
														bg: "hover:bg-green-500/10 hover:border-green-500/50"
													},
													{
														id: "water",
														label: "RO Purifier",
														icon: Droplets,
														color: "text-cyan-500",
														bg: "hover:bg-cyan-500/10 hover:border-cyan-500/50"
													},
													{
														id: "other",
														label: "Other Category",
														icon: Box,
														color: "text-muted-foreground",
														bg: "hover:bg-secondary hover:border-border"
													}
												].map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													onClick: () => handleModuleChange(cat.id),
													className: cn("bg-surface border border-border transition-all duration-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1", cat.bg),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(cat.icon, { className: cn("w-10 h-10 mb-4 transition-colors", cat.color) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "font-semibold text-foreground",
														children: cat.label
													})]
												}, cat.id))
											})]
										}),
										currentStep === 1 && newProduct.module && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-6 animate-in fade-in slide-in-from-right-4 duration-300",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-2 gap-5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-2 col-span-2 md:col-span-1",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
																htmlFor: "module",
																className: "text-muted-foreground",
																children: ["Product Category ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-danger",
																	children: "*"
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex gap-2",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
																	id: "module",
																	value: newProduct.module,
																	onChange: (e) => handleModuleChange(e.target.value),
																	className: "flex h-12 w-full rounded-xl border-transparent bg-secondary/30 px-4 py-2 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-secondary/50",
																	children: [
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																			value: "security",
																			children: "CCTV & Security"
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																			value: "water",
																			children: "Water Purifier (RO)"
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																			value: "power",
																			children: "Battery & Inverter"
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																			value: "solar",
																			children: "Solar Energy"
																		}),
																		metadata.filter((m) => m.is_custom).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																			value: m.slug,
																			children: m.name
																		}, m.slug)),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																			value: "other",
																			children: "Other..."
																		})
																	]
																}), metadata.find((m) => m.is_custom && m.slug === newProduct.module) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																	type: "button",
																	variant: "ghost",
																	size: "icon",
																	onClick: () => deleteCategory(metadata.find((m) => m.slug === newProduct.module).id),
																	className: "h-12 w-12 text-destructive shrink-0",
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
																})]
															}),
															newProduct.module === "other" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																placeholder: "Enter custom category",
																value: newProduct.customModule,
																onChange: (e) => setNewProduct((prev) => ({
																	...prev,
																	customModule: e.target.value
																})),
																className: "mt-2 h-12 rounded-xl",
																required: true
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-2 col-span-2 md:col-span-1",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
																htmlFor: "brand",
																className: "text-muted-foreground",
																children: ["Brand ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-danger",
																	children: "*"
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex gap-2",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
																	id: "brand",
																	value: newProduct.brand,
																	onChange: (e) => setNewProduct((prev) => ({
																		...prev,
																		brand: e.target.value
																	})),
																	className: "flex h-12 w-full rounded-xl border-transparent bg-secondary/30 px-4 py-2 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-secondary/50",
																	children: [
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																			value: "",
																			children: "Select Brand..."
																		}),
																		(BRANDS_BY_MODULE[newProduct.module] || BRANDS_BY_MODULE.other).filter((b) => b !== "Other").map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																			value: b,
																			children: b
																		}, b)),
																		metadata.find((m) => m.slug === newProduct.module)?.brands.filter((b) => b.is_custom).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																			value: b.name,
																			children: b.name
																		}, b.name)),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																			value: "Other",
																			children: "Other"
																		})
																	]
																}), metadata.find((m) => m.slug === newProduct.module)?.brands.find((b) => b.is_custom && b.name === newProduct.brand) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																	type: "button",
																	variant: "ghost",
																	size: "icon",
																	onClick: () => deleteBrand(metadata.find((m) => m.slug === newProduct.module)?.brands.find((b) => b.name === newProduct.brand).id),
																	className: "h-12 w-12 text-destructive shrink-0",
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
																})]
															}),
															newProduct.brand === "Other" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																placeholder: "Enter custom brand",
																value: newProduct.customBrand,
																onChange: (e) => setNewProduct((prev) => ({
																	...prev,
																	customBrand: e.target.value
																})),
																className: "mt-2 h-12 rounded-xl",
																required: true
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-2 col-span-2 md:col-span-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
															htmlFor: "name",
															className: "text-muted-foreground",
															children: ["Product Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-danger",
																children: "*"
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "name",
															placeholder: "e.g. 5MP Color Camera",
															value: newProduct.name,
															onChange: (e) => setNewProduct((prev) => ({
																...prev,
																name: e.target.value
															})),
															className: "h-12 rounded-xl",
															required: true
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-2 col-span-2 md:col-span-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
															htmlFor: "model",
															className: "text-muted-foreground",
															children: ["Model Number ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-danger",
																children: "*"
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "model",
															placeholder: "e.g. DS-2CE...",
															value: newProduct.model,
															onChange: (e) => setNewProduct((prev) => ({
																...prev,
																model: e.target.value
															})),
															className: "h-12 rounded-xl",
															required: true
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-2 col-span-2 md:col-span-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
															htmlFor: "sku",
															className: "text-muted-foreground",
															children: ["SKU / Product Code ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-danger",
																children: "*"
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																id: "sku",
																placeholder: "e.g. CCTV-HIK-001",
																value: newProduct.sku,
																onChange: (e) => setNewProduct((prev) => ({
																	...prev,
																	sku: e.target.value
																})),
																className: "h-12 rounded-xl",
																required: true
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																type: "button",
																variant: "outline",
																className: "h-12 px-4 rounded-xl shrink-0",
																onClick: handleGenerateSKU,
																title: "Auto Generate SKU",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "w-4 h-4 text-primary" })
															})]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-2 col-span-2 md:col-span-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "barcode",
															className: "text-muted-foreground",
															children: "Barcode (Optional)"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																id: "barcode",
																placeholder: "Scan or enter barcode",
																value: newProduct.barcode,
																onChange: (e) => setNewProduct((prev) => ({
																	...prev,
																	barcode: e.target.value
																})),
																className: "h-12 rounded-xl"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																type: "button",
																variant: "secondary",
																className: "h-12 px-4 rounded-xl shrink-0",
																title: "Scan Barcode",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanBarcode, { className: "w-4 h-4" })
															})]
														})]
													})
												]
											})
										}),
										currentStep === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-6 animate-in fade-in slide-in-from-right-4 duration-300",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-2 gap-5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-2 col-span-2 md:col-span-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "purchasePrice",
															className: "text-muted-foreground",
															children: "Purchase Price (₹)"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "purchasePrice",
															type: "number",
															value: newProduct.purchasePrice,
															onChange: (e) => setNewProduct((prev) => ({
																...prev,
																purchasePrice: Number(e.target.value)
															})),
															className: "h-12 rounded-xl font-mono text-lg"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-2 col-span-2 md:col-span-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "price",
															className: "text-muted-foreground",
															children: "Selling Price (₹)"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "price",
															type: "number",
															value: newProduct.price,
															onChange: (e) => setNewProduct((prev) => ({
																...prev,
																price: Number(e.target.value)
															})),
															className: "h-12 rounded-xl font-mono text-lg",
															required: true
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-2 col-span-2 md:col-span-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "stock",
															className: "text-muted-foreground",
															children: "Initial Stock"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "stock",
															type: "number",
															value: newProduct.stock,
															onChange: (e) => setNewProduct((prev) => ({
																...prev,
																stock: Number(e.target.value)
															})),
															className: "h-12 rounded-xl font-mono",
															required: true
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-2 col-span-2 md:col-span-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "minStock",
															className: "text-muted-foreground",
															children: "Min Stock Alert"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "minStock",
															type: "number",
															value: newProduct.minStock,
															onChange: (e) => setNewProduct((prev) => ({
																...prev,
																minStock: Number(e.target.value)
															})),
															className: "h-12 rounded-xl font-mono",
															required: true
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-2 col-span-2 md:col-span-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "unit",
															className: "text-muted-foreground",
															children: "Unit"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
															id: "unit",
															value: newProduct.unit,
															onChange: (e) => setNewProduct((prev) => ({
																...prev,
																unit: e.target.value
															})),
															className: "flex h-12 w-full rounded-xl border-transparent bg-secondary/30 px-4 py-2 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-secondary/50",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Piece",
																	children: "Piece"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Box",
																	children: "Box"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Meter",
																	children: "Meter"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Roll",
																	children: "Roll"
																})
															]
														})]
													})
												]
											})
										}),
										currentStep === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-6 animate-in fade-in slide-in-from-right-4 duration-300",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-2 gap-5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-2 col-span-2 md:col-span-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "warrantyType",
															className: "text-muted-foreground",
															children: "Warranty Type"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
															id: "warrantyType",
															value: newProduct.warrantyType,
															onChange: (e) => setNewProduct((prev) => ({
																...prev,
																warrantyType: e.target.value
															})),
															className: "flex h-12 w-full rounded-xl border-transparent bg-secondary/30 px-4 py-2 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-secondary/50",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Manufacturer Warranty",
																	children: "Manufacturer Warranty"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Dealer Warranty",
																	children: "Dealer Warranty"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "No Warranty",
																	children: "No Warranty"
																})
															]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-2 col-span-2 md:col-span-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "warranty",
															className: "text-muted-foreground",
															children: "Duration (Months)"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "warranty",
															type: "number",
															value: newProduct.warrantyMonths,
															onChange: (e) => setNewProduct((prev) => ({
																...prev,
																warrantyMonths: Number(e.target.value)
															})),
															className: "h-12 rounded-xl"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-2 col-span-2 md:col-span-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "amcEligible",
															className: "text-muted-foreground",
															children: "AMC Eligible?"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
															id: "amcEligible",
															value: newProduct.amcEligible,
															onChange: (e) => setNewProduct((prev) => ({
																...prev,
																amcEligible: e.target.value
															})),
															className: "flex h-12 w-full rounded-xl border-transparent bg-secondary/30 px-4 py-2 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-secondary/50",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Yes",
																children: "Yes"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "No",
																children: "No"
															})]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-2 col-span-2 p-5 rounded-2xl bg-primary/5 border border-primary/20",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
																className: "text-primary font-bold text-base flex items-center gap-2",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanBarcode, { className: "w-5 h-5" }), " Track Individual Units By Serial Number?"]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-muted-foreground text-xs mt-1 mb-4",
																children: "This enables warranty tracking, AMC contracts, and service history for individual items assigned to customers."
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
																value: newProduct.trackSerial,
																onChange: (e) => setNewProduct((prev) => ({
																	...prev,
																	trackSerial: e.target.value
																})),
																className: "flex h-12 w-full rounded-xl border-transparent bg-background px-4 py-2 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Yes",
																	children: "Yes (Cameras, Solar Panels, Batteries)"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "No",
																	children: "No (Cables, Connectors, Consumables)"
																})]
															})
														]
													})
												]
											})
										}),
										currentStep === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-6 animate-in fade-in slide-in-from-right-4 duration-300",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "bg-secondary/20 border border-border rounded-xl p-4 mb-4 flex gap-3 items-center",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "w-5 h-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs text-muted-foreground",
													children: [
														"These specifications were auto-loaded based on the ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: newProduct.module.toUpperCase() }),
														" category template."
													]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Accordion, {
												type: "single",
												collapsible: true,
												defaultValue: "specs",
												className: "w-full",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
													value: "specs",
													className: "border-border/40",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
														className: "text-sm font-semibold hover:no-underline px-1",
														children: "Technical Specifications"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
														className: "pt-4 pb-2 px-1",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "grid grid-cols-2 gap-5",
															children: Object.keys(newProduct.metadata || {}).length > 0 ? Object.keys(newProduct.metadata).map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "space-y-2 col-span-2 md:col-span-1",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																	className: "text-muted-foreground capitalize",
																	children: key.replace(/([A-Z])/g, " $1").trim()
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																	placeholder: `Enter ${key.replace(/([A-Z])/g, " $1").trim()}`,
																	value: newProduct.metadata[key],
																	onChange: (e) => handleMetaChange(key, e.target.value),
																	className: "h-12 rounded-xl"
																})]
															}, key)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "col-span-2 py-8 text-center text-muted-foreground border border-dashed border-border rounded-xl",
																children: "No specific templates found for this category."
															})
														})
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
													value: "images",
													className: "border-border/40",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
														className: "text-sm font-semibold hover:no-underline px-1",
														children: "Product Images (Optional)"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
														className: "pt-4 pb-2 px-1",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-secondary/20 transition-colors cursor-pointer",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "w-8 h-8 text-muted-foreground mb-3" }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "font-semibold text-sm",
																	children: "Click to upload or drag and drop"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "text-xs text-muted-foreground mt-1",
																	children: "SVG, PNG, JPG or GIF (max. 5MB)"
																})
															]
														})
													})]
												})]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-6 border-t border-border/40 shrink-0 bg-background flex items-center justify-between",
									children: [currentStep > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "outline",
										className: "rounded-xl h-12 px-6",
										onClick: () => setCurrentStep((prev) => prev - 1),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-4 h-4 mr-2" }), " Back"]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}), currentStep < 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										className: "rounded-xl h-12 px-8",
										onClick: () => setCurrentStep((prev) => prev + 1),
										children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4 ml-2" })]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-3",
										children: [!editingProductId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											variant: "secondary",
											className: "rounded-xl h-12 px-6",
											onClick: (e) => handleCreate(e, true),
											disabled: isCreating || isUpdating,
											children: isCreating ? "Saving..." : "Save & Add Another"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											className: "rounded-xl h-12 px-8 shadow-md",
											onClick: (e) => handleCreate(e, false),
											disabled: isCreating || isUpdating,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 mr-2" }),
												" ",
												isCreating || isUpdating ? "Saving..." : editingProductId ? "Save Changes" : "Save Product"
											]
										})]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-[380px] bg-secondary/30 border-l border-border p-8 flex flex-col hidden md:flex shrink-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6",
									children: "Live Preview"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-background rounded-2xl border border-border shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-all relative overflow-hidden group",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute top-4 right-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleBadge, { module: newProduct.module })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-32 h-32 rounded-full bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner",
											children: getProductIcon()
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-bold text-xl mb-1",
											children: newProduct.brand || "Brand Name"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground mb-1",
											children: newProduct.name || "Product Name"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-xs text-muted-foreground/70 mb-5",
											children: newProduct.sku || "SKU Code"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full h-px bg-border/60 my-4" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "w-full flex justify-between items-center mb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground text-sm",
												children: "Selling Price"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono font-bold text-lg text-primary",
												children: formatINR(newProduct.price || 0)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "w-full flex justify-between items-center mb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground text-sm",
												children: "Stock Status"
											}), (newProduct.stock || 0) > (newProduct.minStock || 0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1.5 text-success text-sm font-medium",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.6)]" }),
													" Healthy (",
													newProduct.stock || 0,
													")"
												]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1.5 text-danger text-sm font-medium",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 rounded-full bg-danger animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]" }),
													" Low Stock (",
													newProduct.stock || 0,
													")"
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "w-full flex justify-between items-center mb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground text-sm",
												children: "Warranty"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-sm font-medium",
												children: [newProduct.warrantyMonths || 0, " Months"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "w-full flex justify-between items-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground text-sm",
												children: "Track Serial"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("text-sm font-bold uppercase", newProduct.trackSerial === "Yes" ? "text-primary" : "text-muted-foreground"),
												children: newProduct.trackSerial
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-auto pt-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3 shadow-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "w-5 h-5 text-primary mt-0.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-primary/80 leading-relaxed font-medium",
											children: "This product will be instantly available across Quotes, Service Tickets, and Customer Installations."
										})]
									})
								})
							]
						})]
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-surface border border-border rounded-xl p-4 flex flex-col justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-1",
						children: "Total Products"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-2xl font-bold",
						children: products.length
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-surface border border-border rounded-xl p-4 flex flex-col justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-1",
						children: "Stock Value"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-2xl font-bold font-mono text-primary",
						children: formatINR(totalValue)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-warning/10 border border-warning/20 rounded-xl p-4 flex flex-col justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-warning-foreground text-xs uppercase tracking-wider font-semibold mb-1",
						children: "Low Stock"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-2xl font-bold text-warning",
						children: lowStockCount
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-danger/10 border border-danger/20 rounded-xl p-4 flex flex-col justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-danger-foreground text-xs uppercase tracking-wider font-semibold mb-1",
						children: "Out of Stock"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-2xl font-bold text-danger",
						children: outOfStockCount
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: [
				...FILTERS.filter((f) => f.key !== "other"),
				...(metadata || []).filter((m) => m.is_custom).map((m) => ({
					key: m.slug,
					label: m.name
				})),
				{
					key: "other",
					label: "Other"
				}
			].map((f) => {
				const active = filter === f.key;
				const color = f.key === "all" ? "#3B82F6" : (MODULES[f.key] || MODULES.neutral).color;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setFilter(f.key),
					className: cn("rounded-full border px-3 py-1 text-xs font-medium transition-colors", active ? "border-transparent text-background" : "border-border text-muted-foreground hover:text-foreground"),
					style: active ? { background: color } : {
						background: `${color}10`,
						color
					},
					children: f.label
				}, f.key);
			})
		}),
		isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-32 items-center justify-center text-muted-foreground",
			children: "Loading products..."
		}) : view === "grid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
			children: list.map((p) => {
				p.stock === 0 || (p.stock, p.minStock);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("group relative rounded-2xl border border-border bg-surface hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col", (MODULES[p.module] || MODULES.neutral).stripClass),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 pb-0 flex justify-between items-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm", (MODULES[p.module] || MODULES.neutral).bgClass),
								children: (() => {
									switch (p.module) {
										case "security": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-6 h-6 text-security" });
										case "solar": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "w-6 h-6 text-solar" });
										case "power": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Battery, { className: "w-6 h-6 text-power" });
										case "water": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "w-6 h-6 text-water" });
										default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { className: "w-6 h-6 text-muted-foreground" });
									}
								})()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleBadge, { module: p.module })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 pt-4 flex-1 flex flex-col",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1",
									children: p.brand
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold text-[15px] mb-1 line-clamp-1 text-foreground leading-tight",
									title: p.name || p.model,
									children: p.name || p.model
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-mono text-[10px] text-muted-foreground bg-secondary/50 rounded px-2 py-0.5 inline-flex items-center gap-1 mb-3 self-start border border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Barcode, { className: "w-3 h-3 opacity-50" }), p.sku || p.barcode || "No SKU"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xl font-mono font-bold text-foreground mb-5 mt-auto pt-2",
									children: formatINR(p.price)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center text-sm bg-secondary/20 px-3 py-1.5 rounded-lg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground flex items-center gap-2 text-xs font-medium",
											children: (p.stock || 0) > (p.minStock || 0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 rounded-full bg-success shadow-[0_0_5px_rgba(34,197,94,0.5)]" }), " Healthy Stock"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 rounded-full bg-danger animate-pulse shadow-[0_0_5px_rgba(239,68,68,0.5)]" }), " Low Stock"] })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-bold",
											children: p.stock || 0
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center text-sm px-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground flex items-center gap-2 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5 text-primary/60" }), " Warranty"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-medium text-xs",
											children: [p.warrantyMonths || "—", " Months"]
										})]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-0 bg-background/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-3 p-6 translate-y-8 group-hover:translate-y-0 duration-300 z-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "default",
								className: "w-full rounded-xl shadow-md h-11",
								onClick: () => handleEditProduct(p, 1),
								children: "Edit Product"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "w-full rounded-xl h-11 bg-background/50 hover:bg-background",
								onClick: () => handleEditProduct(p, 2),
								children: "Manage Stock"
							})]
						})
					]
				}, p.id);
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-xl border border-border bg-surface/80",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border/60 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2 font-medium",
							children: "Module"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 font-medium",
							children: "Product"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 font-medium",
							children: "Barcode"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 text-right font-medium",
							children: "Price"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 text-right font-medium",
							children: "Stock"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2 text-right font-medium",
							children: "Warranty"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					className: "divide-y divide-border/40",
					children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: cn("hover:bg-secondary/40", (MODULES[p.module] || { stripClass: "" }).stripClass),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleBadge, { module: p.module })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-2.5",
								children: [
									p.brand,
									" ",
									p.model
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5 font-mono text-xs",
								children: p.barcode
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5 text-right font-mono",
								children: formatINR(p.price)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5 text-right font-mono",
								children: p.stock
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-2.5 text-right text-muted-foreground",
								children: [p.warrantyMonths, " mo"]
							})
						]
					}, p.id))
				})]
			})
		})
	] });
}
//#endregion
export { ProductsPage as component };
