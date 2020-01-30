const express = require('express');
const router = express.Router();
const con = require('./mysql');

router.post('/',(req,res,next)=>{
    
    // con.connect((err)=>{
    //     if(err) throw err;
        // console.log("Connected!");
        
        if(req.session.email){
            var sql = `INSERT INTO basket (m_no, product, quantity) VALUES ('${req.session.m_no}','${req.body.product}',${req.body.quantity})`;
            console.log(sql);
            con.query(sql, (err, result) =>{
                // con.end();
                if (err) {
                    console.log("insert fail", err);
                    res.json({message:"장바구니 넣기 실패"});
                }else{
                    console.log("1 record inserted");
                    res.json({message:`${req.session.name}님! 장바구니에 ${req.body.product}가 추가 되었습니다!`});
                }
            });
        }else{
            // con.end();
            res.json({message:"로그인 후 진행하십시오."});
        }
    // });
});

module.exports = router;