const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    let logind=0;
    if(req.session.email){
        logind=1;
    }else{
    }
    res.render('index', {title:"블록체인 기반 SNS 떠벌림", logind:logind, name:req.session.name});
});

router.post('/join', (req,res)=>{
    
    const email = req.body.email;
	const name = req.body.name;
	const nickName = req.body.nickName;
    const pw = req.body.pw;
    
    if(req.session.email){
        logind=1;
    }else{
    }
    res.render('index', {title:"MySHOP2", logind:logind, name:req.session.name});
});



module.exports = router;