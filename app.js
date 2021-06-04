require('dotenv').config()
const express = require('express')
const app = express() // var 
const mongoose = require('mongoose') 
const routes = require('./routes')
var cors = require('cors')
const multer = require('multer')
const bodyParser=require('body-parser')
const http = require("http");
const fs = require("fs");

var path = require('path');
require('dotenv/config');

app.use(cors());

//* connect to db
const DB_URI = process.env.DB_URI
mongoose.connect(DB_URI, (err) => {
   if (err) throw new Error(err)
   console.log(`connected to db on ${DB_URI}`);
})




//* body parser activation
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//* routes activation
app.use('', routes);



//upload

var imgModel = require('./models/imageUpload');


// Set EJS as templating engine
app.set("view engine", "ejs");



 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, 'imageUploaded' + '-' + Date.now()+'.png')
    }
});
 
var upload = multer({ storage: storage });
// Step 7 - the GET request handler that provides the HTML UI
 
app.get('/', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});
// Step 8 - the POST handler for processing the uploaded file

app.post('/uploadImage', upload.single('image'), (req, res, next) => {

	var obj = {
		name: req.body.name,
		desc: req.body.desc,
		img: {
			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
			contentType: 'image/png'
		}
	}
	imgModel.create(obj, (err, item) => {
		if (err) {
			console.log(err);
		}
		else {
			// item.save();
            console.log('Image uploaded with success.. gg');
			res.status(200).send('ok mriguel');
		}
	});
});


//


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})