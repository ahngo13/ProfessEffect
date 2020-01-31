function logout(){
    $.post('/logout',{},function(resultData){
        alert(resultData.message);
        location.reload();
    });
}
function goUserInfo(){
    $.post('/user-info',{},function(resultData){
        //alert(resultData.message);
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

$(document).ready(function(){
    $(document).on("click","#goMain",function(){
    //		alert();
        location.href="/";
    });
});