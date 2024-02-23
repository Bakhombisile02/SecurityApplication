// Desc: Main entry point for the application
require('dotenv').config();
const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const cors = require('cors');
const hsts = require('./middleware/hsts');
const mongoose = require('mongoose');
const morgan = require('morgan')
const rateLimit = require('express-rate-limit');


//set port
const port = 3000;
 
//----------------------------------------------------
//listen 
const server = https.createServer(
        {
            key: fs.readFileSync('./keys/key.pem'),
            cert: fs.readFileSync('./keys/cert.pem'),
            passphrase: 'apds',
            
        },
        app
    )
.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

server.on('error', (error) => {
    console.error('Server error:',error);
});

//----------------------------------------------------
//connect to mongodb
mongoose
.connect(process.env.MONGODB_URL)
.then(()=>console.log('Connected to MongoDB...'));

//----------------------------------------------------
//Middleware
app.use(helmet());

app.use(
    helmet({
        frameguard:{
            action: 'deny'
        },
    })
);

app.use(morgan('combined'));

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });
  
  app.use(limiter);
  
app.use(cors({origin: 'https://localhost:4200', optionsSuccessStatus: 200}));
app.use(express.json());
app.use(hsts);

//----------------------------------------------------
//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/posts', require('./routes/posts'));

//----------------------------------------------------
// allow frontend to access the API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});

//----------------...ooo000 End of file 000ooo...------------------------