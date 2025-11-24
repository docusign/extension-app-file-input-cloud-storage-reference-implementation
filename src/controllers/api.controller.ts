import { Router } from 'express';
import Paths from '../constants/paths';
import getFileRouter from './getfile.controller';
import authRouter from './auth.controller';

const apiRouter = Router();

apiRouter.use(Paths.Get.Base, getFileRouter);

apiRouter.use(Paths.Auth.Base, authRouter);

export default apiRouter;
