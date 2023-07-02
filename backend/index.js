require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const {ConnectDB} = require("./config/db");
const {notFound, errorHandler} = require("./middleware/errorMiddleware");


// MiddileWare
app.use(express.json());
app.use(cors());
ConnectDB();

//  All userRoutes must be placed here only.
app.use("/api/user", userRoutes);

// middleWares Functions..
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is Listening on PORT ${PORT}`);
})

