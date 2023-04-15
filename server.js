require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productsController = require("./controllers/productsController");
const usersController = require("./controllers/usersController");
const ordersController = require("./controllers/ordersController");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log("MongoDB - Connected");
});

app.use("/api/products", productsController);
app.use("/api/users", usersController);
app.use("/api/orders", ordersController);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server running: ${PORT} - http://localhost:${PORT}`);
});
