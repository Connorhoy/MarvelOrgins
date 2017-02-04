//app pre-chosen topics
var topics = 'Iron Man, Thor, Wolverine'.split(',');

$(document).ready(function() {

// run the create buttons fucntion
	createButtons();

});

// functions for buttons

function createButtons() {
	var buttonList = $('#buttonList');

	buttonList.empty();

	for (i in topics) {
		var button = singleButton(topics[i]);
		buttonList.append(button);
	}
}

function singleButton(buttontext) {
	var button = $('<button>').html(buttontext)
	.attr('class', 'btn btn-danger btn-userTopic')
	.addClass('capitalise') // converts what users type to caps, due to my OCD
	.attr('data-topic', buttontext);

	return button;
}
