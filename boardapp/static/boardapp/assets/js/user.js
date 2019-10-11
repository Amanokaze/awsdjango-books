function idCheck() {
	if (!$('#username').val())
	{
		alert("ID를 입력해 주시기 바랍니다.");
		return;
	}

	$.ajax({
		type: "POST",
		url: "/boardapp/user_register_idcheck/",
		data: {
			'username': $('#username').val(),
			'csrfmiddlewaretoken' : $("input[name=csrfmiddlewaretoken]").val()
		},
		success: function(response) {
			$('#idcheck-result').html(response);
		},
	});	
}

function changeEmailDomain() {
	$('#email_domain').val($('#email_selection').val());	
}

function cancelUserRegister() {
	var result = confirm("회원가입을 취소하시겠습니까?");	

	if (result)
	{
		$(location).attr('href', '/boardapp/login');
	}
}

function userRegister() {
	if (!$('#username').val())
	{
		alert("아이디를 입력해 주시기 바랍니다.");
		return;
	}
	if (!$('#IDCheckResult').val()) {
		alert("ID 중복체크를 먼저 진행해 주시기 바랍니다.");
		return;
	}
	if (!$('#password').val()) {
		alert("비밀번호를 입력해 주시기 바랍니다.");
		return;
	}
	if($('#password').val().length < 8) {
		alert('비밀번호는 최소 8자 이상이여야 합니다.');
		alert($('#password').val().length );
		return;
	}
	if ($('#password').val() != $('#password_check').val()) {
		alert("비밀번호가 일치하지 않습니다.");
		return;
	}
	if (!$('#last_name').val())
	{
		alert("이름을 입력해 주시기 바랍니다.");
		return;
	}
	if (!$('#phone1').val() || !$('#phone2').val() || !$('#phone3').val())
	{
		alert("전화번호를 올바르게 입력해 주시기 바랍니다.");
		return;
	}
	if (!$('#email_id').val() || !$('#email_domain').val())
	{
		alert("E-mail 주소를 올바르게 입력해 주시기 바랍니다.");
		return;
	}
	if (!$('#birth_year').val() || !$('#birth_month').val() || !$('#birth_day').val())
	{
		alert("생년월일을 올바르게 입력해 주시기 바랍니다.");
		return;
	}

	$('#phone').val($('#phone1').val() + "-" + $('#phone2').val() + "-" + $('#phone3').val());
	$('#email').val($('#email_id').val() + "@" + $('#email_domain').val());

	$('#register_form').submit();
}

function changePassword() {
	if (!$('#id_old_password').val()) {
		alert("비밀번호를 입력해 주시기 바랍니다.");
		return;
	}
	if ($('#id_new_password1').val() != $('#id_new_password2').val()) {
		alert("비밀번호가 일치하지 않습니다.");
		return;
	}

	$('#password_change_form').submit();
}