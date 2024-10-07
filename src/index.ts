import express, { Request, Response } from 'express';
import connectDB from './config/db';
import userRouter from './routes/userRoutes' ;
import adminRouter from "./routes/adminRoutes";
import customerRouter from "./routes/customerRoutes"
import farmerRouter from './routes/farmerRoutes';

const app = express();

// const { PORT } = require("./config/serverConfig");
const PORT=3000



// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use("/user",userRouter)
app.use("/admin",adminRouter)
app.use("/customer",customerRouter)
app.use("/farmer",farmerRouter)



app.listen(PORT, async () => {
  console.log(`app listening at port ${PORT}`);
  await connectDB();
});