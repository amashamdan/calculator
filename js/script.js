var operation;
var number1;
var secondNumber = false;
var equalHit = false;
var counter = 0;
var operations = [];

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
		operations = [];
		secondNumber = false;
		number1 = 0;
		equalHit = false;
		counter = 0;
	})

	$(".clear").click(function() {
		$(".output").html(0);
	})

	$(".operation").click(function() {
		if (counter === 0) {	
			equalHit = false;
			operation = $(this).html();
			number1 = Number($(".output").html());
			secondNumber = true;
			counter++;
			operations.push(operation);
		} else {
			operation = $(this).html();
			if (operations.length == 1){
				operations.push(operation);
			} else {
				operations.shift();
				operations.push(operation);
			}
			secondNumber = true;
			getResult(operations[0]);
		}
	})

	$(".equal").click(function() {
		getResult(operations[operations.length - 1]);
	})
})

function getResult(operation) {
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
		number1 = Number($(".output").html());
		equalHit = true;
	}
}