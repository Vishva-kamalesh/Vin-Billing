import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { ModuleBadge, StatusPill } from "@/components/ModuleBadge";
import { useFetchProducts } from "@/hooks/useProducts";
import { useFetchInvoices } from "@/hooks/useInvoices";
import { useFetchCustomers, useCreateCustomer } from "@/hooks/useCustomers";
import { formatINR, MODULES } from "@/lib/modules";
import { ScanLine, Trash2, Printer, Send, UserPlus, Tag, User, Camera, Sun, Battery, Droplets, Box, MonitorPlay, Zap, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useMemo, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/billing")({
  head: () => ({ meta: [{ title: "Billing / POS — Vin Technology" }] }),
  component: BillingPage,
});

interface CartLine {
  id: string;
  name: string;
  sku: string;
  module: string;
  rate: number;
  qty: number;
}

const CATEGORIES = [
  { id: "all", label: "All", icon: <Box className="w-5 h-5 mb-2" /> },
  { id: "security", label: "CCTV", icon: <Camera className="w-5 h-5 mb-2" /> },
  { id: "dvr", label: "DVR / NVR", icon: <MonitorPlay className="w-5 h-5 mb-2" /> },
  { id: "solar", label: "Solar", icon: <Sun className="w-5 h-5 mb-2" /> },
  { id: "inverter", label: "Inverter", icon: <Zap className="w-5 h-5 mb-2" /> },
  { id: "power", label: "Battery", icon: <Battery className="w-5 h-5 mb-2" /> },
  { id: "water", label: "Water Purifier", icon: <Droplets className="w-5 h-5 mb-2" /> },
  { id: "accessories", label: "Accessories", icon: <ScanLine className="w-5 h-5 mb-2" /> },
];

function BillingPage() {
  const { data: products = [] } = useFetchProducts();
  const { data: invoices = [], isLoading: loadingInvoices } = useFetchInvoices();
  const { data: customers = [] } = useFetchCustomers();
  const createCustomer = useCreateCustomer();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [customer, setCustomer] = useState<{name: string, phone: string} | null>(null);
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [customerSearch, setCustomerSearch] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerPhone, setNewCustomerPhone] = useState("");
  const [cart, setCart] = useState<CartLine[]>([
    { id: "p1", name: "Hikvision 8CH DVR", sku: "DS-7208HQHI-K1", module: "security", rate: 12500, qty: 1 },
    { id: "p2", name: "CP Plus 2MP Dome Camera", sku: "CP-UNC-TA21PL3", module: "security", rate: 1800, qty: 4 },
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F2") {
        e.preventDefault();
        handleAddCustomer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const results = useMemo(() => {
    if (!query) return [];
    return products
      .filter(
        (p) =>
          p.model.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.barcode.includes(query),
      )
      .slice(0, 6);
  }, [query, products]);

  const popularProducts = useMemo(() => {
    let filtered = products;
    if (activeCategory !== "all") {
      filtered = products.filter(p => p.module === activeCategory || p.name.toLowerCase().includes(activeCategory));
    }
    return filtered.slice(0, 6); // Mock popular products limit
  }, [products, activeCategory]);

  const add = (id: string) => {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    setCart((c) => {
      const existing = c.find((l) => l.id === id);
      if (existing) return c.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l));
      return [...c, { id: p.id, name: `${p.brand} ${p.model}`, sku: p.sku || 'SKU-UNKNOWN', module: p.module, rate: p.price, qty: 1 }];
    });
    setQuery("");
  };

  const subTotal = cart.reduce((s, l) => s + l.rate * l.qty, 0);
  const gst = Math.round(subTotal * 0.18);
  const total = subTotal + gst; // Add discount/roundoff logic if needed later

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

  const getProductIcon = (module: string) => {
    switch (module) {
      case "security": return <Camera className="w-8 h-8 text-security" />;
      case "solar": return <Sun className="w-8 h-8 text-solar" />;
      case "power": return <Battery className="w-8 h-8 text-power" />;
      case "water": return <Droplets className="w-8 h-8 text-water" />;
      default: return <Box className="w-8 h-8 text-muted-foreground" />;
    }
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Point of Sale"
        title="Billing"
        description="Scan, add items and generate invoice quickly."
      />

      <div className="grid grid-cols-12 gap-6 pb-20">
        
        {/* LEFT PANEL: POS Area */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* Search Bar */}
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all relative">
            <ScanLine className="h-6 w-6 text-primary ml-3" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && query.trim()) {
                  e.preventDefault();
                  const exactMatch = products.find(p => p.barcode === query.trim());
                  if (exactMatch) {
                    add(exactMatch.id);
                  } else if (results.length > 0) {
                    add(results[0].id);
                  } else {
                    toast.error("No product found with this barcode or name.");
                  }
                }
              }}
              placeholder="Scan barcode or search product..."
              className="border-0 bg-transparent text-base h-12 focus-visible:ring-0"
              autoFocus
            />
            <div className="pr-4 flex flex-col items-end shrink-0">
              <span className="font-mono text-[10px] text-muted-foreground uppercase">F2 - Customer</span>
              <span className="font-mono text-[10px] text-muted-foreground uppercase">ENTER - Add</span>
            </div>

            {/* Dropdown Results */}
            {results.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 z-50 overflow-hidden rounded-xl border border-border bg-surface shadow-xl">
                {results.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => add(p.id)}
                    className={cn(
                      "flex w-full items-center gap-4 px-4 py-3 text-left hover:bg-secondary/60 border-b border-border/40 last:border-0 transition-colors",
                      (MODULES[p.module as keyof typeof MODULES] || MODULES.neutral).stripClass,
                    )}
                  >
                    <div className="w-10 h-10 rounded-md bg-background flex items-center justify-center shrink-0 border border-border">
                      {getProductIcon(p.module)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="truncate font-semibold">{p.brand} {p.model}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">{p.sku}</div>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">Stk: {p.stock}</span>
                    <span className="font-mono font-bold text-base">{formatINR(p.price)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Categories Grid */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-sm">Categories</h3>
              <Button variant="link" className="h-auto p-0 text-primary text-sm font-semibold">View All</Button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
              {CATEGORIES.map(c => (
                <button 
                  key={c.id} 
                  onClick={() => setActiveCategory(c.id)}
                  className={cn(
                    "flex flex-col items-center justify-center w-[100px] h-[90px] rounded-2xl border transition-all shrink-0 snap-start",
                    activeCategory === c.id 
                      ? "border-primary bg-primary/5 text-primary shadow-sm" 
                      : "border-border bg-surface text-muted-foreground hover:bg-secondary/50 hover:border-primary/30"
                  )}
                >
                  {c.icon}
                  <span className="text-[11px] font-semibold tracking-wide text-center leading-tight px-1">{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Popular Products */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Popular Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {popularProducts.map((p) => (
                <button 
                  key={p.id}
                  onClick={() => add(p.id)}
                  className="bg-surface border border-border rounded-2xl p-4 flex items-center gap-4 hover:shadow-md hover:border-primary/40 transition-all text-left group"
                >
                  <div className="w-16 h-16 rounded-xl bg-secondary flex flex-col items-center justify-center shrink-0 border border-border/50 group-hover:scale-105 transition-transform duration-300">
                     {getProductIcon(p.module)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate leading-tight mb-1">{p.brand} {p.model}</div>
                    <div className="font-mono text-[10px] text-muted-foreground mb-2 truncate">{p.sku || p.barcode || "NO-SKU"}</div>
                    <div className="flex items-center justify-between">
                      <div className="font-mono font-bold text-sm">{formatINR(p.price)}</div>
                      <div className={cn("text-[10px] font-medium font-mono", p.stock > 0 ? "text-success" : "text-danger")}>
                        In Stock: {p.stock}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
              {popularProducts.length === 0 && (
                <div className="col-span-full py-10 text-center border border-dashed border-border rounded-2xl text-muted-foreground">
                  No popular products found in this category.
                </div>
              )}
            </div>
          </div>

          {/* Recent Invoices */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-sm">Recent Invoices</h3>
              <Button variant="link" className="h-auto p-0 text-primary text-sm font-semibold">View All</Button>
            </div>
            <div className="rounded-2xl border border-border bg-surface overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 text-left text-xs font-semibold text-muted-foreground bg-secondary/30">
                    <th className="px-5 py-3 font-medium">Invoice No.</th>
                    <th className="py-3 font-medium">Customer</th>
                    <th className="py-3 font-medium text-right">Amount</th>
                    <th className="py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {loadingInvoices ? (
                    <tr><td colSpan={5} className="py-8 text-center text-sm text-muted-foreground">Loading invoices...</td></tr>
                  ) : invoices.slice(0,4).map((i) => (
                    <tr key={i.id} className={cn("hover:bg-secondary/40", (MODULES[i.module as keyof typeof MODULES] || MODULES.neutral).stripClass)}>
                      <td className="px-5 py-3 font-mono text-xs text-primary">{i.number}</td>
                      <td className="py-3 font-medium">{i.customerName}</td>
                      <td className="py-3 text-right font-mono font-semibold">{formatINR(i.total)}</td>
                      <td className="py-3 font-mono text-xs text-muted-foreground pl-4">{i.date}</td>
                      <td className="px-5 py-3 text-right">
                        <StatusPill tone={i.status === "Paid" ? "success" : i.status === "Partial" ? "warning" : "danger"}>
                          {i.status}
                        </StatusPill>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Cart */}
        <div className="col-span-12 lg:col-span-4">
          <div className="sticky top-[100px] rounded-2xl border border-border bg-surface shadow-sm flex flex-col h-[calc(100vh-140px)]">
            
            <div className="flex items-center justify-between border-b border-border px-5 py-4 shrink-0 bg-background/50 rounded-t-2xl">
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-base">Cart <span className="text-muted-foreground font-normal">({cart.length} Items)</span></h2>
              </div>
              <button onClick={() => setCart([])} className="flex items-center gap-1.5 text-xs text-danger hover:text-danger/80 font-semibold transition-colors">
                <Trash2 className="h-3.5 w-3.5" /> Clear Cart
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto divide-y divide-border/40 p-2">
              {cart.map((l) => (
                <div key={l.id} className="p-3 hover:bg-secondary/20 rounded-xl transition-colors group">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0 pr-4">
                      <div className="font-semibold text-sm leading-tight mb-1">{l.name}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">{l.sku}</div>
                    </div>
                    <button onClick={() => setCart((c) => c.filter((x) => x.id !== l.id))} className="text-muted-foreground hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-sm font-bold">{formatINR(l.rate)}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 bg-secondary rounded-lg p-0.5 border border-border">
                        <button
                          onClick={() => setCart((c) => c.map((x) => x.id === l.id ? { ...x, qty: Math.max(1, x.qty - 1) } : x))}
                          className="grid h-7 w-7 place-items-center rounded-md bg-background border border-border/50 text-sm hover:bg-surface shadow-sm"
                        >−</button>
                        <span className="w-8 text-center font-mono text-sm font-semibold">{l.qty}</span>
                        <button
                          onClick={() => setCart((c) => c.map((x) => x.id === l.id ? { ...x, qty: x.qty + 1 } : x))}
                          className="grid h-7 w-7 place-items-center rounded-md bg-background border border-border/50 text-sm hover:bg-surface shadow-sm"
                        >+</button>
                      </div>
                      <div className="font-mono text-sm font-bold min-w-[70px] text-right">{formatINR(l.rate * l.qty)}</div>
                    </div>
                  </div>
                </div>
              ))}
              
              {cart.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 border border-border">
                    <ScanLine className="w-8 h-8 opacity-50" />
                  </div>
                  <p className="font-semibold text-foreground mb-1">Cart is empty</p>
                  <p className="text-sm">Scan a barcode or click a product to add it.</p>
                </div>
              )}
            </div>

            {/* Discount & Add Customer */}
            <div className="px-5 py-3 border-t border-border bg-background/50 shrink-0 space-y-3">
               <button className="flex items-center gap-2 text-sm text-primary font-semibold hover:underline">
                 <Tag className="w-4 h-4" /> Add Discount
               </button>
            </div>

            {/* Totals */}
            <div className="space-y-2 border-t border-border px-5 py-4 shrink-0 bg-background/80">
              <Row label="Subtotal" value={formatINR(subTotal)} />
              <Row label="GST (18%)" value={formatINR(gst)} />
              <Row label="Round Off" value={formatINR(0)} />
              <div className="pt-2 mt-2 border-t border-border border-dashed flex items-center justify-between">
                <span className="text-base font-bold">Total</span>
                <span className="font-mono text-3xl font-black tracking-tight">{formatINR(total)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="px-5 pb-5 pt-2 shrink-0 bg-background/80 rounded-b-2xl space-y-3">
              <Button variant="outline" onClick={handleAddCustomer} className="w-full justify-between h-12 rounded-xl text-primary font-semibold border-primary/20 hover:bg-primary/5">
                <div className="flex items-center gap-2"><UserPlus className="w-4 h-4"/> {customer ? customer.name : "Add Customer"}</div>
                <span className="text-muted-foreground font-mono text-[10px]">{customer ? (customer.phone || "No Phone") : "[F2]"}</span>
              </Button>
              
              <div className="relative">
                <Label className="text-xs text-muted-foreground absolute -top-2 left-3 bg-surface px-1">Notes (Optional)</Label>
                <textarea 
                  placeholder="Add note here..." 
                  className="w-full h-20 rounded-xl border border-border bg-surface p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button onClick={handlePrint} variant="outline" className="gap-2 h-12 rounded-xl font-bold shadow-sm text-foreground">
                  <Printer className="h-4 w-4 text-primary" /> Print / Save
                </Button>
                <Button onClick={handleWhatsApp} className="gap-2 h-12 rounded-xl font-bold shadow-md bg-[#25D366] hover:bg-[#20bd5a] text-white">
                  <Send className="h-4 w-4" /> WhatsApp / Share
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Dialog open={isCustomerDialogOpen} onOpenChange={setIsCustomerDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Attach Customer</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                placeholder="Search Customer..."
                className="pl-9 bg-secondary/30 h-10 rounded-xl"
                autoFocus
              />
            </div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
              {!isCreatingNew ? (
                <>
                  {customers
                    .filter(c => c.name.toLowerCase().includes(customerSearch.toLowerCase()) || (c.phone && c.phone.includes(customerSearch)))
                    .map(c => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setCustomer({ name: c.name, phone: c.phone || "" });
                          setIsCustomerDialogOpen(false);
                          setCustomerSearch("");
                        }}
                        className="w-full flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-border hover:bg-secondary/40 transition-colors text-left group"
                      >
                        <div>
                          <div className="font-semibold text-sm">{c.name}</div>
                          <div className="text-xs text-muted-foreground font-mono mt-0.5">{c.phone || "No phone"}</div>
                        </div>
                        <div className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">Select</div>
                      </button>
                    ))
                  }
                  {customers.filter(c => c.name.toLowerCase().includes(customerSearch.toLowerCase()) || (c.phone && c.phone.includes(customerSearch))).length === 0 && (
                    <div className="text-center py-6 text-sm text-muted-foreground">
                      No customers found.
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-3 p-1">
                  <div>
                    <label className="text-xs font-medium mb-1 block">Full Name *</label>
                    <Input value={newCustomerName} onChange={e => setNewCustomerName(e.target.value)} placeholder="e.g. Ramesh Kumar" className="h-10 rounded-xl" autoFocus />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block">Phone Number (Optional)</label>
                    <Input value={newCustomerPhone} onChange={e => setNewCustomerPhone(e.target.value)} placeholder="e.g. 9876543210" className="h-10 rounded-xl font-mono" />
                  </div>
                  <div className="pt-2 flex gap-2">
                    <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setIsCreatingNew(false)}>Cancel</Button>
                    <Button className="flex-1 rounded-xl" disabled={createCustomer.isPending} onClick={() => {
                      if (!newCustomerName) return toast.error("Name is required");
                      if (!newCustomerPhone) return toast.error("Phone number is required to save customer");
                      
                      createCustomer.mutate(
                        { name: newCustomerName, phone: newCustomerPhone, type: "INDIVIDUAL" as any, city: "", address: "" },
                        {
                          onSuccess: () => {
                            toast.success("Customer saved to CRM!");
                            setCustomer({ name: newCustomerName, phone: newCustomerPhone });
                            setIsCreatingNew(false);
                            setIsCustomerDialogOpen(false);
                            setNewCustomerName("");
                            setNewCustomerPhone("");
                          },
                          onError: () => toast.error("Failed to save customer")
                        }
                      );
                    }}>{createCustomer.isPending ? "Saving..." : "Save & Attach"}</Button>
                  </div>
                </div>
              )}
            </div>
            {!isCreatingNew && (
              <div className="mt-4 pt-4 border-t border-border">
                <Button className="w-full gap-2 rounded-xl" variant="secondary" onClick={() => setIsCreatingNew(true)}>
                  <UserPlus className="w-4 h-4" /> New Customer
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={className}>{children}</span>;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground font-medium">{label}</span>
      <span className="font-mono font-semibold">{value}</span>
    </div>
  );
}
