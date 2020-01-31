// const mysql = require('mysql');
const express = require('express');
const router = express.Router();
// const members = require('./members');
const con = require('./mysql');

router.post('/',(req,res,next)=>{
    
    console.log("Connected!");
    const joinEmail = req.body.joinEmail;
    const joinPw= req.body.joinPw;
    const joinName = req.body.joinName;
    const joinNickName= req.body.joinNickName;

    let sql = `SELECT * FROM USER WHERE USER_EMAIL='${joinEmail}'`;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
        if (err) {
            console.log(err);
            res.json({ message: '회원가입 실패 하셨습니다.' })
        } else {
            console.log(result.length);
            if (result[0]) {
                res.json({ message: `이메일이 중복됩니다.`, JoinGb: 'email' });
                
            } else {
                sql = `SELECT * FROM USER WHERE nick_name='${joinNickName}'`;
                console.log(sql);
                con.query(sql, function (err, result, fields) {
                    if (err) {
                        console.log(err);
                        res.json({ message: '회원가입 실패 하셨습니다.'})
                    } else {
                        console.log(result.length);
                        if (result[0]) {
                            res.json({ message: `닉네임이 중복됩니다.`, JoinGb: 'nickname'});
                        } else {
                            sql = `INSERT INTO user (user_email, password, user_name, nick_name) VALUES ('${joinEmail}','${joinPw}','${joinName}','${joinNickName}')`;
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
                        }
                    }
                });
            }
        }
    });
});

module.exports = router;