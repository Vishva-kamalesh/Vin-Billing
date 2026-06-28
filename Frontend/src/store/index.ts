import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  seedAMCs,
  seedCustomers,
  seedInvoices,
  seedLeads,
  seedProducts,
  seedPulses,
  seedQuotations,
  seedSuppliers,
  seedTechnicians,
  seedTickets,
  seedWarranties,
  type AMCContract,
  type Customer,
  type Invoice,
  type Lead,
  type OpsPulse,
  type Product,
  type Quotation,
  type ServiceTicket,
  type Supplier,
  type Technician,
  type Warranty,
} from "./mockData";

interface UIState {
  sidebarCollapsed: boolean;
  theme: "dark" | "light";
  paletteOpen: boolean;
}

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    sidebarCollapsed: true,
    theme: "light",
    paletteOpen: false,
  } as UIState,
  reducers: {
    toggleSidebar: (s) => {
      s.sidebarCollapsed = !s.sidebarCollapsed;
    },
    setTheme: (s, a: PayloadAction<"dark" | "light">) => {
      s.theme = a.payload;
    },
    toggleTheme: (s) => {
      s.theme = s.theme === "dark" ? "light" : "dark";
    },
    setPaletteOpen: (s, a: PayloadAction<boolean>) => {
      s.paletteOpen = a.payload;
    },
  },
});

const make = <T extends { id: string }>(name: string, items: T[]) =>
  createSlice({
    name,
    initialState: { items: items as any[] },
    reducers: {
      set(state, action: PayloadAction<T[]>) {
        state.items = action.payload as any[];
      },
      add(state, action: PayloadAction<T>) {
        state.items.unshift(action.payload as any);
      },
      update(state, action: PayloadAction<{ id: string; patch: Partial<T> }>) {
        const idx = state.items.findIndex((i: any) => i.id === action.payload.id);
        if (idx >= 0) state.items[idx] = { ...state.items[idx], ...action.payload.patch };
      },
    },
  });

const customers = make<Customer>("customers", seedCustomers);
const leads = make<Lead>("leads", seedLeads);
const products = make<Product>("products", seedProducts);
const invoices = make<Invoice>("invoices", seedInvoices);
const amcs = make<AMCContract>("amcs", seedAMCs);
const tickets = make<ServiceTicket>("tickets", seedTickets);
const technicians = make<Technician>("technicians", seedTechnicians);
const suppliers = make<Supplier>("suppliers", seedSuppliers);
const warranties = make<Warranty>("warranties", seedWarranties);
const quotations = make<Quotation>("quotations", seedQuotations);
const pulses = make<OpsPulse>("pulses", seedPulses);

export const uiActions = uiSlice.actions;
export const customersActions = customers.actions;
export const leadsActions = leads.actions;
export const productsActions = products.actions;
export const invoicesActions = invoices.actions;
export const amcsActions = amcs.actions;
export const ticketsActions = tickets.actions;
export const techniciansActions = technicians.actions;
export const suppliersActions = suppliers.actions;
export const warrantiesActions = warranties.actions;
export const quotationsActions = quotations.actions;
export const pulsesActions = pulses.actions;

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    customers: customers.reducer,
    leads: leads.reducer,
    products: products.reducer,
    invoices: invoices.reducer,
    amcs: amcs.reducer,
    tickets: tickets.reducer,
    technicians: technicians.reducer,
    suppliers: suppliers.reducer,
    warranties: warranties.reducer,
    quotations: quotations.reducer,
    pulses: pulses.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCustomers = () => useAppSelector((s) => s.customers.items as Customer[]);
export const useLeads = () => useAppSelector((s) => s.leads.items as Lead[]);
export const useProducts = () => useAppSelector((s) => s.products.items as Product[]);
export const useInvoices = () => useAppSelector((s) => s.invoices.items as Invoice[]);
export const useAMCs = () => useAppSelector((s) => s.amcs.items as AMCContract[]);
export const useTickets = () => useAppSelector((s) => s.tickets.items as ServiceTicket[]);
export const useTechnicians = () => useAppSelector((s) => s.technicians.items as Technician[]);
export const useSuppliers = () => useAppSelector((s) => s.suppliers.items as Supplier[]);
export const useWarranties = () => useAppSelector((s) => s.warranties.items as Warranty[]);
export const useQuotations = () => useAppSelector((s) => s.quotations.items as Quotation[]);
export const usePulses = () => useAppSelector((s) => s.pulses.items as OpsPulse[]);
