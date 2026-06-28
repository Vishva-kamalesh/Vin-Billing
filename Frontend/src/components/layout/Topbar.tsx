import { useEffect } from "react";
import { Search, Bell, Plus, Moon, Sun, Command } from "lucide-react";
import { useAppDispatch, useAppSelector, uiActions } from "@/store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function Topbar() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.ui.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
  }, [theme]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        dispatch(uiActions.setPaletteOpen(true));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dispatch]);

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between gap-4 border-b border-border/40 bg-background/80 px-6 backdrop-blur-2xl">
      <button
        onClick={() => dispatch(uiActions.setPaletteOpen(true))}
        className="group flex h-12 min-w-0 flex-1 items-center gap-3 rounded-full border border-border/40 bg-surface shadow-sm px-5 text-left text-sm text-muted-foreground transition-all hover:shadow-md hover:border-primary/30 md:max-w-xl"
      >
        <Search className="h-5 w-5 shrink-0" />
        <span className="truncate text-[15px]">Search customers, invoices, tickets, AMC…</span>
        <span className="ml-auto hidden items-center gap-1.5 rounded-md border border-border/50 bg-background/80 px-2 py-0.5 font-mono text-[11px] font-medium text-muted-foreground shadow-sm md:flex">
          <Command className="h-3 w-3" />K
        </span>
      </button>

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="h-10 rounded-full gap-2 px-5 bg-primary text-primary-foreground shadow-md transition-all hover:shadow-lg hover:scale-[1.02]"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline font-medium text-[14px]">New</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Quick Create
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>New Invoice</DropdownMenuItem>
            <DropdownMenuItem>New Service Ticket</DropdownMenuItem>
            <DropdownMenuItem>New AMC Contract</DropdownMenuItem>
            <DropdownMenuItem>New Lead</DropdownMenuItem>
            <DropdownMenuItem>New Customer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="icon" className="relative h-10 w-10 rounded-full bg-surface shadow-sm border-border/40 hover:bg-secondary/80 transition-all hover:shadow-md">
          <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          <span className="absolute right-[2px] top-[2px] grid h-[18px] min-w-[18px] place-items-center rounded-full bg-[#F59E0B] px-1 font-mono text-[10px] font-bold text-white shadow-sm ring-2 ring-surface">
            7
          </span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-surface shadow-sm border-border/40 hover:bg-secondary/80 transition-all hover:shadow-md"
          onClick={() => dispatch(uiActions.toggleTheme())}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          ) : (
            <Moon className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-1 grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#06B6D4] to-[#10B981] font-mono text-sm font-bold text-white shadow-md transition-all hover:scale-105 ring-2 ring-transparent hover:ring-primary/20">
              VT
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>
              <div className="text-sm">Vinod Thomas</div>
              <div className="text-xs text-muted-foreground">Admin · Chennai HQ</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Business Settings</DropdownMenuItem>
            <DropdownMenuItem>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
