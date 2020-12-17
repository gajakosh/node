const express = require("express");
const fileUpload = require('express-fileupload');
const path = require("path");
const bodyParser = require("body-parser");
var cors = require('cors')
const port = process.env.PORT || 3000;

const app = express();
app.use(fileUpload({
	createParentPath: true
}))

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname));

const routes = require('./routes/router.js')(app);

app.listen(port, () => {
	console.log("Server running at %s...", port);
})