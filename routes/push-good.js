
const express = require('express');
const router = express.Router();
const con = require('./mysql');

router.post('/',(req,res,next)=>{
    const goodemail=req.session.email;

    //res.json({message:`${aa}`});

    //let sql = `UPDATE GOOD SET GOOD_YN = '1' WHERE USER_EMAIL = ${con.escape(goodemail)}`;
    let sql = `INSERT INTO good (professdt_no, user_email, good_yn) VALUES (1, ${con.escape(goodemail)}, 1)`;
    //sql = `INSERT INTO user (user_email, password, user_name, nick_name) VALUES (${con.escape(joinEmail)},${con.escape(joinPw)},${con.escape(joinName)},${con.escape(joinNickName)})`;
    console.log(sql);
    con.query(sql, (err, result) =>{
        if (err) {
            console.log(err);
            console.log("fail the good");
            res.json({message:"좋아요 실패",resultCode:'0'});
        }else{
            console.log("insert the good");
            res.json({message:"좋아요 되었습니다.",resultCode:'1'});
            //req.session.destroy();
        }
    });
});

module.exports = router;