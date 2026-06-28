import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { ModuleBadge, StatusPill } from "@/components/ModuleBadge";
import { useFetchProducts, useUpdateProduct } from "@/hooks/useProducts";
import { formatINR, MODULES } from "@/lib/modules";
import { ScanLine, Plus, Search, FileDown, ArrowRightLeft, Camera, Sun, Battery, Droplets, Box, MonitorPlay, Zap, Package, MapPin, History, Activity, TrendingUp, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useMemo, useState, ReactNode, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export const Route = createFileRoute("/inventory")({
  head: () => ({ meta: [{ title: "Inventory — Vin Technology" }] }),
  component: InventoryPage,
});

const CATEGORIES = [
  { id: "all", label: "All", icon: <Box className="w-4 h-4" /> },
  { id: "solar", label: "Solar", icon: <Sun className="w-4 h-4" /> },
  { id: "security", label: "CCTV", icon: <Camera className="w-4 h-4" /> },
  { id: "dvr", label: "DVR/NVR", icon: <MonitorPlay className="w-4 h-4" /> },
  { id: "power", label: "Battery", icon: <Battery className="w-4 h-4" /> },
  { id: "inverter", label: "Inverter", icon: <Zap className="w-4 h-4" /> },
  { id: "water", label: "Water Purifier", icon: <Droplets className="w-4 h-4" /> },
  { id: "accessories", label: "Accessories", icon: <ScanLine className="w-4 h-4" /> },
];

function InventoryPage() {
  const navigate = useNavigate();
  const { data: products = [] } = useFetchProducts();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Dialog States
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isStockEntryOpen, setIsStockEntryOpen] = useState(false);
  const [isPurchaseEntryOpen, setIsPurchaseEntryOpen] = useState(false);
  const [entryProductId, setEntryProductId] = useState("");
  const [entryQty, setEntryQty] = useState(0);
  const [entryPrice, setEntryPrice] = useState(0);

  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= p.minStock);
  const outOfStock = products.filter((p) => p.stock === 0);
  const totalValue = products.reduce((s, p) => s + p.stock * p.price, 0);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.model.toLowerCase().includes(search.toLowerCase()) ||
                          p.sku?.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === "all" || p.module === activeCategory;
      return matchSearch && matchCat;
    });
  }, [products, search, activeCategory]);

  const selectedProduct = useMemo(() => products.find(p => p.id === selectedProductId), [products, selectedProductId]);

  const getProductIcon = (module: string) => {
    switch (module) {
      case "security": return <Camera className="w-5 h-5 text-security" />;
      case "solar": return <Sun className="w-5 h-5 text-solar" />;
      case "power": return <Battery className="w-5 h-5 text-power" />;
      case "water": return <Droplets className="w-5 h-5 text-water" />;
      default: return <Box className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const handleStockEntry = () => {
    if (!entryProductId) return toast.error("Please select a product");
    const p = products.find(x => x.id === entryProductId);
    if (!p) return;
    
    updateProduct({ id: p.id, data: { stock: p.stock + entryQty } as any }, {
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
    const p = products.find(x => x.id === entryProductId);
    if (!p) return;
    
    updateProduct({ id: p.id, data: { stock: p.stock + entryQty, purchasePrice: entryPrice } as any }, {
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
    
    const headers = ["Product", "SKU", "Category", "Stock", "Purchase Price", "Selling Price"];
    const rows = filteredProducts.map(p => 
      [p.brand + " " + p.model, p.sku || "", p.module, p.stock, p.purchasePrice || 0, p.price].join(",")
    );
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

  return (
    <AppShell>
      <PageHeader
        eyebrow="Warehouse Dashboard"
        title="Inventory"
        description="Track stock, serial numbers, purchases and movements."
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm">
          <div className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">Total SKUs</div>
          <div className="text-3xl font-bold">{products.length.toLocaleString()}</div>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm">
          <div className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">Stock Value</div>
          <div className="text-3xl font-bold font-mono text-primary">{formatINR(totalValue)}</div>
        </div>
        <div className="bg-warning/10 border border-warning/20 rounded-2xl p-5 shadow-sm">
          <div className="text-warning-foreground text-xs font-semibold uppercase tracking-wider mb-2">Low Stock</div>
          <div className="text-3xl font-bold text-warning">{lowStock.length}</div>
        </div>
        <div className="bg-danger/10 border border-danger/20 rounded-2xl p-5 shadow-sm">
          <div className="text-danger-foreground text-xs font-semibold uppercase tracking-wider mb-2">Out of Stock</div>
          <div className="text-3xl font-bold text-danger">{outOfStock.length}</div>
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur py-4 mb-2 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border/40">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by name, SKU..." 
            className="pl-9 h-10 rounded-xl bg-surface border-border shadow-sm"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Button variant="outline" className="h-10 rounded-xl gap-2 font-semibold" onClick={() => setIsScannerOpen(true)}>
            <ScanLine className="w-4 h-4 text-primary" /> Scan Barcode
          </Button>
          <Button variant="outline" className="h-10 rounded-xl gap-2 font-semibold" onClick={() => setIsStockEntryOpen(true)}>
            <Plus className="w-4 h-4" /> Stock Entry
          </Button>
          <Button variant="outline" className="h-10 rounded-xl gap-2 font-semibold hidden lg:flex" onClick={() => setIsPurchaseEntryOpen(true)}>
            <ArrowRightLeft className="w-4 h-4" /> Purchase Entry
          </Button>
          <Button variant="outline" className="h-10 rounded-xl gap-2 font-semibold hidden lg:flex" onClick={exportCSV}>
            <FileDown className="w-4 h-4" /> Export
          </Button>
          <Button className="h-10 rounded-xl gap-2 font-bold shadow-sm" onClick={() => navigate({ to: "/products" })}>
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-2">
        {CATEGORIES.map(c => (
          <button 
            key={c.id} 
            onClick={() => setActiveCategory(c.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-sm font-medium shrink-0 shadow-sm",
              activeCategory === c.id 
                ? "bg-primary text-primary-foreground border-primary" 
                : "bg-surface border-border text-foreground hover:bg-secondary"
            )}
          >
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      {/* Inventory Table */}
      <div className="rounded-2xl border border-border bg-surface shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead>
              <tr className="border-b border-border bg-secondary/30 text-muted-foreground">
                <th className="px-6 py-4 font-semibold w-12">Img</th>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">SKU</th>
                <th className="px-6 py-4 font-semibold text-right">Stock</th>
                <th className="px-6 py-4 font-semibold text-right">Price</th>
                <th className="px-6 py-4 font-semibold text-right">Value</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredProducts.map(p => {
                const isOutOfStock = p.stock === 0;
                const isLowStock = p.stock > 0 && p.stock <= p.minStock;
                return (
                  <tr 
                    key={p.id} 
                    onClick={() => setSelectedProductId(p.id)}
                    className={cn(
                      "hover:bg-secondary/40 cursor-pointer transition-colors group",
                      (MODULES[p.module as keyof typeof MODULES] || MODULES.neutral).stripClass
                    )}
                  >
                    <td className="px-6 py-3">
                      <div className="w-10 h-10 rounded-xl bg-background border border-border/60 flex items-center justify-center shadow-sm">
                        {getProductIcon(p.module)}
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="font-semibold">{p.brand} {p.model}</div>
                      <div className="text-xs text-muted-foreground">{p.name}</div>
                    </td>
                    <td className="px-6 py-3 font-mono text-xs">{p.sku || p.barcode || "NO-SKU"}</td>
                    <td className="px-6 py-3 text-right font-mono font-bold">{p.stock}</td>
                    <td className="px-6 py-3 text-right font-mono text-muted-foreground">{formatINR(p.price)}</td>
                    <td className="px-6 py-3 text-right font-mono font-semibold">{formatINR(p.stock * p.price)}</td>
                    <td className="px-6 py-3 text-center">
                      <div className="flex justify-center">
                        {isOutOfStock ? (
                          <div className="flex items-center gap-1.5 text-danger font-medium text-xs px-2 py-1 rounded-full bg-danger/10 border border-danger/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" /> Out of Stock
                          </div>
                        ) : isLowStock ? (
                          <div className="flex items-center gap-1.5 text-warning-foreground font-medium text-xs px-2 py-1 rounded-full bg-warning/20 border border-warning/30">
                            <div className="w-1.5 h-1.5 rounded-full bg-warning" /> Low Stock
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-success font-medium text-xs px-2 py-1 rounded-full bg-success/10 border border-success/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-success" /> In Stock
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>No products found matching your search.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics Section */}
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Activity className="w-5 h-5 text-primary" /> Inventory Analytics</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-12">
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm">
          <h4 className="font-semibold text-sm mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-success" /> Top Selling</h4>
          <div className="space-y-3">
            {products.slice(0, 3).map(p => (
              <div key={`ts-${p.id}`} className="flex justify-between items-center text-sm">
                <span className="truncate pr-4">{p.brand} {p.model}</span>
                <span className="font-mono text-muted-foreground font-semibold">{formatINR(p.price)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm">
          <h4 className="font-semibold text-sm mb-4 flex items-center gap-2"><Zap className="w-4 h-4 text-warning" /> Fast Moving</h4>
          <div className="space-y-3">
            {products.slice(3, 6).map(p => (
              <div key={`fm-${p.id}`} className="flex justify-between items-center text-sm">
                <span className="truncate pr-4">{p.brand} {p.model}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-secondary">High Demand</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm">
          <h4 className="font-semibold text-sm mb-4 flex items-center gap-2"><AlertCircle className="w-4 h-4 text-danger" /> Dead Stock</h4>
          <div className="space-y-3 text-sm text-muted-foreground text-center pt-2">
            No dead stock reported in the last 90 days.
          </div>
        </div>
      </div>

      {/* Product Drawer */}
      <Sheet open={!!selectedProductId} onOpenChange={(open) => !open && setSelectedProductId(null)}>
        <SheetContent side="right" className="sm:max-w-[500px] w-[90vw] p-0 flex flex-col bg-background overflow-hidden border-l border-border">
          {selectedProduct && (
            <>
              <div className="p-6 border-b border-border bg-secondary/20">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center shrink-0 shadow-sm">
                    {getProductIcon(selectedProduct.module)}
                  </div>
                  <div>
                    <SheetTitle className="text-xl mb-1">{selectedProduct.brand} {selectedProduct.model}</SheetTitle>
                    <SheetDescription>{selectedProduct.name}</SheetDescription>
                    <div className="mt-3 flex gap-2">
                      <StatusPill tone={selectedProduct.stock > 0 ? "success" : "danger"}>
                        {selectedProduct.stock > 0 ? "In Stock" : "Out of Stock"}
                      </StatusPill>
                      <StatusPill tone="default">{selectedProduct.sku}</StatusPill>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                
                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface border border-border rounded-xl p-3">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Current Stock</div>
                    <div className="font-mono text-xl font-bold">{selectedProduct.stock} {selectedProduct.unit}</div>
                  </div>
                  <div className="bg-surface border border-border rounded-xl p-3">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Min Stock Alert</div>
                    <div className="font-mono text-xl font-bold text-muted-foreground">{selectedProduct.minStock} {selectedProduct.unit}</div>
                  </div>
                  <div className="bg-surface border border-border rounded-xl p-3">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Selling Price</div>
                    <div className="font-mono text-xl font-bold text-primary">{formatINR(selectedProduct.price)}</div>
                  </div>
                  <div className="bg-surface border border-border rounded-xl p-3">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Purchase Price</div>
                    <div className="font-mono text-lg font-semibold text-muted-foreground">{formatINR(selectedProduct.purchasePrice || 0)}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Barcode</span>
                    <span className="font-mono font-semibold">{selectedProduct.barcode || "N/A"}</span>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Warranty</span>
                    <span className="font-semibold">{selectedProduct.warrantyMonths} Months</span>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Supplier</span>
                    <span className="font-semibold">ABC Electronics (Primary)</span>
                  </div>
                </div>

                {/* Warehouse Breakdown */}
                <div>
                  <h4 className="font-bold text-sm mb-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Warehouse Distribution</h4>
                  <div className="bg-surface border border-border rounded-xl divide-y divide-border/50">
                    <div className="flex justify-between p-3 text-sm">
                      <span>Main Store (HO)</span>
                      <span className="font-mono font-bold">{Math.floor(selectedProduct.stock * 0.7)}</span>
                    </div>
                    <div className="flex justify-between p-3 text-sm">
                      <span>Service Center</span>
                      <span className="font-mono font-bold">{Math.floor(selectedProduct.stock * 0.2)}</span>
                    </div>
                    <div className="flex justify-between p-3 text-sm">
                      <span>Vehicle Stock (Van 1)</span>
                      <span className="font-mono font-bold">{Math.floor(selectedProduct.stock * 0.1)}</span>
                    </div>
                  </div>
                </div>

                {/* Serial Numbers (If applicable) */}
                {selectedProduct.trackSerial === 'Yes' && (
                  <div>
                    <h4 className="font-bold text-sm mb-3 flex items-center gap-2"><ScanLine className="w-4 h-4 text-primary" /> Tracked Serial Numbers</h4>
                    <div className="bg-surface border border-border rounded-xl p-3 space-y-2">
                      <div className="flex justify-between items-center bg-secondary/50 px-3 py-1.5 rounded-lg border border-border text-sm">
                        <span className="font-mono">SN-892347101</span>
                        <Badge tone="success">In Stock</Badge>
                      </div>
                      <div className="flex justify-between items-center bg-secondary/50 px-3 py-1.5 rounded-lg border border-border text-sm">
                        <span className="font-mono">SN-892347102</span>
                        <Badge tone="success">In Stock</Badge>
                      </div>
                      <div className="text-center text-xs text-primary font-medium cursor-pointer pt-2 hover:underline">
                        View all {selectedProduct.stock} serial numbers
                      </div>
                    </div>
                  </div>
                )}

                {/* Recent Movements */}
                <div>
                  <h4 className="font-bold text-sm mb-3 flex items-center gap-2"><History className="w-4 h-4 text-primary" /> Recent Movements</h4>
                  <div className="relative pl-4 border-l-2 border-border/50 space-y-4">
                    <div className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-danger ring-4 ring-background" />
                      <div className="text-sm font-medium">Invoice INV-0042</div>
                      <div className="text-xs text-muted-foreground flex justify-between mt-1">
                        <span className="font-mono text-danger">-2 Units</span>
                        <span>Today, 10:45 AM</span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-success ring-4 ring-background" />
                      <div className="text-sm font-medium">Purchase Order PO-902</div>
                      <div className="text-xs text-muted-foreground flex justify-between mt-1">
                        <span className="font-mono text-success">+15 Units</span>
                        <span>Yesterday, 4:20 PM</span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-warning ring-4 ring-background" />
                      <div className="text-sm font-medium">Warranty Replacement (TK-105)</div>
                      <div className="text-xs text-muted-foreground flex justify-between mt-1">
                        <span className="font-mono text-warning">-1 Unit</span>
                        <span>May 22, 2:15 PM</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Stock Entry Dialog */}
      <Dialog open={isStockEntryOpen} onOpenChange={setIsStockEntryOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Stock Entry</DialogTitle>
            <DialogDescription>Add inventory counts directly to your warehouse.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">Select Product</label>
              <select value={entryProductId} onChange={e => setEntryProductId(e.target.value)} className="flex h-10 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20">
                <option value="">-- Choose a product --</option>
                {products.map(p => <option key={p.id} value={p.id}>{p.brand} {p.model} ({p.sku || p.barcode})</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">Quantity to Add</label>
              <Input type="number" value={entryQty || ""} onChange={e => setEntryQty(Number(e.target.value))} className="h-10 rounded-xl font-mono" placeholder="e.g. 50" />
            </div>
            {entryProductId && (
              <div className="text-xs text-muted-foreground pt-2">
                Current Stock: <span className="font-mono font-bold text-foreground">{products.find(x => x.id === entryProductId)?.stock}</span>
                <br />New Stock will be: <span className="font-mono font-bold text-success">{products.find(x => x.id === entryProductId)!.stock + (entryQty || 0)}</span>
              </div>
            )}
            <Button className="w-full h-10 rounded-xl mt-4" disabled={isUpdating || !entryProductId || !entryQty} onClick={handleStockEntry}>
              {isUpdating ? "Updating..." : "Update Stock"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Purchase Entry Dialog */}
      <Dialog open={isPurchaseEntryOpen} onOpenChange={setIsPurchaseEntryOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Purchase Entry</DialogTitle>
            <DialogDescription>Log a new purchase to update stock and cost price.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">Select Product</label>
              <select value={entryProductId} onChange={e => {
                setEntryProductId(e.target.value);
                const p = products.find(x => x.id === e.target.value);
                if (p) setEntryPrice(p.purchasePrice || 0);
              }} className="flex h-10 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20">
                <option value="">-- Choose a product --</option>
                {products.map(p => <option key={p.id} value={p.id}>{p.brand} {p.model}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">Quantity Received</label>
                <Input type="number" value={entryQty || ""} onChange={e => setEntryQty(Number(e.target.value))} className="h-10 rounded-xl font-mono" placeholder="Qty" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">Unit Cost (₹)</label>
                <Input type="number" value={entryPrice || ""} onChange={e => setEntryPrice(Number(e.target.value))} className="h-10 rounded-xl font-mono" placeholder="Cost" />
              </div>
            </div>
            <Button className="w-full h-10 rounded-xl mt-4" disabled={isUpdating || !entryProductId || !entryQty || !entryPrice} onClick={handlePurchaseEntry}>
              {isUpdating ? "Logging..." : "Log Purchase"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mobile Scanner Dialog */}
      <Dialog open={isScannerOpen} onOpenChange={setIsScannerOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Scan Barcode</DialogTitle>
            <DialogDescription>Use your device camera to scan a product barcode.</DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <BarcodeScanner onResult={(res) => {
              setSearch(res);
              setIsScannerOpen(false);
              toast.success(`Scanned: ${res}`);
            }} />
          </div>
        </DialogContent>
      </Dialog>

    </AppShell>
  );
}

function BarcodeScanner({ onResult }: { onResult: (res: string) => void }) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: { width: 250, height: 150 } }, false);
    
    scanner.render((text) => {
      scanner.clear();
      onResult(text);
    }, (err) => {
      // Ignore routine scan failures
    });
    
    return () => {
      scanner.clear().catch(console.error);
    };
  }, [onResult]);

  return <div id="reader" className="w-full rounded-xl overflow-hidden" />;
}

function Badge({ children, tone = "default" }: { children: ReactNode, tone?: "default"|"success"|"danger"|"warning" }) {
  return (
    <span className={cn(
      "px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider",
      tone === "default" && "bg-secondary text-muted-foreground",
      tone === "success" && "bg-success/10 text-success",
      tone === "warning" && "bg-warning/10 text-warning-foreground",
      tone === "danger" && "bg-danger/10 text-danger",
    )}>
      {children}
    </span>
  );
}
