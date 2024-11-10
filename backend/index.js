import express from "express";
import cors from 'cors';
import sessions from 'express-session';
import dotenv from 'dotenv';
import db from './config/database.js';
import SequelizeStore from 'connect-session-sequelize';
import UserRoute from './routes/UserRoute.js';
import ProductRoute from './routes/ProductRoute.js';
import AuthRoute from './routes/AuthRoute.js';
import FormsRoute from "./routes/FormRoute.js";
import AdvertisementRoute from "./routes/AdvertisementRoute.js";
import ResultRoute from "./routes/ResultRoute.js";
import RouteRoute from "./routes/RouteRoute.js";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(sessions.Store);

const store = new sessionStore({
    db: db,
});


//(async() => {
//   await db.sync();
//}) (); 

app.use(sessions( {
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { 
        secure: 'auto'
     }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(fileUpload());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);
app.use(FormsRoute);
app.use(AdvertisementRoute);
app.use(ResultRoute);
app.use(RouteRoute);

//store.sync();

app.listen(process.env.APP_PORT,() => {
    console.log('Server running');
});
