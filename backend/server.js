const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
app.use(cookieParser()); 
const prisma = require('./db/db.config');
const  webhookData  = require('./Routes/webhook.routes');
const  dataRoutes = require('./Routes/data.routes');
const userRoutes = require('./Routes/user.routes');

app.use(express.urlencoded({extended: true}))

app.options('*', cors({
  origin: "https://xeno-assignment-2.onrender.com",
  credentials: true
}));


app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf; 
    }
  })
);


app.use("/api", webhookData);
app.use('/api/user', express.json(), userRoutes);
app.use("/api/data", express.json(), dataRoutes);


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})