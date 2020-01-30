const express = require('express');
const router = express.Router();
// const members = require('./members');
const con = require('./mysql');

router.post('/', (req,res)=>{
    let message;

    const sql = `SELECT * FROM members where email='${req.body.email}'`;
    // con.connect((err)=>{
    //     if(err) throw err;

        con.query(sql, function (err, result, fields) {
            if (err) {
                console.log(err);
            }else{
                // console.log(result.length);
                console.log(result.length);
                if(result.length > 0){
                    // con.end();
                    req.session.email = req.body.email;  
                    req.session.name = result[0].name;
                    req.session.m_no = result[0].no;         
                    message = "login ok";
                    console.log(message);
                }else{
                    // con.end();
                    message = "login Fail";
                    console.log(message);
                }
                res.json({message:message});
            }
        });
    // });
});

module.exports = router;