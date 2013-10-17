var Store = function() {
	this.messages = [];
};

Store.prototype.create = function(data, params, callback) {
	var msg = {
		timestamp: Date.now(),
		text: data.text
	};

	this.messages.push(msg);
	callback(null, msg);
};

module.exports = Store;