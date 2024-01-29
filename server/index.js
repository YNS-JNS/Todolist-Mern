const express = require("express");
const logger = require("morgan")
const cors = require("cors");

const PORT = 8000;

const app = express();
app.use(logger('dev'));

const corsOptions = {
    origin: "http://localhost:5173"
}

app.use(cors(corsOptions));

app.get("/test", (req, res) => {
    res.json({ data: "Data from Server" });
})

app.listen(PORT, () => {
    console.log(`Server is running ${PORT}.`);
})