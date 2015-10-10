$("#jobViewHistory-details a.more").click(function () {

    var parent = $(this).parent().parent();
	$("li.toggle", parent).toggle();

	var isExpanded = $(this).data("isExpanded");
	isExpanded = !isExpanded;
	var moreText = $("#jobViewHistory-details").data("moretext");
	var lessText = $("#jobViewHistory-details").data("lesstext");
	$(this).text(isExpanded ? lessText : moreText);
	$(this).data("isExpanded", isExpanded);
});
