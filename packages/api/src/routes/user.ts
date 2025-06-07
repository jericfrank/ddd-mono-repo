import express from 'express';
import { getAll, deleteById } from '../controllers/user';

const router = express.Router();

router.get('/', getAll);
router.delete('/:id', deleteById);

export default router;
