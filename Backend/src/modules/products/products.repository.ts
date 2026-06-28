import { prisma } from '../../lib/prisma';
import { CreateProductDto, UpdateProductDto } from './products.dto';

export class ProductsRepository {
  async create(data: CreateProductDto) {
    // Map module to ProductCategory Enum
    const moduleMap: Record<string, any> = {
      security: 'CCTV',
      water: 'RO_PURIFIER',
      solar: 'SOLAR',
      power: 'BATTERY'
    };
    
    const slug = moduleMap[data.module] || data.module.toUpperCase().replace(/[^A-Z0-9]/g, '_');
    
    // Find or create the category
    let category = await prisma.category.findUnique({ where: { slug } });
    if (!category) {
      category = await prisma.category.create({
        data: { 
          name: moduleMap[data.module] ? data.module.toUpperCase() : data.module, 
          slug, 
          is_custom: !moduleMap[data.module] 
        }
      });
    }

    // Upsert brand for this category
    await prisma.brand.upsert({
      where: { name_category_id: { name: data.brand, category_id: category.id } },
      create: { name: data.brand, category_id: category.id, is_custom: true },
      update: {}
    });

    return prisma.product.create({ 
      data: {
        category_id: category.id,
        brand: data.brand,
        model: data.model,
        description: data.name,
        sku: data.sku ? data.sku : `${data.brand.substring(0,3).toUpperCase()}-${Date.now().toString().slice(-6)}`,
        barcode: data.barcode ? data.barcode : null,
        mrp: data.price,
        selling_price: data.price,
        cost_price: data.purchasePrice || data.price * 0.7,
        unit: data.unit || "Piece",
        gst_rate: 18,
        warranty_months: data.warrantyMonths || 12,
        metadata: {
          trackSerial: data.trackSerial || 'Yes',
          amcEligible: data.amcEligible || 'Yes',
          warrantyType: data.warrantyType || 'Manufacturer Warranty',
          ...(data.metadata || {})
        },
        inventory: {
          create: { 
            qty_on_hand: data.stock || 0,
            low_stock_alert: data.minStock || 5
          }
        }
      } 
    });
  }

  async update(id: string, data: UpdateProductDto) {
    const updateData: any = {};
    if (data.brand) updateData.brand = data.brand;
    if (data.model) updateData.model = data.model;
    if (data.name !== undefined) updateData.description = data.name;
    if (data.sku) updateData.sku = data.sku;
    if (data.barcode !== undefined) updateData.barcode = data.barcode;
    if (data.price !== undefined) {
      updateData.mrp = data.price;
      updateData.selling_price = data.price;
    }
    if (data.purchasePrice !== undefined) updateData.cost_price = data.purchasePrice;
    if (data.unit) updateData.unit = data.unit;
    if (data.warrantyMonths !== undefined) updateData.warranty_months = data.warrantyMonths;
    
    if (data.trackSerial || data.amcEligible || data.warrantyType || data.metadata) {
      // Fetch existing metadata to merge
      const existing = await prisma.product.findUnique({ where: { id }, select: { metadata: true } });
      const existingMeta = (existing?.metadata as any) || {};
      
      updateData.metadata = {
        ...existingMeta,
        trackSerial: data.trackSerial || existingMeta.trackSerial,
        amcEligible: data.amcEligible || existingMeta.amcEligible,
        warrantyType: data.warrantyType || existingMeta.warrantyType,
        ...(data.metadata || {})
      };
    }

    if (data.stock !== undefined || data.minStock !== undefined) {
      updateData.inventory = {
        update: {
          qty_on_hand: data.stock !== undefined ? data.stock : undefined,
          low_stock_alert: data.minStock !== undefined ? data.minStock : undefined
        }
      };
    }

    return prisma.product.update({
      where: { id },
      data: updateData,
    });
  }

  async softDelete(id: string) {
    return prisma.product.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }

  async findByBarcode(barcode: string) {
    return prisma.product.findUnique({
      where: { barcode },
      select: {
        id: true,
        brand: true,
        model: true,
        selling_price: true,
        gst_rate: true,
        is_serialized: true,
        inventory: {
          select: { qty_on_hand: true }
        }
      }
    });
  }

  async getById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        inventory: true,
        category: true,
      }
    });
  }

  async getProducts(category_id?: string, search?: string, low_stock?: boolean) {
    const where: any = {};
    if (category_id) where.category_id = category_id;
    if (search) {
      where.OR = [
        { brand: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
        { barcode: { contains: search } }
      ];
    }
    if (low_stock) {
      where.inventory = {
        qty_on_hand: { lte: 5 } // arbitrary low stock threshold for example
      };
    }

    return prisma.product.findMany({
      where,
      include: {
        inventory: true,
        category: true
      },
      orderBy: { created_at: 'desc' }
    });
  }

  async getCategories() {
    return prisma.category.findMany();
  }

  async getMetadata() {
    return prisma.category.findMany({
      include: { brands: true }
    });
  }

  async deleteCategory(id: string) {
    return prisma.category.delete({ where: { id } });
  }

  async deleteBrand(id: string) {
    return prisma.brand.delete({ where: { id } });
  }
}
