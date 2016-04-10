$(document).ready(function(){
	$(".number").click(function() {
		if ($(".output").html() !== "0"){
			$(".output").html($(".output").html() + $(this).html());
		} else {
			$(".output").html($(this).html());
		}
	})
})
