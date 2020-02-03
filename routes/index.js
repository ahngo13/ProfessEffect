const express = require('express');
const router = express.Router();
const con = require('./mysql');

router.get('/', (req,res)=>{
    let logind=0;
    res.setHeader('Set-Cookie', 'key=value; secure; HttpOnly; SameSite=Strict');
    if(req.session.email){
        logind=1;
        let sql = `SELECT R1.* FROM(
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
                    res.render('feed-main', {result, dataYn : '1', loginEmail: req.session.email});
                }else{
                    res.render('feed-main', {dataYn : '0'});
                }
                // res.json({message:message});
                // res.render('feed-main', {title:"블록체인 기반 SNS 떠벌림", logind:logind, name:req.session.name});
            }
        });
    }else{
        res.render('index', {title:"블록체인 기반 SNS 떠벌림", logind:logind, name:req.session.name});
    }
});

module.exports = router;