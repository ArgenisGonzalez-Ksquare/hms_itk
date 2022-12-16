import dotenv from 'dotenv';
dotenv.config();
import { startSequelize  } from './models';
import app from './app';
/* import envs from './models/configDBs' */
import * as admin from 'firebase-admin';


const PORT = <string>process.env.PORT;
const DB = <string>process.env.DB_NAME;
const PASSWD = <string>process.env.DB_PASS;
const USER = <string>process.env.DB_USER;
const HOST = <string>process.env.localhost;


admin.initializeApp();

/* const envRunning = process.env.ENVIRONMENT === 'testing' ? envs.test  : envs.dev  */ 

app.listen(PORT, async () => {
    try {
const sequelize = startSequelize(DB, PASSWD, HOST, USER);
        await sequelize.sync(); 
        console.info('DB and Express server is up and running!!!!')
        console.info(process.env.ENVIRONMENT)
    } catch (error) {
        console.error(error);
        process.abort();
    }
})