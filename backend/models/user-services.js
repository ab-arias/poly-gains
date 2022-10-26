const mongoose = require('mongoose');
const UserSchema = require("./user");

let dbConnection;

function getDbConnection() {
    if (!dbConnection) {
        dbConnection = mongoose.createConnection("mongodb://localhost:27017/workouts", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    return dbConnection;
  }

async function getUsers(name){
    const userModel = getDbConnection().model("User", UserSchema);
    let result;
    if (name === undefined){
        result = await userModel.find();
    }
    else if (name) {
        result = await findUserByName(name);
    }
    return result;  
}

async function findUserById(id){
    const userModel = getDbConnection().model("User", UserSchema);    
    try{
        return await userModel.findById(id);
    }catch(error) {
        console.log(error);
        return undefined;
    }
}

async function addUser(user){
    // userModel is a Model, a subclass of mongoose.Model
    const userModel = getDbConnection().model("User", UserSchema);
    try{
        // You can use a Model to create new documents using 'new' and 
        // passing the JSON content of the Document:
        const userToAdd = new userModel(user);
        const savedUser = await userToAdd.save()
        return savedUser;
    }catch(error) {
        console.log(error);
        return false;
    }   
}

async function deleteUser(id){
    const userModel = getDbConnection().model("User", UserSchema);
    try{
        const deletedUser =  await userModel.findByIdAndDelete(id);
        return deletedUser;
    }catch(error) {
        console.log(error);
        return false;
    }
}

async function findUserByName(name){
    const userModel = getDbConnection().model("User", UserSchema);
    return await userModel.find({'name':name});
}



exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
exports.deleteUser = deleteUser;