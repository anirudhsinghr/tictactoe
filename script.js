/* Variables */

var ele = document.querySelectorAll('div.element'), //All the box elements array
	playerInfo = document.querySelector('p#playerInfo'), // Player status
	arr = new Array(10,11,12,13,14,15,16,17,18), // array filled with random numbers
	moves = 0, //number of moves played
	player = 1; // player's turn

/* For Loop Attaching Event Handlers */

for (var i = 0; i < ele.length; i++) {

	ele[i].ontouchstart = clickHandler.bind(this); // mobile phones touch events

	ele[i].onmouseenter = function () {

		if (player == 1 && this.getAttribute("data-set") == "false") {
			this.style.background = 'url(X.png)';
		} else if (player == 2 && this.getAttribute("data-set") == "false") {
			this.style.background = 'url(O.png)';
		}

		this.onclick = clickHandler.bind(this);

	}; //onmouseenter event handler

	ele[i].onmouseleave = function() { 

		if(this.getAttribute("data-set") == "false") {
			this.style.background = 'url()'; 
		}

	}; //onmouseleave event handler

	
} //end of for loop

/* Functions */

/* Function to check if someone won */
function checkWin () {
	if ( arr[0] == arr[1] && arr[0] == arr[2] ||
		 arr[3] == arr[4] && arr[3] == arr[5] ||
		 arr[6] == arr[7] && arr[6] == arr[8] ||
		 arr[0] == arr[3] && arr[0] == arr[6] ||
		 arr[1] == arr[4] && arr[1] == arr[7] ||
		 arr[2] == arr[5] && arr[2] == arr[8] ||
		 arr[0] == arr[4] && arr[0] == arr[8] ||
		 arr[2] == arr[4] && arr[2] == arr[6] ) {

		 return true;

	} else {

		return false;
	}
}

/* Function to reset the game */

function resetGame () {
	moves = 0;
	player = 1;
	for (var i = 0; i < ele.length; i++) {
		ele[i].setAttribute("data-set", "false");
		ele[i].setAttribute("data-pos", i);
		ele[i].style.background = 'url()';
		arr[i] = 10 + i;
	}
}

/* Click and Touch Handler Function */

function clickHandler (e) {

	if (player == 1 && this.getAttribute("data-set") == "false") {

		moves++;
		arr[parseInt(this.getAttribute("data-pos"))] = player;

		if( checkWin() == true ){
			alert("Player " + player + " Won!!");
			resetGame();
		} else {
			this.style.background = "url(X.png)";
			this.setAttribute("data-set", "true");
			player = (player == 1) ? 2 : 1;
		}

	} else if (player == 2 && this.getAttribute("data-set") == "false") {

		moves++;
		arr[parseInt(this.getAttribute("data-pos"))] = player;

		if( checkWin() == true ){
			alert("Player " + player + " Won!!");
			resetGame();
		} else {
			this.style.background = "url(O.png)";
			this.setAttribute("data-set", "true");
			player = (player == 1) ? 2 : 1;
		}

	}

	if (moves == 9 && checkWin() == false) {
		alert("Nobody Won!!");
		resetGame();
	}
	
	playerInfo.innerHTML = "Player " + player + "'s Turn";

	e.stopPropagation();
    	e.preventDefault();

}; // onmouseclick event handler
