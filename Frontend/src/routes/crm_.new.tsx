import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { useCreateCustomer } from "@/hooks/useCustomers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, MapPin, User, Building2, Info, Tag, Layers, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/crm_/new")({
  head: () => ({ meta: [{ title: "New Customer — Vin Technology" }] }),
  component: NewCustomerPage,
});

function NewCustomerPage() {
  const navigate = useNavigate();
  const { mutate: createCustomer, isPending } = useCreateCustomer();
  
  const [formData, setFormData] = useState({
    type: "INDIVIDUAL",
    name: "",
    phone: "",
    phoneAlt: "",
    email: "",
    dob: "",
    anniversary: "",
    
    address1: "",
    address2: "",
    area: "",
    city: "",
    district: "",
    state: "Tamil Nadu",
    pincode: "",
    
    businessName: "",
    gst: "",
    pan: "",
    
    source: "WALK_IN",
    preferredTime: "Anytime",
    serviceArea: "",
    notes: "",
    internalNotes: "",
    tags: "",
    
    interests: [] as string[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(id) 
        ? prev.interests.filter(i => i !== id)
        : [...prev.interests, id]
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    createCustomer({
      name: formData.name,
      phone: formData.phone,
      phoneAlt: formData.phoneAlt,
      email: formData.email,
      address: formData.address1 + (formData.address2 ? ", " + formData.address2 : ""),
      area: formData.area,
      city: formData.city,
      pincode: formData.pincode,
      type: formData.type,
      source: formData.source,
      gst: formData.gst,
      notes: formData.internalNotes || formData.notes,
      interests: formData.interests
    }, {
      onSuccess: () => {
        toast.success("Customer profile created successfully.");
        navigate({ to: "/crm" });
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || err.message || "Failed to create customer.");
      }
    });
  };

  return (
    <AppShell>
      <form onSubmit={handleSave}>
        <div className="flex items-center justify-between pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2">
              <Link to="/crm" className="hover:text-foreground transition-colors">CRM</Link>
              <span>›</span>
              <Link to="/crm" className="hover:text-foreground transition-colors">Customers</Link>
              <span>›</span>
              <span className="text-foreground">New Customer</span>
            </div>
            <h1 className="text-3xl font-bold font-display tracking-tight">Add New Customer</h1>
            <p className="text-muted-foreground mt-1">Enter customer details and save to create a new customer profile.</p>
          </div>
          <Button type="button" variant="outline" asChild className="gap-2 rounded-full px-5 hover:bg-secondary/80">
            <Link to="/crm">
              <ArrowLeft className="h-4 w-4" /> Back to Customers
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-6 pb-20">
          
          {/* Left Column (Main Forms) */}
          <div className="col-span-12 xl:col-span-8 space-y-6">
            
            {/* Personal Information */}
            <div className="rounded-[24px] border-0 bg-surface shadow-md p-7">
              <div className="flex items-center gap-2 mb-6 text-primary">
                <User className="h-5 w-5" />
                <h2 className="font-semibold text-lg text-foreground">Personal Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="type" className="text-muted-foreground">Customer Type <span className="text-danger">*</span></Label>
                  <select id="type" name="type" value={formData.type} onChange={handleChange} className="flex h-12 w-full rounded-xl border-transparent bg-secondary/30 px-4 py-2 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-secondary/50">
                    <option value="INDIVIDUAL">Individual</option>
                    <option value="BUSINESS">Business</option>
                    <option value="GOVERNMENT">Government</option>
                    <option value="SCHOOL">School</option>
                    <option value="HOSPITAL">Hospital</option>
                  </select>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="name" className="text-muted-foreground">Name <span className="text-danger">*</span></Label>
                  <Input id="name" name="name" placeholder="Enter full name" value={formData.name} onChange={handleChange} required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-muted-foreground">Phone Number <span className="text-danger">*</span></Label>
                  <div className="flex">
                    <div className="flex items-center bg-secondary/50 px-4 rounded-l-xl text-sm text-muted-foreground border-r border-background/10 h-12 shadow-sm z-10">
                      🇮🇳 +91
                    </div>
                    <Input id="phone" name="phone" placeholder="Enter mobile number" className="rounded-l-none" value={formData.phone} onChange={handleChange} required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phoneAlt" className="text-muted-foreground">Alternative Mobile</Label>
                  <div className="flex">
                    <div className="flex items-center bg-secondary/50 px-4 rounded-l-xl text-sm text-muted-foreground border-r border-background/10 h-12 shadow-sm z-10">
                      🇮🇳 +91
                    </div>
                    <Input id="phoneAlt" name="phoneAlt" placeholder="Enter alternate number" className="rounded-l-none" value={formData.phoneAlt} onChange={handleChange} />
                  </div>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email" className="text-muted-foreground">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="Enter email address" value={formData.email} onChange={handleChange} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dob" className="text-muted-foreground">Date of Birth</Label>
                  <Input id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="anniversary" className="text-muted-foreground">Anniversary</Label>
                  <Input id="anniversary" name="anniversary" type="date" value={formData.anniversary} onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* Business & Tax Information */}
            <div className="rounded-[24px] border-0 bg-surface shadow-md p-7">
              <div className="flex items-center gap-2 mb-6 text-primary">
                <Building2 className="h-5 w-5" />
                <h2 className="font-semibold text-lg text-foreground">Business & Tax Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="businessName" className="text-muted-foreground">Business Name (if any)</Label>
                  <Input id="businessName" name="businessName" placeholder="Enter business name" value={formData.businessName} onChange={handleChange} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gst" className="text-muted-foreground">GST Number (Optional for B2B)</Label>
                  <Input id="gst" name="gst" placeholder="Enter GST number" value={formData.gst} onChange={handleChange} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pan" className="text-muted-foreground">PAN Number</Label>
                  <Input id="pan" name="pan" placeholder="Enter PAN number" value={formData.pan} onChange={handleChange} />
                </div>
              </div>
            </div>
            
            {/* Products / Services Interested In */}
            <div className="rounded-[24px] border-0 bg-surface shadow-md p-7">
              <div className="flex items-center gap-2 mb-6 text-primary">
                <Layers className="h-5 w-5" />
                <h2 className="font-semibold text-lg text-foreground">Products / Services Interested In</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { id: "solar", name: "Solar Solution", desc: "Solar panels, installation", icon: "☀️", color: "text-solar" },
                  { id: "cctv", name: "CCTV Solution", desc: "CCTV cameras, security", icon: "📹", color: "text-primary" },
                  { id: "water", name: "Water Purifier", desc: "RO, purifier, service", icon: "💧", color: "text-info" },
                  { id: "battery", name: "Inverter / Battery", desc: "Inverters, batteries, UPS", icon: "🔋", color: "text-power" },
                  { id: "amc", name: "AMC", desc: "AMC & maintenance", icon: "🛡️", color: "text-success" },
                  { id: "other", name: "Other Services", desc: "Other services", icon: "⋯", color: "text-muted-foreground" },
                ].map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => handleInterestToggle(item.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-all",
                      formData.interests.includes(item.id) ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="text-xl">{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">{item.name}</div>
                      <div className="text-[10px] text-muted-foreground truncate">{item.desc}</div>
                    </div>
                    <div className={cn(
                      "h-4 w-4 rounded border flex items-center justify-center transition-colors",
                      formData.interests.includes(item.id) ? "bg-primary border-primary text-primary-foreground" : "border-input"
                    )}>
                      {formData.interests.includes(item.id) && <Check className="h-3 w-3" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
          
          {/* Right Column */}
          <div className="col-span-12 xl:col-span-4 space-y-6">
            
            {/* Address Information */}
            <div className="rounded-[24px] border-0 bg-surface shadow-md p-7">
              <div className="flex items-center gap-2 mb-6 text-primary">
                <MapPin className="h-5 w-5" />
                <h2 className="font-semibold text-lg text-foreground">Address Information</h2>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address1" className="text-muted-foreground">Address Line 1 <span className="text-danger">*</span></Label>
                  <Input id="address1" name="address1" placeholder="House / Building / Door No." value={formData.address1} onChange={handleChange} required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address2" className="text-muted-foreground">Address Line 2</Label>
                  <Input id="address2" name="address2" placeholder="Street / Area / Landmark (Optional)" value={formData.address2} onChange={handleChange} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="area" className="text-muted-foreground">Area / Locality <span className="text-danger">*</span></Label>
                    <Input id="area" name="area" placeholder="Enter area" value={formData.area} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-muted-foreground">City <span className="text-danger">*</span></Label>
                    <Input id="city" name="city" placeholder="Enter city" value={formData.city} onChange={handleChange} required />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="district" className="text-muted-foreground">District <span className="text-danger">*</span></Label>
                    <Input id="district" name="district" placeholder="Select district" value={formData.district} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-muted-foreground">State <span className="text-danger">*</span></Label>
                    <select id="state" name="state" value={formData.state} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pincode" className="text-muted-foreground">Pincode <span className="text-danger">*</span></Label>
                    <Input id="pincode" name="pincode" placeholder="Enter pincode" value={formData.pincode} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mapLocation" className="text-muted-foreground">Google Maps Location</Label>
                    <div className="relative">
                      <Input id="mapLocation" placeholder="Search location" className="pr-8" />
                      <MapPin className="absolute right-2.5 top-2.5 h-4 w-4 text-primary" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-primary/10 text-primary rounded-md p-3 text-xs flex items-center gap-2 mt-2">
                  <MapPin className="h-4 w-4" />
                  Latitude & Longitude will be captured automatically
                </div>
              </div>
            </div>

            {/* Customer Summary & Info */}
            <div className="rounded-[24px] border-0 bg-surface shadow-md p-7">
              <div className="flex items-center gap-2 mb-6 text-primary">
                <Info className="h-5 w-5" />
                <h2 className="font-semibold text-lg text-foreground">Customer Summary</h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border/50 text-sm">
                  <span className="text-muted-foreground">Customer Code</span>
                  <span className="font-mono">Auto generated</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50 text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <span className="bg-success/20 text-success px-2 py-0.5 rounded-full text-xs font-semibold">Active</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50 text-sm">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium capitalize">{formData.type.toLowerCase()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50 text-sm">
                  <span className="text-muted-foreground">Created By</span>
                  <span className="font-medium">Vin Tech</span>
                </div>
                <div className="flex justify-between items-center py-2 text-sm">
                  <span className="text-muted-foreground">Created On</span>
                  <span className="font-medium text-muted-foreground">Will be set on save</span>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="rounded-[24px] border-0 bg-surface shadow-md p-7">
              <div className="flex items-center gap-2 mb-6 text-primary">
                <Info className="h-5 w-5" />
                <h2 className="font-semibold text-lg text-foreground">Additional Information</h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="source" className="text-muted-foreground">Lead Source</Label>
                    <select id="source" name="source" value={formData.source} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="WALK_IN">Walk-in</option>
                      <option value="GOOGLE_ADS">Google Search</option>
                      <option value="WEBSITE">Website</option>
                      <option value="SOCIAL_MEDIA">Social Media</option>
                      <option value="WHATSAPP">WhatsApp</option>
                      <option value="REFERENCE">Referral</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferredTime" className="text-muted-foreground">Preferred Service Time</Label>
                    <select id="preferredTime" name="preferredTime" value={formData.preferredTime} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="Anytime">Anytime</option>
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="serviceArea" className="text-muted-foreground">Service Area / Zone</Label>
                  <select id="serviceArea" name="serviceArea" value={formData.serviceArea} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="">Select area</option>
                    <option value="Zone 1">Zone 1</option>
                    <option value="Zone 2">Zone 2</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-muted-foreground">Notes</Label>
                  <textarea id="notes" name="notes" placeholder="Additional notes about this customer..." value={formData.notes} onChange={handleChange} className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"></textarea>
                </div>
              </div>
            </div>

            {/* Notes & Tags */}
            <div className="rounded-[24px] border-0 bg-surface shadow-md p-7">
              <div className="flex items-center gap-2 mb-6 text-primary">
                <Tag className="h-5 w-5" />
                <h2 className="font-semibold text-lg text-foreground">Notes & Tags</h2>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="internalNotes" className="text-muted-foreground">Internal Notes</Label>
                  <textarea id="internalNotes" name="internalNotes" placeholder="Write internal notes..." value={formData.internalNotes} onChange={handleChange} className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"></textarea>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-muted-foreground">Tags</Label>
                  <Input id="tags" name="tags" placeholder="Add tags (e.g. solar, cctv, amc)" value={formData.tags} onChange={handleChange} />
                  <p className="text-[10px] text-muted-foreground">Press Enter to add multiple tags</p>
                </div>
              </div>
            </div>

            {/* Save Customer */}
            <div className="rounded-[24px] border-0 bg-surface shadow-md p-7">
              <h2 className="font-semibold text-lg text-foreground mb-1">Save Customer</h2>
              <p className="text-sm text-muted-foreground mb-6">Review the details and save the customer profile.</p>
              
              <div className="flex gap-4 pt-2">
                <Button type="button" variant="outline" className="flex-1 rounded-full h-12 hover:bg-secondary/80" onClick={() => navigate({ to: "/crm" })}>
                  Reset
                </Button>
                <Button type="submit" className="flex-1 gap-2 rounded-full h-12 shadow-md hover:shadow-lg transition-all" disabled={isPending}>
                  <Check className="h-5 w-5" /> {isPending ? "Saving..." : "Save Customer"}
                </Button>
              </div>
            </div>

          </div>
        </div>
      </form>
    </AppShell>
  );
}
