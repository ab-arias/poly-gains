const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const bodyParser = require("body-parser");
const userServices = require("./models/user-services");
const validateRegisterInput = require("./validation/register.js");
const validateLoginInput = require("./validation/login.js");

app.use(cors());
app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: false,
    })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());

app.get("/workouts", async (req, res) => {
    const name = req.query["name"];
    try {
        const result = await userServices.getWorkouts(name);
        res.send({ workouts_list: result });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error ocurred in the server.");
    }
});

app.get("/stats", async (req, res) => {
    const name = req.query["name"];
    try {
        const result = await userServices.getStats(name);
        res.send({ stats_list: result });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error ocurred in the server.");
    }
});

app.post("/user/:id", async (req, res) => {
    const id = req.params["id"];
    const { name, avatar, activeWorkouts, workouts } = req.body;
    const updatedUser = await userServices.updateUser(
        id,
        name,
        avatar,
        activeWorkouts,
        workouts
    );
    if (updatedUser) {
        res.status(201).send(updatedUser).end();
    } else {
        res.status(404).end();
    }
});

app.post("/stats/:id", async (req, res) => {
    const id = req.params["id"];
    const newRec = req.body;
    const updatedStat = await userServices.updateStats(id, newRec);
    const stats = [updatedStat];
    if (updatedWorkout) {
        res.status(201).send({ stats_list: stats }).end();
    } else {
        res.status(404).end();
    }
});

app.delete("/stats/:id", async (req, res) => {
    const id = req.params["id"];
    const delRec = req.body["thisName"];
    const deleteStat = await userServices.deleteStat(id, delRec);

    if (deleteStat) {
        res.status(204).end();
    } else {
        res.status(404).end();
    }
});

app.get("/workouts/:id", async (req, res) => {
    const id = req.params["id"];
    const result = await userServices.findWorkoutById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send("Resource not found.");
    else {
        res.send({ workouts_list: result });
    }
});

app.post("/workouts/:id", async (req, res) => {
    const id = req.params["id"];
    const newWorkout = req.body;
    const updatedWorkout = await userServices.updateWorkout(id, newWorkout);
    if (updatedWorkout) {
        res.status(201).send({ workout: updatedWorkout }).end();
    } else {
        res.status(404).end();
    }
});

app.post("/workouts", async (req, res) => {
    const workout = req.body;
    const savedWorkout = await userServices.addWorkout(workout);
    if (savedWorkout) res.status(201).send({ workout: savedWorkout }).end();
    else res.status(500).end();
});

app.delete("/workouts/:id", async (req, res) => {
    const id = req.params["id"];
    const deletedWorkout = await userServices.deleteUser(id);
    if (deletedWorkout) {
        res.status(204).end();
    } else {
        res.status(404).end();
    }
});

app.post("/users/register", async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).send(errors);
    }
    const result = await userServices.registerNewUser(req);
    if (result.success) {
        res.status(201).send(result.result).end();
    } else {
        res.status(400).send(result.error).end();
    }
});

app.post("/users/login", async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).send(errors);
    }
    const result = await userServices.loginUser(req);
    if (result.success) {
        res.status(201).send(result.result).end();
    } else {
        res.status(400).send(result.error).end();
    }
});

app.get("/user/:id", async (req, res) => {
    const id = req.params["id"];
    try {
        const result = await userServices.getUserById(id);
        res.send({ user: result });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error ocurred in the server.");
    }
});

app.post("/user/:id", async (req, res) => {
    const id = req.params["id"];
    const { name, avatar } = req.body;
    const updatedUser = await userServices.updateUser(id, name, avatar);
    if (updatedUser) {
        res.status(201).send(updatedUser).end();
    } else {
        res.status(404).end();
    }
});

app.get("/profile/:username", async (req, res) => {
    const username = req.params["username"];
    try {
        const result = await userServices.getUserByUsername(username);
        res.send({ user: result });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error ocurred in the server.");
    }
});

app.get("/search/:username", async (req, res) => {
    const username = req.params["username"];
    try {
        let result = await userServices.searchUsers(username);
        res.send(result);
    } catch (e) {
        res.status(500).end();
    }
});

app.listen(process.env.PORT || port, () => {
    console.log("REST API is listening.");
});

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });
