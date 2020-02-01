const express = require('express');
const router = express.Router();
const con = require('./mysql');

router.post('/',(req,res,next)=>{
    console.log("TEST Connected!");
    const userInfoEmail = req.body.userInfoEmail;
    const userInfoPw= req.body.userInfoPw;
    const userInfoPwCheck= req.body.userInfoPwCheck;
    const userInfoName = req.body.userInfoName;
    const userInfoNickjName= req.body.userInfoNickjName;

    let sql;

    if(userInfoNickjName == '' || userInfoNickjName==undefined){
        console.log("No Input Nickname");
        res.json({message:"\'닉네임\'을 입력하세요.", EditGb:"nickname"});
        return;
    }else if(userInfoPw == '' || userInfoPw==undefined){
        console.log("No Input Password");
        res.json({message:"\'새 비밀번호\'를 입력하세요.", EditGb:"password"});
        return;
    }else if(userInfoPwCheck == '' || userInfoPwCheck==undefined){
        console.log("No Input Password");
        res.json({message:"\'새 비밀번호 확인\'을 입력하세요.", EditGb:"passwordcheck"});
        return;
    }else if(userInfoPw != userInfoPwCheck){
        console.log("Different Password");
        res.json({message:"\'비밀번호\'와 \'비밀번호 확인\'이 일치하지 않습니다.", EditGb:"password"});
        return;
    }else{
        sql = `UPDATE USER SET NICK_NAME = ${con.escape(userInfoNickjName)} WHERE USER_EMAIL = ${con.escape(userInfoEmail)}`;
        con.query(sql, (err, result) =>{
            if (err) {
                console.log("insert fail");
                res.json({message:"닉네임 수정 실패"});
            }else{
                console.log("1 nickname UPDATE");
                //res.json({message:"닉네임 수정 성공"});
                sql = `UPDATE USER SET PASSWORD = ${con.escape(userInfoPw)} WHERE USER_EMAIL = ${con.escape(userInfoEmail)}`;
                con.query(sql, (err, result) =>{
                    if (err) {
                        console.log("insert fail");
                        res.json({message:"비밀번호 수정 실패"});
                    }else{
                        console.log("1 password UPDATE");
                        res.json({message:"회원 정보 수정 성공"});
                    }
                });
            }
        });
    }
        //res.json({ message: 'UPDATE TEST'})
//    });
});

module.exports = router;