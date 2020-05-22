const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port =  process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
    response.send('API is working');
});

app.listen(port, () => console.log(`App is listening on port ${port}`));