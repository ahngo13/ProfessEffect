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
        if(req.body.professNo != undefined && req.body.professDtNo != undefined){
            console.log('professNo');
            const sql = `SELECT PROFESSDT.*,CATEGORY_CODE FROM PROFESSDT INNER JOIN PROFESSM ON PROFESSDT.PROFESS_NO=PROFESSM.PROFESS_NO WHERE PROFESSDT.PROFESS_NO=${con.escape(req.body.professNo)} AND PROFESSDT.PROFESSDT_NO=${con.escape(req.body.professDtNo)}`;
            console.log(sql);
            con.query(sql, function (err, result, fields) {
                if (err) {
                    console.log(err);
                }else{
                    console.log(result.length);
                    if(result.length > 0){
                        console.log("FEEDFORM DATA SELECT OK");
                        res.render('feed-write-form', {insertYn:'0', result});
                    }else{
                        res.json({resultCode : "500"});
                    }
                }
            });

        }else{
            res.render('feed-write-form', {insertYn:'1'});
        }
    }else{
        res.render('index', {});
    }
});

router.post('/write', upload.single("imgFile"),(req,res)=>{
    
    if(req.session.email){
        const file = req.file
        console.log(file);
/*         const result = {
            originalName : file.originalname,
            size : file.size,
        } */
       
        let sql;
        if(file == undefined){
            sql = `INSERT INTO PROFESSM(PROFESS_TITLE, PROFESS_CONTENT, NICK_NAME, USER_EMAIL, CATEGORY_CODE)
            VALUES (${con.escape(req.body.title)},${con.escape(req.body.content)},${con.escape(req.session.nickName)},${con.escape(req.session.email)},${con.escape(req.body.category)})`;
        }else{
            sql = `INSERT INTO PROFESSM(PROFESS_TITLE, PROFESS_CONTENT, NICK_NAME, USER_EMAIL, IMG_PATH, CATEGORY_CODE)
            VALUES (${con.escape(req.body.title)},${con.escape(req.body.content)},${con.escape(req.session.nickName)},${con.escape(req.session.email)},${con.escape(file.filename)},${con.escape(req.body.category)})`;
        }

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

router.post('/update', upload.single("imgFile"),(req,res)=>{
    
    if(req.session.email){
        const file = req.file
        console.log(file);
       
        let sql;
        if(file == undefined){
            if(req.body.imgPath){
                //PROFESS 2번째 ROW부터는 카테고리 수정이 불가능하도록 처리 필요
                sql = `UPDATE PROFESSDT SET PROFESS_TITLE=${con.escape(req.body.title)} , PROFESS_CONTENT=${con.escape(req.body.content)}, IMG_PATH=${con.escape(req.body.imgPath)},UPDATE_DATE=NOW() WHERE PROFESS_NO=${con.escape(req.body.professNo)} AND PROFESSDT_NO=${con.escape(req.body.professDtNo)};`;
            }else{
                sql = `UPDATE PROFESSDT SET PROFESS_TITLE=${con.escape(req.body.title)} , PROFESS_CONTENT=${con.escape(req.body.content)}, UPDATE_DATE=NOW() WHERE PROFESS_NO=${con.escape(req.body.professNo)} AND PROFESSDT_NO=${con.escape(req.body.professDtNo)};`;
            }
        }else{
            sql = `UPDATE PROFESSDT SET PROFESS_TITLE=${con.escape(req.body.title)} , PROFESS_CONTENT=${con.escape(req.body.content)}, IMG_PATH=${con.escape(file.filename)},`;
        }

        console.log(sql);
        con.query(sql, function (err, result, fields) {
            if (err) {
                console.log(err);
                res.json({resultCode:"500"});
            }else{
                if(file == undefined){
                    if(req.body.imgPath){
                        sql = `UPDATE PROFESSM SET PROFESS_TITLE=${con.escape(req.body.title)}, PROFESS_CONTENT=${con.escape(req.body.content)}, IMG_PATH=${con.escape(req.body.imgPath)}, CATEGORY_CODE=${con.escape(req.body.category)}, UPDATE_DATE=NOW() WHERE PROFESS_NO=${con.escape(req.body.professNo)}`;
                    }else{
                        sql = `UPDATE PROFESSM SET PROFESS_TITLE=${con.escape(req.body.title)}, PROFESS_CONTENT=${con.escape(req.body.content)}, CATEGORY_CODE=${con.escape(req.body.category)}, UPDATE_DATE=NOW() WHERE PROFESS_NO=${con.escape(req.body.professNo)}`;
                    }
                }else{
                    sql = `UPDATE PROFESSM SET PROFESS_TITLE=${con.escape(req.body.title)}, PROFESS_CONTENT=${con.escape(req.body.content)}, IMG_PATH=${con.escape(file.filename)}, CATEGORY_CODE=${con.escape(req.body.category)}, UPDATE_DATE=NOW() WHERE PROFESS_NO=${con.escape(req.body.professNo)}`;
                }
                con.query(sql, function (err, result, fields) {
                    if (err) {
                        console.log(err);
                        res.json({resultCode:"500"});
                    }else{
                        console.log("processm, processdt 1 record update");
                        res.json({resultCode:"200"});
                    }
                });
            }
        });

    }else{
        res.render('index', {});
    }

});

router.post('/delete', (req,res)=>{
    
    if(req.session.email){
       
        let sql = `DELETE FROM PROFESSDT WHERE PROFESS_NO=${con.escape(req.body.professNo)} AND PROFESSDT_NO=${con.escape(req.body.professDtNo)}`;
        console.log(sql);
        con.query(sql, function (err, result, fields) {
            if (err) {
                console.log(err);
                res.json({resultCode:"500"});
            }else{
                console.log("processdt 1 record delete");
                sql = `DELETE FROM PROFESSM WHERE PROFESS_NO=${con.escape(req.body.professNo)}`;
                console.log(sql);
                if(req.body.professDtNo == '1'){
                    con.query(sql, function (err, result, fields) {
                        if (err) {
                            console.log(err);
                            res.json({resultCode:"500"});
                        }else{
                            console.log("processm record delete");
                            res.json({resultCode:"200"});
                        }
                    });
                }
            }
        });

    }else{
        res.render('index', {});
    }

});

router.post('/more', (req,res)=>{
    
    if(req.session.email){
            
            const sql = `SELECT R1.* FROM(
                SELECT * FROM PROFESSDT
                order by PROFESSDT.PROFESS_NO DESC
                )R1
                LIMIT ${req.body.list} OFFSET ${req.body.start}`;
            console.log(sql);
            con.query(sql, function (err, result, fields) {
                if (err) {
                    console.log(err);
                }else{
                    console.log(result.length);
                    if(result.length > 0){
                        console.log("FEEDLIST SELECT OK");
                        res.render('common/feed-list', {result, dataYn : '1', loginEmail : req.session.email});
                    }else{
                        res.json({list: req.body.list,start:req.body.start,moreYn:'0'});
                        //res.render('common/feed-list', {dataYn : '0'});
                    }
                    // res.json({message:message});
                }
            });
    }else{
        res.json({logind:'0'});
    }

});

module.exports = router;