const express = require('express');
const router = express.Router();
const con = require('./mysql');

router.post('/', (req,res)=>{
    
    let message;
    
    if(req.session.email){
        logind=1;
        res.render('feed-write-form', {});
    }else{
        res.render('index', {});    
    }
});

module.exports = router;