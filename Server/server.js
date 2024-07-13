const express = require('express')
const dbConnect = require('./database/index')
const cookieParser=require('cookie-parser')
const {PORT} =  require('./config/index')
const router = require('./routes/index');
const errorHandler=require('./middleware/errorHandler')
const http = require('http');


const app = express();
const server = http.createServer(app);


const cors = require('cors')

const corsOption={
    credentials:true,
    origin:['http://localhost:4200']
}

dbConnect()

app.use(express.urlencoded({extended:false}));

app.use(express.json());

app.use(cookieParser());

app.use(cors(corsOption)); // to attach frontend with backend

app.use(router);

app.use(errorHandler);

server.listen(PORT , console.log(`server started at port : ${PORT}`));