import dotenv from 'dotenv';
dotenv.config();
/* import { startSequelize  } from './models'; */
import app from './app';
/* import envs from './models/configDBs' */
import * as admin from 'firebase-admin';
const PORT = process.env.PORT;


admin.initializeApp();

/* const envRunning = process.env.ENVIRONMENT === 'testing' ? envs.test  : envs.dev  */ 

app.listen(PORT, async () => {
    try {
/*         const sequelize = startSequelize(envRunning.database, envRunning.passwd, envRunning.host, envRunning.username);
        await sequelize.sync({ force: process.env.ENVIRONMENT === 'testing' }); */
        console.info('DB and Express server is up and running!!!!')
        /* console.info(process.env.ENVIRONMENT) */
    } catch (error) {
        console.error(error);
        process.abort();
    }
})