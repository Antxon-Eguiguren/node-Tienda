const mongoose = require('mongoose');

const connUrl = 'mongodb://127.0.0.1/Neoland';

mongoose.connect(connUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});