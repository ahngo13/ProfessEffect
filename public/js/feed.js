function feedWrite(){

    const professCategory = $('#professCategory').val();
    const professTitle = $('#professTitle').val();
    const professContent = $('#professContent').val();
    const imgFile = $('#imgFile')[0].files[0];
    const formData = new FormData();

    formData.append('category', professCategory);
    formData.append('title', professTitle);
    formData.append('content', professContent);
    formData.append('imgFile', imgFile);
       
    $.ajax({
        url : '/feed/write',
        type : 'POST',
        data : formData,
        contentType : false,
        processData : false        
    }).done(function(result){
        if(result.resultCode == '200'){
            alert('새로운 떠벌림이 등록되었습니다.');
            location.reload();
        }else{
            alert('떠벌림 등록이 실패하였습니다.');
        }
        // callback(data);
    });
}

$(function(e){
    // appendList();
    
    $(window).scroll(function(){
        const dh = $(document).height();
        const wh = $(window).height();
        const wt = $(window).scrollTop();
        if(dh == (wh + wt)){
            appendList();
        }
    });
});

let start = 10;
let list = 10;

function appendList(){
    const send_param = {
        start,
        list
    };

    $.post('/feed/more', send_param, function(resultData){
        if(resultData){
            if(resultData.moreYn == '0'){

            }else{
                $('#feed-list').append(resultData);
                start += list;
            }
        }
    });
}

function replyWrite(professNo, professDtNo){

    send_param = {professNo, professDtNo};
       
    $.post('/reply/write', send_param, function(returnData,status){

/*         if(returnData.dataYn == '2'){
            $('#login-error-msg').html(returnData.message);
        }else{
            $('#title-area').hide();
            $('#content-area').html(returnData);
        } */
    });
}