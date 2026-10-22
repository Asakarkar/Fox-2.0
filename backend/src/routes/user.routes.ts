import { Router } from 'express';
import { getCurrentUserController } from '../controllers/user.controller.js';

const userRoutes = Router();

userRoutes.get('/current', getCurrentUserController);

export default userRoutes;
