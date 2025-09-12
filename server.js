const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const prisma = require('./db/db.config');
const  webhookData  = require('./Routes/webhook.routes');
const  dataRoutes = require('./Routes/data.routes');

app.use(express.json());

app.use("/api", webhookData);
app.use("/api/data", dataRoutes);


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})