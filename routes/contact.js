// const mysql = require('mysql');
const express = require('express');
const router = express.Router();
// const members = require('./members');
const con = require('./mysql');

router.post('/',(req,res,next)=>{
    
    const joinEmail = req.body.joinEmail;
    const joinPw= req.body.joinPw;
    const joinName = req.body.joinName;
    const joinNickName= req.body.joinNickName;

    let sql = `SELECT * FROM USER WHERE USER_EMAIL=${con.escape(joinEmail)}`;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
        if (err) {
            console.log(err);
            res.json({ message: '회원가입 실패 하셨습니다.', errYn : '1' })
        } else {
            console.log(result.length);
            if (result[0]) {
                res.json({ message: `이메일이 중복됩니다.`, JoinGb: 'email', errYn : '1' });
                
            } else {
                sql = `SELECT * FROM USER WHERE nick_name=${con.escape(joinNickName)}`;
                console.log(sql);
                con.query(sql, function (err, result, fields) {
                    if (err) {
                        console.log(err);
                        res.json({ message: '회원가입 실패 하셨습니다.', errYn : '1'})
                    } else {
                        console.log(result.length);
                        if (result[0]) {
                            res.json({ message: `닉네임이 중복됩니다.`, JoinGb: 'nickname', errYn : '1'});
                        } else {
                            sql = `INSERT INTO user (user_email, password, user_name, nick_name) VALUES (${con.escape(joinEmail)},${con.escape(joinPw)},${con.escape(joinName)},${con.escape(joinNickName)})`;
                            console.log(sql);
                            con.query(sql, (err, result) =>{
                                if (err) {
                                    console.log("insert fail", err);
                                    res.json({message:"회원가입 실패", errYn : '1'});
                                }else{
                                    console.log("1 record inserted");
                                    res.render('join-success-section', {result, message:"회원가입 되었습니다", joinName: `${joinName}`});
                                }
                            });
                        }
                    }
                });
            }
        }
    });
});

module.exports = router;