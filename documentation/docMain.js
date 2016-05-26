function changeVisibility(divId){
	var divObj = $("#" + divId)
	if(divObj.hasClass("non-visible"))
		divObj.removeClass("non-visible");
	else
		divObj.addClass("non-visible");

}

function ajaxCall(ajaxFile,ajaxDivId){
	$.ajax({
		url: ajaxFile,
		success:function (data) {
			$('#' + ajaxDivId).html(data);
		}
	});
};