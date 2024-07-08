import express from 'express'
import path from "path"
import {router as userRouter} from './routes/user.js'
import { connectMongoDb } from './connection.js';

const app = express()
const PORT = 8000;

connectMongoDb(
    'mongodb+srv://vedunaik777:jaibhavani@cluster1.8gmaklo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1'
);

app.set('view engine', "ejs")
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({extended: false}));
app.use('/user', userRouter)
app.get("/", (req, res)=> {
    res.render('home')
})

app.listen(PORT, ()=> console.log(`Server Started at PORT:${PORT}`))