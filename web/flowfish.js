
// let fishForSquare = {
// 	"4,4": "pink",
// 	"1,4": "pink",
// 	"4,1": "green",
// 	"2,1": "green",
// 	"1,1": "yellow",
// 	"3,3": "yellow",
// 	"4,3": "red",
// 	"3,2": "red"
// };

// let boardSize

let boardSize = 6;

let fishForSquare = {
	"4,4": "brown",
	"2,3": "brown",
	"3,3": "silver",
	"5,2": "silver",
	"5,4": "blue",
	"5,6": "blue",
	"2,5": "green",
	"4,5":"green",
	"4,6": "yellow",
	"2,6":"yellow",
	"1,6":"pink",
	"4,2":"pink",
	"6,6": "red",
	"1,1":"red"
};

let showCoords = false; //true;



let maindiv = $('#contents');

let selectedFish = null;

function selectFish(fish, el) {
	console.warn("You clicked fish "+fish, el);
	if (fish) selectedFish=fish;
}

function fillInSquare(square) {
	console.log("fillInSquare", square, selectedFish);
	$(square).css('color',selectedFish).text("#");
}

let w = Math.min($(document).width(), $(document).height()) * 0.9 / boardSize;

let fishrep = "&#x1f41f;"
let $table = $("<table>");
for(let row=1; row<=boardSize; row++) {
	let $row = $("<tr>");
	for(let col=1; col<=boardSize; col++) {
		let fish = fishForSquare[row+','+col];
		let $td;
		if (fish) {
			$td = $(`<td class='sq fish' data-fish='${fish}'
						onclick='selectFish("${fish}", this)' 
						style='color:${fish}'>${fishrep}</td>`);
		} else {
			$td = $("<td class='sq empty sea' >"+
				(showCoords? row+","+col : "") 
				+"</td>");
			$td.click(e => fillInSquare($td));			
		}
		$td.touch();
		$td.on('touchmove', e => {		
			let xy = e.targetTouches? e.targetTouches[0] : e;		
			let $undersq = $(document.elementFromPoint(xy.clientX, xy.clientY)).closest(".sq");
			// console.warn(xy, xy.clientX, e.clientX, e.clientY, undersq, e);			
			if ($undersq.hasClass('sea')) {
				fillInSquare($undersq);
			} else if ($undersq.hasClass('fish')) {
				selectFish($undersq.data('fish'), $undersq);
			}
		});
		$td.css('width', w+'px');
		$td.css('height', w+'px');
		$row.append($td);		
	}
	$table.append($row);
}
maindiv.append($table);