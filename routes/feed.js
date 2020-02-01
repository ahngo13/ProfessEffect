const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require('path');
const con = require('./mysql');

let storage = multer.diskStorage({
    destination: function(req, file ,callback){
        callback(null, "upload/")
    },
    filename: function(req, file, callback){
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        callback(null, basename + "-" + Date.now() + extension);
    }
});

const upload = multer({
    dest: "upload/",
    storage: storage
});

router.post('/', (req,res)=>{
    
    if(req.session.email){
        logind=1;
        res.render('feed-write-form', {});
    }else{
        res.render('index', {});
    }
});

router.post('/write', upload.single("imgFile"),(req,res)=>{
    
    if(req.session.email){
        const file = req.file

        const result = {
            originalName : file.originalname,
            size : file.size,
        }

        res.json(result);

    }else{
        res.render('index', {});
    }

});

module.exports = router;