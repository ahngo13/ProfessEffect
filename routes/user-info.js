const express = require('express');
const router = express.Router();
const con = require('./mysql');

router.post('/', (req,res)=>{
    const CurrentEmail=req.session.email;
    let message;
    
    const sql = `SELECT * FROM user where user_email='${CurrentEmail}'`;
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
});

module.exports = router;