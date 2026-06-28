import { prisma } from '../../lib/prisma';
import { CreateCustomerDto, UpdateCustomerDto, CreateAddressDto, CreateNoteDto } from './customers.dto';
import { Prisma } from '@prisma/client';

export class CustomersRepository {
  async create(data: CreateCustomerDto) {
    const dobDate = data.dob ? new Date(data.dob) : undefined;
    const annivDate = data.anniversary ? new Date(data.anniversary) : undefined;

    return prisma.customer.create({ 
      data: {
        name: data.name,
        phone: data.phone,
        phone_alt: data.phoneAlt,
        email: data.email,
        dob: dobDate,
        anniversary: annivDate,
        gst_number: data.gst,
        pan_number: data.pan,
        business_name: data.businessName,
        customer_type: (data.type as any) || 'INDIVIDUAL',
        lead_source: (data.source as any) || 'WALK_IN',
        preferred_time: data.preferredTime,
        service_area: data.serviceArea,
        interests: data.interests || [],
        
        addresses: {
          create: {
            label: 'Primary',
            address_1: data.address || '',
            area: data.area,
            city: data.city || '',
            district: data.district,
            state: data.state,
            pincode: data.pincode || '',
            is_default: true,
          }
        },
        
        notes: data.notes ? {
          create: {
            note: data.notes,
            created_by: 'System'
          }
        } : undefined
      },
      include: {
        addresses: true,
        notes: true
      }
    });
  }

  async update(id: string, data: UpdateCustomerDto) {
    const dobDate = data.dob ? new Date(data.dob) : undefined;
    const annivDate = data.anniversary ? new Date(data.anniversary) : undefined;

    const customer = await prisma.customer.update({
      where: { id },
      data: {
        name: data.name,
        phone: data.phone,
        phone_alt: data.phoneAlt,
        email: data.email,
        dob: dobDate,
        anniversary: annivDate,
        gst_number: data.gst,
        pan_number: data.pan,
        business_name: data.businessName,
        customer_type: (data.type as any),
        lead_source: (data.source as any),
        preferred_time: data.preferredTime,
        service_area: data.serviceArea,
        interests: data.interests || [],
      },
    });

    // Update or create primary address
    if (data.address || data.city || data.pincode) {
      const primaryAddress = await prisma.customerAddress.findFirst({
        where: { customer_id: id, is_default: true }
      });

      if (primaryAddress) {
        await prisma.customerAddress.update({
          where: { id: primaryAddress.id },
          data: {
            address_1: data.address || '',
            area: data.area,
            city: data.city || '',
            district: data.district,
            state: data.state,
            pincode: data.pincode || '',
          }
        });
      } else {
        await prisma.customerAddress.create({
          data: {
            customer_id: id,
            label: 'Primary',
            address_1: data.address || '',
            area: data.area,
            city: data.city || '',
            district: data.district,
            state: data.state,
            pincode: data.pincode || '',
            is_default: true,
          }
        });
      }
    }

    return customer;
  }

  async softDelete(id: string) {
    return prisma.customer.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }

  async search(query: string) {
    return prisma.customer.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { phone: { contains: query } },
          { email: { contains: query, mode: 'insensitive' } },
          { gst_number: { contains: query, mode: 'insensitive' } },
        ]
      },
      take: 20,
      include: {
        addresses: true,
        notes: true,
        installed_products: {
          include: { product: true }
        }
      }
    });
  }

  async getFullProfile(id: string) {
    return prisma.customer.findUnique({
      where: { id },
      include: {
        addresses: true,
        installed_products: {
          include: { product: true }
        },
        invoices: {
          take: 5,
          orderBy: { created_at: 'desc' }
        },
        amc_contracts: {
          where: { /* you can add active condition here if exists */ },
        },
        service_tickets: {
          where: { /* you can add open condition here if exists */ },
        }
      }
    });
  }

  async getTimelineData(id: string) {
    return prisma.customer.findUnique({
      where: { id },
      select: {
        invoices: { select: { id: true, created_at: true } },
        amc_contracts: { select: { id: true, created_at: true } },
        service_tickets: { select: { id: true, created_at: true } },
        notes: { select: { id: true, note: true, created_by: true, created_at: true } },
        installed_products: { select: { id: true, installed_date: true, serial_number: true } }
      }
    });
  }

  async addAddress(customer_id: string, data: CreateAddressDto) {
    return prisma.customerAddress.create({
      data: {
        customer_id,
        label: data.label,
        address_1: data.address,
        city: data.city,
        pincode: data.pincode,
        is_default: data.is_default
      }
    });
  }

  async addNote(customer_id: string, data: CreateNoteDto, created_by: string) {
    return prisma.customerNote.create({
      data: {
        ...data,
        customer_id,
        created_by
      }
    });
  }
}
