import type { ModuleKey } from "@/lib/modules";

export type ID = string;

export interface Customer {
  id: ID;
  name: string;
  phone: string;
  email: string;
  gst?: string;
  address: string;
  city: string;
  installed: { module: ModuleKey; product: string; serial: string; installedOn: string }[];
  notes: string;
  createdAt: string;
}

export interface Lead {
  id: ID;
  name: string;
  phone: string;
  source: "Google Ads" | "Website" | "WhatsApp" | "Reference" | "Walk-In";
  module: ModuleKey;
  interest: string;
  status: "New" | "Contacted" | "Quoted" | "Won" | "Lost";
  nextFollowUp: string;
  value: number;
}

export interface Product {
  id: ID;
  module: ModuleKey;
  brand: string;
  model: string;
  barcode: string;
  price: number;
  stock: number;
  minStock: number;
  warrantyMonths: number;
  serialized: boolean;
}

export interface InvoiceLine {
  productId: ID;
  name: string;
  qty: number;
  rate: number;
  module: ModuleKey;
}

export interface Invoice {
  id: ID;
  number: string;
  customerId: ID;
  customerName: string;
  date: string;
  lines: InvoiceLine[];
  subTotal: number;
  gst: number;
  total: number;
  status: "Paid" | "Partial" | "Unpaid";
  module: ModuleKey;
}

export interface AMCContract {
  id: ID;
  number: string;
  customerId: ID;
  customerName: string;
  module: ModuleKey;
  product: string;
  startDate: string;
  endDate: string;
  visitsTotal: number;
  visitsUsed: number;
  status: "Active" | "Expiring" | "Expired";
  value: number;
}

export interface ServiceTicket {
  id: ID;
  number: string;
  customerId: ID;
  customerName: string;
  module: ModuleKey;
  issue: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "Assigned" | "In Progress" | "Completed";
  technicianId?: ID;
  createdAt: string;
  scheduledFor?: string;
}

export interface Technician {
  id: ID;
  name: string;
  phone: string;
  modules: ModuleKey[];
  status: "available" | "on-job" | "offline";
  activeJobs: number;
  rating: number;
  initials: string;
}

export interface Supplier {
  id: ID;
  name: string;
  contact: string;
  modules: ModuleKey[];
  outstanding: number;
  ordersCount: number;
}

export interface Warranty {
  id: ID;
  productName: string;
  serial: string;
  customerName: string;
  module: ModuleKey;
  startDate: string;
  endDate: string;
}

export interface Quotation {
  id: ID;
  number: string;
  customerName: string;
  module: ModuleKey;
  date: string;
  value: number;
  status: "Draft" | "Sent" | "Accepted" | "Rejected";
}

export interface OpsPulse {
  id: ID;
  text: string;
  module: ModuleKey;
  kind: "alert" | "info" | "success";
}

const today = new Date();
const iso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + n);
  return iso(d);
};

export const seedCustomers: Customer[] = [
  {
    id: "c1",
    name: "Sundar Enterprises",
    phone: "+91 98400 11220",
    email: "sundar@enterprise.in",
    gst: "33ABCDE1234F1Z5",
    address: "12 Anna Salai",
    city: "Chennai",
    notes: "Prefers WhatsApp updates. Owns 3 branches.",
    createdAt: "2024-09-12",
    installed: [
      { module: "security", product: "Hikvision 8-Ch DVR Kit", serial: "HK-DVR-88421", installedOn: "2024-10-02" },
      { module: "power", product: "Luminous 1500VA Inverter", serial: "LM-INV-22014", installedOn: "2025-01-18" },
    ],
  },
  {
    id: "c2",
    name: "Krithika Residency",
    phone: "+91 99528 33012",
    email: "admin@krithika.in",
    address: "Plot 44, Velachery",
    city: "Chennai",
    notes: "AMC contract active for RO units across 28 flats.",
    createdAt: "2024-04-22",
    installed: [
      { module: "water", product: "Kent Grand+ RO", serial: "KG-RO-77123", installedOn: "2024-05-10" },
    ],
  },
  {
    id: "c3",
    name: "GreenLeaf Farms",
    phone: "+91 90030 11445",
    email: "ops@greenleaf.farm",
    gst: "33XYZAB9999K1Z2",
    address: "NH-45, Tindivanam",
    city: "Villupuram",
    notes: "Off-grid solar setup, 5kW.",
    createdAt: "2025-02-08",
    installed: [
      { module: "solar", product: "Tata Solar 5kW On-Grid", serial: "TS-5K-44009", installedOn: "2025-02-20" },
    ],
  },
  {
    id: "c4",
    name: "Bharat Petroleum Outlet — OMR",
    phone: "+91 94440 88112",
    email: "omr.outlet@bpcl.in",
    address: "OMR, Sholinganallur",
    city: "Chennai",
    notes: "24x7 CCTV monitoring contract.",
    createdAt: "2024-11-30",
    installed: [
      { module: "security", product: "Hikvision 16-Ch NVR + 12 Cameras", serial: "HK-NVR-92011", installedOn: "2024-12-12" },
    ],
  },
  {
    id: "c5",
    name: "Anitha Sharma",
    phone: "+91 98414 55009",
    email: "anitha.s@gmail.com",
    address: "23/4 Adyar",
    city: "Chennai",
    notes: "Residential customer.",
    createdAt: "2025-03-14",
    installed: [
      { module: "water", product: "AquaGuard Marvel NXT", serial: "AG-MN-55432", installedOn: "2025-03-20" },
    ],
  },
];

export const seedLeads: Lead[] = [
  { id: "l1", name: "Ravi Kumar", phone: "+91 90000 11111", source: "WhatsApp", module: "solar", interest: "3kW On-grid Solar", status: "New", nextFollowUp: addDays(1), value: 240000 },
  { id: "l2", name: "Sunshine Apartments", phone: "+91 90000 22222", source: "Reference", module: "security", interest: "32-camera CCTV setup", status: "Contacted", nextFollowUp: addDays(2), value: 480000 },
  { id: "l3", name: "Velmurugan Stores", phone: "+91 90000 33333", source: "Google Ads", module: "power", interest: "Inverter + 2 batteries", status: "Quoted", nextFollowUp: addDays(0), value: 65000 },
  { id: "l4", name: "Meera Hospital", phone: "+91 90000 44444", source: "Website", module: "water", interest: "Commercial RO 100 LPH", status: "Quoted", nextFollowUp: addDays(3), value: 185000 },
  { id: "l5", name: "Karthik R", phone: "+91 90000 55555", source: "Walk-In", module: "security", interest: "4-cam home CCTV", status: "Won", nextFollowUp: addDays(-2), value: 28000 },
  { id: "l6", name: "Lakshmi Textiles", phone: "+91 90000 66666", source: "Google Ads", module: "solar", interest: "10kW industrial", status: "Lost", nextFollowUp: addDays(-7), value: 750000 },
  { id: "l7", name: "Prakash Café", phone: "+91 90000 77777", source: "Reference", module: "water", interest: "RO + chiller", status: "New", nextFollowUp: addDays(1), value: 42000 },
];

export const seedProducts: Product[] = [
  { id: "p1", module: "security", brand: "Hikvision", model: "DS-7208HQHI 8Ch DVR", barcode: "8901234500011", price: 12500, stock: 18, minStock: 5, warrantyMonths: 24, serialized: true },
  { id: "p2", module: "security", brand: "CP Plus", model: "2MP Dome Camera", barcode: "8901234500028", price: 1800, stock: 64, minStock: 20, warrantyMonths: 12, serialized: true },
  { id: "p3", module: "water", brand: "Kent", model: "Grand Plus RO+UV", barcode: "8901234500035", price: 17500, stock: 9, minStock: 4, warrantyMonths: 12, serialized: true },
  { id: "p4", module: "water", brand: "AquaGuard", model: "Marvel NXT", barcode: "8901234500042", price: 19900, stock: 6, minStock: 4, warrantyMonths: 12, serialized: true },
  { id: "p5", module: "water", brand: "Generic", model: "RO Membrane 80GPD", barcode: "8901234500059", price: 850, stock: 220, minStock: 50, warrantyMonths: 6, serialized: false },
  { id: "p6", module: "power", brand: "Luminous", model: "Zelio+ 1100 Inverter", barcode: "8901234500066", price: 6900, stock: 11, minStock: 5, warrantyMonths: 24, serialized: true },
  { id: "p7", module: "power", brand: "Exide", model: "Inva-Plus 150Ah Battery", barcode: "8901234500073", price: 14200, stock: 4, minStock: 6, warrantyMonths: 36, serialized: true },
  { id: "p8", module: "power", brand: "Microtek", model: "UPS EB 700VA", barcode: "8901234500080", price: 4400, stock: 22, minStock: 8, warrantyMonths: 24, serialized: true },
  { id: "p9", module: "solar", brand: "Tata", model: "330W Mono Panel", barcode: "8901234500097", price: 9200, stock: 36, minStock: 10, warrantyMonths: 60, serialized: true },
  { id: "p10", module: "solar", brand: "Luminous", model: "5kW On-grid Inverter", barcode: "8901234500103", price: 48500, stock: 3, minStock: 3, warrantyMonths: 60, serialized: true },
  { id: "p11", module: "solar", brand: "Generic", model: "MC4 Connector Pair", barcode: "8901234500110", price: 120, stock: 480, minStock: 100, warrantyMonths: 0, serialized: false },
];

export const seedInvoices: Invoice[] = [
  { id: "i1", number: "INV-2025-00214", customerId: "c1", customerName: "Sundar Enterprises", date: addDays(-1), lines: [{ productId: "p1", name: "Hikvision DVR", qty: 1, rate: 12500, module: "security" }], subTotal: 12500, gst: 2250, total: 14750, status: "Paid", module: "security" },
  { id: "i2", number: "INV-2025-00215", customerId: "c2", customerName: "Krithika Residency", date: addDays(-1), lines: [{ productId: "p3", name: "Kent Grand+", qty: 2, rate: 17500, module: "water" }], subTotal: 35000, gst: 6300, total: 41300, status: "Partial", module: "water" },
  { id: "i3", number: "INV-2025-00216", customerId: "c3", customerName: "GreenLeaf Farms", date: addDays(-2), lines: [{ productId: "p10", name: "5kW Inverter", qty: 1, rate: 48500, module: "solar" }], subTotal: 48500, gst: 8730, total: 57230, status: "Unpaid", module: "solar" },
  { id: "i4", number: "INV-2025-00217", customerId: "c4", customerName: "BPCL — OMR", date: addDays(0), lines: [{ productId: "p2", name: "Dome Cameras", qty: 8, rate: 1800, module: "security" }], subTotal: 14400, gst: 2592, total: 16992, status: "Paid", module: "security" },
  { id: "i5", number: "INV-2025-00218", customerId: "c5", customerName: "Anitha Sharma", date: addDays(0), lines: [{ productId: "p7", name: "Exide Battery", qty: 1, rate: 14200, module: "power" }], subTotal: 14200, gst: 2556, total: 16756, status: "Paid", module: "power" },
];

export const seedAMCs: AMCContract[] = [
  { id: "a1", number: "AMC-2025-0042", customerId: "c2", customerName: "Krithika Residency", module: "water", product: "Kent Grand+ (28 units)", startDate: "2024-05-10", endDate: addDays(18), visitsTotal: 12, visitsUsed: 9, status: "Expiring", value: 56000 },
  { id: "a2", number: "AMC-2025-0043", customerId: "c4", customerName: "BPCL — OMR", module: "security", product: "16-Ch NVR + 12 Cameras", startDate: "2024-12-12", endDate: addDays(210), visitsTotal: 12, visitsUsed: 4, status: "Active", value: 84000 },
  { id: "a3", number: "AMC-2024-0028", customerId: "c1", customerName: "Sundar Enterprises", module: "power", product: "Luminous 1500VA + 2 batteries", startDate: "2024-01-18", endDate: addDays(-12), visitsTotal: 4, visitsUsed: 4, status: "Expired", value: 12000 },
  { id: "a4", number: "AMC-2025-0044", customerId: "c3", customerName: "GreenLeaf Farms", module: "solar", product: "5kW Solar System", startDate: "2025-02-20", endDate: addDays(295), visitsTotal: 4, visitsUsed: 1, status: "Active", value: 24000 },
  { id: "a5", number: "AMC-2025-0045", customerId: "c5", customerName: "Anitha Sharma", module: "water", product: "AquaGuard Marvel NXT", startDate: "2025-03-20", endDate: addDays(27), visitsTotal: 4, visitsUsed: 3, status: "Expiring", value: 3600 },
];

export const seedTechnicians: Technician[] = [
  { id: "t1", name: "Ravi Kannan", phone: "+91 98400 11001", modules: ["security", "power"], status: "on-job", activeJobs: 2, rating: 4.8, initials: "RK" },
  { id: "t2", name: "Saravanan M", phone: "+91 98400 11002", modules: ["water"], status: "available", activeJobs: 0, rating: 4.6, initials: "SM" },
  { id: "t3", name: "Dinesh P", phone: "+91 98400 11003", modules: ["solar", "power"], status: "available", activeJobs: 1, rating: 4.9, initials: "DP" },
  { id: "t4", name: "Karthik V", phone: "+91 98400 11004", modules: ["security"], status: "offline", activeJobs: 0, rating: 4.4, initials: "KV" },
  { id: "t5", name: "Mani Bharathi", phone: "+91 98400 11005", modules: ["water", "power"], status: "on-job", activeJobs: 3, rating: 4.7, initials: "MB" },
];

export const seedTickets: ServiceTicket[] = [
  { id: "s1", number: "TKT-1024", customerId: "c2", customerName: "Krithika Residency", module: "water", issue: "Block 3 — RO unit not dispensing water", priority: "High", status: "In Progress", technicianId: "t2", createdAt: addDays(-1), scheduledFor: addDays(0) },
  { id: "s2", number: "TKT-1025", customerId: "c1", customerName: "Sundar Enterprises", module: "security", issue: "Camera 4 offline since Monday", priority: "Medium", status: "Assigned", technicianId: "t1", createdAt: addDays(-1), scheduledFor: addDays(1) },
  { id: "s3", number: "TKT-1026", customerId: "c5", customerName: "Anitha Sharma", module: "power", issue: "Inverter beeping continuously", priority: "Medium", status: "Open", createdAt: addDays(0) },
  { id: "s4", number: "TKT-1027", customerId: "c3", customerName: "GreenLeaf Farms", module: "solar", issue: "Daily generation dropped 30%", priority: "High", status: "Open", createdAt: addDays(0) },
  { id: "s5", number: "TKT-1023", customerId: "c4", customerName: "BPCL — OMR", module: "security", issue: "Routine quarterly cleaning", priority: "Low", status: "Completed", technicianId: "t1", createdAt: addDays(-5), scheduledFor: addDays(-2) },
  { id: "s6", number: "TKT-1022", customerId: "c2", customerName: "Krithika Residency", module: "water", issue: "Filter replacement Block 7", priority: "Low", status: "Completed", technicianId: "t5", createdAt: addDays(-7), scheduledFor: addDays(-4) },
];

export const seedSuppliers: Supplier[] = [
  { id: "su1", name: "Hikvision India", contact: "+91 80100 22001", modules: ["security"], outstanding: 124000, ordersCount: 14 },
  { id: "su2", name: "Kent RO Systems", contact: "+91 80100 22002", modules: ["water"], outstanding: 38500, ordersCount: 9 },
  { id: "su3", name: "Luminous Power", contact: "+91 80100 22003", modules: ["power", "solar"], outstanding: 211000, ordersCount: 22 },
  { id: "su4", name: "Tata Power Solar", contact: "+91 80100 22004", modules: ["solar"], outstanding: 0, ordersCount: 6 },
  { id: "su5", name: "Exide Industries", contact: "+91 80100 22005", modules: ["power"], outstanding: 67200, ordersCount: 11 },
];

export const seedWarranties: Warranty[] = [
  { id: "w1", productName: "Hikvision 8-Ch DVR", serial: "HK-DVR-88421", customerName: "Sundar Enterprises", module: "security", startDate: "2024-10-02", endDate: "2026-10-02" },
  { id: "w2", productName: "Kent Grand+ RO", serial: "KG-RO-77123", customerName: "Krithika Residency", module: "water", startDate: "2024-05-10", endDate: addDays(20) },
  { id: "w3", productName: "Tata 5kW Inverter", serial: "TS-5K-44009", customerName: "GreenLeaf Farms", module: "solar", startDate: "2025-02-20", endDate: "2030-02-20" },
  { id: "w4", productName: "Luminous 1500VA", serial: "LM-INV-22014", customerName: "Sundar Enterprises", module: "power", startDate: "2025-01-18", endDate: "2027-01-18" },
  { id: "w5", productName: "AquaGuard Marvel NXT", serial: "AG-MN-55432", customerName: "Anitha Sharma", module: "water", startDate: "2025-03-20", endDate: addDays(-5) },
];

export const seedQuotations: Quotation[] = [
  { id: "q1", number: "QT-2025-0118", customerName: "Sunshine Apartments", module: "security", date: addDays(-2), value: 480000, status: "Sent" },
  { id: "q2", number: "QT-2025-0119", customerName: "Meera Hospital", module: "water", date: addDays(-1), value: 185000, status: "Sent" },
  { id: "q3", number: "QT-2025-0120", customerName: "Velmurugan Stores", module: "power", date: addDays(0), value: 65000, status: "Draft" },
  { id: "q4", number: "QT-2025-0117", customerName: "Karthik R", module: "security", date: addDays(-4), value: 28000, status: "Accepted" },
  { id: "q5", number: "QT-2025-0116", customerName: "Lakshmi Textiles", module: "solar", date: addDays(-9), value: 750000, status: "Rejected" },
];

export const seedPulses: OpsPulse[] = [
  { id: "op1", text: "3 AMC renewals due within 30 days", module: "neutral", kind: "alert" },
  { id: "op2", text: "Exide 150Ah battery stock low — 4 units left", module: "power", kind: "alert" },
  { id: "op3", text: "Technician Ravi en route to Sundar Enterprises", module: "security", kind: "info" },
  { id: "op4", text: "GreenLeaf Farms — solar generation dropped 30%", module: "solar", kind: "alert" },
  { id: "op5", text: "Krithika Residency — RO ticket TKT-1024 in progress", module: "water", kind: "info" },
  { id: "op6", text: "INV-2025-00214 paid · Sundar Enterprises", module: "security", kind: "success" },
  { id: "op7", text: "2 service tickets unassigned", module: "neutral", kind: "alert" },
  { id: "op8", text: "Luminous 5kW inverter — restock order placed", module: "solar", kind: "info" },
];
