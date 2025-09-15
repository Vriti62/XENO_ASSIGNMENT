const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const prisma = require('./db/db.config');
const  webhookData  = require('./Routes/webhook.routes');
const  dataRoutes = require('./Routes/data.routes');
const userRoutes = require('./Routes/user.routes');


const cors = require('cors');

app.use(cors({
  origin: 'https://xeno-assignment-2f.onrender.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

app.use("/api", webhookData);
app.use('/api/user', userRoutes);
app.use("/api/data",  dataRoutes);


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})