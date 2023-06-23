require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500



app.get("/chat", () => {
    console.log("Called the chatty route...")
})


app.listen(PORT, () => {
    console.log(`Server is Listening on PORT ${PORT}`);
})

