const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    let logind=0;
    if(req.session.email){
        logind=1;
        res.render('feed-main', {title:"블록체인 기반 SNS 떠벌림", logind:logind, name:req.session.name});
    }else{
        res.render('index', {title:"블록체인 기반 SNS 떠벌림", logind:logind, name:req.session.name});
    }
});

module.exports = router;