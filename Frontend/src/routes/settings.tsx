import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector, uiActions } from "@/store";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Vin Technology" }] }),
  component: SettingsPage,
});

const EVENTS = [
  "AMC Renewal Due",
  "Invoice Generated",
  "Warranty Expiry",
  "Service Reminder",
  "Payment Due",
  "Low Stock Alert",
];
const CHANNELS = ["WhatsApp", "SMS", "Email"];

function SettingsPage() {
  const theme = useAppSelector((s) => s.ui.theme);
  const dispatch = useAppDispatch();

  return (
    <AppShell>
      <PageHeader
        eyebrow="Configuration"
        title="Settings"
        description="Business profile, notifications, theme and roles."
      />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6 rounded-xl border border-border bg-surface/80 p-5 space-y-4">
          <h3 className="font-display font-bold">Business Profile</h3>
          <div className="grid gap-3">
            <Field label="Business name" defaultValue="Vin Technology" />
            <Field label="GSTIN" defaultValue="33VINTECH9876K1Z9" mono />
            <Field label="Address" defaultValue="2/47 GST Road, Chennai 600045" />
            <Field label="Phone" defaultValue="+91 98400 12345" mono />
          </div>
          <Button>Save Profile</Button>
        </div>

        <div className="col-span-12 md:col-span-6 rounded-xl border border-border bg-surface/80 p-5 space-y-4">
          <h3 className="font-display font-bold">Appearance</h3>
          <div className="flex items-center justify-between rounded-lg border border-border bg-background/40 p-3">
            <div>
              <div className="text-sm font-medium">Dark mode</div>
              <div className="text-xs text-muted-foreground">The Ops Console is designed dark-first.</div>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(c) => dispatch(uiActions.setTheme(c ? "dark" : "light"))}
            />
          </div>

          <h3 className="font-display font-bold pt-4">User Roles</h3>
          <div className="space-y-2 text-sm">
            {[
              ["Admin", "Vinod Thomas", "primary"],
              ["Staff", "Anita R · Counter", "muted"],
              ["Technician", "Ravi Kannan", "muted"],
            ].map(([role, name]) => (
              <div key={role} className="flex items-center justify-between rounded-md border border-border bg-background/40 px-3 py-2">
                <div>
                  <div>{name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{role}</div>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 rounded-xl border border-border bg-surface/80">
          <div className="border-b border-border px-5 py-3">
            <h3 className="font-display font-bold">Notifications</h3>
            <p className="text-xs text-muted-foreground">Choose which events go to which channel.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-2 font-medium">Event</th>
                  {CHANNELS.map((c) => <th key={c} className="px-4 py-2 text-center font-medium">{c}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {EVENTS.map((e, i) => (
                  <tr key={e}>
                    <td className="px-5 py-2.5">{e}</td>
                    {CHANNELS.map((c) => (
                      <td key={c} className="px-4 py-2.5 text-center">
                        <Switch defaultChecked={i % (CHANNELS.indexOf(c) + 2) === 0 || c === "WhatsApp"} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Field({ label, defaultValue, mono }: { label: string; defaultValue: string; mono?: boolean }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Input defaultValue={defaultValue} className={mono ? "font-mono" : undefined} />
    </div>
  );
}
