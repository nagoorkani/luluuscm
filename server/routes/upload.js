/**
 * Created by z062281 on 3/26/15.
 */

var express = require('express');
var router = express.Router();
var multer = require('multer');
var done            = false;

router.use(multer({ dest: './uploads/',
    rename: function (fieldname, filename) {
        return filename+Date.now();
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
        done=true;
    }
}));

/* GET home page. */
router.get('/photo', function(req, res) {
    console.log(" ~~~~~~~~~~ Get files ~~~~~~~~~~ ");
    res.json({'file': 'filename'});
});

router.post('/photo', function(req, res){
    console.log(" --------- upload photo --------- ");
    if(done==true){
        console.log(req.files.file.path);
        var jsonString = {
            'file': req.files.file.path,
            'status': 'File uploaded!'
        };
        res.end( JSON.stringify(jsonString) );
    }
});

module.exports = router;
