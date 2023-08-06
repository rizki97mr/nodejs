const mongoose = require('mongoose');
mongoose.connect('mongodb://rizki:root@127.0.0.1:27017/eduwork-mongoose?authSource=admin');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('Server database terhubung'));

