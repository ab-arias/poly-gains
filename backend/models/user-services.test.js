const mongoose = require("mongoose");
const WorkoutSchema = require("./workout");
const StatsSchema = require("./stats");
const userServices = require("./user-services");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let conn;
let WorkoutModel;
let StatsModel;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  conn = await mongoose.createConnection(uri, mongooseOpts);

  WorkoutModel = conn.model("Workout", WorkoutSchema);
  StatsModel = conn.model("Stats", StatsSchema);

  userServices.setConnection(conn);
});

afterAll(async () => {
  await conn.dropDatabase();
  await conn.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  let dummyWorkout = {
    name: "Push",
    day: "None",
    exercise_list: [
        {
            "exercise": "Bench",
            "sets": 5,
            "reps": 6,
            "weight": 225
        },
        {
            "exercise": "Dips",
            "sets": 4,
            "reps": 15,
            "weight": 0
        }
    ]
  };
  let result = new WorkoutModel(dummyWorkout);
  await result.save();

  dummyWorkout = {
    name: "Pull",
    day: "None",
    exercise_list: [
        {
            "exercise": "Cable rows",
            "sets": 5,
            "reps": 6,
            "weight": 130
        },
        {
            "exercise": "Pullups",
            "sets": 4,
            "reps": 15,
            "weight": 0
        }
    ]
  };
  result = new WorkoutModel(dummyWorkout);
  await result.save();

  dummyWorkout = {
    name: "Legs",
    day: "None",
    exercise_list: [
        {
            "exercise": "Front Squat",
            "sets": 5,
            "reps": 4,
            "weight": 225
        },
        {
            "exercise": "Squats",
            "sets": 5,
            "reps": 6,
            "weight": 245
        }
    ]
  };
  result = new WorkoutModel(dummyWorkout);
  await result.save();

  dummyStat = {
    "_id": "6362cfa7c8e5bba98bd31324",
    "records": [
        {
            "name": "Bench",
            "pr": "285",
            "goal": "315"
        },
        {
            "name": "Squat",
            "pr": "295",
            "goal": "405"
        },
        {
            "name": "Deadlift",
            "pr": "365",
            "goal": "465"
        },
        {
            "name": "Snatch",
            "pr": "155",
            "goal": "225"
        },
        {
            "name": "C&J",
            "pr": "205",
            "goal": "295"
        },
        {
            "name": "newWork",
            "pr": "555",
            "goal": "100"
        },
        {
            "name": "another",
            "pr": "100",
            "goal": "101"
        }
    ],
    "height": 69,
    "weight": 168,
    "mile": "5:30",
    "calories": 2600,
    "plan": "Maintenance"
  };
  result = new StatsModel(dummyStat);
  await result.save();

});

afterEach(async () => {
  await WorkoutModel.deleteMany();
  await StatsModel.deleteMany();
});

test("Fetching all users", async () => {
  const workouts = await userServices.getWorkouts();
  expect(workouts).toBeDefined();
  expect(workouts.length).toBeGreaterThan(0);
});

test("Fetching users by name", async () => {
  const workoutName = "Push";
  const workouts = await userServices.getWorkouts(workoutName);
  expect(workouts).toBeDefined();
  expect(workouts.length).toBeGreaterThan(0);
  workouts.forEach((workout) => expect(workout.name).toBe(workoutName));
});

test("Fetching stats data", async () => {
  const stats = await userServices.getStats();
  expect(stats).toBeDefined();
  expect(stats.length).toBeGreaterThan(0);
});

test("Update records in stats", async () => {
  let id = "6362cfa7c8e5bba98bd31324"
  let newRec = [
    { name: 'Bench', pr: '315', goal: '355' },
    { name: 'Squat', pr: '295', goal: '405' },
    { name: 'Deadlift', pr: '365', goal: '465' },
    { name: 'Snatch', pr: '155', goal: '225' },
    { name: 'C&J', pr: '205', goal: '295' },
    { name: 'newWork', pr: '555', goal: '100' },
    { name: 'another', pr: '100', goal: '101' }
  ]
  const stats = await userServices.updateStats(id, newRec);
  expect(stats).toBeDefined();
  expect(stats.records[0].pr).toBe('315');
});





// test("Fetching users by job", async () => {
//   const userJob = "Soccer coach";
//   const users = await userServices.getUsers(undefined, userJob);
//   expect(users).toBeDefined();
//   expect(users.length).toBeGreaterThan(0);
//   users.forEach((user) => expect(user.job).toBe(userJob));
// });

// test("Fetching users by name and job", async () => {
//   const userName = "Ted Lasso";
//   const userJob = "Soccer coach";
//   const users = await userServices.getUsers(userName, userJob);
//   expect(users).toBeDefined();
//   expect(users.length).toBeGreaterThan(0);
//   users.forEach(
//     (user) => expect(user.name).toBe(userName) && expect(user.job).toBe(userJob)
//   );
// });

// test("Fetching by invalid id format", async () => {
//   const anyId = "123";
//   const user = await userServices.findUserById(anyId);
//   expect(user).toBeUndefined();
// });

// test("Fetching by valid id and not finding", async () => {
//   const anyId = "6132b9d47cefd0cc1916b6a9";
//   const user = await userServices.findUserById(anyId);
//   expect(user).toBeNull();
// });

// test("Fetching by valid id and finding", async () => {
//   const dummyUser = {
//     name: "Harry Potter",
//     job: "Young wizard",
//   };
//   const result = new userModel(dummyUser);
//   const addedUser = await result.save();
//   const foundUser = await userServices.findUserById(addedUser.id);
//   expect(foundUser).toBeDefined();
//   expect(foundUser.id).toBe(addedUser.id);
//   expect(foundUser.name).toBe(addedUser.name);
//   expect(foundUser.job).toBe(addedUser.job);
// });

// test("Deleting a user by Id -- successful path", async () => {
//   const dummyUser = {
//     name: "Harry Potter",
//     job: "Young wizard",
//   };
//   const result = new userModel(dummyUser);
//   const addedUser = await result.save();
//   const deleteResult = await userModel.findOneAndDelete({ _id: addedUser.id });
//   expect(deleteResult).toBeTruthy();
// });

// test("Deleting a user by Id -- inexisting id", async () => {
//   const anyId = "6132b9d47cefd0cc1916b6a9";
//   const deleteResult = await userModel.findOneAndDelete({ _id: anyId });
//   expect(deleteResult).toBeNull();
// });

// test("Adding user -- successful path", async () => {
//   const dummyUser = {
//     name: "Harry Potter",
//     job: "Young wizard",
//   };
//   const result = await userServices.addUser(dummyUser);
//   expect(result).toBeTruthy();
//   expect(result.name).toBe(dummyUser.name);
//   expect(result.job).toBe(dummyUser.job);
//   expect(result).toHaveProperty("_id");
// });

// test("Adding user -- failure path with invalid id", async () => {
//   const dummyUser = {
//     _id: "123",
//     name: "Harry Potter",
//     job: "Young wizard",
//   };
//   const result = await userServices.addUser(dummyUser);
//   expect(result).toBeFalsy();
// });

// test("Adding user -- failure path with already taken id", async () => {
//   const dummyUser = {
//     name: "Harry Potter",
//     job: "Young wizard",
//   };
//   const addedUser = await userServices.addUser(dummyUser);

//   const anotherDummyUser = {
//     _id: addedUser.id,
//     name: "Ron",
//     job: "Young wizard",
//   };
//   const result = await userServices.addUser(anotherDummyUser);
//   expect(result).toBeFalsy();
// });

// test("Adding user -- failure path with invalid job length", async () => {
//   const dummyUser = {
//     name: "Harry Potter",
//     job: "Y",
//   };
//   const result = await userServices.addUser(dummyUser);
//   expect(result).toBeFalsy();
// });

// test("Adding user -- failure path with no job", async () => {
//   const dummyUser = {
//     name: "Harry Potter",
//   };
//   const result = await userServices.addUser(dummyUser);
//   expect(result).toBeFalsy();
// });

// test("Adding user -- failure path with no name", async () => {
//   const dummyUser = {
//     job: "Young wizard",
//   };
//   const result = await userServices.addUser(dummyUser);
//   expect(result).toBeFalsy();
// });