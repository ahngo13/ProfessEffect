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
    
    /* const send_param = {
        category : professCategory,
        title : professTitle,
        content : professContent,
        imgFile : imgFile
    } */

    // const formData = new FormData(send_param);
    
    $.ajax({
        url : '/feed/write',
        type : 'POST',
        data : formData,
        contentType : false,
        processData : false        
    }).done(function(result){
        alert(result);
        // callback(data);
    });
}
