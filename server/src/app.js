import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRoutes from './routes/user.js';
import AdminRoutes from './routes/admin.js';
import cookieParser from 'cookie-parser';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static(join(__dirname, '../uploads')));
app.use(cors({
    origin: ["http://localhost:5174"],
    credentials: true,
}));
app.use('/api/user', UserRoutes);
app.use('/api/admin', AdminRoutes);

app.listen(process.env.port, async () => {
    console.log("Server is listening on port", process.env.port);
});
