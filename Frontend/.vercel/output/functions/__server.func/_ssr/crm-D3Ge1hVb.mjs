import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { $ as Building2, A as Mail, C as Pencil, G as Clock, I as Hash, Q as Calendar, R as Globe, S as Phone, U as CreditCard, g as Search, k as MapPin, l as Trash2, x as Plus } from "../_libs/lucide-react.mjs";
import { a as Overlay2, c as Title2, i as Description2, l as Trigger2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as buttonVariants, d as useDeleteCustomer, i as PageHeader, m as useFetchCustomers, n as Button, o as cn, r as MODULES, t as AppShell } from "./AppShell-B6wpEuru.mjs";
import { t as ModuleBadge } from "./ModuleBadge-BASdGuui.mjs";
import { t as Input } from "./input-8rRBZxpD.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crm-D3Ge1hVb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AlertDialog = Root2;
var AlertDialogTrigger = Trigger2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border-0 bg-surface/95 backdrop-blur-md p-6 shadow-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-[28px]", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
function CRM() {
	const { data: customers = [], isLoading } = useFetchCustomers();
	const { mutate: deleteCustomer, isPending: isDeleting } = useDeleteCustomer();
	const [q, setQ] = (0, import_react.useState)("");
	const [selectedId, setSelectedId] = (0, import_react.useState)(void 0);
	if (!selectedId && customers.length > 0) setSelectedId(customers[0].id);
	const selected = customers.find((c) => c.id === selectedId);
	const filtered = customers.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.phone.includes(q) || (c.city || "").toLowerCase().includes(q.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "CRM",
		title: "Customers",
		description: "Profiles, installed equipment, AMC and service history — one place.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "gap-1.5 rounded-full px-6 shadow-sm hover:shadow-md transition-all",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/crm/new",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New Customer"]
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-12 gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "col-span-12 md:col-span-5 lg:col-span-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-[24px] border border-border bg-surface shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative border-b border-border p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search customers…",
						className: "pl-11 h-12 rounded-full bg-secondary/50 border-transparent focus-visible:ring-primary/20"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-[70vh] overflow-y-auto p-2 space-y-1",
					children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4 text-center text-sm text-muted-foreground",
						children: "Loading CRM data..."
					}) : filtered.map((c) => {
						const primaryMod = c.installed?.[0]?.module ?? "neutral";
						const active = c.id === selectedId;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setSelectedId(c.id),
							className: cn("block w-full rounded-2xl px-4 py-3.5 text-left transition-all hover:bg-secondary/70", MODULES[primaryMod].stripClass, active && "bg-secondary shadow-sm"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-sm font-medium",
										children: c.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] text-muted-foreground",
										children: c.city
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-0.5 font-mono text-[11px] text-muted-foreground",
									children: c.phone
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 flex flex-wrap gap-1",
									children: c.installed?.map((i, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-block h-1.5 w-6 rounded-full",
										style: { background: MODULES[i.module].color },
										title: i.product
									}, idx))
								})
							]
						}, c.id);
					})
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "col-span-12 md:col-span-7 lg:col-span-8",
			children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[28px] border-0 bg-surface shadow-md p-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl font-bold",
									children: selected.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-primary/10 text-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full",
									children: selected.type || "INDIVIDUAL"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 text-xs text-muted-foreground font-medium",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selected.source?.replace("_", " ") || "WALK IN" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Customer since ", selected.createdAt || "N/A"] })
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									asChild: true,
									className: "h-9 gap-1.5 rounded-full px-4 hover:bg-secondary/80",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/crm/" + selected.id + "/edit",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" }), " Edit Profile"]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										className: "h-9 w-9 rounded-full p-0 text-destructive hover:bg-destructive/10 hover:text-destructive border-transparent",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Are you absolutely sure?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: [
									"This will permanently delete the customer profile for ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.name }),
									" and remove their data from our servers."
								] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
									className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
									onClick: (e) => {
										e.preventDefault();
										deleteCustomer(selected.id, {
											onSuccess: () => {
												toast.success("Customer deleted successfully.");
												setSelectedId(void 0);
											},
											onError: (err) => {
												toast.error(err?.response?.data?.message || "Failed to delete customer.");
											}
										});
									},
									children: isDeleting ? "Deleting..." : "Delete Customer"
								})] })] })] })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground border-b border-border/60 pb-2",
										children: "Contact Info"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3 text-sm text-foreground/90",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
													" ",
													selected.phone
												]
											}),
											selected.phoneAlt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3 text-sm text-foreground/90",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
													" ",
													selected.phoneAlt,
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-muted-foreground bg-muted px-1.5 rounded",
														children: "ALT"
													})
												]
											}),
											selected.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3 text-sm text-foreground/90",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
													" ",
													selected.email
												]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground border-b border-border/60 pb-2",
										children: "Location"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-3 text-sm text-foreground/90",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-muted-foreground mt-0.5 shrink-0" }),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "leading-relaxed",
													children: [
														selected.address,
														selected.area,
														selected.city,
														selected.pincode
													].filter(Boolean).join(", ")
												})
											]
										}), selected.serviceArea && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3 text-sm text-foreground/90",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
												" Zone: ",
												selected.serviceArea
											]
										})]
									})]
								}),
								(selected.businessName || selected.gst || selected.pan) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground border-b border-border/60 pb-2",
										children: "Business Details"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2.5",
										children: [
											selected.businessName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3 text-sm text-foreground/90",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
													" ",
													selected.businessName
												]
											}),
											selected.gst && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3 text-sm text-foreground/90",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hash, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
													" GST: ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono",
														children: selected.gst
													})
												]
											}),
											selected.pan && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3 text-sm text-foreground/90",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
													" PAN: ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono",
														children: selected.pan
													})
												]
											})
										]
									})]
								}),
								(selected.dob || selected.anniversary || selected.preferredTime) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground border-b border-border/60 pb-2",
										children: "Preferences & Dates"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2.5",
										children: [
											selected.dob && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3 text-sm text-foreground/90",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
													" DOB: ",
													selected.dob
												]
											}),
											selected.anniversary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3 text-sm text-foreground/90",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
													" Anniv: ",
													selected.anniversary
												]
											}),
											selected.preferredTime && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3 text-sm text-foreground/90",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
													" Time: ",
													selected.preferredTime
												]
											})
										]
									})]
								}),
								selected.interests && selected.interests.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 md:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground border-b border-border/60 pb-2",
										children: "Interested In"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-2 pt-1",
										children: selected.interests.map((interest) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold capitalize tracking-wide border-0 shadow-sm",
											children: interest.replace("_", " ")
										}, interest))
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[24px] border-0 bg-surface shadow-md overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-b border-border/40 px-6 py-4 bg-secondary/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground",
								children: "Equipment Registry"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "divide-y divide-border/40",
							children: selected.installed?.map((i, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("flex items-center gap-4 px-5 py-3", MODULES[i.module]?.stripClass),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleBadge, { module: i.module }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "truncate text-sm font-medium",
											children: i.product
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-mono text-[11px] text-muted-foreground",
											children: ["SN · ", i.serial]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-mono text-[11px] text-muted-foreground",
										children: ["Installed ", i.installedOn]
									})
								]
							}, idx))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[24px] border-0 bg-surface shadow-md p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground",
							children: "Notes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-foreground/90",
							children: selected.notes
						})]
					})
				]
			}) : null
		})]
	})] });
}
//#endregion
export { CRM as component };
