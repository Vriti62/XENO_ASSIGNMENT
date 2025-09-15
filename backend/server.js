const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const prisma = require("./db/db.config");

const webhookData = require("./Routes/webhook.routes");
const dataRoutes = require("./Routes/data.routes");
const userRoutes = require("./Routes/user.routes");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);


app.use("/", webhookData);
app.use("/user", userRoutes);
app.use("/data", dataRoutes);


app.use(express.static(path.join(__dirname, "build")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
