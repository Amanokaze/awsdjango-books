$(document).ready(function() {
	// e-mail 주소 자르기
	var email = $('#email').val().split('@');
	$('#email_id').val(email[0]);
	$('#email_domain').val(email[1]);

	// 전화번호 자르기
	var phone = $('#phone').val().split('-');
	$('#phone1').val(phone[0]);
	$('#phone2').val(phone[1]);
	$('#phone3').val(phone[2]);
});

function changeEmailDomain() {
	$('#email_domain').val($('#email_selection').val());	
}

function userUpdate() {
	if (!$('#password').val()) {
		alert("비밀번호를 입력해 주시기 바랍니다.");
		return;
	}
	if ($('#password_new').val() != $('#password_check').val()) {
		alert("비밀번호가 일치하지 않습니다.");
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

	$('#phone_number').val($('#phone1').val() + "-" + $('#phone2').val() + "-" + $('#phone3').val());
	$('#email').val($('#email_id').val() + "@" + $('#email_domain').val());

	$('#user_info_form').submit();
}
