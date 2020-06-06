const mongoose = require('mongoose')
mongoose.connect(
    process.env.db, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true,
        useFindAndModify: false
    }, 
    (err, res) => {
        if (err) throw err;
        console.log('DB online')
    }
)