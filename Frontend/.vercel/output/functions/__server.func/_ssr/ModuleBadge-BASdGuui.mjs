import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { o as cn, r as MODULES } from "./AppShell-B6wpEuru.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ModuleBadge-BASdGuui.js
var import_jsx_runtime = require_jsx_runtime();
function ModuleBadge({ module, className }) {
	const m = MODULES[module] || {
		label: module.replace(/_/g, " "),
		color: "#64748B",
		stripClass: "module-strip-neutral",
		bgSoft: "bg-secondary",
		text: "text-muted-foreground"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider", className),
		style: {
			borderColor: `${m.color}40`,
			background: `${m.color}14`,
			color: m.color
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "h-1.5 w-1.5 rounded-full",
			style: { background: m.color }
		}), m.label]
	});
}
function StatusPill({ tone, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium", {
			success: "bg-solar/12 text-solar border-solar/30",
			warning: "bg-power/12 text-power border-power/30",
			danger: "bg-destructive/12 text-destructive border-destructive/30",
			info: "bg-security/12 text-security border-security/30",
			muted: "bg-muted text-muted-foreground border-border"
		}[tone]),
		children
	});
}
//#endregion
export { StatusPill as n, ModuleBadge as t };
