var feathers = require('feathers');
var MessageSvc = require('./message');

feathers()
	.configure(feathers.socketio())
	.use(feathers.static(__dirname + '/../'))
	.use('/message', new MessageSvc())
	.listen(8000);