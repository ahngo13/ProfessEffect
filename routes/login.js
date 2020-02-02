const express = require('express');
const router = express.Router();
const con = require('./mysql');

router.post('/', (req,res)=>{
    let message;
    
    let sql = `SELECT * FROM user where user_email=${con.escape(req.body.email)} and password=${con.escape(req.body.pw)} and use_yn='1'`;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
        if (err) {
            console.log(err);
        }else{
            console.log(result.length);
            if(result.length > 0){
                req.session.email = req.body.email;
                req.session.nickName = result[0].nick_name;
                console.log("LOGIN OK");
                
                sql = `SELECT R1.* FROM(
                    SELECT * FROM PROFESSDT
                    order by PROFESSDT.PROFESS_NO DESC
                    )R1
                    LIMIT 10 OFFSET 0`;
                console.log(sql);
                con.query(sql, function (err, result, fields) {
                    if (err) {
                        console.log(err);
                    }else{
                        console.log(result.length);
                        if(result.length > 0){
                            console.log("FEEDLIST SELECT OK");
                            res.render('feed-main-section', {result, dataYn : '1'});
                        }else{
                            res.render('feed-main-section', {dataYn : '0'});
                        }
                        // res.json({message:message});
                    }
                });
            }else{
                message = "아이디나 비밀번호가 일치하지 않습니다.";
                console.log(message);
                res.json({message:message, dataYn:'2'});
            }
        }
    });

});

module.exports = router;