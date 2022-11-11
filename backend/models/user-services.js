const mongoose = require("mongoose");
const WorkoutSchema = require("./workout");
const StatsSchema = require("./stats");
const dotenv = require("dotenv");
const UserSchema = require("./user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
dotenv.config();

let dbConnection;

function setConnection(newConn) {
    dbConnection = newConn;
    return dbConnection;
}

function getDbConnection() {
    if (!dbConnection) {
        dbConnection = mongoose.createConnection(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    return dbConnection;
}

async function getWorkouts(name) {
    const workoutModel = getDbConnection().model("Workout", WorkoutSchema);
    let result;
    if (name === undefined) {
        result = await workoutModel.find();
    } else if (name) {
        result = await findWorkoutByName(name);
    }
    return result;
}

async function getStats() {
    const statsModel = getDbConnection().model("Stats", StatsSchema);
    return (result = await statsModel.find());
}

async function updateStats(id, newRec) {
    const statsModel = getDbConnection().model("Stats", StatsSchema);
    try {
        return await statsModel.findByIdAndUpdate(
            id,
            { records: newRec },
            { new: true }
        );
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function deleteStat(id, name) {
    const statsModel = getDbConnection().model("Stats", StatsSchema);

    try {
        const deleteRow = await statsModel.updateOne(
            { _id: id },
            {
                $pull: {
                    records: { name: name },
                },
            }
        );
        return deleteRow;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function findWorkoutById(id) {
    const workoutModel = getDbConnection().model("Workout", WorkoutSchema);
    try {
        return await workoutModel.findById(id);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function addWorkout(workout) {
    // userModel is a Model, a subclass of mongoose.Model
    const workoutModel = getDbConnection().model("Workout", WorkoutSchema);
    try {
        // You can use a Model to create new documents using 'new' and
        // passing the JSON content of the Document:
        const workoutToAdd = new workoutModel(workout);
        const savedWorkout = await workoutToAdd.save();
        return savedWorkout;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function deleteWorkout(id) {
    const workoutModel = getDbConnection().model("Workout", WorkoutSchema);
    try {
        const deletedWorkout = await workoutModel.findByIdAndDelete(id);
        return deletedWorkout;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function findWorkoutByName(name) {
    const workoutModel = getDbConnection().model("Workout", WorkoutSchema);
    return await workoutModel.find({ name: name });
}

async function registerNewUser(req) {
    const userModel = getDbConnection().model("users", UserSchema);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const existingUser = await userModel.findOne({
        $or: [
            { email: req.body.email },
            { username: req.body.username },
            { password: hashedPassword },
        ],
    });
    if (existingUser) {
        if (existingUser.email === req.body.email) {
            return { result: "Email already exists", success: false };
        } else if (existingUser.username === req.body.username) {
            return { result: "Username already exists", success: false };
        } else if (existingUser.password === hashedPassword) {
            return { result: "Password already exists", success: false };
        }
    } else {
        req.body._id = mongoose.Types.ObjectId();
        const newUser = new userModel(req.body);
        newUser.password = hashedPassword;
        const res = await newUser.save();
        return { result: res, success: true };
    }
}

async function loginUser(req) {
    const userModel = getDbConnection().model("users", UserSchema);
    const email = req.body.email;
    const password = req.body.password;
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
        return { result: "Email not found", success: false };
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (passwordMatch) {
        const payload = {
            id: existingUser.id,
            name: existingUser.username,
        };
        const token = jwt.sign(payload, "secret", { expiresIn: 31556926 });
        return {
            result: {
                token: token,
                id: existingUser.id,
                username: existingUser.username,
            },
            success: true,
        };
    } else {
        return { result: "Password not correct", success: false };
    }
}

async function getUserById(id) {
    const userModel = getDbConnection().model("User", UserSchema);
    const result = await userModel.findById(id);
    return result;
}

async function updateUser(id, newName, newPic) {
    const userModel = getDbConnection().model("User", UserSchema);
    try {
        return await userModel.findByIdAndUpdate(
            id,
            { name: newName, avatar: newPic },
            { new: true }
        );
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

exports.getWorkouts = getWorkouts;
exports.findWorkoutById = findWorkoutById;
exports.addWorkout = addWorkout;
exports.deleteWorkout = deleteWorkout;
exports.getStats = getStats;
exports.updateStats = updateStats;
exports.registerNewUser = registerNewUser;
exports.loginUser = loginUser;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.setConnection = setConnection;
exports.deleteStat = deleteStat;
