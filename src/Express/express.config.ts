import express, { type Application, Request, Response, NextFunction } from 'express';
import helmet from "helmet";
import cookieParser from "cookie-parser"
import path from 'path';
import bodyParser from 'body-parser';

import mainRouter from '../routes/main';

const ExpressConfig = (): Application => {
  const app = express();
  
  app.use(helmet());
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use(express.static(path.join(process.cwd(), 'public')));

  app.set('view engine', 'ejs');
  app.set('views', 'src/views');

  app.use(mainRouter);

  // ============= ERROR HANDLING ===================

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  });


  return app
}
export default ExpressConfig
