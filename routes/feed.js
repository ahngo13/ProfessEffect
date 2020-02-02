const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require('path');
const con = require('./mysql');

let storage = multer.diskStorage({
    destination: function(req, file ,callback){
        callback(null, "public/upload/")
    },
    filename: function(req, file, callback){
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        callback(null, Date.now() + extension);
    }
});

const upload = multer({
    dest: "public/upload/",
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

/*         const result = {
            originalName : file.originalname,
            size : file.size,
        } */
        let sql = `INSERT INTO PROFESSM(PROFESS_TITLE, PROFESS_CONTENT, NICK_NAME, USER_EMAIL, IMG_PATH, CATEGORY_CODE)
        VALUES (${con.escape(req.body.title)},${con.escape(req.body.content)},${con.escape(req.session.nickName)},${con.escape(req.session.email)},${con.escape(file.filename)},${con.escape(req.body.category)})`;
        console.log(sql);
        con.query(sql, function (err, result, fields) {
            if (err) {
                console.log(err);
                res.json({resultCode:"500"});
            }else{
                console.log("processm 1 record inserted");
                res.json({resultCode:"200"});
            }
        });

    }else{
        res.render('index', {});
    }

});

module.exports = router;