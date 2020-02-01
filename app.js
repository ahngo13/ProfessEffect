const express = require('express');
const path = require('path');
const session = require('express-session');

const boardRouter = require('./routes/board');
const indexRouter = require('./routes/index');
const contactRouter = require('./routes/contact');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const userInfoRouter = require('./routes/user-info');
const editUserInfoRouter = require('./routes/edit-user-info');
const deleteUserInfoRouter = require('./routes/delete-user-info');
const basketRouter = require('./routes/basket');
const feedRouter = require('./routes/feed');

const app = express();

app.use(express.static(path.join(__dirname,"public")));
app.set('view engine','ejs');
app.use('/upload', express.static('uploads'));

// 배열 같은 데이터도 파싱 가능
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use(session({
    resave:false,
    saveUninitialized:true,
    secret:"I kill you",
    cookie:{
        httpOnly:true,
        secure:false
    }
}));

app.use('/', indexRouter);
app.use('/user-info', userInfoRouter);
app.use('/edit-user-info', editUserInfoRouter);
app.use('/delete-user-info', deleteUserInfoRouter);
app.use('/logout', logoutRouter);
app.use('/login', loginRouter);
app.use('/contact', contactRouter);
app.use('/basket', basketRouter);
app.use('/board', boardRouter);
app.use('/feed', feedRouter);

app.listen(3000,()=>{
    console.log('3000 listen');
});