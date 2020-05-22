require("dotenv").config();
const express = require("express");
const usersRouter = require("./routes/users");
const transactionsRouter = require("./routes/transactions");
const port =  process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use("/users", usersRouter);
app.use("/transactions", transactionsRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
