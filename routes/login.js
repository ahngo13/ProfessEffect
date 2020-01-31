const express = require('express');
const router = express.Router();
const con = require('./mysql');

router.post('/', (req,res)=>{
    let message;
    
    const sql = `SELECT * FROM user where user_email='${req.body.email}' and password='${req.body.pw}'`;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
        if (err) {
            console.log(err);
        }else{
            console.log(result.length);
            if(result.length > 0){
                req.session.email = req.body.email;
                req.session.nickname  = result[0].nick_name;
                message = "login ok";
                console.log(message);
                res.render('feed-main-section', {nickname:req.session.nickname, result});
            }else{
                message = "login Fail";
                console.log(message);
            }
            // res.json({message:message});
        }
    });

});

module.exports = router;