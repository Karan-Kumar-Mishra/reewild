import  type { Express} from "express";
import  express  from "express";
import cors from "cors";
import routes from "./routers/estimate.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { setupSwagger } from "./swagger.js";


const app:Express  = express();
console.log("checking..")
setupSwagger(app);

app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

export default app;
