var Store = function() {
	this.messages = [];
};

Store.prototype.create = function(data, callback) {
	var msg = {
		timestamp: Date.now(),
		text: data.text,
		user: data.user
	};

	this.messages.push(msg);
	callback(null, msg);
};

module.exports = Store;