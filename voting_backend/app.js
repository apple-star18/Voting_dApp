const express = require("express");
const bodyParser = require("body-parser");

const candidatesRouter = require("./routes/candidates");
const voteRouter = require("./routes/vote");
const winnerRouter = require("./routes/winner");

const app = express();
app.use(bodyParser.json());

app.use("/candidates", candidatesRouter);
app.use("/vote", voteRouter);
app.use("/winner", winnerRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});