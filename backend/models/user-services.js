const mongoose = require("mongoose");
const WorkoutSchema = require("./workout");
const StatsSchema = require("./stats");
const dotenv = require("dotenv");
dotenv.config();

let dbConnection;

function setConnection(newConn){
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

exports.getWorkouts = getWorkouts;
exports.findWorkoutById = findWorkoutById;
exports.addWorkout = addWorkout;
exports.deleteWorkout = deleteWorkout;
exports.getStats = getStats;
exports.updateStats = updateStats;
exports.setConnection = setConnection;
