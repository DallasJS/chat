var Chatbox = can.Control.extend({

	defaults: {
		messages: new can.List()
	}

}, {

	init: function() {
		var self = this;

		this._fb = new Firebase('https://blistering-fire-1950.firebaseio.com');
		this._fbAuth = new FirebaseSimpleLogin(this._fb, function(error, user) {
			if(error && error.code === 'INVALID_USER') {
				//user does not exist yet so we'll create it for them
				this._fbAuth.createUser(this._email, '', function(error, user) {
					//now that the user exists, let's log them in
					self.login(user.email);
				});
			}
			else if(user) {
				//user has authenticated, so we'll save the user for our state
				this._user = user;

				//time to render a new view
				this.render();
			}
		}, this);

		this.setupListeners();
		this.element.html(can.view('client/login.ejs', {}));
		this._fbAuth.logout();
	},

	setupListeners: function() {
		var self = this;

		this._fb.on('child_added', function(snapshot) {
			self.options.messages.push(snapshot.val());
		});
	},

	render: function() {
		this.element.html(can.view('client/chatbox.ejs', {
			messages: this.options.messages,
			users: this.options.users
		}));
	},

	login: function(email) {
		this._fbAuth.login('password', {
			email: email,
			password: '',
			rememberMe: true
		});
	},

	'.login keypress': function(el, ev) {
		var email = el.val().toLowerCase();
		//generic regex to validate email addresses
		if(ev.keyCode === 13 && /\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}\b/.test(email)) {
			this._email = email;
			//try and login
			this.login(email);
		}
	},

	'.chat keypress': function(el, ev) {
		if(ev.charCode === 13) {
			this._fb.push({
				timestamp: Date.now(),
				text: el.val(),
				user: this._user.email
			});

			el.val('');
		}
	}

});

new Chatbox('.chatbox');