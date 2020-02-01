function logout(){
    $.post('/logout',{},function(resultData){
        alert(resultData.message);
        location.reload();
    });
}
function goUserInfo(){
     $.post('/user-info',{},function(resultData){ 
        $('#nav-area').remove();
        $('#footer').remove();
         $('#content-area').css('margin-top', '120px');
        $('#content-area').html(resultData);
    });
}

function goFriendList(){
    $.post('/friend-list',{},function(resultData){
        alert(resultData.message);
    });
}

function goProfessWriteForm(){
    $.post('/feed',{},function(resultData){
        $('#nav-area').remove();
        $('#footer').remove();
        $('#content-area').css('margin-top', '120px');
        $('#content-area').html(resultData);
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

function deleteUserInfoBtn(){
    const userInfoEmail = $('#userInfoEmail').val();

    //alert(userInfoEmail);
    const send_param = {userInfoEmail};

    var result = confirm('정말로 탈퇴하겠습니까?');
    if(result) {
        $.post('/delete-user-info', send_param, function(resultData){
            if(resultData.resultCode == '1'){
                location.reload();
            }else{
                alert(resultData.message);
            }
        });
    }else{
        alert('탈퇴가 취소되었습니다.');
    }
}

$(document).ready(function(){
    $(document).on("click","#goMain",function(){
    //		alert();
        location.href="/";
    });
});