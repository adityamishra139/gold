import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/admin.js";
const app = express();
dotenv.config();
app.use(cookieParser());
app.use(express.json());
<<<<<<< HEAD
app.use(cors(
    {
        origin:["http://localhost:5173"],["https://gold-1yxg.onrender.com"]
        credentials:true,
    }
));
app.use('/api/user',router);
=======
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
>>>>>>> 895845c110e540295bad88fbd155aacefe5934bb

app.listen(process.env.port, async () => {
  console.log("Server is listening on port ", process.env.port);
});
