function feedWrite(){

    const professCategory = $('#professCategory').val();
    const professTitle = $('#professTitle').val();
    const professContent = $('#professContent').val();
    const imgFile = $('#imgFile')[0].files[0];
    const imgName = imgFile.name;
    const imgExp = /([^\s]+(?=\.(jpg|gif|png|jpeg))\.\2)/;
    const formData = new FormData();

    let errMsg = '';
    
    if(professCategory == '0' || professCategory==undefined || professCategory==''){
        errMsg = "카테고리를 선택 해주세요.";
        $('#feed-write-error-msg').html(errMsg);
        $('#professCategory').focus();
        return;
    }else if(professTitle == '' || professTitle==undefined){
        errMsg = "떠벌림 제목을 입력해주세요.";
        $('#feed-write-error-msg').html(errMsg);
        $('#professTitle').focus();
        return;
    }else if(professContent == '' || professContent==undefined){
        errMsg = "떠벌림 내용을 입력해주세요.";
        $('#feed-write-error-msg').html(errMsg);
        $('#professContent').focus();
        return;
    }else if(imgFile != undefined){ 
        if(imgName.match(imgExp) == null){
            errMsg = "jpg, gif, png 형식의 이미지 파일만 첨부 가능합니다.";
            $('#feed-write-error-msg').html(errMsg);
            return;
        }
    }

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

function goUpdateFeedForm(num, professNo, professDtNo){

    $("#myModal"+num).modal("hide");

    const send_param = {num, professNo, professDtNo};

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
    let imgName;
    if(imgFile != undefined){
        imgName = imgFile.name;
    }
    
    const imgExp = /([^\s]+(?=\.(jpg|gif|png))\.\2)/;

    const formData = new FormData();

    if(professCategory == '0' || professCategory==undefined || professCategory==''){
        errMsg = "카테고리를 선택 해주세요.";
        $('#feed-write-error-msg').html(errMsg);
        $('#professCategory').focus();
        return;
    }else if(professTitle == '' || professTitle==undefined){
        errMsg = "떠벌림 제목을 입력해주세요.";
        $('feed-write-error-msg').html(errMsg);
        $('#professTitle').focus();
        return;
    }else if(professContent == '' || professContent==undefined){
        errMsg = "떠벌림 내용을 입력해주세요.";
        $('#feed-write-error-msg').html(errMsg);
        $('#professContent').focus();
        return;
    }else if(imgFile != undefined){ 
        if(imgName.match(imgExp) == null){
            errMsg = "jpg, gif, png 형식의 이미지 파일만 첨부 가능합니다.";
            $('#feed-write-error-msg').html(errMsg);
            return;
        }
    }

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

function deleteFeed(num, professNo, professDtNo){

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

    const category = $('#category').val();
    const selectGb = $('#selectGb').val();

    const send_param = {
        start,
        list,
        category,
        selectGb
    };

    $.post('/feed/more', send_param, function(resultData){
        if(resultData){
            if(resultData.logind == '0'){
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

function selectFeed(selectGb){

    let category;
    if(selectGb){
        if(selectGb != 'recently' && selectGb != 'popular'){
            category = selectGb;
            selectGb = 'category';
        }
    }

    $('#selectGb').val(selectGb);
    $('#category').val(category);

    const send_param = {selectGb, category};

    $.post('/feed/select', send_param, function(resultData){
        if(resultData.dataYn == '0'){
            location.reload();
        }else{
            $('#title-area').hide();
            $('#content-area').html(resultData);
        }
    });
}