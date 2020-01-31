$(document).ready(function(){
			
	//로그인 버튼 클릭 시
	$(document).on("click","#login_btn",function(){
		
		const loginEmail = $('#loginEmail').val();
		const loginPw= $('#loginPw').val();
		let errMsg = '';
		
		if(loginEmail == '' || loginEmail==undefined){
			errMsg = "이메일 주소를 입력해주세요.";
			$('#login-error-msg').html(errMsg);
			$('#loginEmail').focus();
			return;
		}else if(loginPw == '' || loginPw==undefined){
			errMsg = "비밀번호를 입력해주세요.";
			$('#login-error-msg').html(errMsg);
			$('#loginPw').focus();
			return;
		}
		
		const send_param={
				email:loginEmail,
				pw:loginPw
		};
		
		$.post('/login', send_param, function(returnData,status){

            $('#title-area').hide();
            $('#content-area').html(returnData);
            // location.reload();
            // alert();
			// if(returnData.resultCode){
				//   $('#title-area').html('');
				//   $('#nav-area').html(nav_form);
				//   $('#content-area').html(login_success_form);
			// }else{
			// 	$('#login-error-msg').html(returnData.message);
			// }
		});
	});
});

function getFriendFeed(num){
	
	let nickName = '';
	let imgName = '';
	
	if(num == 0){
		nickName='갈릭슈';
		imgName='feed3.jpg';
	}else if(num == 1){
		nickName='슈크림';
		imgName='feed4.jpg';
	}else if(num == 2){
		nickName='임창정';
		imgName='feed5.jpg';
	}else if(num == 3){
		nickName='정발산';
		imgName='feed6.jpg';
	}else if(num == 4){
		nickName='산기슭';
		imgName='feed7.jpg';
	}else if(num == 5){
		nickName='슭곰발';
		imgName='feed8.jpg';
	}else if(num == 6){
		nickName='발냄새';
		imgName='feed9.jpg';
	}else if(num == 7){
		nickName='새가슴';
		imgName='feed10.jpg';
	}
	
	let feed_list_form="<div style='width:100%; margin: 0 auto;'>";
	feed_list_form+="<div style='text-align: center'>";
	feed_list_form+="<span class='btn-group'>";
	feed_list_form+="<button type='button' class='btn btn-dark btn-lg'>최신순</button>";
	feed_list_form+="<button type='button' class='btn btn-dark btn-lg'>인기순</button>";
	feed_list_form+="<button type='button' class='btn btn-dark btn-lg'>랭킹순</button>";
	feed_list_form+="<div class='btn-group'>";
	feed_list_form+="<button type='button' class='btn btn-dark btn-lg dropdown-toggle' data-toggle='dropdown'>";
	feed_list_form+="카테고리";
	feed_list_form+="</button>";
	feed_list_form+="<div class='dropdown-menu'>";
	feed_list_form+="<a class='dropdown-item' href='#'>운동</a>";
	feed_list_form+="<a class='dropdown-item' href='#'>자격증</a>";
	feed_list_form+="<a class='dropdown-item' href='#'>시험</a>";
	feed_list_form+="<a class='dropdown-item' href='#'>다이어트</a>";
	feed_list_form+="<a class='dropdown-item' href='#'>금연/금주</a>";
	feed_list_form+="<a class='dropdown-item' href='#'>기타</a>";
	feed_list_form+="</div>";
	feed_list_form+="</div>";
	feed_list_form+="</span>";
	feed_list_form+="</div>";
	feed_list_form+="<div class='feed-list'>";
	feed_list_form+="<div class='feed-list-header'>";
	feed_list_form+="<img src='image/icon.png' class='.img-thumbnail icon-img'>";
	feed_list_form+="<span class='nickname'>"+ nickName +"</span>";
	feed_list_form+="<i class='fas fa-ellipsis-h' style='font-size:32px;color:rgb(38, 38, 38);'></i>";
	feed_list_form+="</div>";
	feed_list_form+="<div id='demo' class='carousel slide text-align-center' data-ride='carousel'>";
	feed_list_form+="<ul class='carousel-indicators'>";
	feed_list_form+="<li data-target='#demo' data-slide-to='0' class='active'></li>";
	feed_list_form+="<li data-target='#demo' data-slide-to='1'></li>";
	feed_list_form+="<li data-target='#demo' data-slide-to='2'></li>";
	feed_list_form+="</ul>";
	feed_list_form+="<div class='carousel-inner'>";
	feed_list_form+="<div class='carousel-item active'>";
	feed_list_form+="<img class='feedimg' src='./image/"+ imgName +"'>";
	feed_list_form+="</div>";
	feed_list_form+="<div class='carousel-item'>";
	feed_list_form+="<img class='feedimg' src='./image/"+ imgName +"'>";
	feed_list_form+="</div>";
	feed_list_form+="<div class='carousel-item'>";
	feed_list_form+="<img class='feedimg' src='./image/"+ imgName +"'>";
	feed_list_form+="</div>";
	feed_list_form+="</div>";
	feed_list_form+="<a class='carousel-control-prev' href='#demo' data-slide='prev'>";
	feed_list_form+="<span class='carousel-control-prev-icon'></span>";
	feed_list_form+="</a> <a class='carousel-control-next' href='#demo' data-slide='next'>";
	feed_list_form+="<span class='carousel-control-next-icon'></span>";
	feed_list_form+="</a>";
	feed_list_form+="</div>";
	feed_list_form+="<div class='feed-list-button'>";
	feed_list_form+="<i class='fas fa-heart' style='font-size:32px;color:red'></i>";
	feed_list_form+="<i class='far fa-comment-dots' style='font-size:32px;color:color:rgb(38, 38, 38);'></i>";
	feed_list_form+="</div>";
	feed_list_form+="<div class='feed-list-text'>";
	feed_list_form+="매일 한 시간씩 걸을 거라는 친구의 말에 나는 매일 끼니를 한 끼씩 거르기로 했다.";
	feed_list_form+="</div>";
	feed_list_form+="<div class='feed-list-reply'>";
	feed_list_form+="<div><span class='nickname'>갓릿슈</span> : 저는 매일 한 시간씩 걸을 거라는 친구의 말에 하루에 한번씩 친구에게 태클을 걸기로 했습니다!</div>";
	feed_list_form+="<div><span class='nickname'>구독자1만명가즈아</span> : 응원합니다!</div>";
	feed_list_form+="</div>";
	feed_list_form+="</div>";
	feed_list_form+="</div>";
	feed_list_form+="</div>";
	
	
	
	$('#feed-list').html('');
	$('#feed-list').html(feed_list_form);
}