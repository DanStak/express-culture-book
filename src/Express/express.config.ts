import express, { type Application } from 'express';
import helmet from "helmet";
import cookieParser from "cookie-parser"
import path from 'path';
// import bodyParser from 'body-parser';
import cors from 'cors';

import mainRouter from '../routes/main';
import { errorHandler } from '../middlewares/error-handler';

const ExpressConfig = (): Application => {
  const app = express();
  
  app.use(helmet());
  app.use(cookieParser());
  app.use(express.json());
  app.use(cors());

  app.use(express.static(path.join(process.cwd(), 'public')));

  app.set('view engine', 'ejs');
  app.set('views', 'src/views');

  app.use(mainRouter);

  // ============= ERROR HANDLING ===================

  app.use(errorHandler);

  return app
}
export default ExpressConfig
