import express, { Request, Response, NextFunction} from 'express';
import cors from 'cors';
import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config();

import userRoutes from './routes/users'
import { queryFun } from './database/db';
import { initialQuery } from './database/query'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRoutes);
try {
    
} catch (error) {
    
}

const sequelize = new Sequelize(process.env.DATABASE!, process.env.DBUSER!, process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: 'postgres',
        port: +process.env.PORT!
    })
    sequelize.authenticate().then(async() => {
        console.log('Connection has been established successfully.')
        try {
            let queryres = await queryFun( initialQuery )
            console.log("from try");
        } catch (error) {
            console.log('catchcc', error)
        }
        
    }).catch(err => {
        
        console.error('Unable to connect to the database:', err)
    })

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ msg: err.message })
})
app.listen(5000);