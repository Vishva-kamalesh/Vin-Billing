import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as useAppSelector, i as useAppDispatch, r as uiActions } from "./store-B4lwvfKm.mjs";
import { n as apiClient, t as API_ENDPOINTS } from "./api-client-D0rzRozx.mjs";
import { N as useNavigate, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as Slot, y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { E as Moon, J as ChevronRight, K as Circle, L as HardHat, M as Info, W as Command, X as Check, d as Sun, dt as TriangleAlert, et as Boxes, ft as Sparkles, g as Search, gt as CircleCheck, i as Users, j as LayoutDashboard, lt as Activity, m as Settings, nt as Bell, p as ShieldCheck, q as ChevronsLeft, r as Wrench, s as Truck, vt as ChartColumn, w as Package, x as Plus, y as Receipt, yt as BadgeCheck, z as FileText } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as Label2, c as Root2, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2, o as Portal2, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { t as _e } from "../_libs/cmdk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-B6wpEuru.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var NAV = [
	{
		to: "/",
		label: "Dashboard",
		icon: LayoutDashboard,
		accent: "var(--primary)"
	},
	{
		to: "/crm",
		label: "CRM",
		icon: Users,
		accent: "var(--primary)"
	},
	{
		to: "/leads",
		label: "Leads",
		icon: Sparkles,
		accent: "var(--accent-solar)"
	},
	{
		to: "/products",
		label: "Products",
		icon: Package,
		accent: "var(--primary)"
	},
	{
		to: "/inventory",
		label: "Inventory",
		icon: Boxes,
		accent: "var(--accent-power)"
	},
	{
		to: "/billing",
		label: "Billing / POS",
		icon: Receipt,
		accent: "var(--primary)"
	},
	{
		to: "/quotations",
		label: "Quotations",
		icon: FileText,
		accent: "var(--primary)"
	},
	{
		to: "/amc",
		label: "AMC",
		icon: ShieldCheck,
		accent: "var(--accent-water)"
	},
	{
		to: "/service",
		label: "Service",
		icon: Wrench,
		accent: "var(--accent-security)"
	},
	{
		to: "/technicians",
		label: "Technicians",
		icon: HardHat,
		accent: "var(--accent-power)"
	},
	{
		to: "/warranty",
		label: "Warranty",
		icon: BadgeCheck,
		accent: "var(--accent-solar)"
	},
	{
		to: "/suppliers",
		label: "Suppliers",
		icon: Truck,
		accent: "var(--primary)"
	},
	{
		to: "/reports",
		label: "Reports",
		icon: ChartColumn,
		accent: "var(--primary)"
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings,
		accent: "var(--primary)"
	}
];
function Sidebar() {
	const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed);
	const dispatch = useAppDispatch();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [isHovered, setIsHovered] = (0, import_react.useState)(false);
	const isActuallyCollapsed = collapsed && !isHovered;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		onMouseEnter: () => collapsed && setIsHovered(true),
		onMouseLeave: () => collapsed && setIsHovered(false),
		className: cn("sticky left-0 top-0 z-50 flex h-screen flex-col border-r border-border/40 bg-surface-glass backdrop-blur-2xl shadow-[8px_0_40px_rgba(0,0,0,0.04)] dark:shadow-[8px_0_40px_rgba(0,0,0,0.2)] transition-all duration-500 ease-out overflow-hidden", isActuallyCollapsed ? "w-[68px]" : "w-[244px]"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-20 shrink-0 items-center gap-3 border-b border-border/40 px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#06B6D4] via-[#3B82F6] to-[#10B981] shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
						className: "h-4 w-4 text-background",
						strokeWidth: 2.5
					})
				}), !isActuallyCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-sm font-bold leading-none",
						children: "VIN TECH"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
						children: "Billing"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex-1 space-y-0.5 overflow-y-auto px-2 py-3",
				children: NAV.map((item) => {
					const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: "group relative flex items-center gap-3 rounded-full px-4 py-3.5 text-sm transition-all duration-300",
						children: [
							active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 rounded-full opacity-15 dark:opacity-20 shadow-sm",
								style: { backgroundColor: item.accent }
							}),
							!active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full opacity-0 bg-secondary/40 transition-opacity duration-300 group-hover:opacity-100" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: cn("relative z-10 h-[22px] w-[22px] shrink-0 transition-transform duration-300", !active && "text-muted-foreground group-hover:scale-110", active && "scale-105"),
								style: { color: active ? item.accent : void 0 }
							}),
							!isActuallyCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "relative z-10 truncate transition-colors duration-300 font-medium",
								style: {
									color: active ? item.accent : void 0,
									fontWeight: active ? 700 : void 0
								},
								children: item.label
							})
						]
					}, item.to);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => dispatch(uiActions.toggleSidebar()),
				className: "group m-3 flex h-12 items-center justify-center gap-2 rounded-full border-none bg-secondary/30 px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary/60 hover:text-foreground hover:shadow-md transition-all duration-300",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsLeft, { className: cn("h-4 w-4 transition-transform duration-500", collapsed ? "rotate-180 group-hover:translate-x-1" : "group-hover:-translate-x-1") }), !isActuallyCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: collapsed ? "Pin Sidebar" : "Collapse" })]
			})
		]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-10 px-5 py-2",
			sm: "h-9 rounded-full px-4 text-xs",
			lg: "h-12 rounded-full px-8",
			icon: "h-10 w-10 rounded-full"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	checked,
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
function Topbar() {
	const dispatch = useAppDispatch();
	const theme = useAppSelector((s) => s.ui.theme);
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		if (theme === "light") {
			root.classList.add("light");
			root.classList.remove("dark");
		} else {
			root.classList.add("dark");
			root.classList.remove("light");
		}
	}, [theme]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				dispatch(uiActions.setPaletteOpen(true));
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [dispatch]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-20 flex h-20 items-center justify-between gap-4 border-b border-border/40 bg-background/80 px-6 backdrop-blur-2xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => dispatch(uiActions.setPaletteOpen(true)),
			className: "group flex h-12 min-w-0 flex-1 items-center gap-3 rounded-full border border-border/40 bg-surface shadow-sm px-5 text-left text-sm text-muted-foreground transition-all hover:shadow-md hover:border-primary/30 md:max-w-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5 shrink-0" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate text-[15px]",
					children: "Search customers, invoices, tickets, AMC…"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ml-auto hidden items-center gap-1.5 rounded-md border border-border/50 bg-background/80 px-2 py-0.5 font-mono text-[11px] font-medium text-muted-foreground shadow-sm md:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, { className: "h-3 w-3" }), "K"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "h-10 rounded-full gap-2 px-5 bg-primary text-primary-foreground shadow-md transition-all hover:shadow-lg hover:scale-[1.02]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline font-medium text-[14px]",
							children: "New"
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
					align: "end",
					className: "w-52",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, {
							className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
							children: "Quick Create"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, { children: "New Invoice" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, { children: "New Service Ticket" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, { children: "New AMC Contract" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, { children: "New Lead" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, { children: "New Customer" })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "icon",
					className: "relative h-10 w-10 rounded-full bg-surface shadow-sm border-border/40 hover:bg-secondary/80 transition-all hover:shadow-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5 text-muted-foreground hover:text-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute right-[2px] top-[2px] grid h-[18px] min-w-[18px] place-items-center rounded-full bg-[#F59E0B] px-1 font-mono text-[10px] font-bold text-white shadow-sm ring-2 ring-surface",
						children: "7"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "icon",
					className: "h-10 w-10 rounded-full bg-surface shadow-sm border-border/40 hover:bg-secondary/80 transition-all hover:shadow-md",
					onClick: () => dispatch(uiActions.toggleTheme()),
					children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-5 w-5 text-muted-foreground hover:text-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-5 w-5 text-muted-foreground hover:text-foreground" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "ml-1 grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#06B6D4] to-[#10B981] font-mono text-sm font-bold text-white shadow-md transition-all hover:scale-105 ring-2 ring-transparent hover:ring-primary/20",
						children: "VT"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
					align: "end",
					className: "w-52",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuLabel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm",
							children: "Vinod Thomas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: "Admin · Chennai HQ"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, { children: "Profile" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, { children: "Business Settings" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, { children: "Sign Out" })
					]
				})] })
			]
		})]
	});
}
var notificationsService = {
	getAll: async () => {
		return (await apiClient.get(API_ENDPOINTS.NOTIFICATIONS.GET_ALL)).data;
	},
	getLiveOps: async () => {
		return (await apiClient.get(API_ENDPOINTS.NOTIFICATIONS.GET_LIVE_OPS)).data;
	},
	markAllRead: async () => {
		await apiClient.patch(API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ);
	},
	markRead: async (id) => {
		await apiClient.patch(API_ENDPOINTS.NOTIFICATIONS.MARK_READ(id));
	}
};
function useFetchPulses() {
	return useQuery({
		queryKey: ["notifications", "live-ops"],
		queryFn: notificationsService.getLiveOps
	});
}
var MODULES = {
	security: {
		label: "CCTV / Security",
		color: "#3B82F6",
		stripClass: "module-strip-security",
		bgSoft: "bg-security/10",
		text: "text-security"
	},
	water: {
		label: "RO / Water",
		color: "#06B6D4",
		stripClass: "module-strip-water",
		bgSoft: "bg-water/10",
		text: "text-water"
	},
	power: {
		label: "Inverter / Battery",
		color: "#F5A623",
		stripClass: "module-strip-power",
		bgSoft: "bg-power/10",
		text: "text-power"
	},
	solar: {
		label: "Solar",
		color: "#34D399",
		stripClass: "module-strip-solar",
		bgSoft: "bg-solar/10",
		text: "text-solar"
	},
	neutral: {
		label: "General",
		color: "#3B82F6",
		stripClass: "module-strip-neutral",
		bgSoft: "bg-primary/10",
		text: "text-primary"
	}
};
var formatINR = (n) => new Intl.NumberFormat("en-IN", {
	style: "currency",
	currency: "INR",
	maximumFractionDigits: 0
}).format(n);
function LiveOpsStrip() {
	const { data: pulses = [] } = useFetchPulses();
	const repeated = [...pulses, ...pulses];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden border-y border-border bg-gradient-to-r from-surface via-background to-surface",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "z-10 flex shrink-0 items-center gap-2 border-r border-border bg-background/80 px-4 py-2.5 backdrop-blur-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative flex h-2 w-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-solar opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-solar" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground",
						children: "Live Ops"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-full overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex shrink-0 animate-ticker items-center gap-8 whitespace-nowrap py-2.5 pl-6 pr-6",
						children: repeated.map((p, i) => {
							const m = MODULES[p.module] || MODULES.neutral;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.kind === "alert" ? TriangleAlert : p.kind === "success" ? CircleCheck : Info, {
										className: "h-3.5 w-3.5 shrink-0",
										style: { color: m.color }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-1.5 w-1.5 shrink-0 rounded-full",
										style: { background: m.color }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground/90",
										children: p.text
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground/40",
										children: "·"
									})
								]
							}, `${p.id}-${i}`);
						})
					})
				})]
			})
		]
	});
}
var mapBackendToFrontendCustomer = (data) => {
	const primaryAddress = data.addresses?.[0] || {};
	const firstNote = data.notes?.[0] || {};
	return {
		id: data.id,
		name: data.name,
		email: data.email || "",
		phone: data.phone,
		phoneAlt: data.phone_alt || "",
		type: data.customer_type || "INDIVIDUAL",
		source: data.lead_source || "WALK_IN",
		address: primaryAddress.address_1 || "",
		area: primaryAddress.area || "",
		city: primaryAddress.city || "",
		district: primaryAddress.district || "",
		state: primaryAddress.state || "Tamil Nadu",
		pincode: primaryAddress.pincode || "",
		gst: data.gst_number || "",
		pan: data.pan_number || "",
		businessName: data.business_name || "",
		dob: data.dob ? new Date(data.dob).toLocaleDateString() : "",
		anniversary: data.anniversary ? new Date(data.anniversary).toLocaleDateString() : "",
		preferredTime: data.preferred_time || "",
		serviceArea: data.service_area || "",
		notes: firstNote.note || "",
		interests: data.interests || [],
		installed: data.installed_products?.map((ip) => ({
			module: ip.product?.category?.slug || "neutral",
			product: ip.product?.name || ip.product?.model || "Unknown",
			serial: ip.serial_number || "N/A",
			installedOn: ip.installed_date ? new Date(ip.installed_date).toLocaleDateString() : "N/A"
		})) || [],
		createdAt: data.created_at ? new Date(data.created_at).toLocaleDateString() : "N/A"
	};
};
var customersService = {
	getAll: async () => {
		return (await apiClient.get(API_ENDPOINTS.CUSTOMERS.GET_ALL)).data.map(mapBackendToFrontendCustomer);
	},
	create: async (data) => {
		return (await apiClient.post(API_ENDPOINTS.CUSTOMERS.CREATE, data)).data;
	},
	getById: async (id) => {
		return mapBackendToFrontendCustomer((await apiClient.get(API_ENDPOINTS.CUSTOMERS.GET_BY_ID(id))).data);
	},
	update: async (id, data) => {
		return (await apiClient.patch(API_ENDPOINTS.CUSTOMERS.UPDATE(id), data)).data;
	},
	delete: async (id) => {
		await apiClient.delete(API_ENDPOINTS.CUSTOMERS.DELETE(id));
	}
};
function useFetchCustomers() {
	return useQuery({
		queryKey: ["customers"],
		queryFn: customersService.getAll
	});
}
function useFetchCustomerById(id) {
	return useQuery({
		queryKey: ["customers", id],
		queryFn: () => customersService.getById(id),
		enabled: !!id
	});
}
function useCreateCustomer() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: customersService.create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["customers"] });
		}
	});
}
function useUpdateCustomer() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }) => customersService.update(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["customers"] });
		}
	});
}
function useDeleteCustomer() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: customersService.delete,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["customers"] });
		}
	});
}
var invoicesService = {
	getAll: async () => {
		return (await apiClient.get(API_ENDPOINTS.INVOICES.GET_ALL)).data;
	},
	create: async (data) => {
		return (await apiClient.post(API_ENDPOINTS.INVOICES.CREATE, data)).data;
	},
	getById: async (id) => {
		return (await apiClient.get(API_ENDPOINTS.INVOICES.GET_BY_ID(id))).data;
	},
	update: async (id, data) => {
		return (await apiClient.patch(API_ENDPOINTS.INVOICES.UPDATE(id), data)).data;
	},
	cancel: async (id) => {
		await apiClient.post(API_ENDPOINTS.INVOICES.CANCEL(id));
	}
};
function useFetchInvoices() {
	return useQuery({
		queryKey: ["invoices"],
		queryFn: invoicesService.getAll
	});
}
var serviceTicketsService = {
	getAll: async () => {
		return (await apiClient.get(API_ENDPOINTS.SERVICE_TICKETS.GET_ALL)).data;
	},
	getKanban: async () => {
		return (await apiClient.get(API_ENDPOINTS.SERVICE_TICKETS.GET_KANBAN)).data;
	},
	create: async (data) => {
		return (await apiClient.post(API_ENDPOINTS.SERVICE_TICKETS.CREATE, data)).data;
	},
	update: async (id, data) => {
		return (await apiClient.patch(API_ENDPOINTS.SERVICE_TICKETS.UPDATE(id), data)).data;
	},
	assign: async (id, technicianId) => {
		return (await apiClient.patch(API_ENDPOINTS.SERVICE_TICKETS.ASSIGN(id), { technicianId })).data;
	}
};
function useFetchTickets() {
	return useQuery({
		queryKey: ["service-tickets"],
		queryFn: serviceTicketsService.getAll
	});
}
function useCreateTicket() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: serviceTicketsService.create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["service-tickets"] });
		}
	});
}
var amcService = {
	getAll: async () => {
		return (await apiClient.get(API_ENDPOINTS.AMC.GET_ALL)).data;
	},
	getExpiring: async () => {
		return (await apiClient.get(API_ENDPOINTS.AMC.GET_EXPIRING)).data;
	},
	create: async (data) => {
		return (await apiClient.post(API_ENDPOINTS.AMC.CREATE, data)).data;
	},
	update: async (id, data) => {
		return (await apiClient.patch(API_ENDPOINTS.AMC.UPDATE(id), data)).data;
	},
	renew: async (id) => {
		return (await apiClient.post(API_ENDPOINTS.AMC.RENEW(id))).data;
	}
};
function useFetchAMCs() {
	return useQuery({
		queryKey: ["amcs"],
		queryFn: amcService.getAll
	});
}
function useCreateAMC() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: amcService.create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["amcs"] });
		}
	});
}
function CommandPalette() {
	const open = useAppSelector((s) => s.ui.paletteOpen);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { data: customers = [] } = useFetchCustomers();
	const { data: invoices = [] } = useFetchInvoices();
	const { data: tickets = [] } = useFetchTickets();
	const { data: amcs = [] } = useFetchAMCs();
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onEsc = (e) => {
			if (e.key === "Escape") dispatch(uiActions.setPaletteOpen(false));
		};
		window.addEventListener("keydown", onEsc);
		return () => window.removeEventListener("keydown", onEsc);
	}, [open, dispatch]);
	if (!open) return null;
	const go = (path) => {
		dispatch(uiActions.setPaletteOpen(false));
		navigate({ to: path });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-start justify-center bg-background/70 px-4 pt-24 backdrop-blur-sm",
		onClick: () => dispatch(uiActions.setPaletteOpen(false)),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e, {
			className: "w-full max-w-xl overflow-hidden rounded-xl border border-border bg-surface shadow-2xl",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 border-b border-border px-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
						autoFocus: true,
						placeholder: "Search anything…",
						className: "h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
						className: "rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground",
						children: "ESC"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.List, {
				className: "max-h-[60vh] overflow-y-auto p-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
						className: "px-3 py-8 text-center text-sm text-muted-foreground",
						children: "No matches. Try invoice number, customer, ticket ID…"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
						heading: "Navigate",
						className: "text-xs text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest",
						children: [
							["Dashboard", "/"],
							["Billing / POS", "/billing"],
							["Service Tickets", "/service"],
							["AMC Contracts", "/amc"],
							["Inventory", "/inventory"],
							["Reports", "/reports"]
						].map(([label, path]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Item, {
							onSelect: () => go(path),
							className: "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm aria-selected:bg-secondary",
							children: label
						}, path))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
						heading: "Customers",
						className: "text-xs text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest",
						children: customers.slice(0, 6).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
							value: `customer ${c.name} ${c.phone}`,
							onSelect: () => go("/crm"),
							className: "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm aria-selected:bg-secondary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3.5 w-3.5 text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-auto font-mono text-xs text-muted-foreground",
									children: c.phone
								})
							]
						}, c.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
						heading: "Invoices",
						className: "text-xs text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest",
						children: invoices.slice(0, 5).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
							value: `invoice ${i.number} ${i.customerName}`,
							onSelect: () => go("/billing"),
							className: "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm aria-selected:bg-secondary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-3.5 w-3.5 text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs",
									children: i.number
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: i.customerName
								})
							]
						}, i.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Group, {
						heading: "Tickets & AMC",
						className: "text-xs text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest",
						children: [tickets.slice(0, 3).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
							value: `ticket ${t.number} ${t.customerName}`,
							onSelect: () => go("/service"),
							className: "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm aria-selected:bg-secondary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-3.5 w-3.5 text-security" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs",
									children: t.number
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: t.customerName
								})
							]
						}, t.id)), amcs.slice(0, 3).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
							value: `amc ${a.number} ${a.customerName}`,
							onSelect: () => go("/amc"),
							className: "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm aria-selected:bg-secondary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-water" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs",
									children: a.number
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: a.customerName
								})
							]
						}, a.id))]
					})
				]
			})]
		})
	});
}
function AppShell({ children, showLiveOps = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen w-full bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Topbar, {}),
					showLiveOps && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveOpsStrip, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex-1 p-4 md:p-6",
						children
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, {})
		]
	});
}
function PageHeader({ eyebrow, title, description, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground",
					children: eyebrow
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-bold tracking-tight sm:text-3xl",
					children: title
				}),
				description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-2xl text-sm text-muted-foreground",
					children: description
				})
			]
		}), actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex shrink-0 items-center gap-2",
			children: actions
		})]
	});
}
//#endregion
export { useUpdateCustomer as _, buttonVariants as a, useCreateAMC as c, useDeleteCustomer as d, useFetchAMCs as f, useFetchTickets as g, useFetchInvoices as h, PageHeader as i, useCreateCustomer as l, useFetchCustomers as m, Button as n, cn as o, useFetchCustomerById as p, MODULES as r, formatINR as s, AppShell as t, useCreateTicket as u };
