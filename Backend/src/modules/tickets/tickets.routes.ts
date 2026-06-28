import { Router } from 'express';
import { TicketsController } from './tickets.controller';
import { authenticate } from '../../middleware/auth.middleware';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();
const controller = new TicketsController();

// Setup Multer for photos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(process.cwd(), 'uploads', 'service', req.params.id);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.use(authenticate);

// Kanban specific
router.get('/kanban', controller.getKanbanBoard);

router.get('/', controller.getTickets);
router.post('/', controller.createTicket);
router.get('/:id', controller.getTicket);
router.patch('/:id', controller.updateTicket);

router.patch('/:id/assign', controller.assign);
router.post('/:id/visits', controller.logVisit);

// Photos endpoint with multer array max 10
router.post('/:id/photos', upload.array('photos', 10), controller.uploadPhotos);

export default router;
