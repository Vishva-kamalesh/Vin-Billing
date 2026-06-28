import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { $ as Building2, M as Info, X as Check, a as User, ct as ArrowLeft, k as MapPin, mt as Layers, u as Tag } from "../_libs/lucide-react.mjs";
import { l as useCreateCustomer, n as Button, o as cn, t as AppShell } from "./AppShell-B6wpEuru.mjs";
import { t as Label } from "./label-BZSFu2Gp.mjs";
import { t as Input } from "./input-8rRBZxpD.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crm_.new-80QNFrcY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewCustomerPage() {
	const navigate = useNavigate();
	const { mutate: createCustomer, isPending } = useCreateCustomer();
	const [formData, setFormData] = (0, import_react.useState)({
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
		interests: []
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
	};
	const handleInterestToggle = (id) => {
		setFormData((prev) => ({
			...prev,
			interests: prev.interests.includes(id) ? prev.interests.filter((i) => i !== id) : [...prev.interests, id]
		}));
	};
	const handleSave = (e) => {
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
			onError: (err) => {
				toast.error(err?.response?.data?.message || err.message || "Failed to create customer.");
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSave,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between pb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/crm",
							className: "hover:text-foreground transition-colors",
							children: "CRM"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "›" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/crm",
							className: "hover:text-foreground transition-colors",
							children: "Customers"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "›" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground",
							children: "New Customer"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-bold font-display tracking-tight",
					children: "Add New Customer"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground mt-1",
					children: "Enter customer details and save to create a new customer profile."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "outline",
				asChild: true,
				className: "gap-2 rounded-full px-5 hover:bg-secondary/80",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/crm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to Customers"]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-12 gap-6 pb-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "col-span-12 xl:col-span-8 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[24px] border-0 bg-surface shadow-md p-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-6 text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold text-lg text-foreground",
								children: "Personal Information"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 md:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										htmlFor: "type",
										className: "text-muted-foreground",
										children: ["Customer Type ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-danger",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: "type",
										name: "type",
										value: formData.type,
										onChange: handleChange,
										className: "flex h-12 w-full rounded-xl border-transparent bg-secondary/30 px-4 py-2 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-secondary/50",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "INDIVIDUAL",
												children: "Individual"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "BUSINESS",
												children: "Business"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "GOVERNMENT",
												children: "Government"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "SCHOOL",
												children: "School"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "HOSPITAL",
												children: "Hospital"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 md:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										htmlFor: "name",
										className: "text-muted-foreground",
										children: ["Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-danger",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "name",
										name: "name",
										placeholder: "Enter full name",
										value: formData.name,
										onChange: handleChange,
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										htmlFor: "phone",
										className: "text-muted-foreground",
										children: ["Phone Number ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-danger",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center bg-secondary/50 px-4 rounded-l-xl text-sm text-muted-foreground border-r border-background/10 h-12 shadow-sm z-10",
											children: "🇮🇳 +91"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "phone",
											name: "phone",
											placeholder: "Enter mobile number",
											className: "rounded-l-none",
											value: formData.phone,
											onChange: handleChange,
											required: true
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "phoneAlt",
										className: "text-muted-foreground",
										children: "Alternative Mobile"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center bg-secondary/50 px-4 rounded-l-xl text-sm text-muted-foreground border-r border-background/10 h-12 shadow-sm z-10",
											children: "🇮🇳 +91"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "phoneAlt",
											name: "phoneAlt",
											placeholder: "Enter alternate number",
											className: "rounded-l-none",
											value: formData.phoneAlt,
											onChange: handleChange
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 md:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "email",
										className: "text-muted-foreground",
										children: "Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "email",
										name: "email",
										type: "email",
										placeholder: "Enter email address",
										value: formData.email,
										onChange: handleChange
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "dob",
										className: "text-muted-foreground",
										children: "Date of Birth"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "dob",
										name: "dob",
										type: "date",
										value: formData.dob,
										onChange: handleChange
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "anniversary",
										className: "text-muted-foreground",
										children: "Anniversary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "anniversary",
										name: "anniversary",
										type: "date",
										value: formData.anniversary,
										onChange: handleChange
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[24px] border-0 bg-surface shadow-md p-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-6 text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold text-lg text-foreground",
								children: "Business & Tax Information"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 md:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "businessName",
										className: "text-muted-foreground",
										children: "Business Name (if any)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "businessName",
										name: "businessName",
										placeholder: "Enter business name",
										value: formData.businessName,
										onChange: handleChange
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "gst",
										className: "text-muted-foreground",
										children: "GST Number (Optional for B2B)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "gst",
										name: "gst",
										placeholder: "Enter GST number",
										value: formData.gst,
										onChange: handleChange
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "pan",
										className: "text-muted-foreground",
										children: "PAN Number"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "pan",
										name: "pan",
										placeholder: "Enter PAN number",
										value: formData.pan,
										onChange: handleChange
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[24px] border-0 bg-surface shadow-md p-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-6 text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold text-lg text-foreground",
								children: "Products / Services Interested In"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
							children: [
								{
									id: "solar",
									name: "Solar Solution",
									desc: "Solar panels, installation",
									icon: "☀️",
									color: "text-solar"
								},
								{
									id: "cctv",
									name: "CCTV Solution",
									desc: "CCTV cameras, security",
									icon: "📹",
									color: "text-primary"
								},
								{
									id: "water",
									name: "Water Purifier",
									desc: "RO, purifier, service",
									icon: "💧",
									color: "text-info"
								},
								{
									id: "battery",
									name: "Inverter / Battery",
									desc: "Inverters, batteries, UPS",
									icon: "🔋",
									color: "text-power"
								},
								{
									id: "amc",
									name: "AMC",
									desc: "AMC & maintenance",
									icon: "🛡️",
									color: "text-success"
								},
								{
									id: "other",
									name: "Other Services",
									desc: "Other services",
									icon: "⋯",
									color: "text-muted-foreground"
								}
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => handleInterestToggle(item.id),
								className: cn("flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-all", formData.interests.includes(item.id) ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xl",
										children: item.icon
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold text-sm truncate",
											children: item.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-muted-foreground truncate",
											children: item.desc
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: cn("h-4 w-4 rounded border flex items-center justify-center transition-colors", formData.interests.includes(item.id) ? "bg-primary border-primary text-primary-foreground" : "border-input"),
										children: formData.interests.includes(item.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" })
									})
								]
							}, item.id))
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "col-span-12 xl:col-span-4 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[24px] border-0 bg-surface shadow-md p-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-6 text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold text-lg text-foreground",
								children: "Address Information"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										htmlFor: "address1",
										className: "text-muted-foreground",
										children: ["Address Line 1 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-danger",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "address1",
										name: "address1",
										placeholder: "House / Building / Door No.",
										value: formData.address1,
										onChange: handleChange,
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "address2",
										className: "text-muted-foreground",
										children: "Address Line 2"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "address2",
										name: "address2",
										placeholder: "Street / Area / Landmark (Optional)",
										value: formData.address2,
										onChange: handleChange
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											htmlFor: "area",
											className: "text-muted-foreground",
											children: ["Area / Locality ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-danger",
												children: "*"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "area",
											name: "area",
											placeholder: "Enter area",
											value: formData.area,
											onChange: handleChange,
											required: true
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											htmlFor: "city",
											className: "text-muted-foreground",
											children: ["City ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-danger",
												children: "*"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "city",
											name: "city",
											placeholder: "Enter city",
											value: formData.city,
											onChange: handleChange,
											required: true
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											htmlFor: "district",
											className: "text-muted-foreground",
											children: ["District ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-danger",
												children: "*"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "district",
											name: "district",
											placeholder: "Select district",
											value: formData.district,
											onChange: handleChange,
											required: true
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											htmlFor: "state",
											className: "text-muted-foreground",
											children: ["State ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-danger",
												children: "*"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "state",
											name: "state",
											value: formData.state,
											onChange: handleChange,
											className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Tamil Nadu",
													children: "Tamil Nadu"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Kerala",
													children: "Kerala"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Karnataka",
													children: "Karnataka"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Andhra Pradesh",
													children: "Andhra Pradesh"
												})
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											htmlFor: "pincode",
											className: "text-muted-foreground",
											children: ["Pincode ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-danger",
												children: "*"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "pincode",
											name: "pincode",
											placeholder: "Enter pincode",
											value: formData.pincode,
											onChange: handleChange,
											required: true
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "mapLocation",
											className: "text-muted-foreground",
											children: "Google Maps Location"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "mapLocation",
												placeholder: "Search location",
												className: "pr-8"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "absolute right-2.5 top-2.5 h-4 w-4 text-primary" })]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-primary/10 text-primary rounded-md p-3 text-xs flex items-center gap-2 mt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }), "Latitude & Longitude will be captured automatically"]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[24px] border-0 bg-surface shadow-md p-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-6 text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold text-lg text-foreground",
								children: "Customer Summary"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center py-2 border-b border-border/50 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Customer Code"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono",
										children: "Auto generated"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center py-2 border-b border-border/50 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Status"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "bg-success/20 text-success px-2 py-0.5 rounded-full text-xs font-semibold",
										children: "Active"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center py-2 border-b border-border/50 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Type"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium capitalize",
										children: formData.type.toLowerCase()
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center py-2 border-b border-border/50 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Created By"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: "Vin Tech"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center py-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Created On"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-muted-foreground",
										children: "Will be set on save"
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[24px] border-0 bg-surface shadow-md p-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-6 text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold text-lg text-foreground",
								children: "Additional Information"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "source",
											className: "text-muted-foreground",
											children: "Lead Source"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "source",
											name: "source",
											value: formData.source,
											onChange: handleChange,
											className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "WALK_IN",
													children: "Walk-in"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "GOOGLE_ADS",
													children: "Google Search"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "WEBSITE",
													children: "Website"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "SOCIAL_MEDIA",
													children: "Social Media"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "WHATSAPP",
													children: "WhatsApp"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "REFERENCE",
													children: "Referral"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "OTHER",
													children: "Other"
												})
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "preferredTime",
											className: "text-muted-foreground",
											children: "Preferred Service Time"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "preferredTime",
											name: "preferredTime",
											value: formData.preferredTime,
											onChange: handleChange,
											className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Anytime",
													children: "Anytime"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Morning",
													children: "Morning"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Afternoon",
													children: "Afternoon"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Evening",
													children: "Evening"
												})
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "serviceArea",
										className: "text-muted-foreground",
										children: "Service Area / Zone"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: "serviceArea",
										name: "serviceArea",
										value: formData.serviceArea,
										onChange: handleChange,
										className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "Select area"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Zone 1",
												children: "Zone 1"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Zone 2",
												children: "Zone 2"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "notes",
										className: "text-muted-foreground",
										children: "Notes"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										id: "notes",
										name: "notes",
										placeholder: "Additional notes about this customer...",
										value: formData.notes,
										onChange: handleChange,
										className: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[24px] border-0 bg-surface shadow-md p-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-6 text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold text-lg text-foreground",
								children: "Notes & Tags"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "internalNotes",
									className: "text-muted-foreground",
									children: "Internal Notes"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									id: "internalNotes",
									name: "internalNotes",
									placeholder: "Write internal notes...",
									value: formData.internalNotes,
									onChange: handleChange,
									className: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "tags",
										className: "text-muted-foreground",
										children: "Tags"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "tags",
										name: "tags",
										placeholder: "Add tags (e.g. solar, cctv, amc)",
										value: formData.tags,
										onChange: handleChange
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-muted-foreground",
										children: "Press Enter to add multiple tags"
									})
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[24px] border-0 bg-surface shadow-md p-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold text-lg text-foreground mb-1",
								children: "Save Customer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mb-6",
								children: "Review the details and save the customer profile."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									className: "flex-1 rounded-full h-12 hover:bg-secondary/80",
									onClick: () => navigate({ to: "/crm" }),
									children: "Reset"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									className: "flex-1 gap-2 rounded-full h-12 shadow-md hover:shadow-lg transition-all",
									disabled: isPending,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5" }),
										" ",
										isPending ? "Saving..." : "Save Customer"
									]
								})]
							})
						]
					})
				]
			})]
		})]
	}) });
}
//#endregion
export { NewCustomerPage as component };
