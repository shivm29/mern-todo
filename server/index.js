import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import Connection from './database/db.js';
import Routes from './routes/route.js';

const app = express();


app.use(cors());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', Routes);

const PORT = process.env.PORT || 8000;

Connection();

if(process.env.NODE_ENV == 'production') {
    app.use(express.static("client/build"))
}

app.listen(PORT, () => console.log(`Your server is running successfully on PORT ${PORT}`));