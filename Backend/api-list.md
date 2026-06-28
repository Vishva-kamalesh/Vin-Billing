# Backend APIs

## Amc
- **GET** /api/amc/expiring
- **GET** /api/amc/
- **POST** /api/amc/
- **GET** /api/amc/{id}
- **PATCH** /api/amc/{id}
- **POST** /api/amc/{id}/visits
- **POST** /api/amc/{id}/renew

## Auth
- **POST** /api/auth/login
- **POST** /api/auth/refresh
- **POST** /api/auth/logout
- **GET** /api/auth/me

## Customers
- **GET** /api/customers/
- **POST** /api/customers/
- **GET** /api/customers/{id}
- **PATCH** /api/customers/{id}
- **DELETE** /api/customers/{id}
- **POST** /api/customers/{id}/addresses
- **GET** /api/customers/{id}/timeline
- **POST** /api/customers/{id}/notes

## Inventory
- **GET** /api/inventory/
- **GET** /api/inventory/low-stock
- **GET** /api/inventory/serials
- **GET** /api/inventory/{productId}/movements
- **POST** /api/inventory/adjustment
- **POST** /api/inventory/purchase-orders
- **PATCH** /api/inventory/purchase-orders/{id}/receive

## Invoices
- **GET** /api/invoices/
- **POST** /api/invoices/
- **GET** /api/invoices/{id}
- **PATCH** /api/invoices/{id}
- **POST** /api/invoices/{id}/payments
- **GET** /api/invoices/{id}/pdf
- **POST** /api/invoices/{id}/send-whatsapp
- **POST** /api/invoices/{id}/cancel

## Leads
- **GET** /api/leads/
- **POST** /api/leads/
- **GET** /api/leads/{id}
- **PATCH** /api/leads/{id}
- **POST** /api/leads/{id}/followups
- **PATCH** /api/leads/{id}/followups/{fid}
- **POST** /api/leads/{id}/convert

## Notifications
- **GET** /api/notifications/live-ops
- **PATCH** /api/notifications/read-all
- **GET** /api/notifications/
- **PATCH** /api/notifications/{id}/read

## Products
- **GET** /api/products/barcode/{code}
- **GET** /api/products/categories
- **GET** /api/products/
- **POST** /api/products/
- **GET** /api/products/{id}
- **PATCH** /api/products/{id}
- **DELETE** /api/products/{id}

## Quotations
- **GET** /api/quotations/
- **POST** /api/quotations/
- **GET** /api/quotations/{id}
- **PATCH** /api/quotations/{id}
- **POST** /api/quotations/{id}/convert
- **GET** /api/quotations/{id}/pdf

## Reports
- **GET** /api/reports/dashboard/stats
- **GET** /api/reports/sales/summary
- **GET** /api/reports/sales/by-category
- **GET** /api/reports/sales/daily
- **GET** /api/reports/inventory/stock-summary
- **GET** /api/reports/inventory/movement
- **GET** /api/reports/service/summary
- **GET** /api/reports/service/technician-performance
- **GET** /api/reports/amc/renewals

## Service Tickets
- **GET** /api/service-tickets/kanban
- **GET** /api/service-tickets/
- **POST** /api/service-tickets/
- **GET** /api/service-tickets/{id}
- **PATCH** /api/service-tickets/{id}
- **PATCH** /api/service-tickets/{id}/assign
- **POST** /api/service-tickets/{id}/visits
- **POST** /api/service-tickets/{id}/photos

## Suppliers
- **GET** /api/suppliers/
- **POST** /api/suppliers/
- **GET** /api/suppliers/{id}
- **PATCH** /api/suppliers/{id}
- **GET** /api/suppliers/{id}/purchase-orders

## System
- **GET** /health

## Technicians
- **GET** /api/technicians/
- **GET** /api/technicians/{id}/jobs
- **GET** /api/technicians/{id}/schedule
- **PATCH** /api/technicians/{id}/availability

## Users
- **GET** /api/users/
- **POST** /api/users/
- **PATCH** /api/users/{id}
- **PATCH** /api/users/{id}/deactivate

## Warranties
- **GET** /api/warranties/claims
- **PATCH** /api/warranties/claims/{claim_id}
- **GET** /api/warranties/
- **GET** /api/warranties/{id}
- **POST** /api/warranties/{id}/claims

