const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const passport = require("passport");
const users = require("./routes/users.js");
const userServices = require("./models/user-services");
const validateRegisterInput = require("./validation/register.js");
const validateLoginInput = require("./validation/login.js");

app.use(cors());
app.use(express.json());

app.use(passport.initialize());
require("./passport.js")(passport);
app.use("./routes/users", users);


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
    const { name, avatar } = req.body;
    const updatedUser = await userServices.updateUser(id, name, avatar);
    if (updatedUser) {
        res.status(201).send(updatedUser).end();
    } else {
        res.status(404).end();
    }
});

app.post("/stats/:id", async (req, res) => {
    const id = req.params["id"];
    const newRec = req.body;
    const updatedWorkout = await userServices.updateStats(id, newRec);
    const stats = [updatedWorkout];
    if (updatedWorkout) {
        res.status(201).send({ stats_list: stats }).end();
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

app.post("/workouts", async (req, res) => {
    const workout = req.body;
    const savedWorkout = await userServices.addWorkout(workout);
    if (savedWorkout) res.status(201).send(savedWorkout).end();
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
        return res.status(400).json(errors);
    } else {
        const result = await userServices.registerNewUser(req);
        console.log(result);
    }
});

app.post("/users/login", async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const result = await userServices.loginUser(req);
    if (result) {
        res.status(201).send(result).end();
    } else {
        res.status(404).end();
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

app.listen(process.env.PORT || port, () => {
    console.log("REST API is listening.");
  });

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });
