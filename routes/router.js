var appRouter = function(app){

	var db = require('./db.js');
	var profile = require('../common/upProfile.js');

	app.get('/', (req, res) => {
		res.send("API working");
	})

	// File upload 
	var multer = require('multer')
	var storage = multer.diskStorage({
	    destination: function (request, file, callback) {
	        callback(null, './uploads/');
	    },
	    filename: function (request, file, callback) {
	        console.log(file);
	        callback(null, file.originalname)
	    }
	});
	var upload = multer({ storage: storage });

	app.post('/register',  (req, res, next) => {
		console.log('Register called')
		res.header("Access-Control-Allow-Origin", "*");
	// app.post('/register', upload.single('profile'), (req, res, next) => {
		var user = {
			"name": req.body.uname,
			"password": req.body.password,
			// "profile": req.files.profile.name
			"profile": profile.uploadFile(req.files)
		}
		console.log(user);
		db.query("INSERT into users SET ?", [user], (err, result) => {
			if(err){
				res.setHeader('content-type', 'application/json');
			} else {
				res.setHeader('content-type', 'application/json');
				res.send(JSON.stringify({"status": 200, "error": null, "response": "User registration successfull."}));
			}

		});

	});

	app.get('/user/:id', (req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		var id = req.params.id;
		console.log(id)
		db.query("SELECT * FROM users WHERE id=?", [id], (err, row) => {
			if(err) throw err;
			res.setHeader('content-type', 'application/json');
			res.send(JSON.stringify({"status": 200, "error": null, "response": row}))
		});
	})

	app.get('/users', (req, res, next) => {
		console.log('Called')
		res.header("Access-Control-Allow-Origin", "*");
		db.query("SELECT * FROM users", (err, row) => {
			if(err) throw err;
			res.setHeader('content-type', 'application/json');
			res.json({"status": 200, "error": null, "response": row});
		});
	})

}

module.exports = appRouter;