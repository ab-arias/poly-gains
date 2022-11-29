const mongoose = require("mongoose");
const WorkoutSchema = require("./workout");
const StatsSchema = require("./stats");
const userServices = require("./user-services");
const { MongoMemoryServer } = require("mongodb-memory-server");
const UserSchema = require("./user");

let mongoServer;
let conn;
let WorkoutModel;
let StatsModel;
let UserModel;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    //realcon = await userServices.getDbConnection();
    conn = await mongoose.createConnection(uri, mongooseOpts);

    UserModel = conn.model("User", UserSchema);
    WorkoutModel = conn.model("Workout", WorkoutSchema);
    StatsModel = conn.model("Stats", StatsSchema);

    userServices.setConnection(conn);
});

afterAll(async () => {
    //await realcon.close();
    await conn.dropDatabase();
    await conn.close();
    await mongoServer.stop();
});

beforeEach(async () => {
    let dummyUser = {
        _id: "637012e5c8e5bba72b4d3956",
        name: "dummy User",
        username: "dumbUsername45",
        email: "dumb@stupidemail.com",
        password: "stupidPassword4",
        avatar: "",
        workouts: ["637012e5c8e5bba98b4d3903"],
        activeWorkouts: {
            Monday: "637012e5c8e5bba98b4d3903",
            Tuesday: "637012e5c8e5bba98b4d3903",
            Wednesday: "637012e5c8e5bba98b4d3903",
            Thursday: "637012e5c8e5bba98b4d3903",
            Friday: "637012e5c8e5bba98b4d3903",
            Saturday: "637012e5c8e5bba98b4d3903",
            Sunday: "637012e5c8e5bba98b4d3903",
        },
        stats: "6362cfa7c8e5bba98bd31324",
        friends: [{ friend: "637012e5c8e5bba72b4d3234", status: "friend" }],
    };
    let result = new UserModel(dummyUser);
    await result.save();

    dummyUser = {
        _id: "637012e5c8e5bba72b4d3234",
        name: "dummy User2",
        username: "dumbUsername452",
        email: "dumb2@stupidemail.com",
        password: "stupidPassword42",
        avatar: "",
        workouts: ["637012e5c8e5bba98b4d3903"],
        activeWorkouts: {
            Monday: "637012e5c8e5bba98b4d3903",
            Tuesday: "637012e5c8e5bba98b4d3903",
            Wednesday: "637012e5c8e5bba98b4d3903",
            Thursday: "637012e5c8e5bba98b4d3903",
            Friday: "637012e5c8e5bba98b4d3903",
            Saturday: "637012e5c8e5bba98b4d3903",
            Sunday: "637012e5c8e5bba98b4d3903",
        },
        stats: "6362cfa7c8e5bba98bd31324",
        friends: [{ friend: "637012e5c8e5bba72b4d3956", status: "friend" }],
    };
    result = new UserModel(dummyUser);
    await result.save();

    let dummyWorkout = {
        _id: "637012e5c8e5bba98b4d3903",
        name: "Push",
        exercise_list: [
            {
                exercise: "Bench",
                sets: 5,
                reps: 6,
                weight: 225,
            },
            {
                exercise: "Dips",
                sets: 4,
                reps: 15,
                weight: 0,
            },
        ],
    };
    result = new WorkoutModel(dummyWorkout);
    await result.save();

    dummyWorkout = {
        _id: "637012e5c8e5bba98b4d3904",
        name: "Pull",
        exercise_list: [
            {
                exercise: "Cable rows",
                sets: 5,
                reps: 6,
                weight: 130,
            },
            {
                exercise: "Pullups",
                sets: 4,
                reps: 15,
                weight: 0,
            },
        ],
    };
    result = new WorkoutModel(dummyWorkout);
    await result.save();

    dummyWorkout = {
        _id: "637012e5c8e5bba98b4d3905",
        name: "Legs",
        exercise_list: [
            {
                exercise: "Front Squat",
                sets: 5,
                reps: 4,
                weight: 225,
            },
            {
                exercise: "Squats",
                sets: 5,
                reps: 6,
                weight: 245,
            },
        ],
    };
    result = new WorkoutModel(dummyWorkout);
    await result.save();

    dummyStat = {
        _id: "6362cfa7c8e5bba98bd31324",
        records: [
            {
                name: "Bench",
                pr: "285",
                goal: "315",
            },
            {
                name: "Squat",
                pr: "295",
                goal: "405",
            },
            {
                name: "Deadlift",
                pr: "365",
                goal: "465",
            },
            {
                name: "Snatch",
                pr: "155",
                goal: "225",
            },
            {
                name: "C&J",
                pr: "205",
                goal: "295",
            },
            {
                name: "newWork",
                pr: "555",
                goal: "100",
            },
            {
                name: "another",
                pr: "100",
                goal: "101",
            },
        ],
        height: 69,
        weight: 168,
        mile: "5:30",
        calories: 2600,
        plan: "Maintenance",
    };
    result = new StatsModel(dummyStat);
    await result.save();
});

afterEach(async () => {
    await UserModel.deleteMany();
    await WorkoutModel.deleteMany();
    await StatsModel.deleteMany();
});

// test("Unsuccessful db connection", async () => {
//     let temp = conn;
//     await userServices.setConnection(null);
//     const newConn = await userServices.getDbConnection();
//     expect(newConn).toBeDefined();
//     await newConn.close();
//     await userServices.setConnection(temp);
// });

// REGISTRATION

test("Successfully register new user", async () => {
    const input = {
        body: {
            name: "new guy",
            username: "newguy20",
            email: "newguy@test.com",
            password: "password4",
        },
    };
    const user = await userServices.registerNewUser(input);
    expect(user.success).toBeTruthy();
});

test("Registration fail: email", async () => {
    let input = {
        body: {
            name: "new guy",
            username: "newguy20",
            email: "newguy@test.com",
            password: "password4",
        },
    };
    await userServices.registerNewUser(input);
    input.body.username = "neqguy21";
    const result = await userServices.registerNewUser(input);
    expect(result).toEqual({
        error: { email: "Email already exists" },
        success: false,
    });
});

test("Registration fail: username", async () => {
    let input = {
        body: {
            name: "new guy",
            username: "newguy20",
            email: "newguy@test.com",
            password: "password4",
        },
    };
    await userServices.registerNewUser(input);
    input.body.email = "newguy@diffemail.com";
    const result = await userServices.registerNewUser(input);
    expect(result).toEqual({
        error: { username: "Username already exists" },
        success: false,
    });
});

// LOGIN

test("Successfully log in user", async () => {
    const reg = {
        body: {
            name: "new guy",
            username: "newguy20",
            email: "newguy@test.com",
            password: "password4",
        },
    };
    await userServices.registerNewUser(reg);
    const input = {
        body: {
            email: "newguy@test.com",
            password: "password4",
        },
    };
    const user = await userServices.loginUser(input);
    expect(user.success).toBeTruthy();
});

test("Login fail: email does not exist", async () => {
    const input = {
        body: {
            email: "newguy@test.com",
            password: "password4",
        },
    };
    const result = await userServices.loginUser(input);
    expect(result).toEqual({
        error: { email: "Email does not exist" },
        success: false,
    });
});

test("Login fail: password does not match", async () => {
    const reg = {
        body: {
            name: "new guy",
            username: "newguy20",
            email: "newguy@test.com",
            password: "password4",
        },
    };
    await userServices.registerNewUser(reg);
    const input = {
        body: {
            email: "newguy@test.com",
            password: "wrongpassword34",
        },
    };
    const result = await userServices.loginUser(input);
    expect(result).toEqual({
        error: { password: "Password does not match" },
        success: false,
    });
});

// USER

test("Get user by ID", async () => {
    const input = "637012e5c8e5bba72b4d3956";
    const user = await userServices.getUserById(input);
    expect(user).toBeDefined();
});

test("Get user by username", async () => {
    const input = "dumbUsername45";
    const user = await userServices.getUserByUsername(input);
    expect(user).toBeDefined();
});

test("Successfully update user", async () => {
    const id = "637012e5c8e5bba72b4d3956";
    const newName = "Smart User";
    const newPic = "data:image/png;base64,";
    const newActWorkouts = {
        Monday: "637012e5c8e5bba98b4d3954",
        Tuesday: "637012e5c8e5bba98b4d3903",
        Wednesday: "637012e5c8e5bba98b4d3903",
        Thursday: "637012e5c8e5bba98b4d3903",
        Friday: "637012e5c8e5bba98b4d3903",
        Saturday: "637012e5c8e5bba98b4d3954",
        Sunday: "637012e5c8e5bba98b4d3903",
    };
    const newWorkouts = [
        "637012e5c8e5bba98b4d3903",
        "637012e5c8e5bba98b4d3954",
    ];
    const user = await userServices.updateUser(
        id,
        newName,
        newPic,
        newActWorkouts,
        newWorkouts
    );
    expect(user.name).toMatch(newName);
    expect(JSON.stringify(user.avatar)).toMatch(newPic);
    expect(user.workouts.toString()).toMatch(newWorkouts.toString());
    expect(user.activeWorkouts.Monday.toString()).toMatch(
        newActWorkouts.Monday
    );
});

test("Fail to update user", async () => {
    const id = "";
    const result = await userServices.updateUser(id);
    expect(result).toBeUndefined();
});

// test("Successful user search", async () => {
//     let temp = conn;
//     await userServices.setConnection(realcon);
//     const input = "testact";
//     const users = await userServices.searchUsers(input);
//     expect(users).toBeDefined();
//     await userServices.setConnection(temp);
// });

// test("Unsuccessful user search", async () => {
//     let temp = conn;
//     await userServices.setConnection(realcon);
//     const input = "";
//     const result = await userServices.searchUsers(input);
//     expect(result).toBeUndefined();
//     await realcon.close();
//     await userServices.setConnection(temp);
// });

test("Successfully find friends", async () => {
    const id = "637012e5c8e5bba72b4d3956";
    const result = await userServices.getFriends(id);
    expect(result.length).toBe(1);
});

test("Fail to find friends", async () => {
    const id = "637012e5c8e5bba72b4d3953";
    const result = await userServices.getFriends(id);
    expect(result).toBeUndefined();
});

// WORKOUTS

test("Successfully get workouts", async () => {
    const workouts = [
        "637012e5c8e5bba98b4d3903",
        "637012e5c8e5bba98b4d3904",
        "637012e5c8e5bba98b4d3905",
    ];
    const result = await userServices.getUserWorkouts(workouts);
    expect(result.length).toBe(3);
});

test("Fail to get workouts", async () => {
    const workouts = [""];
    const result = await userServices.getUserWorkouts(workouts);
    expect(result).toBeUndefined();
});

test("Successfully update workout", async () => {
    const workoutID = "637012e5c8e5bba98b4d3903";
    const editedWorkout = {
        name: "Push Day",
        exercise_list: [],
    };
    const result = await userServices.updateWorkout(workoutID, editedWorkout);
    expect(result.name).toMatch(editedWorkout.name);
    expect(result.exercise_list.length).toBe(0);
});

test("Fail to update workout", async () => {
    const workoutID = "";
    const editedWorkout = {
        name: "Push Day",
        exercise_list: [],
    };
    const result = await userServices.updateWorkout(workoutID, editedWorkout);
    expect(result).toBeUndefined();
});

test("Successfully find workout by ID", async () => {
    const workoutID = "637012e5c8e5bba98b4d3903";
    const result = await userServices.findWorkoutById(workoutID);
    expect(result).toBeDefined();
});

test("Fail to find workout by ID", async () => {
    const workoutID = "";
    const result = await userServices.findWorkoutById(workoutID);
    expect(result).toBeUndefined();
});

test("Successfully add workout", async () => {
    const newWorkout = {
        name: "Quick Pump",
        exercise_list: [
            {
                exercise: "Bicep Curl",
                sets: 20,
                reps: 500,
                weight: 225,
            },
        ],
    };
    const result = await userServices.addWorkout(newWorkout);
    expect(result).toBeDefined();
});

test("Fail to add workout", async () => {
    const newWorkout = {};
    const result = await userServices.addWorkout(newWorkout);
    expect(result).toBeFalsy();
});

test("Successfully delete workout by ID", async () => {
    const workoutID = "637012e5c8e5bba98b4d3903";
    const result = await userServices.deleteWorkout(workoutID);
    expect(result).toBeDefined();
});

test("Successfully delete workout by ID", async () => {
    const workoutID = "";
    const result = await userServices.deleteWorkout(workoutID);
    expect(result).toBeFalsy();
});

// STATS

test("Successfully get stats", async () => {
    const statID = "6362cfa7c8e5bba98bd31324";
    const result = await userServices.getStatsById(statID);
    expect(result).toBeDefined();
});

test("Update stats", async () => {
    let id = "6362cfa7c8e5bba98bd31324";
    let newStats = {
        records: [
            { name: "Bench", pr: "315", goal: "355" },
            { name: "Squat", pr: "295", goal: "405" },
            { name: "Deadlift", pr: "365", goal: "465" },
            { name: "Snatch", pr: "155", goal: "225" },
            { name: "C&J", pr: "205", goal: "295" },
            { name: "newWork", pr: "555", goal: "100" },
            { name: "another", pr: "100", goal: "101" },
        ],
        height: 69,
        weight: 168,
        mile: "5:30",
        calories: 2300,
        plan: "Maintenance",
    };
    const stats = await userServices.updateStats(id, newStats);
    expect(stats).toBeDefined();
    expect(stats.records[0].pr).toBe("315");
    expect(stats.calories).toBe(2300);
});

test("Fail to update records in stats", async () => {
    let id = "";
    let newRec = [{ name: "Bench", pr: "315", goal: "355" }];
    const stats = await userServices.updateStats(id, newRec);
    expect(stats).toBeUndefined();
});

test("Delete record in stat", async () => {
    let id = "6362cfa7c8e5bba98bd31324";
    let nameToDelete = "Bench";
    const stats = await userServices.deleteStat(id, nameToDelete);
    expect(stats).toBeDefined();
});

test("Fail to delete record in stat", async () => {
    let id = "";
    let nameToDelete = "Bench";
    const stats = await userServices.deleteStat(id, nameToDelete);
    expect(stats).toBeUndefined();
});
