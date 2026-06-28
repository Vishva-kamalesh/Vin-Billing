import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Sparkles,
  Package,
  Boxes,
  Receipt,
  ShieldCheck,
  Wrench,
  HardHat,
  Truck,
  BarChart3,
  Settings,
  FileText,
  BadgeCheck,
  ChevronsLeft,
  Activity,
} from "lucide-react";
import { useAppDispatch, useAppSelector, uiActions } from "@/store";
import { cn } from "@/lib/utils";

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent?: string;
}

const NAV: NavItem[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, accent: "var(--primary)" },
  { to: "/crm", label: "CRM", icon: Users, accent: "var(--primary)" },
  { to: "/leads", label: "Leads", icon: Sparkles, accent: "var(--accent-solar)" },
  { to: "/products", label: "Products", icon: Package, accent: "var(--primary)" },
  { to: "/inventory", label: "Inventory", icon: Boxes, accent: "var(--accent-power)" },
  { to: "/billing", label: "Billing / POS", icon: Receipt, accent: "var(--primary)" },
  { to: "/quotations", label: "Quotations", icon: FileText, accent: "var(--primary)" },
  { to: "/amc", label: "AMC", icon: ShieldCheck, accent: "var(--accent-water)" },
  { to: "/service", label: "Service", icon: Wrench, accent: "var(--accent-security)" },
  { to: "/technicians", label: "Technicians", icon: HardHat, accent: "var(--accent-power)" },
  { to: "/warranty", label: "Warranty", icon: BadgeCheck, accent: "var(--accent-solar)" },
  { to: "/suppliers", label: "Suppliers", icon: Truck, accent: "var(--primary)" },
  { to: "/reports", label: "Reports", icon: BarChart3, accent: "var(--primary)" },
  { to: "/settings", label: "Settings", icon: Settings, accent: "var(--primary)" },
];

export function Sidebar() {
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed);
  const dispatch = useAppDispatch();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  
  const [isHovered, setIsHovered] = useState(false);
  const isActuallyCollapsed = collapsed && !isHovered;

  return (
    <aside
      onMouseEnter={() => collapsed && setIsHovered(true)}
      onMouseLeave={() => collapsed && setIsHovered(false)}
      className={cn(
        "sticky left-0 top-0 z-50 flex h-screen flex-col border-r border-border/40 bg-surface-glass backdrop-blur-2xl shadow-[8px_0_40px_rgba(0,0,0,0.04)] dark:shadow-[8px_0_40px_rgba(0,0,0,0.2)] transition-all duration-500 ease-out overflow-hidden",
        isActuallyCollapsed ? "w-[68px]" : "w-[244px]"
      )}
    >
      <div className="flex h-20 shrink-0 items-center gap-3 border-b border-border/40 px-5">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#06B6D4] via-[#3B82F6] to-[#10B981] shadow-sm">
          <Activity className="h-4 w-4 text-background" strokeWidth={2.5} />
        </div>
        {!isActuallyCollapsed && (
          <div className="min-w-0">
            <div className="font-display text-sm font-bold leading-none">VIN TECH</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Billing
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3">
        {NAV.map((item) => {
          const active =
            item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="group relative flex items-center gap-3 rounded-full px-4 py-3.5 text-sm transition-all duration-300"
            >
              {active && (
                <div 
                  className="absolute inset-0 rounded-full opacity-15 dark:opacity-20 shadow-sm" 
                  style={{ backgroundColor: item.accent }} 
                />
              )}
              {!active && (
                <div className="absolute inset-0 rounded-full opacity-0 bg-secondary/40 transition-opacity duration-300 group-hover:opacity-100" />
              )}
              
              <Icon
                className={cn(
                  "relative z-10 h-[22px] w-[22px] shrink-0 transition-transform duration-300", 
                  !active && "text-muted-foreground group-hover:scale-110",
                  active && "scale-105"
                )}
                style={{ color: active ? item.accent : undefined }}
              />
              {!isActuallyCollapsed && (
                <span 
                  className="relative z-10 truncate transition-colors duration-300 font-medium"
                  style={{ 
                    color: active ? item.accent : undefined,
                    fontWeight: active ? 700 : undefined
                  }}
                >
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => dispatch(uiActions.toggleSidebar())}
        className="group m-3 flex h-12 items-center justify-center gap-2 rounded-full border-none bg-secondary/30 px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary/60 hover:text-foreground hover:shadow-md transition-all duration-300"
      >
        <ChevronsLeft
          className={cn("h-4 w-4 transition-transform duration-500", collapsed ? "rotate-180 group-hover:translate-x-1" : "group-hover:-translate-x-1")}
        />
        {!isActuallyCollapsed && <span>{collapsed ? "Pin Sidebar" : "Collapse"}</span>}
      </button>
    </aside>
  );
}
