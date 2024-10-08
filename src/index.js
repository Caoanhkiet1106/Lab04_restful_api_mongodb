const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routers/index');
const app = express()

dotenv.config();

app.use(express.json());

const { engine } = require('express-handlebars');
app.engine('hbs',  engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.set('views', './src/resources/views');

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(() => {
    console.log("Database is connected succsessfully.")
    app.listen(PORT, (() => {
        console.log(`Server running at http://localhost:${PORT}`)
    }))
}).catch((error) => { console.log(error) })


routes(app)