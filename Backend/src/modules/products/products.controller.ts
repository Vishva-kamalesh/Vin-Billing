import { Request, Response, NextFunction } from 'express';
import { ProductsService } from './products.service';
import { CreateProductSchema, UpdateProductSchema } from './products.dto';

export class ProductsController {
  private service: ProductsService;

  constructor() {
    this.service = new ProductsService();
  }

  getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category_id = req.query.category_id as string;
      const search = req.query.search as string;
      const low_stock = req.query.low_stock === 'true';

      const products = await this.service.getProducts(category_id, search, low_stock);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };

  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = CreateProductSchema.parse(req.body);
      const product = await this.service.createProduct(validated);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  };

  getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await this.service.getProduct(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };

  updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = UpdateProductSchema.parse(req.body);
      const product = await this.service.updateProduct(req.params.id, validated);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };

  softDeleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.softDeleteProduct(req.params.id);
      res.status(200).json({ message: 'Product soft deleted' });
    } catch (error) {
      next(error);
    }
  };

  getProductByBarcode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await this.service.getProductByBarcode(req.params.code);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };

  getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await this.service.getCategories();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  };

  getMetadata = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const metadata = await this.service.getMetadata();
      res.status(200).json(metadata);
    } catch (error) {
      next(error);
    }
  };

  deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.deleteCategory(req.params.id);
      res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
      next(error);
    }
  };

  deleteBrand = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.deleteBrand(req.params.id);
      res.status(200).json({ message: 'Brand deleted' });
    } catch (error) {
      next(error);
    }
  };
}
