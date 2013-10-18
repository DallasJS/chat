var Chatbox = can.Control.extend({

	init: function() {
		this.element.html(can.view('client/login.ejs', {}));
	},

	render: function() {
		this.element.html(can.view('client/chatbox.ejs', {
			messages: this.options.messages,
			users: this.options.users
		}));
	},

	'.login keypress': function(el, ev) {
		var self = this;

		if(ev.charCode === 13 && el.val().trim().length) {
			this._user = el.val();

			socket.emit('users::get', function(error, users) {
				users.forEach(function(user) {
					self.options.users.push(user);
				});
			});

			socket.emit('users::create', this._user, function() {});

			this.render();
		}
	},

	'.chat keypress': function(el, ev) {

		if(ev.charCode === 13) {
			socket.emit('messages::create', {
				text: $(ev.target).val(),
				user: this._user
			}, function() {});

			el.val('');
		}
	}

});

var socket = io.connect(),
messages = new can.List([]),
users = new can.List([]);

new Chatbox('.chatbox', {
	messages: messages,
	users: users
});

socket.on('messages created', function(msg) {
	var timestamp = new Date(msg.timestamp).toLocaleString();
	msg.timestamp = timestamp;
	messages.push(msg);
});

socket.on('users created', function(user) {
	users.push(user);
});