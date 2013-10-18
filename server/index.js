var feathers = require('feathers');
var MessageSvc = require('./messages');
var UserSvc = require('./users');

feathers()
	.configure(feathers.socketio())
	.use(feathers.static(__dirname + '/../'))
	.use('/messages', new MessageSvc())
	.use('/users', new UserSvc())
	.listen(8000);