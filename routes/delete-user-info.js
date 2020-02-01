
const express = require('express');
const router = express.Router();
const con = require('./mysql');

router.post('/',(req,res,next)=>{

    const userInfoEmail = req.body.userInfoEmail;

    let sql = `UPDATE USER SET USE_YN = '0' WHERE USER_EMAIL = ${con.escape(userInfoEmail)}`;
    console.log(sql);
    con.query(sql, (err, result) =>{
        if (err) {
            console.log("delete fail");
            res.json({message:"탈퇴 실패",resultCode:'0'});
        }else{
            console.log("USE_YN UPDATE");
            res.json({message:"탈퇴 되었습니다.",resultCode:'1'});
            req.session.destroy();
        }
    });
});

module.exports = router;