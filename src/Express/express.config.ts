import express, { type Application } from 'express';
import helmet from "helmet";
import cookieParser from "cookie-parser"

const ExpressConfig = (): Application => {
  const app = express();
  
  app.use(helmet());
  app.use(cookieParser())

  return app
}
export default ExpressConfig
