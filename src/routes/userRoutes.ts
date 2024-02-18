import express from 'express';
import * as UserController from '../controllers/userController';

const router = express.Router();

router.get('/', UserController.getUsers);
router.get('/:userId', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);

export default router;
