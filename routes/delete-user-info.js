
const express = require('express');
const router = express.Router();
const con = require('./mysql');

router.post('/',(req,res,next)=>{

    const userInfoEmail = req.body.userInfoEmail;

    let sql = `UPDATE USER SET USE_YN = '0' WHERE USER_EMAIL = '${userInfoEmail}'`;
    con.query(sql, (err, result) =>{
        if (err) {
            console.log("delete fail");
            res.json({message:"탈퇴 실패"});
        }else{
            console.log("USE_YN UPDATE");
            res.json({message:"탈퇴되었습니다."});
        }
    });
});

module.exports = router;