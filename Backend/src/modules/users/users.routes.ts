import { Router } from 'express';
import { UsersController } from './users.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { authorize } from '../../middleware/rbac.middleware';

const router = Router();
const controller = new UsersController();

router.use(authenticate);
router.use(authorize('ADMIN', 'SUPER_ADMIN'));

router.get('/', controller.getAllUsers);
router.post('/', controller.createUser);
router.patch('/:id', controller.updateUser);
router.patch('/:id/deactivate', controller.deactivateUser);

export default router;
