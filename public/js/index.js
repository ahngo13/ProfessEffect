$(document).ready(function(){
			
	//가입하기 버튼 클릭 시
	$(document).on("click","#join_btn",function(){
		
		const joinEmail = $('#joinEmail').val();
		const joinName= $('#joinName').val();
		const joinNickName= $('#joinNickName').val();
		const joinPw= $('#joinPw').val();
//		alert(id_val + ":" + pw_val);
		
		let errMsg = '';
		
		if(joinEmail == '' || joinEmail==undefined){
			errMsg = "이메일 주소를 입력해주세요.";
			$('#join-error-msg').html(errMsg);
			$('#joinEmail').focus();
			return;
		}else if(joinName == '' || joinName==undefined){
			errMsg = "성명을 입력해주세요.";
			$('#join-error-msg').html(errMsg);
			$('#joinName').focus();
			return;
		}else if(joinNickName == '' || joinNickName==undefined){
			errMsg = "별명을 입력해주세요.";
			$('#join-error-msg').html(errMsg);
			$('#joinNickName').focus();
			return;
		}else if(joinPw == '' || joinPw==undefined){
			errMsg = "비밀번호를 입력해주세요.";
			$('#join-error-msg').html(errMsg);
			$('#joinPw').focus();
			return;
		}
		
		const send_data_temp={
				email:joinEmail,
				name:joinName,
				nickName:joinNickName,
				pw:joinPw
		};
		
		const send_data=JSON.stringify(send_data_temp);
		
		$.post('/join', send_data, function(returnData,status){
			/* if(returnData.resultCode){
				let join_success_form="<div id='content-area' class='container' style='margin-top: 30px; margin-bottom: 30px;'>";
				  join_success_form+="<div class='row main-row' style='text-align: center;'>";
				  join_success_form+="<div class='col-sm-12' style='margin: auto;'>";
				  join_success_form+="<img src='./image/joinsuccess.jpg' class='img-thumbnail' style='border-radius: 100px'>";
				  join_success_form+="<div>"+ returnData.name +"님 가입완료 되었습니다.</div>";
				  join_success_form+="<div>이제 떠벌림 세계에서 많은 목표를 달성하시기 바랍니다.</div>"
				  join_success_form+="<input type='button' id='goMain' class='btn btn-primary margin-5' value='메인 페이지로 이동'></input>"
				  join_success_form+="</div></div></div>";
				  $('#content-area').html(join_success_form);
			}else{
				$('#join-error-msg').html(returnData.message);
			} */
		});
	});
	
	//로그인 버튼 클릭 시
	$(document).on("click","#login_btn",function(){
		
		const loginEmail = $('#loginEmail').val();
		const loginPw= $('#loginPw').val();
//		alert(id_val + ":" + pw_val);
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
		
		const send_data_temp={
				sign:"login",
				email:loginEmail,
				pw:loginPw
		};
		
		const send_data=JSON.stringify(send_data_temp);
		
		$.post('main', send_data, function(returnData,status){
			if(returnData.resultCode){

				let nav_form="<div id='nav-area'>";
					nav_form+="<nav class='navbar navbar-expand-sm bg-light navbar-light fixed-top justify-content-center menu-bar'>";
					nav_form+="<a class='navbar-brand menu-bar-items' style='font-size: 50px' href='index.html'>Profess Effect</a>";
					nav_form+="<div class='input-group menu-bar-items' id='searchNickName' style='width: 20%'>";
					nav_form+="<div class='input-group-prepend'>";
					nav_form+="<span class='input-group-text'>@</span>";
					nav_form+="</div>";
					nav_form+="<input type='text' class='form-control' placeholder='Username'>";
					nav_form+="</div>";
					nav_form+="<div style='margin: 0px 10px 0px 10px'>";
					nav_form+="<a class='menu-bar-items' href='#'>";
					nav_form+="<i class='far fa-user-circle' style='font-size:32px;color:rgb(38, 38, 38);'></i>";
					nav_form+="</a>";
					nav_form+="<a class='menu-bar-items' href='#'>";
					nav_form+="<i class='fas fa-users' style='font-size:32px;color:rgb(38, 38, 38);'></i>";
					nav_form+="</a>";
					nav_form+="<a class='menu-bar-items' href='#'>"
					nav_form+="<i class='fas fa-pen' style='font-size:32px;color:rgb(38, 38, 38);'></i>";
					nav_form+="</a>";
					nav_form+="</div>";
					nav_form+="</nav>"; 
					nav_form+="</div>";
					
				let login_success_form="<div id='content-area' class='container' style='margin-top: 120px; margin-bottom: 30px;'>";
					login_success_form+="<div class='row main-row'>";
					login_success_form+="<div class='col-sm-8' style='margin: auto;' id='feed-list'>";
					login_success_form+="<div style='width:100%; margin: 0 auto;'>";
					login_success_form+="<div style='text-align: center'>";
					login_success_form+="<span class='btn-group'>";
					login_success_form+="<button type='button' class='btn btn-dark btn-lg'>최신순</button>";
					login_success_form+="<button type='button' class='btn btn-dark btn-lg'>인기순</button>";
					login_success_form+="<button type='button' class='btn btn-dark btn-lg'>랭킹순</button>";
					login_success_form+="<div class='btn-group'>";
					login_success_form+="<button type='button' class='btn btn-dark btn-lg dropdown-toggle' data-toggle='dropdown'>";
					login_success_form+="카테고리";
					login_success_form+="</button>";
					login_success_form+="<div class='dropdown-menu'>";
					login_success_form+="<a class='dropdown-item' href='#'>운동</a>";
					login_success_form+="<a class='dropdown-item' href='#'>자격증</a>";
					login_success_form+="<a class='dropdown-item' href='#'>시험</a>";
					login_success_form+="<a class='dropdown-item' href='#'>다이어트</a>";
					login_success_form+="<a class='dropdown-item' href='#'>금연/금주</a>";
					login_success_form+="<a class='dropdown-item' href='#'>기타</a>";
					login_success_form+="</div>";
					login_success_form+="</div>";
					login_success_form+="</span>";
					login_success_form+="</div>";
					login_success_form+="<div class='feed-list'>";
					login_success_form+="<div class='feed-list-header'>";
					login_success_form+="<img src='image/icon.png' class='.img-thumbnail icon-img'>";
					login_success_form+="<span class='nickname'>햄릿슈</span>";
					login_success_form+="<i class='fas fa-ellipsis-h' style='font-size:32px;color:rgb(38, 38, 38);'></i>";
					login_success_form+="</div>";
					login_success_form+="<div id='demo' class='carousel slide text-align-center' data-ride='carousel'>";
					login_success_form+="<ul class='carousel-indicators'>";
					login_success_form+="<li data-target='#demo' data-slide-to='0' class='active'></li>";
					login_success_form+="<li data-target='#demo' data-slide-to='1'></li>";
					login_success_form+="<li data-target='#demo' data-slide-to='2'></li>";
					login_success_form+="</ul>";
					login_success_form+="<div class='carousel-inner'>";
					login_success_form+="<div class='carousel-item active'>";
					login_success_form+="<img class='feedimg' src='./image/feed1.png'>";
					login_success_form+="</div>";
					login_success_form+="<div class='carousel-item'>";
					login_success_form+="<img class='feedimg' src='./image/feed2.png'>";
					login_success_form+="</div>";
					login_success_form+="<div class='carousel-item'>";
					login_success_form+="<img class='feedimg' src='./image/feed1.png'>";
					login_success_form+="</div>";
					login_success_form+="</div>";
					login_success_form+="<a class='carousel-control-prev' href='#demo' data-slide='prev'>";
					login_success_form+="<span class='carousel-control-prev-icon'></span>";
					login_success_form+="</a> <a class='carousel-control-next' href='#demo' data-slide='next'>";
					login_success_form+="<span class='carousel-control-next-icon'></span>";
					login_success_form+="</a>";
					login_success_form+="</div>";
					login_success_form+="<div class='feed-list-button'>";
					login_success_form+="<i class='fas fa-heart' style='font-size:32px;color:red'></i>";
					login_success_form+="<i class='far fa-comment-dots' style='font-size:32px;color:color:rgb(38, 38, 38);'></i>";
					login_success_form+="</div>";
					login_success_form+="<div class='feed-list-text'>";
					login_success_form+="매일 한 시간씩 걸을 거라는 친구의 말에 나는 매일 끼니를 한 끼씩 거르기로 했다.";
					login_success_form+="</div>";
					login_success_form+="<div class='feed-list-reply'>";
					login_success_form+="<div><span class='nickname'>갓릿슈</span> : 저는 매일 한 시간씩 걸을 거라는 친구의 말에 하루에 한번씩 친구에게 태클을 걸기로 했습니다!</div>";
					login_success_form+="<div><span class='nickname'>구독자1만명가즈아</span> : 응원합니다!</div>";
					login_success_form+="</div>";
					login_success_form+="</div>";
					login_success_form+="<div class='feed-list'>";
					login_success_form+="<div class='feed-list-header'>";
					login_success_form+="<img src='image/icon.png' class='.img-thumbnail icon-img'>";
					login_success_form+="<span class='nickname'>햄릿슈</span>";
					login_success_form+="<i class='fas fa-ellipsis-h' style='font-size:32px;color:rgb(38, 38, 38);'></i>";
					login_success_form+="</div>";
					login_success_form+="<div id='demo' class='carousel slide text-align-center' data-ride='carousel'>";
					login_success_form+="<ul class='carousel-indicators'>";
					login_success_form+="<li data-target='#demo' data-slide-to='0' class='active'></li>";
					login_success_form+="<li data-target='#demo' data-slide-to='1'></li>";
					login_success_form+="<li data-target='#demo' data-slide-to='2'></li>";
					login_success_form+="</ul>";
					login_success_form+="<div class='carousel-inner'>";
					login_success_form+="<div class='carousel-item active'>";
					login_success_form+="<img class='feedimg' src='./image/feed1.png'>";
					login_success_form+="</div>";
					login_success_form+="<div class='carousel-item'>";
					login_success_form+="<img class='feedimg' src='./image/feed2.png'>";
					login_success_form+="</div>";
					login_success_form+="<div class='carousel-item'>";
					login_success_form+="<img class='feedimg' src='./image/feed1.png'>";
					login_success_form+="</div>";
					login_success_form+="</div>";
					login_success_form+="<a class='carousel-control-prev' href='#demo' data-slide='prev'>";
					login_success_form+="<span class='carousel-control-prev-icon'></span>";
					login_success_form+="</a> <a class='carousel-control-next' href='#demo' data-slide='next'>";
					login_success_form+="<span class='carousel-control-next-icon'></span>";
					login_success_form+="</a>";
					login_success_form+="</div>";
					login_success_form+="<div class='feed-list-button'>";
					login_success_form+="<i class='fas fa-heart' style='font-size:32px;color:red'></i>";
					login_success_form+="<i class='far fa-comment-dots' style='font-size:32px;color:color:rgb(38, 38, 38);'></i>";
					login_success_form+="</div>";
					login_success_form+="<div class='feed-list-text'>";
					login_success_form+="매일 한 시간씩 걸을 거라는 친구의 말에 나는 매일 끼니를 한 끼씩 거르기로 했다.";
					login_success_form+="</div>";
					login_success_form+="<div class='feed-list-reply'>";
					login_success_form+="<div><span class='nickname'>갓릿슈</span> : 저는 매일 한 시간씩 걸을 거라는 친구의 말에 하루에 한번씩 친구에게 태클을 걸기로 했습니다!</div>";
					login_success_form+="<div><span class='nickname'>구독자1만명가즈아</span> : 응원합니다!</div>";
					login_success_form+="</div>";
					login_success_form+="</div>";
					login_success_form+="</div>";
					login_success_form+="</div>";
					login_success_form+="<div class='col-sm-4'>";
					login_success_form+="<div class='feed-friend-title'>떠벌림 친구 목록</div>";
					login_success_form+="<div class='list-group'>";
					login_success_form+="<a href='#' onclick='getFriendFeed(0); return false;' class='list-group-item list-group-item-action list-group-item-light'>";
					login_success_form+="<img src='image/icon.png' class='.img-thumbnail icon-img'>";
					login_success_form+="<span class='nickname'>갈릭슈</span>";
					login_success_form+="</a>";
					login_success_form+="<a href='#' onclick='getFriendFeed(1); return false;' class='list-group-item list-group-item-action list-group-item-light'>";
					login_success_form+="<img src='image/icon.png' class='.img-thumbnail icon-img'>";
					login_success_form+="<span class='nickname'>슈크림</span>";
					login_success_form+="</a>";
					login_success_form+="<a href='#' onclick='getFriendFeed(2); return false;' class='list-group-item list-group-item-action list-group-item-light'>";
					login_success_form+="<img src='image/icon.png' class='.img-thumbnail icon-img'>";
					login_success_form+="<span class='nickname'>임창정</span>";
					login_success_form+="</a>";
					login_success_form+="<a href='#' onclick='getFriendFeed(3); return false;' class='list-group-item list-group-item-action list-group-item-light'>";
					login_success_form+="<img src='image/icon.png' class='.img-thumbnail icon-img'>";
					login_success_form+="<span class='nickname'>정발산</span>";
					login_success_form+="</a>";
					login_success_form+="<a href='#' onclick='getFriendFeed(4); return false;' class='list-group-item list-group-item-action list-group-item-light'>";
					login_success_form+="<img src='image/icon.png' class='.img-thumbnail icon-img'>";
					login_success_form+="<span class='nickname'>산기슭</span>";
					login_success_form+="</a>";
					login_success_form+="<a href='#' onclick='getFriendFeed(5); return false;' class='list-group-item list-group-item-action list-group-item-light'>";
					login_success_form+="<img src='image/icon.png' class='.img-thumbnail icon-img'>";
					login_success_form+="<span class='nickname'>슭곰발</span>";
					login_success_form+="</a>";
					login_success_form+="<a href='#' onclick='getFriendFeed(6); return false;' class='list-group-item list-group-item-action list-group-item-light'>";
					login_success_form+="<img src='image/icon.png' class='.img-thumbnail icon-img'>";
					login_success_form+="<span class='nickname'>발냄새</span>";
					login_success_form+="</a>";
					login_success_form+="<a href='#' onclick='getFriendFeed(7); return false;' class='list-group-item list-group-item-action list-group-item-light'>";
					login_success_form+="<img src='image/icon.png' class='.img-thumbnail icon-img'>";
					login_success_form+="<span class='nickname'>새가슴</span>";
					login_success_form+="</a>";
					login_success_form+="</div>";
					login_success_form+="</div>";
					login_success_form+="</div>";
					login_success_form+="</div>";

				  $('#title-area').html('');
				  $('#nav-area').html(nav_form);
				  $('#content-area').html(login_success_form);
			}else{
				$('#login-error-msg').html(returnData.message);
			}
		});
	});
	
	$(document).on("click","#goMain",function(){
//		alert();
		location.href="index.html";
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