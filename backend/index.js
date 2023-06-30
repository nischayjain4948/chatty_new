require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const {ConnectDB} = require("./config/db");


// MiddileWare
app.use(express.json());
app.use(cors());
ConnectDB();

//  All userRoutes must be placed here only.
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is Listening on PORT ${PORT}`);
})

