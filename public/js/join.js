$(document).ready(function(){
			
	//가입하기 버튼 클릭 시
	$(document).on("click","#join_btn",function(){
		
		const joinEmail = $('#joinEmail').val();
		const joinPw= $('#joinPw').val();
		const joinName= $('#joinName').val();
		const joinNickName= $('#joinNickName').val();
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
		
		const send_param = {joinEmail, joinPw, joinName, joinNickName};

		$.post('contact', send_param, function(resultData){
            alert(resultData.message);
        });
/* 		const send_data_temp={
				email:joinEmail,
				name:joinName,
				nickName:joinNickName,
				pw:joinPw
		}; */
		
		
		//const send_data=JSON.stringify(send_data_temp);
		
	//	$.post('/join', send_data, function(returnData,status){
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
	//	});
	});
});