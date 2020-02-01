const express = require('express');
const router = express.Router();
const con = require('./mysql');

router.post('/', (req,res)=>{
    const CurrentEmail=req.session.email;
    let message;
    
    if(req.session.email){
        const sql = `SELECT * FROM user where user_email=${con.escape(CurrentEmail)}`;
        console.log(sql);
        con.query(sql, function (err, result, fields) {
            if (err) {
                console.log(err);
            }else{
                console.log(result.length);
                if(result.length > 0){
                    message = "SELECT OK";
                    console.log(message);
                    res.render('user-info-form', {result});
                    //res.json({message: `${changenickname}`});
                }else{
                    message = "SELECT Fail";
                    console.log(message);
                    
                }
                // res.json({message:message});
            }
        });
    }else{
        res.render('index', {title:"블록체인 기반 SNS 떠벌림", logind:logind, name:req.session.name});
    }
});

module.exports = router;