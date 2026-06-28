 import { ProductsRepository } from './products.repository';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { calculateGst } from '../../lib/gst';

export class ProductsService {
  private repository: ProductsRepository;

  constructor() {
    this.repository = new ProductsRepository();
  }

  async createProduct(data: CreateProductDto) {
    return this.repository.create(data);
  }

  async updateProduct(id: string, data: UpdateProductDto) {
    return this.repository.update(id, data);
  }

  async softDeleteProduct(id: string) {
    return this.repository.softDelete(id);
  }

  async getProduct(id: string) {
    const product = await this.repository.getById(id);
    if (!product) throw new Error('Product not found');
    return product;
  }

  async getProducts(category_id?: string, search?: string, low_stock?: boolean) {
    return this.repository.getProducts(category_id, search, low_stock);
  }

  async getProductByBarcode(barcode: string) {
    const product = await this.repository.findByBarcode(barcode);
    if (!product) throw new Error('Product not found for barcode');

    const gstDetails = calculateGst(Number(product.selling_price), Number(product.gst_rate));

    return {
      id: product.id,
      name: `${product.brand} ${product.model}`,
      price: product.selling_price,
      gst_rate: product.gst_rate,
      ...gstDetails,
      current_stock: product.inventory?.qty_on_hand || 0,
      is_serialized: product.is_serialized
    };
  }

  async getCategories() {
    return this.repository.getCategories();
  }

  async getMetadata() {
    return this.repository.getMetadata();
  }

  async deleteCategory(id: string) {
    return this.repository.deleteCategory(id);
  }

  async deleteBrand(id: string) {
    return this.repository.deleteBrand(id);
  }
}
