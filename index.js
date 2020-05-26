require("dotenv").config();
const express = require("express");
const usersRouter = require("./routes/users");
const transactionsRouter = require("./routes/transactions");
const port =  process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use("/users", usersRouter);
app.use("/transactionsapi", transactionsRouter);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
    // set static folder
    app.use(express.static("client/build"));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Server is listening on port ${port}`));
