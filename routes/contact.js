// const mysql = require('mysql');
const express = require('express');
const router = express.Router();
// const members = require('./members');
const con = require('./mysql');

router.post('/',(req,res,next)=>{
    
    console.log("Connected!");
    const name = req.body.name;
    const email = req.body.email;
    const comments= req.body.comments
    var sql = `INSERT INTO members (name, email, comments) VALUES ('${name}','${email}','${comments}')`;
    console.log(sql);
    con.query(sql, (err, result) =>{
        if (err) {
            console.log("insert fail", err);
            res.json({message:"회원가입 실패"});
        }else{
            console.log("1 record inserted");
            res.json({message:"회원가입 되었습니다"});
        }
    });
});

module.exports = router;