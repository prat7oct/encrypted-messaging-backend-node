const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const user_router = require("./src/modules/user/route/user.route.js");

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use("/api/user", user_router);

app.listen(8080, () => {
    console.log("Server Started");
})