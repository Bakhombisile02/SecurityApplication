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
            passphrase: process.env.HTTPS_PASSPHRASE,
            
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

// Apply a general Content Security Policy
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"], // Default source is self
        scriptSrc: ["'self'", "https://localhost:4200"], // Allow scripts from self and frontend origin
        styleSrc: ["'self'", "https://localhost:4200", "'unsafe-inline'"], // Allow styles from self, frontend, and inline styles
        imgSrc: ["'self'", "data:"], // Allow images from self and data URIs
        connectSrc: ["'self'", "https://localhost:4200"], // Allow connections to self and frontend origin (for API calls)
        frameAncestors: ["'none'"], // Disallow framing from any domain (similar to X-Frame-Options: DENY)
        formAction: ["'self'"], // Allow forms to submit to self
        objectSrc: ["'none'"], // Disallow <object>, <embed>, <applet>
    }
}));

// It's generally recommended to set frameguard after CSP if you use frameAncestors
// However, helmet sets X-Frame-Options by default, and frameAncestors in CSP is more modern.
// We can remove the specific frameguard call if CSP's frameAncestors is sufficient.
// For now, let's keep both to see if Helmet handles redundancy gracefully or if one should be removed.
app.use(
    helmet({
        frameguard:{ // This might be redundant if CSP frameAncestors is used and effective
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

// Updated CORS configuration
app.use(cors({
    origin: 'https://localhost:4200',
    optionsSuccessStatus: 200,
    methods: "GET, POST, PUT, DELETE, OPTIONS" // Specify allowed methods
}));
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