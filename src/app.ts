import express, { Request, Response, NextFunction} from 'express';
import cors from 'cors';
import { Sequelize } from 'sequelize'


import userRoutes from './routes/users'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRoutes);

    database: "testdb"
const sequelize = new Sequelize('testdb', 'postgres', 'iharshk@123',
    {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
    })
    sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.')
    }).catch(err => {
    console.error('Unable to connect to the database:', err)
    })
    // sequelize.sync({ alter: true })
    /* .then(function (instance) {
    return instance.updateAttributes({ syncedAt: sequelize.fn('NOW') })
    }) */

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ msg: err.message })
})
app.listen(5000);