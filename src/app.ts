import express, { Request, Response, NextFunction} from 'express';
import cors from 'cors';

import userRoutes from './routes/users'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded())

app.use('/users', userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ msg: err.message })
})
app.listen(5000);