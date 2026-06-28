import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { ModuleBadge, StatusPill } from "@/components/ModuleBadge";
import { useFetchProducts, useCreateProduct, useFetchMetadata, useDeleteCategory, useDeleteBrand, useUpdateProduct } from "@/hooks/useProducts";
import { formatINR, MODULES, type ModuleKey } from "@/lib/modules";
import { Barcode, Plus, Grid3x3, Rows3, Trash2, Camera, Sun, Battery, Droplets, Box, Wand2, ArrowRight, ArrowLeft, CheckCircle2, ScanBarcode, Image as ImageIcon, Settings, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/products")({
  head: () => ({ meta: [{ title: "Products — Vin Technology" }] }),
  component: ProductsPage,
});

const FILTERS: { key: ModuleKey | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "security", label: "CCTV" },
  { key: "water", label: "RO" },
  { key: "power", label: "Battery / Inverter" },
  { key: "solar", label: "Solar" },
  { key: "other", label: "Other" }
];

const BRANDS_BY_MODULE: Record<string, string[]> = {
  security: ["Hikvision", "Dahua", "CP Plus", "Ezviz", "Other"],
  power: ["Exide", "Luminous", "Microtek", "Amaron", "Other"],
  solar: ["Adani", "Waaree", "Luminous", "Vikram", "Other"],
  water: ["Kent", "Livpure", "Aquaguard", "Havells", "Other"],
  other: ["Other"]
};

const SPEC_TEMPLATES: Record<string, string[]> = {
  security: ["Resolution", "Lens", "Night Vision", "IP Rating", "Storage Capacity"],
  power: ["Capacity", "Voltage", "Battery Type", "Backup Time"],
  solar: ["System Capacity", "Efficiency", "Cell Type", "Panel Output"],
  water: ["Filtration Stages", "RO Capacity", "Mount Type", "Tank Capacity"]
};

function ProductsPage() {
  const { data: products = [], isLoading } = useFetchProducts();
  const { data: metadata = [] } = useFetchMetadata();
  const { mutate: deleteCategory } = useDeleteCategory();
  const { mutate: deleteBrand } = useDeleteBrand();
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const [filter, setFilter] = useState<ModuleKey | "all">("all");
  const [view, setView] = useState<"grid" | "table">("grid");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [newProduct, setNewProduct] = useState({ 
    module: "" as string,
    customModule: "",
    brand: "", name: "", model: "", sku: "", barcode: "",
    customBrand: "",
    purchasePrice: 0, price: 0, stock: 0, minStock: 10, unit: "Piece",
    warrantyType: "Manufacturer Warranty", warrantyMonths: 12, amcEligible: "Yes",
    trackSerial: "Yes",
    metadata: {} as Record<string, string> 
  });
  
  const handleModuleChange = (newModule: string) => {
    const templates = SPEC_TEMPLATES[newModule] || [];
    const newMetadata: Record<string, string> = {};
    templates.forEach(t => newMetadata[t] = "");
    setNewProduct(prev => ({ ...prev, module: newModule, brand: "", metadata: newMetadata }));
  };

  const handleGenerateSKU = () => {
    const pfx1 = newProduct.module === 'other' ? (newProduct.customModule.substring(0,3) || 'CUS') : newProduct.module.substring(0,3);
    const pfx2 = newProduct.brand === 'Other' ? (newProduct.customBrand.substring(0,3) || 'BRN') : newProduct.brand.substring(0,3);
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setNewProduct(prev => ({ ...prev, sku: `${pfx1.toUpperCase()}-${pfx2.toUpperCase()}-${randomNum}` }));
  };

  const handleMetaChange = (key: string, value: string) => {
    setNewProduct(prev => ({ ...prev, metadata: { ...prev.metadata, [key]: value } }));
  };

  const resetForm = () => {
    setCurrentStep(1);
    setEditingProductId(null);
    setNewProduct({ 
      module: "", customModule: "", brand: "", customBrand: "", name: "", model: "", sku: "", barcode: "",
      purchasePrice: 0, price: 0, stock: 0, minStock: 10, unit: "Piece",
      warrantyType: "Manufacturer Warranty", warrantyMonths: 12, amcEligible: "Yes",
      trackSerial: "Yes", metadata: {} 
    } as any);
  };

  const handleEditProduct = (p: any, step = 1) => {
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

  const handleCreate = (e?: React.FormEvent, keepOpen = false) => {
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

    if (editingProductId) {
      updateProduct({ id: editingProductId, data: payload as any }, {
        onSuccess: () => {
          if (!keepOpen) setIsDialogOpen(false);
          resetForm();
        }
      });
    } else {
      createProduct(payload as any, {
        onSuccess: () => {
          if (!keepOpen) setIsDialogOpen(false);
          resetForm();
        }
      });
    }
  };

  // Helper for dynamic illustrations
  const getProductIcon = () => {
    switch (newProduct.module) {
      case "security": return <Camera className="w-24 h-24 text-security" />;
      case "solar": return <Sun className="w-24 h-24 text-solar" />;
      case "power": return <Battery className="w-24 h-24 text-power" />;
      case "water": return <Droplets className="w-24 h-24 text-water" />;
      default: return <Box className="w-24 h-24 text-muted-foreground" />;
    }
  };

  const list = filter === "all" ? products : products.filter((p) => p.module === filter);
  
  const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= p.minStock).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Catalog"
        title="Products"
        description="Master catalog across all service lines."
        actions={
          <div className="flex gap-2">
            <div className="flex rounded-md border border-border p-0.5">
              <button
                onClick={() => setView("grid")}
                className={cn("rounded p-1.5", view === "grid" ? "bg-secondary" : "text-muted-foreground")}
              >
                <Grid3x3 className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setView("table")}
                className={cn("rounded p-1.5", view === "table" ? "bg-secondary" : "text-muted-foreground")}
              >
                <Rows3 className="h-3.5 w-3.5" />
              </button>
            </div>
            <Sheet open={isDialogOpen} onOpenChange={(open) => {
              if (!open) resetForm();
              setIsDialogOpen(open);
            }}>
              <SheetTrigger asChild>
                <Button className="gap-1.5 rounded-full px-6 shadow-sm hover:shadow-md transition-all" onClick={() => resetForm()}>
                  <Plus className="h-4 w-4" /> Add Product
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="sm:max-w-[850px] w-[90vw] p-0 overflow-hidden flex bg-background shadow-2xl">
                {/* LEFT SIDE: Form Wizard */}
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                  <SheetHeader className="p-6 pb-2 border-b border-border/40 shrink-0 text-left">
                    <SheetTitle className="text-xl">{editingProductId ? "Edit Product" : "Smart Product Configuration"}</SheetTitle>
                    <SheetDescription>
                      {editingProductId ? "Update product details and inventory thresholds." : "Add a new product to the master catalog."}
                    </SheetDescription>
                  </SheetHeader>
                  
                  {/* Progress Bar */}
                  <div className="px-6 py-4 shrink-0 bg-secondary/20">
                    <div className="flex items-center gap-2 mb-2">
                      {[1, 2, 3, 4].map(step => (
                        <div key={step} className={cn("h-1.5 flex-1 rounded-full transition-all", currentStep >= step ? "bg-primary" : "bg-primary/20")} />
                      ))}
                    </div>
                    <div className="flex justify-between text-xs font-medium text-muted-foreground">
                      <span className={currentStep === 1 ? "text-primary font-bold" : ""}>1. Basic Info</span>
                      <span className={currentStep === 2 ? "text-primary font-bold" : ""}>2. Inventory</span>
                      <span className={currentStep === 3 ? "text-primary font-bold" : ""}>3. Warranty</span>
                      <span className={currentStep === 4 ? "text-primary font-bold" : ""}>4. Specifications</span>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6">
                    {currentStep === 1 && !newProduct.module && (
                      <div className="animate-in fade-in slide-in-from-right-4 duration-300 h-full flex flex-col justify-center pb-10">
                        <div className="text-center mb-8">
                          <h2 className="text-2xl font-bold mb-2">Select Product Category</h2>
                          <p className="text-muted-foreground">Choose a category to load the correct specifications template.</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {[
                            { id: "security", label: "CCTV & Security", icon: Camera, color: "text-blue-500", bg: "hover:bg-blue-500/10 hover:border-blue-500/50" },
                            { id: "solar", label: "Solar Energy", icon: Sun, color: "text-orange-500", bg: "hover:bg-orange-500/10 hover:border-orange-500/50" },
                            { id: "power", label: "Battery & Inverter", icon: Battery, color: "text-green-500", bg: "hover:bg-green-500/10 hover:border-green-500/50" },
                            { id: "water", label: "RO Purifier", icon: Droplets, color: "text-cyan-500", bg: "hover:bg-cyan-500/10 hover:border-cyan-500/50" },
                            { id: "other", label: "Other Category", icon: Box, color: "text-muted-foreground", bg: "hover:bg-secondary hover:border-border" }
                          ].map(cat => (
                            <div 
                              key={cat.id}
                              onClick={() => handleModuleChange(cat.id)}
                              className={cn("bg-surface border border-border transition-all duration-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1", cat.bg)}
                            >
                              <cat.icon className={cn("w-10 h-10 mb-4 transition-colors", cat.color)} />
                              <h3 className="font-semibold text-foreground">{cat.label}</h3>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {currentStep === 1 && newProduct.module && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="grid grid-cols-2 gap-5">
                          <div className="space-y-2 col-span-2 md:col-span-1">
                            <Label htmlFor="module" className="text-muted-foreground">Product Category <span className="text-danger">*</span></Label>
                            <div className="flex gap-2">
                              <select id="module" value={newProduct.module} onChange={e => handleModuleChange(e.target.value)} className="flex h-12 w-full rounded-xl border-transparent bg-secondary/30 px-4 py-2 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-secondary/50">
                                <option value="security">CCTV & Security</option>
                                <option value="water">Water Purifier (RO)</option>
                                <option value="power">Battery & Inverter</option>
                                <option value="solar">Solar Energy</option>
                                {metadata.filter((m: any) => m.is_custom).map((m: any) => (
                                  <option key={m.slug} value={m.slug}>{m.name}</option>
                                ))}
                                <option value="other">Other...</option>
                              </select>
                              {metadata.find((m: any) => m.is_custom && m.slug === newProduct.module) && (
                                <Button type="button" variant="ghost" size="icon" onClick={() => deleteCategory(metadata.find((m: any) => m.slug === newProduct.module).id)} className="h-12 w-12 text-destructive shrink-0">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            {newProduct.module === "other" && (
                              <Input placeholder="Enter custom category" value={newProduct.customModule} onChange={e => setNewProduct(prev => ({...prev, customModule: e.target.value}))} className="mt-2 h-12 rounded-xl" required />
                            )}
                          </div>
                          <div className="space-y-2 col-span-2 md:col-span-1">
                            <Label htmlFor="brand" className="text-muted-foreground">Brand <span className="text-danger">*</span></Label>
                            <div className="flex gap-2">
                              <select id="brand" value={newProduct.brand} onChange={e => setNewProduct(prev => ({...prev, brand: e.target.value}))} className="flex h-12 w-full rounded-xl border-transparent bg-secondary/30 px-4 py-2 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-secondary/50">
                                <option value="">Select Brand...</option>
                                {(BRANDS_BY_MODULE[newProduct.module] || BRANDS_BY_MODULE.other).filter(b => b !== 'Other').map(b => (
                                  <option key={b} value={b}>{b}</option>
                                ))}
                                {metadata.find((m: any) => m.slug === newProduct.module)?.brands.filter((b: any) => b.is_custom).map((b: any) => (
                                  <option key={b.name} value={b.name}>{b.name}</option>
                                ))}
                                <option value="Other">Other</option>
                              </select>
                              {metadata.find((m: any) => m.slug === newProduct.module)?.brands.find((b: any) => b.is_custom && b.name === newProduct.brand) && (
                                <Button type="button" variant="ghost" size="icon" onClick={() => deleteBrand(metadata.find((m: any) => m.slug === newProduct.module)?.brands.find((b: any) => b.name === newProduct.brand).id)} className="h-12 w-12 text-destructive shrink-0">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            {newProduct.brand === "Other" && (
                              <Input placeholder="Enter custom brand" value={newProduct.customBrand} onChange={e => setNewProduct(prev => ({...prev, customBrand: e.target.value}))} className="mt-2 h-12 rounded-xl" required />
                            )}
                          </div>
                          <div className="space-y-2 col-span-2 md:col-span-1">
                            <Label htmlFor="name" className="text-muted-foreground">Product Name <span className="text-danger">*</span></Label>
                            <Input id="name" placeholder="e.g. 5MP Color Camera" value={newProduct.name} onChange={e => setNewProduct(prev => ({...prev, name: e.target.value}))} className="h-12 rounded-xl" required />
                          </div>
                          <div className="space-y-2 col-span-2 md:col-span-1">
                            <Label htmlFor="model" className="text-muted-foreground">Model Number <span className="text-danger">*</span></Label>
                            <Input id="model" placeholder="e.g. DS-2CE..." value={newProduct.model} onChange={e => setNewProduct(prev => ({...prev, model: e.target.value}))} className="h-12 rounded-xl" required />
                          </div>
                          <div className="space-y-2 col-span-2 md:col-span-1">
                            <Label htmlFor="sku" className="text-muted-foreground">SKU / Product Code <span className="text-danger">*</span></Label>
                            <div className="flex gap-2">
                              <Input id="sku" placeholder="e.g. CCTV-HIK-001" value={newProduct.sku} onChange={e => setNewProduct(prev => ({...prev, sku: e.target.value}))} className="h-12 rounded-xl" required />
                              <Button type="button" variant="outline" className="h-12 px-4 rounded-xl shrink-0" onClick={handleGenerateSKU} title="Auto Generate SKU">
                                <Wand2 className="w-4 h-4 text-primary" />
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-2 col-span-2 md:col-span-1">
                            <Label htmlFor="barcode" className="text-muted-foreground">Barcode (Optional)</Label>
                            <div className="flex gap-2">
                              <Input id="barcode" placeholder="Scan or enter barcode" value={newProduct.barcode} onChange={e => setNewProduct(prev => ({...prev, barcode: e.target.value}))} className="h-12 rounded-xl" />
                              <Button type="button" variant="secondary" className="h-12 px-4 rounded-xl shrink-0" title="Scan Barcode">
                                <ScanBarcode className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="grid grid-cols-2 gap-5">
                          <div className="space-y-2 col-span-2 md:col-span-1">
                            <Label htmlFor="purchasePrice" className="text-muted-foreground">Purchase Price (₹)</Label>
                            <Input id="purchasePrice" type="number" value={newProduct.purchasePrice} onChange={e => setNewProduct(prev => ({...prev, purchasePrice: Number(e.target.value)}))} className="h-12 rounded-xl font-mono text-lg" />
                          </div>
                          <div className="space-y-2 col-span-2 md:col-span-1">
                            <Label htmlFor="price" className="text-muted-foreground">Selling Price (₹)</Label>
                            <Input id="price" type="number" value={newProduct.price} onChange={e => setNewProduct(prev => ({...prev, price: Number(e.target.value)}))} className="h-12 rounded-xl font-mono text-lg" required />
                          </div>
                          <div className="space-y-2 col-span-2 md:col-span-1">
                            <Label htmlFor="stock" className="text-muted-foreground">Initial Stock</Label>
                            <Input id="stock" type="number" value={newProduct.stock} onChange={e => setNewProduct(prev => ({...prev, stock: Number(e.target.value)}))} className="h-12 rounded-xl font-mono" required />
                          </div>
                          <div className="space-y-2 col-span-2 md:col-span-1">
                            <Label htmlFor="minStock" className="text-muted-foreground">Min Stock Alert</Label>
                            <Input id="minStock" type="number" value={newProduct.minStock} onChange={e => setNewProduct(prev => ({...prev, minStock: Number(e.target.value)}))} className="h-12 rounded-xl font-mono" required />
                          </div>
                          <div className="space-y-2 col-span-2 md:col-span-1">
                            <Label htmlFor="unit" className="text-muted-foreground">Unit</Label>
                            <select id="unit" value={newProduct.unit} onChange={e => setNewProduct(prev => ({...prev, unit: e.target.value}))} className="flex h-12 w-full rounded-xl border-transparent bg-secondary/30 px-4 py-2 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-secondary/50">
                              <option value="Piece">Piece</option>
                              <option value="Box">Box</option>
                              <option value="Meter">Meter</option>
                              <option value="Roll">Roll</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="grid grid-cols-2 gap-5">
                          <div className="space-y-2 col-span-2 md:col-span-1">
                            <Label htmlFor="warrantyType" className="text-muted-foreground">Warranty Type</Label>
                            <select id="warrantyType" value={newProduct.warrantyType} onChange={e => setNewProduct(prev => ({...prev, warrantyType: e.target.value}))} className="flex h-12 w-full rounded-xl border-transparent bg-secondary/30 px-4 py-2 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-secondary/50">
                              <option value="Manufacturer Warranty">Manufacturer Warranty</option>
                              <option value="Dealer Warranty">Dealer Warranty</option>
                              <option value="No Warranty">No Warranty</option>
                            </select>
                          </div>
                          <div className="space-y-2 col-span-2 md:col-span-1">
                            <Label htmlFor="warranty" className="text-muted-foreground">Duration (Months)</Label>
                            <Input id="warranty" type="number" value={newProduct.warrantyMonths} onChange={e => setNewProduct(prev => ({...prev, warrantyMonths: Number(e.target.value)}))} className="h-12 rounded-xl" />
                          </div>
                          <div className="space-y-2 col-span-2 md:col-span-1">
                            <Label htmlFor="amcEligible" className="text-muted-foreground">AMC Eligible?</Label>
                            <select id="amcEligible" value={newProduct.amcEligible} onChange={e => setNewProduct(prev => ({...prev, amcEligible: e.target.value}))} className="flex h-12 w-full rounded-xl border-transparent bg-secondary/30 px-4 py-2 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-secondary/50">
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                          <div className="space-y-2 col-span-2 p-5 rounded-2xl bg-primary/5 border border-primary/20">
                            <Label className="text-primary font-bold text-base flex items-center gap-2"><ScanBarcode className="w-5 h-5"/> Track Individual Units By Serial Number?</Label>
                            <p className="text-muted-foreground text-xs mt-1 mb-4">This enables warranty tracking, AMC contracts, and service history for individual items assigned to customers.</p>
                            <select value={newProduct.trackSerial} onChange={e => setNewProduct(prev => ({...prev, trackSerial: e.target.value}))} className="flex h-12 w-full rounded-xl border-transparent bg-background px-4 py-2 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20">
                              <option value="Yes">Yes (Cameras, Solar Panels, Batteries)</option>
                              <option value="No">No (Cables, Connectors, Consumables)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="bg-secondary/20 border border-border rounded-xl p-4 mb-4 flex gap-3 items-center">
                          <Wand2 className="w-5 h-5 text-primary" />
                          <p className="text-xs text-muted-foreground">These specifications were auto-loaded based on the <strong>{newProduct.module.toUpperCase()}</strong> category template.</p>
                        </div>
                        
                        <Accordion type="single" collapsible defaultValue="specs" className="w-full">
                          <AccordionItem value="specs" className="border-border/40">
                            <AccordionTrigger className="text-sm font-semibold hover:no-underline px-1">
                              Technical Specifications
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 pb-2 px-1">
                              <div className="grid grid-cols-2 gap-5">
                                {Object.keys(newProduct.metadata || {}).length > 0 ? (
                                  Object.keys(newProduct.metadata).map(key => (
                                    <div key={key} className="space-y-2 col-span-2 md:col-span-1">
                                      <Label className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                                      <Input placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').trim()}`} value={newProduct.metadata[key]} onChange={e => handleMetaChange(key, e.target.value)} className="h-12 rounded-xl" />
                                    </div>
                                  ))
                                ) : (
                                  <div className="col-span-2 py-8 text-center text-muted-foreground border border-dashed border-border rounded-xl">
                                    No specific templates found for this category.
                                  </div>
                                )}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="images" className="border-border/40">
                            <AccordionTrigger className="text-sm font-semibold hover:no-underline px-1">
                              Product Images (Optional)
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 pb-2 px-1">
                              <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-secondary/20 transition-colors cursor-pointer">
                                <ImageIcon className="w-8 h-8 text-muted-foreground mb-3" />
                                <p className="font-semibold text-sm">Click to upload or drag and drop</p>
                                <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    )}
                  </div>

                  <div className="p-6 border-t border-border/40 shrink-0 bg-background flex items-center justify-between">
                    {currentStep > 1 ? (
                      <Button type="button" variant="outline" className="rounded-xl h-12 px-6" onClick={() => setCurrentStep(prev => prev - 1)}>
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                      </Button>
                    ) : <div />}
                    
                    {currentStep < 4 ? (
                      <Button type="button" className="rounded-xl h-12 px-8" onClick={() => setCurrentStep(prev => prev + 1)}>
                        Next <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <div className="flex gap-3">
                        {!editingProductId && (
                          <Button type="button" variant="secondary" className="rounded-xl h-12 px-6" onClick={(e) => handleCreate(e, true)} disabled={isCreating || isUpdating}>
                            {isCreating ? "Saving..." : "Save & Add Another"}
                          </Button>
                        )}
                        <Button type="button" className="rounded-xl h-12 px-8 shadow-md" onClick={(e) => handleCreate(e, false)} disabled={isCreating || isUpdating}>
                          <CheckCircle2 className="w-4 h-4 mr-2" /> {isCreating || isUpdating ? "Saving..." : (editingProductId ? "Save Changes" : "Save Product")}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT SIDE: Live Preview */}
                <div className="w-[380px] bg-secondary/30 border-l border-border p-8 flex flex-col hidden md:flex shrink-0">
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">Live Preview</h4>
                  <div className="bg-background rounded-2xl border border-border shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-all relative overflow-hidden group">
                    <div className="absolute top-4 right-4">
                      <ModuleBadge module={newProduct.module} />
                    </div>
                    <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                      {getProductIcon()}
                    </div>
                    <h3 className="font-bold text-xl mb-1">{newProduct.brand || "Brand Name"}</h3>
                    <p className="text-muted-foreground mb-1">{newProduct.name || "Product Name"}</p>
                    <p className="font-mono text-xs text-muted-foreground/70 mb-5">{newProduct.sku || "SKU Code"}</p>
                    
                    <div className="w-full h-px bg-border/60 my-4" />
                    
                    <div className="w-full flex justify-between items-center mb-3">
                      <span className="text-muted-foreground text-sm">Selling Price</span>
                      <span className="font-mono font-bold text-lg text-primary">{formatINR(newProduct.price || 0)}</span>
                    </div>
                    
                    <div className="w-full flex justify-between items-center mb-3">
                      <span className="text-muted-foreground text-sm">Stock Status</span>
                      {(newProduct.stock || 0) > (newProduct.minStock || 0) ? (
                        <span className="flex items-center gap-1.5 text-success text-sm font-medium"><div className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.6)]"/> Healthy ({newProduct.stock || 0})</span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-danger text-sm font-medium"><div className="w-2 h-2 rounded-full bg-danger animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]"/> Low Stock ({newProduct.stock || 0})</span>
                      )}
                    </div>
                    
                    <div className="w-full flex justify-between items-center mb-3">
                      <span className="text-muted-foreground text-sm">Warranty</span>
                      <span className="text-sm font-medium">{newProduct.warrantyMonths || 0} Months</span>
                    </div>
                    
                    <div className="w-full flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Track Serial</span>
                      <span className={cn("text-sm font-bold uppercase", newProduct.trackSerial === 'Yes' ? "text-primary" : "text-muted-foreground")}>{newProduct.trackSerial}</span>
                    </div>
                  </div>
                  <div className="mt-auto pt-6">
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3 shadow-sm">
                      <Wand2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <p className="text-xs text-primary/80 leading-relaxed font-medium">This product will be instantly available across Quotes, Service Tickets, and Customer Installations.</p>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        }
      />

      {/* Quick Stats Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface border border-border rounded-xl p-4 flex flex-col justify-center">
          <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-1">Total Products</span>
          <span className="text-2xl font-bold">{products.length}</span>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 flex flex-col justify-center">
          <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-1">Stock Value</span>
          <span className="text-2xl font-bold font-mono text-primary">{formatINR(totalValue)}</span>
        </div>
        <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 flex flex-col justify-center">
          <span className="text-warning-foreground text-xs uppercase tracking-wider font-semibold mb-1">Low Stock</span>
          <span className="text-2xl font-bold text-warning">{lowStockCount}</span>
        </div>
        <div className="bg-danger/10 border border-danger/20 rounded-xl p-4 flex flex-col justify-center">
          <span className="text-danger-foreground text-xs uppercase tracking-wider font-semibold mb-1">Out of Stock</span>
          <span className="text-2xl font-bold text-danger">{outOfStockCount}</span>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {[
          ...FILTERS.filter(f => f.key !== "other"),
          ...(metadata || []).filter((m: any) => m.is_custom).map((m: any) => ({ key: m.slug, label: m.name })),
          { key: "other", label: "Other" }
        ].map((f) => {
          const active = filter === f.key;
          const color = f.key === "all" ? "#3B82F6" : (MODULES[f.key as ModuleKey] || MODULES.neutral).color;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                active ? "border-transparent text-background" : "border-border text-muted-foreground hover:text-foreground",
              )}
              style={active ? { background: color } : { background: `${color}10`, color }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <div className="flex h-32 items-center justify-center text-muted-foreground">Loading products...</div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => {
            const stockStatus = p.stock === 0 ? "danger" : p.stock <= p.minStock ? "warning" : "success";
            return (
              <div
                key={p.id}
                className={cn(
                  "group relative rounded-2xl border border-border bg-surface hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col",
                  (MODULES[p.module as ModuleKey] || MODULES.neutral).stripClass,
                )}
              >
                {/* Header Section */}
                <div className="p-5 pb-0 flex justify-between items-start">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm", (MODULES[p.module as ModuleKey] || MODULES.neutral).bgClass)}>
                    {(() => {
                      switch (p.module) {
                        case "security": return <Camera className="w-6 h-6 text-security" />;
                        case "solar": return <Sun className="w-6 h-6 text-solar" />;
                        case "power": return <Battery className="w-6 h-6 text-power" />;
                        case "water": return <Droplets className="w-6 h-6 text-water" />;
                        default: return <Box className="w-6 h-6 text-muted-foreground" />;
                      }
                    })()}
                  </div>
                  <ModuleBadge module={p.module} />
                </div>
                
                {/* Content Section */}
                <div className="p-5 pt-4 flex-1 flex flex-col">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{p.brand}</div>
                  <div className="font-semibold text-[15px] mb-1 line-clamp-1 text-foreground leading-tight" title={p.name || p.model}>{p.name || p.model}</div>
                  <div className="font-mono text-[10px] text-muted-foreground bg-secondary/50 rounded px-2 py-0.5 inline-flex items-center gap-1 mb-3 self-start border border-border/50">
                    <Barcode className="w-3 h-3 opacity-50" />
                    {p.sku || p.barcode || "No SKU"}
                  </div>
                  
                  <div className="text-xl font-mono font-bold text-foreground mb-5 mt-auto pt-2">{formatINR(p.price)}</div>
                  
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center text-sm bg-secondary/20 px-3 py-1.5 rounded-lg">
                      <span className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                        {(p.stock || 0) > (p.minStock || 0) ? (
                          <><div className="w-2 h-2 rounded-full bg-success shadow-[0_0_5px_rgba(34,197,94,0.5)]"/> Healthy Stock</>
                        ) : (
                          <><div className="w-2 h-2 rounded-full bg-danger animate-pulse shadow-[0_0_5px_rgba(239,68,68,0.5)]"/> Low Stock</>
                        )}
                      </span>
                      <span className="font-mono font-bold">{p.stock || 0}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm px-1">
                      <span className="text-muted-foreground flex items-center gap-2 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary/60" /> Warranty
                      </span>
                      <span className="font-medium text-xs">{p.warrantyMonths || "—"} Months</span>
                    </div>
                  </div>
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-background/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-3 p-6 translate-y-8 group-hover:translate-y-0 duration-300 z-10">
                  <Button variant="default" className="w-full rounded-xl shadow-md h-11" onClick={() => handleEditProduct(p, 1)}>Edit Product</Button>
                  <Button variant="outline" className="w-full rounded-xl h-11 bg-background/50 hover:bg-background" onClick={() => handleEditProduct(p, 2)}>Manage Stock</Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-surface/80">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-2 font-medium">Module</th>
                <th className="py-2 font-medium">Product</th>
                <th className="py-2 font-medium">Barcode</th>
                <th className="py-2 text-right font-medium">Price</th>
                <th className="py-2 text-right font-medium">Stock</th>
                <th className="px-4 py-2 text-right font-medium">Warranty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {list.map((p) => (
                <tr key={p.id} className={cn("hover:bg-secondary/40", (MODULES[p.module as ModuleKey] || { stripClass: "" }).stripClass)}>
                  <td className="px-4 py-3"><ModuleBadge module={p.module} /></td>
                  <td className="py-2.5">{p.brand} {p.model}</td>
                  <td className="py-2.5 font-mono text-xs">{p.barcode}</td>
                  <td className="py-2.5 text-right font-mono">{formatINR(p.price)}</td>
                  <td className="py-2.5 text-right font-mono">{p.stock}</td>
                  <td className="px-4 py-2.5 text-right text-muted-foreground">{p.warrantyMonths} mo</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AppShell>
  );
}
