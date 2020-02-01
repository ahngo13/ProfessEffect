function logout(){
    $.post('/logout',{},function(resultData){
        alert(resultData.message);
        location.reload();
    });
}
function goUserInfo(){
     $.post('/user-info',{},function(resultData){ 
        $('#content-area').html(resultData);
    });
}

function goFriendList(){
    $.post('/friend-list',{},function(resultData){
        alert(resultData.message);
    });
}

function goProfessWriteForm(){
    $.post('/profess-write-form',{},function(resultData){
        alert(resultData.message);
    });
}

function EditUserInfoBtn(){

    const userInfoEmail = $('#userInfoEmail').val();
    const userInfoPw= $('#userInfoPw').val();
    const userInfoPwCheck= $('#userInfoPwCheck').val();
    const userInfoName= $('#userInfoName').val();
    const userInfoNickjName= $('#userInfoNickjName').val();

    //alert(userInfoEmail);
    const send_param = {userInfoEmail, userInfoPw, userInfoPwCheck, userInfoName, userInfoNickjName};

    $.post('/edit-user-info', send_param, function(resultData){
        alert(resultData.message);
        if(resultData.EditGb=='nickname'){
            $('#userInfoNickjName').focus();
            return;
        }else if(resultData.EditGb=='password'){
            $('#userInfoPw').focus();
            return;
        }else if(resultData.EditGb=='passwordcheck'){
            $('#userInfoPwCheck').focus();
            return;
        }
    });
    
}

$(document).ready(function(){
    $(document).on("click","#goMain",function(){
    //		alert();
        location.href="/";
    });
});