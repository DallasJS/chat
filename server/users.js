var Store = function() {
	this.users = [];
};

Store.prototype.get = function(callback) {
	callback(null, this.users);
};

Store.prototype.create = function(data, callback) {
	var user = {
		_id: Date.now(),
		name: data
	};

	this.users.push(user);
	callback(null, user);
};

module.exports = Store;