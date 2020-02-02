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
