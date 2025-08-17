const { mongoose } = require('../config/registerDB')

const bcrypt = require('bcrypt')

let userSchemaObject = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password_hash:String
},{
    timestamps: true
});

userSchemaObject.virtual('password')
.set(function(password){
    this.password_hash = bcrypt.hashSync(password, 10)
});

const user = mongoose.model('user',userSchemaObject);

module.exports = {user}