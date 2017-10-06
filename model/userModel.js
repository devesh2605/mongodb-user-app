var mongoose    =   require("mongoose");
var uri = 'mongodb path';
mongoose.connect(uri);

var mongoSchema =   mongoose.Schema;

var userSchema  = {
    "username" : String,
    "password" : String
};

module.exports = mongoose.model('userLogin',userSchema);