$(document).ready(function() {
	$('input').each(function() {
		var $type = $(this).attr('type');

		if ($type == 'text' || $type == 'file') {
			$(this).val('');
		}
	});

	$('#title').focus();

	$('.article-view').each(function() {
		var article_id = ".article-view[data-id=" + $(this).data('id') + "]";
		$.ajax({
			type: "GET",
			url: "/boardapp/comm_view/"+$(this).data('id'),
			success: function(response) {
				$(article_id).html(response);
			},
		});	
	});

	$('.article-reply').each(function() {
		var reply_id = ".article-reply[data-id=" + $(this).data('id') + "]";
		$.ajax({
			type: "GET",
			url: "/boardapp/reply_list/"+$(this).data('id'),
			success: function(response) {
				$(reply_id).html(response);
			},
		});	
	});

	$('.article-like').each(function() {
		var like_id = ".article-like[data-id=" + $(this).data('id') + "]";
		$.ajax({
			type: "GET",
			url: "/boardapp/board_like/"+$(this).data('id'),
			success: function(response) {
				$(like_id).html(response);
			},
		});	
	});

	var fileList = new Array();

	$('#imgFile').change(function() {
		var $img = $('#imgFile')[0];

		for (var i=0; i<$img.files.length; i++) {
			var imgReader = new FileReader();
			imgReader.onload = function(e) {
				$('#image-box').append("<span class='image-list'><img src='"+e.target.result+"' width='100' height='100' />X</span>");
			}
			imgReader.readAsDataURL($img.files[i]);
			fileList.push($img.files[i]);
		}
	});

	$(document).on('click','.image-list',function() {
		fileList.splice($(this).index(), 1);
		$(this).remove();
	});
});

function writeSend() {
	console.log($('#imgFile'));
//	console.log(
	return;

	if (!$('#title').val())
	{
		alert("제목을 입력해 주시기 바랍니다.");
		return;
	}

	if (!$('#content').val())
	{
		alert("내용을 입력해 주시기 바랍니다.");
		return;
	}

	$('#write_form').submit();	
}

function modifySend() {
	if (!$('#title').val())
	{
		alert("제목을 입력해 주시기 바랍니다.");
		return;
	}

	if (!$('#content').val())
	{
		alert("내용을 입력해 주시기 바랍니다.");
		return;
	}

	$('#modify_form').submit();	
}

function modifyCommSend(id) {
	var article_id = ".article-view[data-id="+id+"]";
	var article_form = "form[data-type=modify][data-id="+id+"]";

	if (!$(article_form + ' input[name=title]').val())
	{
		alert("제목을 입력해 주시기 바랍니다.");
		return;
	}

	if (!$(article_form + ' textarea[name=content]').val())
	{
		alert("내용을 입력해 주시기 바랍니다.");
		return;
	}
}

function replyWriteSend(id) {
	var article_form = 'form[data-type=reply][data-id='+id+']';
	var article_id = '.article-reply[data-id='+id+']';

	if (!$(article_form + ' textarea').val())
	{
		alert("내용을 입력해 주시기 바랍니다.");
		return;
	}

	$.ajax({
		type: "POST",
		url: "/boardapp/reply_write_res/",
		data: $(article_form).serialize(),
		success: function(response) {
			$(article_id).html(response);
			$(article_form + ' teatxrea').val('');
		},
	});
}

function replyReplySend(id, article_id) {
	var article_form = 'form[data-type=reply-reply][data-id='+id+']';
	var article_id = '.article-reply[data-id='+article_id+']';

	if (!$(article_form + ' textarea').val())
	{
		alert("내용을 입력해 주시기 바랍니다.");
		return;
	}

	$.ajax({
		type: "POST",
		url: "/boardapp/reply_write_res/",
		data: $(article_form).serialize(),
		success: function(response) {
			$(article_id).html(response);
			$(article_form + ' teatxrea').val('');
			$('.reply-reply[data-id='+id+']').css('display','none');
		},
	});
}

function replyModifySend(id, article_id) {
	var article_form = "form[data-type=reply-modify][data-id="+id+"]";
	var article_id = ".article-reply[data-id="+article_id+"]";

	if (!$(article_form + ' textarea').val())
	{
		alert("내용을 입력해 주시기 바랍니다.");
		return;
	}

	$.ajax({
		type: "POST",
		url: "/boardapp/reply_modify_res/",
		data: $(article_form).serialize(),
		success: function(response) {
			$(article_id).html(response);
		},
	});
}

function deleteClick(id) {
	if (confirm("삭제하시겠습니까?"))
	{
		if (!id)
		{
			$('#delete_form').submit();
		} else {
			$("form[data-id="+id+"]").submit();
		}
	}
}

function modifyClick(id) {
		$.ajax({
			type: "GET",
			url: "/boardapp/comm_modify/"+id,
			success: function(response) {
				$(".article-view[data-id="+id+"]").html(response);
			},
		});	
}

function modifyCancel(id) {
		$.ajax({
			type: "GET",
			url: "/boardapp/comm_view/"+id,
			success: function(response) {
				$(".article-view[data-id="+id+"]").html(response);
			},
		});
}

function replyDeleteClick(reply_id, article_id) {
	if (confirm("삭제하시겠습니까?"))
	{
		var reply_form = 'form[data-type=reply_delete][data-id='+reply_id+']';
		var reply_id = '.article-reply[data-id='+article_id+']';

		$.ajax({
			type: "POST",
			url: "/boardapp/reply_delete_res/",
			data: $(reply_form).serialize(),
			success: function(response) {
				$(reply_id).html(response);
			},
		});
	}
}

function replyModifyClick(id) {
		$.ajax({
			type: "GET",
			url: "/boardapp/reply_modify/"+id,
			success: function(response) {
				$(".reply-block[data-id="+id+"]").html(response);
			},
		});	
}

function replyClick(reply_id) {
	$('.reply-reply').each(function() {
		$(this).css('display','none');
	});

	$('.reply-reply[data-id='+reply_id+']').css('display','block');
}

var inProgress = false;

function likeClick(article_id) {
	var like_form = 'form[data-type=like][data-id='+article_id+']';

	if(!inProgress) {
		inProgress = true;

		$.ajax({
			type: "POST",
			url: "/boardapp/board_like_res/",
			data: $(like_form).serialize(),
			dataType: 'json',
			success: function(response) {
				//$(".article-like[data-id="+article_id+"]").html(response);
				if (response.like_err_msg) {
					alert(response.like_err_msg);
				}
				$.ajax({
					type: "GET",
					url: "/boardapp/board_like/"+response.article_id,
					success: function(response) {
						$(".article-like[data-id="+article_id+"]").html(response);
					},
				});
				inProgress = false;
			},
		});
	}
}

function addImage() {
	$('#imgFile').click();
}

function resetForm(id) {
	
}


