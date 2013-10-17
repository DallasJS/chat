var socket = io.connect();

socket.on('message created', function(msg) {
	var li = $('<li>'),
	timestamp = new Date(msg.timestamp);
	li.addClass('list-group-item');
	li.text(timestamp.toLocaleString() + ': ' + msg.text);

	$('.chatbox').append(li);
});

$('input').on('keypress', function(ev) {
	if(ev.charCode === 13) {
		socket.emit('message::create', {
			text: $(ev.target).val()
		}, {}, function(error, callback) {});
	}
});