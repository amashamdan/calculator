var operation;
var number1;
var secondNumber = false;
var equalHit = false;

$(document).ready(function(){

	$(".output").html(0);
	
	$(".number").click(function() {
		equalHit = false;
		if (secondNumber == false){
			if ($(".output").html() !== "0"){
				$(".output").html($(".output").html() + $(this).html());
			} else {
				$(".output").html($(this).html());
			}
		} else {
			$(".output").html($(this).html());
			secondNumber = false;
		}
	})

	$(".clear-all").click(function() {
		$(".output").html(0);
		operation = null;
		secondNumber = false;
		number1 = 0;
		equalHit = false;
	})

	$(".clear").click(function() {
		$(".output").html(0);
	})

	$(".operation").click(function() {
		equalHit = false;
		operation = $(this).html();
		number1 = Number($(".output").html());
		secondNumber = true;
	})

	$(".equal").click(function() {
		getResult();
	})
})

function getResult() {
	if (!equalHit) {
		switch (operation){
			case "+":
				$(".output").html(Number($(".output").html()) + number1);
				break;
			case "-":
				$(".output").html(Number(number1 - $(".output").html()));
				break;
			case "x":
				$(".output").html(Number($(".output").html()) * number1);
				break;
			case "/":
				$(".output").html(Number(number1 / $(".output").html()));
				break;
		}
		equalHit = true;
	}
}