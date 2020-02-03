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
            alert('새로운 떠벌림이 등록 되었습니다.');
            location.reload();
        }else{
            alert('떠벌림 등록이 실패 하였습니다.');
        }
        // callback(data);
    });
}

function goUpdateFeedForm(professNo, professDtNo){

    $("#myModal").modal("hide");

    const send_param = {professNo, professDtNo};

    $.post('/feed',send_param,function(resultData){

        if(resultData){
            if(resultData.resultCode == '500'){
                alert('다시 진행 해주세요.');
                location.reload();
            }else{
                $('#nav-area').remove();
                $('#footer').remove();
                $('#content-area').css('margin-top', '120px');
                $('#content-area').html(resultData);
            }
        }
    });
}

function feedUpdate(professNo, professDtNo){

    const professCategory = $('#professCategory').val();
    const professTitle = $('#professTitle').val();
    const professContent = $('#professContent').val();
    const imgFile = $('#imgFile')[0].files[0];
    const formData = new FormData();

    formData.append('professNo', professNo);
    formData.append('professDtNo', professDtNo);
    formData.append('category', professCategory);
    formData.append('title', professTitle);
    formData.append('content', professContent);
    if(imgFile == undefined){
        formData.append('imgPath', $('#imgFile').val());
    }else{
        formData.append('imgFile', imgFile);
    }
       
    $.ajax({
        url : '/feed/update',
        type : 'POST',
        data : formData,
        contentType : false,
        processData : false        
    }).done(function(result){
        if(result.resultCode == '200'){
            alert('떠벌림이 수정 되었습니다.');
            location.reload();
        }else{
            alert('떠벌림 수정이 실패하였습니다.');
        }
        // callback(data);
    });
}

function deleteFeed(professNo, professDtNo){

    const send_param = {professNo, professDtNo};
       
    $.post('/feed/delete', send_param, function(returnData,status){
        if(returnData.resultCode == '200'){
            alert('떠벌림이 삭제 되었습니다.');
            location.reload();
        }else{
            alert('떠벌림 삭제가 실패하였습니다.');
        }
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
            if(logind == '0'){
                location.reload();
            }else{
                if(resultData.moreYn == '0'){
    
                }else{
                    $('#feed-list').append(resultData);
                    start += list;
                }
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