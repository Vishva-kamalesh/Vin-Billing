import { Router } from 'express';
import { ProductsController } from './products.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();
const controller = new ProductsController();

router.use(authenticate);

router.get('/barcode/:code', controller.getProductByBarcode);
router.get('/categories', controller.getCategories);
router.get('/metadata', controller.getMetadata);
router.delete('/categories/:id', controller.deleteCategory);
router.delete('/brands/:id', controller.deleteBrand);

router.get('/', controller.getProducts);
router.post('/', controller.createProduct);
router.get('/:id', controller.getProduct);
router.patch('/:id', controller.updateProduct);
router.delete('/:id', controller.softDeleteProduct);

export default router;
