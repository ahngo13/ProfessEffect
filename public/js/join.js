$(document).ready(function(){
			
	//가입하기 버튼 클릭 시
	$(document).on("click","#join_btn",function(){
		
		const joinEmail = $('#joinEmail').val();
		const joinPw= $('#joinPw').val();
		const joinName= $('#joinName').val();
		const joinNickName= $('#joinNickName').val();
		const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
		
		let errMsg = '';
		
		if(joinEmail == '' || joinEmail==undefined){
			errMsg = "이메일 주소를 입력해주세요.";
			$('#join-error-msg').html(errMsg);
			$('#joinEmail').focus();
			return;
		}else if(joinEmail.match(regExp) == null || joinEmail.match(regExp) == undefined){
			errMsg = "이메일 형식에 맞게 입력해주세요.";
			$('#login-error-msg').html(errMsg);
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

		$.post('/contact', send_param, function(resultData){
			//alert(resultData.message);
			if(resultData.errYn == '1'){
				$('#join-error-msg').html(resultData.message);
				if(resultData.JoinGb=='email'){
					$('#joinEmail').focus();
					return;
				}else if(resultData.JoinGb=='nickname'){
					$('#joinNickName').focus();
					return;
				}
			}else{
				$('#content-area').html(resultData);
			}
        });
	});
});