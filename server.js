const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const prisma = require('./db/db.config');
const { webhookData } = require('./Controllers/webhook.controller');

app.use(express.json());

app.post("/api/webhook", webhookData);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})