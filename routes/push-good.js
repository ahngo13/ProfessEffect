
const express = require('express');
const router = express.Router();
const con = require('./mysql');

router.post('/',(req,res,next)=>{

    const goodemail=req.session.email;
    const PofessNO=req.body.professNo
    let sql;

//  let sql = `SELECT * FROM user where user_email=${con.escape(req.body.email)} and password=${con.escape(req.body.pw)} and use_yn='1'`;
    if(req.session.email){
        if(req.body.professNo != undefined && req.body.professDtNo != undefined){
            console.log(req.body.professNo);

            sql = `SELECT * FROM good WHERE profess_no = ${con.escape(PofessNO)}`;
            con.query(sql, function (err, result, fields) {
                if (err) {
                    console.log(err);
                    res.json({message:"조회 실패"});
                }else{
                    if(result[0]==undefined){   //profess_no가 없다면 좋아요를 처음 누르는 거니 insert로 데이터를 저장
                        sql = `INSERT INTO good (profess_no, professdt_no, user_email, good_yn) VALUES (${con.escape(req.body.professNo)}, ${con.escape(req.body.professDtNo)}, ${con.escape(goodemail)}, 1)`;
                        console.log(sql);
                        con.query(sql, function (err, result, fields) {
                            if (err) {
                                console.log(err);
                                console.log("fail the good");
                                res.json({message:"좋아요 실패"});
                            }else{
                                sql = `UPDATE PROFESSDT SET GOOD_CNT = GOOD_CNT+1 WHERE PROFESS_NO = ${con.escape(req.body.professNo)} AND PROFESSDT_NO = ${con.escape(req.body.professDtNo)}`;
                                console.log("insert the good");
                                console.log(sql);
                                con.query(sql, function (err, result, fields) {
                                    if (err) {
                                        console.log(err);
                                        console.log("fail the good");
                                        res.json({message:"좋아요 실패"});
                                    }else{
                                        console.log("update the good");
                                        res.json({message:"좋아요 되었습니다.", heartColor : '1' });
                                    }
                                });
                            }
                        });
                    }else{
                        console.log(result[0].good_yn);
                        if(result[0]){  //profess_no가 이미 있다면 좋아요를 취소하게 되는거 or 좋아요를 취소했다가 다시 주는 케이스 update로
                            if(result[0].good_yn==1){
                                sql = `UPDATE good SET good_yn = 0 WHERE profess_no = ${con.escape(PofessNO)}`;
                                con.query(sql, function (err, result, fields) {
                                    if(err){
                                        console.log(err);
                                        console.log("fail the good");
                                        res.json({message:"좋아요 실패"});                                    
                                    }else{
                                        sql = `UPDATE PROFESSDT SET GOOD_CNT = GOOD_CNT-1 WHERE PROFESS_NO = ${con.escape(req.body.professNo)} AND PROFESSDT_NO = ${con.escape(req.body.professDtNo)}`;
                                        console.log("update the good");
                                        console.log(sql);
                                        con.query(sql, function (err, result, fields) {
                                            if (err) {
                                                console.log(err);
                                                console.log("fail the good");
                                                res.json({message:"좋아요 실패"});
                                            }else{
                                                console.log("cancel the good");
                                                res.json({message:"좋아요를 취소했습니다.", heartColor : '' });
                                            }
                                        });
                                    }
                                });
                            }else{
                                sql = `UPDATE good SET good_yn = 1 WHERE profess_no = ${con.escape(PofessNO)}`;
                                con.query(sql, function (err, result, fields) {
                                    if(err){
                                        console.log(err);
                                        console.log("fail the good");
                                        res.json({message:"좋아요 실패"});                                    
                                    }else{
                                        sql = `UPDATE PROFESSDT SET GOOD_CNT = GOOD_CNT+1 WHERE PROFESS_NO = ${con.escape(req.body.professNo)} AND PROFESSDT_NO = ${con.escape(req.body.professDtNo)}`;
                                        console.log("insert the good");
                                        console.log(sql);
                                        con.query(sql, function (err, result, fields) {
                                            if (err) {
                                                console.log(err);
                                                console.log("fail the good");
                                                res.json({message:"좋아요 실패"});
                                            }else{
                                                console.log("update the good");
                                                res.json({message:"좋아요 되었습니다.", heartColor : '1' });
                                            }
                                        });
                                    }
                                });                            
                            }
                        }
                    }
                }
            });
                
         }
    }else{
        res.render('index', {});
    }

});

module.exports = router;