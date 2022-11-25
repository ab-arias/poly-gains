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

// USER

async function registerNewUser(req) {
    const userModel = getDbConnection().model("users", UserSchema);
    const statsModel = getDbConnection().model("Stats", StatsSchema);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const existingUser = await userModel.findOne({
        $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (existingUser) {
        if (existingUser.email === req.body.email) {
            return { error: { email: "Email already exists" }, success: false };
        } else {
            return {
                error: { username: "Username already exists" },
                success: false,
            };
        }
    } else {
        req.body._id = mongoose.Types.ObjectId();
        const newStat = new statsModel();
        newStat._id = mongoose.Types.ObjectId();
        newStat.height = 0;
        newStat.weight = 0;
        newStat.mile = "N/A";
        newStat.calories = 0;
        newStat.plan = "N/A";
        await newStat.save();
        const newUser = new userModel(req.body);
        newUser.password = hashedPassword;
        newUser.workouts.push("637012e5c8e5bba98b4d3903");
        newUser.avatar = "";
        newUser.stats = newStat._id;
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
        return { error: { email: "Email does not exist" }, success: false };
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
        return {
            error: { password: "Password does not match" },
            success: false,
        };
    }
}

async function getUserById(id) {
    const userModel = getDbConnection().model("User", UserSchema);
    const result = await userModel.findById(id);
    return result;
}

async function getUserByUsername(username) {
    const userModel = getDbConnection().model("User", UserSchema);
    const result = await userModel.findOne({ username: username });
    return result;
}

async function updateUser(
    id,
    newName,
    newPic,
    newActWorkouts,
    newWorkouts,
    newFriends
) {
    const userModel = getDbConnection().model("User", UserSchema);
    try {
        return await userModel.findByIdAndUpdate(
            id,
            {
                name: newName,
                avatar: newPic,
                activeWorkouts: newActWorkouts,
                workouts: newWorkouts,
                friends: newFriends,
            },
            { new: true }
        );
    } catch (error) {
        return undefined;
    }
}

async function searchUsers(username) {
    const userModel = getDbConnection().model("User", UserSchema);
    try {
        return await userModel.aggregate([
            {
                $search: {
                    index: "userSearch",
                    autocomplete: {
                        query: username,
                        path: "username",
                        fuzzy: {
                            maxEdits: 1,
                            prefixLength: 1,
                        },
                    },
                },
            },
            {
                $limit: 5,
            },
            {
                $project: {
                    name: 0,
                    email: 0,
                    password: 0,
                    __v: 0,
                },
            },
        ]);
    } catch (error) {
        return undefined;
    }
}

async function getFriends(id) {
    const userModel = getDbConnection().model("User", UserSchema);
    try {
        const user = await userModel.findById(id).populate({
            path: "friends",
            populate: {
                path: "friend",
                select: { _id: 1, username: 1, avatar: 1 },
            },
        });
        return user.friends;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

// WORKOUTS

async function getUserWorkouts(list) {
    const workoutModel = getDbConnection().model("Workout", WorkoutSchema);
    try {
        const workoutIDs = list.map((id) => mongoose.Types.ObjectId(id));
        return await workoutModel.find({ _id: { $in: workoutIDs } });
    } catch (error) {
        return undefined;
    }
}

async function updateWorkout(id, newWorkout) {
    const workoutModel = getDbConnection().model("Workout", WorkoutSchema);
    try {
        const res = await workoutModel.findByIdAndUpdate(id, newWorkout, {
            new: true,
        });
        return res;
    } catch (error) {
        return undefined;
    }
}

async function findWorkoutById(id) {
    const workoutModel = getDbConnection().model("Workout", WorkoutSchema);
    try {
        return await workoutModel.findById(id);
    } catch (error) {
        return undefined;
    }
}

async function addWorkout(workout) {
    const workoutModel = getDbConnection().model("Workout", WorkoutSchema);
    try {
        const workoutToAdd = new workoutModel(workout);
        const savedWorkout = await workoutToAdd.save();
        return savedWorkout;
    } catch (error) {
        return false;
    }
}

async function deleteWorkout(id) {
    const workoutModel = getDbConnection().model("Workout", WorkoutSchema);
    try {
        const deletedWorkout = await workoutModel.findByIdAndDelete(id);
        return deletedWorkout;
    } catch (error) {
        return false;
    }
}

// // STATS

async function getStatsById(id) {
    const statsModel = getDbConnection().model("Stats", StatsSchema);
    const result = await statsModel.findById(id);
    return result;
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
        return undefined;
    }
}

module.exports = {
    registerNewUser,
    loginUser,
    getUserById,
    getUserByUsername,
    updateUser,
    searchUsers,
    getFriends,
    getUserWorkouts,
    updateWorkout,
    findWorkoutById,
    addWorkout,
    deleteWorkout,
    getStatsById,
    updateStats,
    deleteStat,
    setConnection,
    getDbConnection,
};
