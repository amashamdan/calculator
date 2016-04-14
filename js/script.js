/* In the following lines a group of variables are declared. */

/* The variable operation stores the last operation button pressed. */
var operation;

/* number1 variable holds the first operand before entering the second operand. */
var number1;

/* The following variable holds a false value until and operation button is pressed.
when true and a number button is pressed, a new operand will be entered. When false,
the digit pressed will be concatenated to the number displayed. */
var secondNumber = false;

/* This variable is used to prevent the calculator from doing anything if the = button
is pressed repeatedly. it is set to ture once equal is hit. */
var equalHit = false;

/* This variable is used for chaining to decide what pressing an operation sign should do,
it is reset when clear all button is pressed. */
var counter = 0;

/* An array to hold at most the last two operation buttons pressed. It is used for
chaining as well. */
var operations = [];


/* For jQuery event handlers to work properly, all of them are placed in this function. */
$(document).ready(function(){

	/* The calculator's display is set to display 0 */
	$(".output").html(0);
	
	/* Once a number is pressed, the following executes. */
	$(".number").click(function() {
		/* equalHit is set to false to activate the equal button again. */
		equalHit = false;
		if (secondNumber == false){
			/* If secondNumber is false, it means that we're still entering the first
			operand, and the pressed number should be concatenated with what's on display. */
			if ($(".output").html() !== "0"){
				/* If the display is showing 0, it would be removed. */
				$(".output").html($(".output").html() + $(this).html());
			} else {
				$(".output").html($(this).html());
			}
		} else {
			/* If secondNumber is true, it means that an operation button was pressed, and
			a new number will be entered. */
			$(".output").html($(this).html());
			/* secondNumber is set back to false to keep entering the second number. */
			secondNumber = false;
		}
	})

	/* Upon pressing clear all (AC) button, the calculator is reset to 0 and all
	variables are set back to their initial values. */
	$(".clear-all").click(function() {
		$(".output").html(0);
		operation = null;
		operations = [];
		secondNumber = false;
		number1 = 0;
		equalHit = false;
		counter = 0;
	})

	/* The clear (CE) buttons clears the number being entered only. */
	$(".clear").click(function() {
		$(".output").html(0);
	})

	/* The following executes if any operation button (+, -, * or /) is pressed. */
	$(".operation").click(function() {
		/* The counter variable is checked to see if operations are being chained.
		When counter is 0, no chaining is being done. */
		if (counter === 0) {
			/* equalHit is reset in case it was set to true. */
			equalHit = false;
			/* The operator pressed is stored in operation variable. */
			operation = $(this).html();
			/* The first operand is stored in number1. */
			number1 = Number($(".output").html());
			/* The secondNumber is set to true to indicate that the first operand
			is completely entered. */
			secondNumber = true;
			/* counter is incremented */
			counter++;
			/* The operator pressed is stored in operations array incase chaining
			is used later. */
			operations.push(operation);
		/* If counter is not 0, then chaining is being carried out. */
		} else {
			/* The pressed operator saved in operation. */
			operation = $(this).html();
			/* The length of operation is checked, if it's only 1, the last operator
			pressed is pushed to operations. */
			if (operations.length == 1){
				operations.push(operation);
			} else {
				/* If operations length is 2, the first element is removed, and then
				the last operator is pushed. This is done because we need to keep track
				of the last two operations only. */
				operations.shift();
				operations.push(operation);
			}
			/* secondNumber is set to true */
			secondNumber = true;
			/* If chaining is being carried out, we want to display the latest result
			once an operator is pressed. element zero of operations is called because,
			the result displayed will be calculated using the before the last operation.
			For example (5 + 9 - 6), when - is pressed, the display should show 14 which
			is the result of 5 + 9. */
			getResult(operations[0]);
		}
	})

	/* The = button calls getResults with the last element of operations. */
	$(".equal").click(function() {
		getResult(operations[operations.length - 1]);
	})

	/* The (-) button changes the sign of the number on display. */
	$(".sign").click(function() {
		$(".output").html(Number($(".output").html()) * (-1));
		/* If equalHit is true, the new value is saved in number1. This is only
		executed if the result's sign is changed after equal is hit. If the sign
		is changed in another way, it will be automatically saved to number1. */
		if (equalHit) {
			number1 = Number($(".output").html());
		}
	})

	/* The % button divides the number on display by 100. */
	$(".percentage").click(function() {
		$(".output").html(Number($(".output").html()) / 100);
		/* If equalHit is true, the new value is saved in number1. This is only
		executed if the result is divided by 100 after equal is hit. */
		if (equalHit) {
			number1 = Number($(".output").html());
		}	
	})

	/* The decimal button adds a decimal point to the number being entered. */
	$(".decimal").click(function() {
		/* If the decimal is pressed after when a new operand is about to be entered,
		It is inserted with a preceeding 0. */
		if (secondNumber) {
			$(".output").html("0.");
			/* Once the decimal point is inserted, the secondNumber is set back to 
			false to continue entering the number. */
			secondNumber = false;
		} else {
			/* If the decimal is pressed when secondNumber is false, the decimal is
			inserted and nothing else is done. */
			$(".output").html($(".output").html() + ".");
		}
	})
})

/* This function obtains the result corresponding to the called operation. */
function getResult(operation) {
	/* if equalHit is true, it means that the last button clicked was equal button.
	The key is temporarily deactivated. */
	if (!equalHit) {
		/* The called operation is checked, and then the operation is carried out
		with the operands number1 and what's on display, and then the result is displayed. */
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
		/* number1 is updated. This is needed for chaining. */
		number1 = Number($(".output").html());
		/* equalHit is set to true to deactivate equal button temporarily. */
		equalHit = true;
	}
}