$(document).ready(function(){
    $('#contact_btn').click(function(){

        const name = $('#name').val();
        const email = $('#email').val();
        const comments = $('#comments').val();

        const send_param = {
            name,email,comments
        };

        $.post('contact', send_param, function(resultData){
            alert(resultData.message);
        });
    });

    $('#login_btn').click(function(){

        const email = $('#login_email').val();
        const send_param = {
            email
        };

        $.post('login', send_param, function(resultData){
            alert(resultData.message);
            location.reload();
        });
    });
    $('#logout_btn').click(function(){

        $.post('logout', {}, function(resultData){
            alert(resultData.message);
            location.reload();
        });
    });

    $('#basket_btn').click(function(){
        const quantity = $('#quantity').val();
        const product = $('#product').val();
        alert(quantity+":"+product);
        const send_param = {product, quantity};

        $.post('basket',send_param,function(resultData){
            alert(resultData.message);
        });

    });

    $('#board_write_text').click(function(){
        window.open("/board/write_form", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
    });

    $('#board_write_btn').click(function(){
        const title = $('#board_title').val();
        const content = $('#board_content').val();
        // alert(board_title + ":" + board_content);
        const send_param = {title, content};
        $.post('/board/write', send_param, function(resultData){
            alert(resultData.message);
        });
    });

    $('#myModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var deleteUrl = button.data('title');
        var modal = $(this);
    });
});