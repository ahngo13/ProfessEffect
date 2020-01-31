function logout(){
    $.post('/logout',{},function(resultData){
        alert(resultData.message);
        location.reload();
    });
}

$(document).ready(function(){
    $(document).on("click","#goMain",function(){
    //		alert();
        location.href="/";
    });
});