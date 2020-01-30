const express = require('express');
const router = express.Router();
const con = require('./mysql');

router.post('/write', (req,res)=>{
    if(req.session.email){
        var sql = `INSERT INTO board (m_no, title, content) VALUES (${req.session.m_no},'${req.body.title}','${req.body.content}')`;
        console.log(sql);
        con.query(sql, (err, result) =>{
            if (err) {
                console.log("insert fail", err);
                res.json({message:`글쓰기 실패`});
            }else{
                console.log("1 record inserted");
                res.json({message:`글쓰기가 완료 되었습니다`});
            }
        });
    }else{
        res.json({message:"로그인부터 진행해주세요~"});
    }
});

router.get('/write_form', (req,res)=>{
    var sql = `select * from board join members on board.m_no = members.no`;
    console.log(sql);
    con.query(sql, (err, result, field) =>{
        if (err) {
            console.log("insert fail", err);
            res.json({message:`글보기 실패`});
        }else{
            console.log(field);
            res.render('board_write_form',{title:"글쓰기 화면", result});
        }
    });
});

module.exports = router;