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
                    SELECT PROFESSDT.*, GOOD.good_yn  FROM PROFESSDT LEFT OUTER JOIN GOOD ON PROFESSDT.PROFESS_NO = GOOD.PROFESS_NO AND PROFESSDT.PROFESSDT_NO = GOOD.PROFESSDT_NO AND GOOD.USER_EMAIL = '${req.session.email}'
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
                            res.render('feed-main-section', {result, dataYn : '1', loginEmail : req.session.email});
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