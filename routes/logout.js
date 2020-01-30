const express = require('express');
const router = express.Router();

router.post('/', (req,res)=>{
    req.session.destroy(()=>{
        res.json({message : "로그아웃 되었습니다!"});
    });
});

module.exports = router;