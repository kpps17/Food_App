const mongoose = require("mongoose");
const {dbLink} = require("../secrets/links")

console.log(dbLink);

mongoose.connect(dbLink).then((db) => {
    console.log('db connected');
    console.log(db);
}).catch((err) => {
    console.log(err);
});