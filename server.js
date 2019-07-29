const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const htmlRoute = require('./app/routing/htmlRoute');
const apiRoute = require('./app/routing/apiRoute')

app.use('/', htmlRoute)
app.use('./api', apiRoute)


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});